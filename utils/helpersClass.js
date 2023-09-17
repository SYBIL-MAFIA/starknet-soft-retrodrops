import { chainContract, rpc, poolIds } from './other.js';
import { HDNodeWallet, Wallet } from 'ethers';
import { mnemonicToSeedSync }  from '@scure/bip39';
import { HDKey }  from "@scure/bip32";

import {Contract, RpcProvider, ec, CallData, hash, Provider, constants, Account} from 'starknet';
import { abiMySwapTokensAbi,abiJediSwapStarknetMain,abiJediSwapStarknetReserves,abi_10KSwapStarknetMain,abi_10KSwapStarknetReserves,abiSithSwapStarknetMain,abiMySwapStarknet } from "./abi.js"
import { Web3 } from 'web3';
import { General, OKXAuth } from "../setting/config.js";
import {getBraavosAddress} from "./calculateBraavosAddress.js";
import ccxt from "ccxt";
import crypto from 'crypto';
import MakeSwap from "../dexModules/swapModule/utils/makeSwap.js";
import ConfirmTx from "./txPayload.js";


export default class helpersFunctions {

    constructor(config) {
        this.config = config;
    }



    async generateRandomNumber(){
        const maxNumber = BigInt(10) ** BigInt(12);
        const randomBytes = crypto.randomBytes(6);
        let randomNumber = BigInt('0x' + randomBytes.toString('hex'));
        randomNumber = randomNumber % maxNumber;
        return randomNumber.toString().padStart(12, '0');
    }

    async getPrivateKeys(mmMnemonic,StarkNetMnemonic) {
        let mmPrivateKey,starkNetPrivateKey
        if (mmMnemonic !== undefined){
             mmPrivateKey = await this.getPrivateKeyFromMnemonicEVM(mmMnemonic)
        }

        if (StarkNetMnemonic !== undefined){
             starkNetPrivateKey = await this.getPrivateKeyFromMnemonicStarkNet(StarkNetMnemonic)
        }

        return {mmPrivateKey,starkNetPrivateKey}
    }

    async waitForGasEVM(logger,moduleString){
        const web3 = new Web3(new Web3.providers.HttpProvider(rpc.ERC20));
        while (true) {
            let baseFee = (await web3.eth.getBlock("latest")).baseFeePerGas;
            let current_gas = Number(web3.utils.fromWei(String(baseFee), "gwei"));
            if (current_gas >= General.maxGwei) {
                logger.info(`${moduleString} - Gas is still high | Current ${current_gas} | Need ${General.maxGwei}`)
                await new Promise(resolve => setTimeout(resolve, 60 * 1000))
            } else {
                logger.info(`${moduleString} - Gas within normal limits | Current ${current_gas} | Max ${General.maxGwei}`)
                return true
            }
        }
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async checkTokensForExtraSwap(addressesAndKeys,logger,addressIndex) {
        const provider = new Provider({ sequencer: { network: constants.NetworkName.SN_MAIN } })
        const account = new Account(provider, addressesAndKeys.starkAddress, addressesAndKeys.startPrivateKey);

        logger.info(`[Account ${addressIndex}][SWAPnonZeroTokens] - Checking token balances`)
        const balances = await this.getBalance(addressesAndKeys.starkAddress);
        const moduleName = 'JediSwap';
        const tokensToSwap = [
            { token: 'USDC', balance: balances.USDC, threshold: General.ethBalance * 10**6 },
            { token: 'USDT', balance: balances.USDT, threshold: General.usdtBalance * 10**6 },
            { token: 'WBTC', balance: balances.WBTC, threshold: General.wbtcBalance * 10**8 },
            { token: 'DAI', balance: balances.DAI, threshold: General.daiBalance * 10**18 },
        ];

        const pool_id = 0;

        for (const { token, balance, threshold } of tokensToSwap) {
            if (balance > threshold) {
                logger.info(`[Account ${addressIndex}][SWAPnonZeroTokens][${token}] - A token with a balance satisfying the condition was found `)
                const txPayload = await new MakeSwap(balance, token, 'ETH', pool_id, moduleName, addressesAndKeys.starkAddress, provider, account).execute();
                await new ConfirmTx(txPayload, account, provider, logger, `[Account ${addressIndex}][${moduleName}][SWAPnonZeroTokens][${token}]`).execute();
               await this.setupExactDealay(General.delayBeforeNextRetry, `[Account ${addressIndex}][${moduleName}][SWAPnonZeroTokens][${token}]`, logger);
            }
        }
    }

    async getPrivateKeyFromMnemonicEVM (mmMnemonic) {
        try {
            const wallet = await HDNodeWallet.fromPhrase(mmMnemonic, "", "m/44'/60'/0'/0/0");

            return wallet.privateKey

        } catch (e) {
            console.log(e)
            throw new Error(e)
        }
    }

    async getPrivateKeyFromMnemonicStarkNet(StarkNetMnemonic){
            switch (General.walletName){
                case "Argent_X":
                    return await this.getPrivateKeyFromMnemonicStarkNetArgent(StarkNetMnemonic)
                case "Braavos":
                    return await this.getPrivateKeyFromMnemonicStarkNetBraavos(StarkNetMnemonic)
            }
    }

    async getPrivateKeyFromMnemonicStarkNetArgent (StarknetMnemonic) {

        try {
            const signer = (Wallet.fromPhrase(StarknetMnemonic)).privateKey;
            const masterNode = HDNodeWallet.fromSeed(
                this.toHexString(signer));
            const childNode = masterNode.derivePath("m/44'/9004'/0'/0/0");
        
            return '0x' + ec.starkCurve.grindKey(childNode.privateKey).toString();
        }catch (e) {
            console.log(e)
            throw new Error(e)
        }
    };

    toHexString = (value) => {
    let hex = BigInt(value).toString(16);
    if (hex.length % 2 !== 0) {
        hex = '0' + hex;
    }
    return '0x' + hex;
};

    async getPrivateKeyFromMnemonicStarkNetBraavos(StarkNetMnemonic){
        const seed = mnemonicToSeedSync(StarkNetMnemonic);
        const hdKey = HDKey.fromMasterSeed(seed);
        const hdKeyDerived = hdKey.derive("m/44'/9004'/0'/0/0");

        return "0x" + ec.starkCurve.grindKey(hdKeyDerived.privateKey);
    }
    async  networkAbility(network, logger, moduleString, flag) {

        const exchange_options = {
            'apiKey': OKXAuth.okx_apiKey,
            'secret': OKXAuth.okx_apiSecret,
            'password': OKXAuth.okx_apiPassword,
            'enableRateLimit': true,
        };

        const exchange = new ccxt.okx(exchange_options);
        if (OKXAuth.use_okx_proxy) {
            exchange.https_proxy = OKXAuth.okx_proxy
        }

        let isAvailable = false;
        let isLogged = true
        while (!isAvailable) {
            const networkInfo = await exchange.fetchCurrencies();

            if (flag === 'w') {
                const canWd = networkInfo.ETH.networks[network].info.canWd;
                if (!canWd) {
                    logger.info(`${moduleString} - Withdraw from OKX in ${network} network is DISABLED now`);
                    if (isLogged) {
                        isLogged = false
                    }
                } else {
                    isAvailable = true;

                }
            }

            if (flag === 'd') {
                const canDep = networkInfo.ETH.networks[network].info.canDep;
                if (!canDep) {
                    logger.info(`${moduleString} - Deposit to OKX in ${network} network is DISABLED now`);

                } else {
                    isAvailable = true;

                }
            }

            if (!isAvailable) {
                await this.sleep(300000);
            }
        }

        logger.info(`${moduleString} - ${flag === 'w' ? 'Withdraw' : 'Deposit'} in ${network} network is now available`);

    }

    async waitForGasTxStarknet(logger, tx, moduleString, account) {
        let fee = await account.estimateInvokeFee(tx);
        let overallFee = Number(fee.overall_fee) / (10**18);
        if (overallFee > General.maxStarknetFee) {
            logger.info(`${moduleString} - Gas is still high | Current ${overallFee} | Need ${General.maxStarknetFee}`);
            await new Promise(resolve => setTimeout(resolve, 60 * 1000));
            return await this.waitForGasTxStarknet(logger, tx, moduleString, account);
        }
        logger.info(`${moduleString} - Gas within normal limits | Current ${overallFee} | Max ${General.maxStarknetFee}`);
        return true
    }
    getTxCount() {
        const [minCount, maxCount] = this.config.counterTx;
        return Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
    }
    async setupExactDealay(delay,moduelString,logger){
        const [mindelay, maxdelay] = delay
        const delaySeconds =  Math.floor(Math.random() * (maxdelay - mindelay + 1)) + mindelay
        logger.info(`${moduelString} - Delaying ${delaySeconds} seconds before next action`);
        await new Promise(resolve => setTimeout(resolve, delaySeconds * 1000));
    }

    getRandomEmail(){
        const domains = ["@gmail.com", "@yahoo.com", "@outlook.com", "@hotmail.com"];
        const randomDomain = domains[Math.floor(Math.random() * domains.length)];
        const randomUsername = Math.random().toString(36).substring(2, 10);

        return randomUsername + randomDomain;
    }

    getRandomSentence(countWrd,dict){
        const minRange = Math.min(...countWrd);
        const maxRange = Math.max(...countWrd);
        const randomNum = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;

        const randomWords = [];
        for (let i = 0; i < randomNum; i++) {
            const randomIndex = Math.floor(Math.random() * dict.length);
            randomWords.push(dict[randomIndex]);
        }

        let sentence;
        sentence = randomWords.join(" ") + ".";

        return sentence;
    }

    async getAmountTokenStark(rpc, walletAddress, tokenAddress, abiAddress) {
        const provider = new RpcProvider({ nodeUrl: rpc });

        if (!abiAddress) {
            abiAddress = tokenAddress;
        }
        const { abi: abi } = await provider.getClassAt(abiAddress);
        if (abi === undefined) {
            throw new Error("no abi.");
        }
        const contract = new Contract(abi, tokenAddress, provider);
        
        const balance = await contract.functions.balanceOf(walletAddress)
        
        return balance.balance.low
    }

    async getBalance(address) {
        let usdcBalance, usdtBalance, ETHBalance, DAIBalance, WBTCBalance;
        
        usdcBalance = await this.getAmountTokenStark(
            rpc.Starknet,
            address, 
            chainContract.Starknet.USDC,
            chainContract.Starknet.ABI
        );
        usdtBalance = await this.getAmountTokenStark(
            rpc.Starknet,
            address, 
            chainContract.Starknet.USDT,
            chainContract.Starknet.ABI
        );
        ETHBalance = await this.getAmountTokenStark(
            rpc.Starknet,
            address, 
            chainContract.Starknet.ETH,
            chainContract.Starknet.ABI
        );
        DAIBalance = await this.getAmountTokenStark(
            rpc.Starknet,
            address,
            chainContract.Starknet.DAI,
            chainContract.Starknet.ABI
        );
        WBTCBalance = await this.getAmountTokenStark(
            rpc.Starknet,
            address, 
            chainContract.Starknet.WBTC,
            chainContract.Starknet.ABI
        );

        return {
            USDC: usdcBalance,
            USDT: usdtBalance,
            ETH: ETHBalance,
            DAI: DAIBalance,
            WBTC: WBTCBalance,
        };
    }

    async setupDelay(logger,moduelString){
        const [mindelay, maxdelay] = this.config.delay
        const delaySeconds =  Math.floor(Math.random() * (maxdelay - mindelay + 1)) + mindelay
        logger.info(`${moduelString} -  Delaying ${delaySeconds} seconds before next action`);
        await new Promise(resolve => setTimeout(resolve, delaySeconds * 1000));
    }

    getPoolPair(pools){
        try{
            const randomIndex = Math.floor(Math.random() * pools.length);
            const selectedPair = pools[randomIndex];
         
            const [src, dst] = selectedPair.split('/');
         
            pools.splice(randomIndex, 1); 
            return {src,dst}
       }catch (error) {
            console.log(error)
            this.getPoolPair(pools)
        }
    }

    async balanceCheckerForToken(tokenName,address,moduleName){
        
        switch (tokenName){
            case "ETH":
                return await this.getAmountTokenStark(rpc.Starknet,address, chainContract.Starknet.ETH,chainContract.Starknet.ABI);
            case "USDC":
                return await this.getAmountTokenStark(rpc.Starknet,address, chainContract.Starknet.USDC,chainContract.Starknet.ABI);
            case "USDT":
                return await this.getAmountTokenStark(rpc.Starknet,address, chainContract.Starknet.USDT,chainContract.Starknet.ABI);
            case 'ETHUSDC':
                return await this.getAmountTokenStark(rpc.Starknet,address,chainContract.Starknet[moduleName].ETHUSDC,chainContract.Starknet.ABI)
            case 'ETHUSDT':
                return await this.getAmountTokenStark(rpc.Starknet,address,chainContract.Starknet[moduleName].ETHUSDT,chainContract.Starknet.ABI)
        }
    }

    getPoolId(src,dst){
        const key = `${src}/${dst}`;
        
        return poolIds[key];
    }

    getRandomPercentAmount(amount,percent){
        let fromAmountPercentage
        const [minPercent, maxPercent] = percent
        fromAmountPercentage = Math.random() * (maxPercent - minPercent) + minPercent;
        amount = Math.round((fromAmountPercentage / 100) * Number(amount));
        return amount
    }

    callAbi(moduleName){
        let mainAbi, reserveAbi, tokensAbi
        switch (moduleName){
            case "JediSwap":
                mainAbi = abiJediSwapStarknetMain
                reserveAbi = abiJediSwapStarknetReserves
                return {mainAbi, reserveAbi}
            
            case "_10KSwap":
                mainAbi = abi_10KSwapStarknetMain
                reserveAbi = abi_10KSwapStarknetReserves
                return {mainAbi, reserveAbi}
                        
            case "SithSwap":
                mainAbi = abiSithSwapStarknetMain
                return {mainAbi}
            
            case "MySwap":
                mainAbi = abiMySwapStarknet
                tokensAbi = abiMySwapTokensAbi
                return {mainAbi,tokensAbi}
        }
    }

    async getETHAndStarkAddresses(mmKey,startPrivateKey){
        let ethAddress, starkAddress
        if (General.usePrivateKeys===true){
            mmKey = '0x'+mmKey
        }
        if (mmKey !== undefined){ethAddress = await this.getETHAddress(mmKey)}
        if (startPrivateKey !== undefined){starkAddress = await this.getStarknetAddress(startPrivateKey)}

        return {ethAddress,mmKey,starkAddress,startPrivateKey}
    }

    
    async getETHAddress(mmKey){
        const web3 = new Web3(new Web3.providers.HttpProvider(rpc.ARB));

        const account = web3.eth.accounts.privateKeyToAccount(mmKey.trim());
        return account.address;
    };

    async getStarknetAddress (startPrivateKey){
        switch (General.walletName) {
            case "Argent_X":
                return await this.getArgentXWallet(startPrivateKey)
            case 'Braavos':
                return getBraavosAddress(startPrivateKey);
        }
    };

    async getArgentXWallet (key){
        const argentProxyClassHash = "0x25ec026985a3bf9d0cc1fe17326b245dfdc3ff89b8fde106542a3ea56c5a918";
        const argentAccountClassHash = "0x033434ad846cdd5f23eb73ff09fe6fddd568284a0fb7d1be20ee482f044dabe2";

        const publicKey = ec.starkCurve.getStarkKey(key);
        const AXproxyConstructorCallData = CallData.compile({
            implementation: argentAccountClassHash,
            selector: hash.getSelectorFromName("initialize"),
            calldata: CallData.compile({ signer: publicKey, guardian: "0" }),
        });

        return hash.calculateContractAddressFromHash(
            publicKey,
            argentProxyClassHash,
            AXproxyConstructorCallData,
            0
        );
    };

    async checkVersion (provider, address) {
        const targetHash = '0x1a736d6ed154502257f02b1ccdf4d9d1089f80811cd6acad48e6b6a9d1f2003';
        const classHash = await provider.getClassHashAt(address);

        if (classHash !== targetHash) {
            return '0';
        } else {
            return '1';
        }
    };

    async build_ConstructorCallDataNew (publicKey) {
        return CallData.compile({
            owner: publicKey,
            guardian: 0n
        });
    };

    async getArgentXWalletNew (key) {
        const argentAccountClassHash = "0x1a736d6ed154502257f02b1ccdf4d9d1089f80811cd6acad48e6b6a9d1f2003";

        const publicKey = ec.starkCurve.getStarkKey(key);
        const constructorCalldata = await this.build_ConstructorCallDataNew(publicKey);

        return hash.calculateContractAddressFromHash(
            publicKey,
            argentAccountClassHash,
            constructorCalldata,
            0
        );
    };

    async waitForUpdateBalanceStark(address,logger,accountIndex,balanceCash,moduleString){
        while (true){
            await new Promise(resolve => setTimeout(resolve, 15 * 1000));
            let balanceNew = await this.balanceCheckerForToken('ETH',address,undefined)
            
            if(balanceNew > balanceCash){
                
                logger.info(`[Account ${accountIndex}]${moduleString} - Deposit confirmed on wallet`)
                return
            }
            else{
                logger.info(`[Account ${accountIndex}]${moduleString} - Deposit not confirmed on wallet yet, waiting 15sec...`)
                await new Promise(resolve => setTimeout(resolve, 15 * 1000));
            }
        }
    };

    async waitForUpdateBalanceEth(address,logger,accountIndex,balanceCash,web3,moduleString){
        while (true){
            await new Promise(resolve => setTimeout(resolve, 15 * 1000));
            let balanceNew = await web3.eth.getBalance(address);
            
            if(balanceNew > balanceCash){
                logger.info(`[Account ${accountIndex}][${moduleString} - Deposit confirmed on wallet`)
                return
            }
            else{
                logger.info(`[Account ${accountIndex}][${moduleString}] - Deposit not confirmed on wallet yet, waiting 15sec...`)
                await new Promise(resolve => setTimeout(resolve, 15 * 1000));
            }
        }
    };
}
