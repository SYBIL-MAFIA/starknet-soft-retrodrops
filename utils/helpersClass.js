import { chainContract, rpc, poolIds } from './other.js';
import { Contract, RpcProvider,ec,CallData,hash } from 'starknet';
import { abiMySwapTokensAbi,abiJediSwapStarknetMain,abiJediSwapStarknetReserves,abi_10KSwapStarknetMain,abi_10KSwapStarknetReserves,abiSithSwapStarknetMain,abiMySwapStarknet } from "./abi.js"
import Web3 from 'web3';
import {General} from "../setting/config.js";
import {calculateBraavosAddress} from "./calculateBraavosAddress.js";


export default class helpersFunctions {

    constructor(config) {
        this.config = config;
    }

    getTxCount() {
        const [minCount, maxCount] = this.config.counterTx;
        return Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
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
           const poolsCopy = pools.slice(); // Create a copy of the pools array
        
        const randomIndex = Math.floor(Math.random() * poolsCopy.length);
        const selectedPair = poolsCopy[randomIndex];

        const [src, dst] = selectedPair.split('/');

        return { src, dst };
       }catch (error) {
            console.log('ошибка')
            console.log(error)
            getPoolPair(pools)
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
        const ethAddress = await this.getETHAddress(mmKey)
        const starkAddress = await this.getStarknetAddress(startPrivateKey)

        return {ethAddress,mmKey,starkAddress,startPrivateKey}
    }

    
    async getETHAddress(mmKey){
        const web3 = new Web3(rpc.ARB);
        const account = web3.eth.accounts.privateKeyToAccount(mmKey.trim());
        return account.address
    }

    async getStarknetAddress(startPrivateKey){
        switch (General.walletName) {
            case "Argent_X":
                return await this.getArgentXWallet(startPrivateKey)
            case 'Braavos':
                return calculateBraavosAddress(startPrivateKey);
        }
    }

    async getArgentXWallet(key){
        const argentXproxyClassHash = "0x25ec026985a3bf9d0cc1fe17326b245dfdc3ff89b8fde106542a3ea56c5a918";
        const argentXaccountClassHash = "0x033434ad846cdd5f23eb73ff09fe6fddd568284a0fb7d1be20ee482f044dabe2";

        const StarkpublicKey = ec.starkCurve.getStarkKey(key);

        const ConstructorCallData = CallData.compile({
            implementation: argentXaccountClassHash,
            selector: hash.getSelectorFromName("initialize"),
            calldata: CallData.compile({ signer: StarkpublicKey, guardian: "0" }),
        });

        return hash.calculateContractAddressFromHash(
            StarkpublicKey,
            argentXproxyClassHash,
            ConstructorCallData,
            0
        );
    }

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

    }

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

    }
}
