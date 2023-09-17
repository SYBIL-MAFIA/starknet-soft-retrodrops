import helpersFunctions from "../utils/helpersClass.js";
import ConfirmTx from '../utils/txPayload.js'
import { CallData,RpcProvider,Account } from "starknet";
import { rpc } from "../utils/other.js";
import Web3 from "web3";
import MakeSwap from "../dexModules/swapModule/utils/makeSwap.js";
import {Bridge, General} from "../setting/config.js";

export default class BridgeFromStar{
    constructor(config, addressesAndKeys,logger,addressIndex) {
        this.config = config;
        this.addressesAndKeys = addressesAndKeys;
        this.logger = logger
        this.helpersFunctions = new helpersFunctions(this.config)
        this.addressIndex = addressIndex
    }

    async execute() {
        let attempts = General.attemptsStarkModules
        while (attempts > 0) {
            try {
                this.logger.info(`[Account ${this.addressIndex}][OrbiterBridge][fromStark] - Start withdrawal from Starknet to Arbitrum`)
                const provider = new RpcProvider({nodeUrl: rpc.Starknet});
                let account; let cairoVersion;
                if (General.walletName === 'Braavos') {
                    account = new Account(provider, this.addressesAndKeys.starkAddress, this.addressesAndKeys.startPrivateKey, '0');
                } else {
                    try {
                        cairoVersion = await this.helpersFunctions.checkVersion(provider, this.addressesAndKeys.starkAddress);
                    } catch (error) {
                        this.addressesAndKeys.starkAddress = await this.helpersFunctions.getArgentXWalletNew(this.addressesAndKeys.startPrivateKey);
                        cairoVersion = await this.helpersFunctions.checkVersion(provider, this.addressesAndKeys.starkAddress);
                    }
                    account = new Account(provider, this.addressesAndKeys.starkAddress, this.addressesAndKeys.startPrivateKey, cairoVersion);
                }

                if (General.swapNonZeroTokens) {
                    await this.checkTokensForExtraSwap(provider, account)
                }

                let amount = await this.setupAmount()
                if (amount === undefined) {
                    return false
                }
                amount = amount - BigInt(amount * BigInt(1) / BigInt(100))
                amount = (amount.toString().slice(0, -5)) + "09002";

                let txPayload = [{
                    contractAddress: '0x0173f81c529191726c6e7287e24626fe24760ac44dae2a1f7e02080230f8458b',
                    entrypoint: "transferERC20",
                    calldata: CallData.compile({
                        _token: '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
                        _to: '0x064a24243f2aabae8d2148fa878276e6e6e452e3941b417f3c33b1649ea83e11',
                        _amount: {low: BigInt(amount), high: 0n},
                        _ext: this.addressesAndKeys.ethAddress,
                    })
                }]


                const res = (await account.estimateInvokeFee(txPayload)).overall_fee

                amount = BigInt(amount) - BigInt(res)
                amount = amount - BigInt(0.0009 * 10 ** 18)

                amount = (amount.toString().slice(0, -5)) + "09002";
                txPayload = [{
                    contractAddress: '0x0173f81c529191726c6e7287e24626fe24760ac44dae2a1f7e02080230f8458b',
                    entrypoint: "transferERC20",
                    calldata: CallData.compile({
                        _token: '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
                        _to: '0x064a24243f2aabae8d2148fa878276e6e6e452e3941b417f3c33b1649ea83e11',
                        _amount: {low: BigInt(amount), high: 0n},
                        _ext: this.addressesAndKeys.ethAddress,
                    })
                }]

                let web3 = new Web3((rpc.ARB));
                const balanceCash = await web3.eth.getBalance(this.addressesAndKeys.ethAddress);

                await new ConfirmTx(txPayload, account, provider, this.logger, `[Account ${this.addressIndex}][OrbiterBridge][fromStark]`).execute()

                await this.helpersFunctions.waitForUpdateBalanceEth(this.addressesAndKeys.ethAddress, this.logger, this.addressIndex, balanceCash, web3, `[OrbiterBridge][fromStark]`)
                await this.helpersFunctions.setupDelay(this.logger, `[Account ${this.addressIndex}][OrbiterBridge][fromStark]`)
                break
            }catch (e) {
                this.logger.error(`[Account ${this.addressIndex}][OrbiterBridge][fromStark]  - Error during execute: ${e}`);
                attempts--
                if (attempts > 0) {
                    this.logger.info(`[Account ${this.addressIndex}][OrbiterBridge][fromStark]  - Retrying... (${attempts} attempts left)`);
                    await this.helpersFunctions.setupExactDealay(General.delayBeforeNextRetry, `[Account ${this.addressIndex}][OrbiterBridge][fromStark] `, this.logger)
                } else {
                    this.logger.error(`[Account ${this.addressIndex}][OrbiterBridge][fromStark]  - Maximum retry count reached. Stopping retries.`);
                    break
                }
            }
        }
    }

    async setupAmount() {
        let balance,amountToSaveOnWallet;
        if (this.config.swapAllBalanceFromStark) {
            balance = await this.helpersFunctions.balanceCheckerForToken('ETH', this.addressesAndKeys.starkAddress, undefined);
            amountToSaveOnWallet = (Math.random() * (Bridge.amountToSaveOnWalletStark[1] - Bridge.amountToSaveOnWalletStark[0]) + Bridge.amountToSaveOnWalletStark[0]).toFixed(5);
            amountToSaveOnWallet = amountToSaveOnWallet * 10 ** 18
            return (balance - BigInt(amountToSaveOnWallet))
        } else {
            balance = (Math.random() * (this.config.amountToBridgeFromStark[1] - this.config.amountToBridgeFromStark[0]) + this.config.amountToBridgeFromStark[0]).toFixed(5);
            return BigInt(balance * 10** 18);
        }
    }

    async checkTokensForExtraSwap(provider, account) {
        this.logger.info(`[Account ${this.addressIndex}][SWAPnonZeroTokens] - Checking token balances`)
        const balances = await this.helpersFunctions.getBalance(this.addressesAndKeys.starkAddress);
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
                this.logger.info(`[Account ${this.addressIndex}][SWAPnonZeroTokens][${token}] - A token with a balance satisfying the condition was found `)
                const txPayload = await new MakeSwap(balance, token, 'ETH', pool_id, moduleName, this.addressesAndKeys.starkAddress, provider, account).execute();
                await new ConfirmTx(txPayload, account, provider, this.logger, `[Account ${this.addressIndex}][${moduleName}][SWAPnonZeroTokens][${token}]`).execute();
                await this.helpersFunctions.setupDelay(this.logger, `[Account ${this.addressIndex}][${moduleName}][SWAPnonZeroTokens][${token}]`);
            }
        }
    }
}
  
  