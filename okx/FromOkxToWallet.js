import helpersFunctions from "../utils/helpersClass.js";
import ccxt from "ccxt";
import {OKX, OKXAuth, ProviderMapping} from '../setting/config.js';
import {Web3} from "web3";


export default class FromOkxToWallet  {
    constructor(configOKX,configBridge,addressesAndKeys,logger,addressIndex){
        this.configOKX = configOKX
        this.addressesAndKeys = addressesAndKeys
        this.logger = logger
        this.addressIndex = addressIndex
        this.networkAndPrivateKeyAddress = this.callNetworkChoose()
        
        const providerUrl = ProviderMapping.provider[this.networkAndPrivateKeyAddress.network];
        this.web3 = new Web3((providerUrl));
        this.helperfunctions = new helpersFunctions()
   }

   async execute(){
    const handleCcxtError = (e) => {
        const errorType = e.constructor.name;
        console.error(`An error occurred ${errorType}.`);
        console.error(`Error details ${e}.`);
    }

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

    let address;

    if (this.networkAndPrivateKeyAddress.network === 'StarkNet') {
        address = await this.helperfunctions.getStarknetAddress(this.networkAndPrivateKeyAddress.privateKey);
    } else {
        address = await this.helperfunctions.getETHAddress(this.networkAndPrivateKeyAddress.privateKey);
    }

    let withdrawFee;
    try {
        const fees = await exchange.fetchDepositWithdrawFees(['ETH']);
        const feeInfo = fees['ETH']?.networks?.[this.networkAndPrivateKeyAddress.network];
        if (feeInfo) {
            withdrawFee = feeInfo.withdraw.fee;
        } else {
            this.logger.info(`[Account ${this.addressIndex}][withdrawalFromOkx] - Failed to get withdrawal fees for ETH in ${this.networkAndPrivateKeyAddress.network} network.`);
            withdrawFee = Math.random() * (OKX.withdraw_fees[this.networkAndPrivateKeyAddress.network][1] - OKX.withdraw_fees[this.networkAndPrivateKeyAddress.network][0]) + OKX.withdraw_fees[this.networkAndPrivateKeyAddress.network][0];
            this.logger.info(`[Account ${this.addressIndex}][withdrawalFromOkx] - Using default withdrawal fees - ${withdrawFee.toFixed(4)} ETH in ${this.networkAndPrivateKeyAddress.network} network.`);
        }
    } catch (error) {
        this.logger.info("[Account ${this.addressIndex}][withdrawalFromOkx] - An error to get withdrawal fees:");
        handleCcxtError(error);
    }

    const chainName = 'ETH' + this.networkAndPrivateKeyAddress.network;
    const amount = (Math.random() * (OKX.amountToWithdrawal[1] - OKX.amountToWithdrawal[0]) + OKX.amountToWithdrawal[0]).toFixed(5);

    this.logger.info(`[Account ${this.addressIndex}][withdrawalFromOkx] - Withdrawing ${amount} ETH to ${address} in ${this.networkAndPrivateKeyAddress.network} network`);
    try {
        await exchange.withdraw('ETH', amount, address, {
            toAddress: address,
            chainName: chainName,
            dest: 4,
            fee: withdrawFee,
            pwd: '-',
            amt: amount,
            network: this.networkAndPrivateKeyAddress.network
        });
        this.logger.info(`[Account ${this.addressIndex}][withdrawalFromOkx] - Withdrew out ${amount} ETH to ${address}`);
        this.logger.info(`[Account ${this.addressIndex}][withdrawalFromOkx] - Start waiting for deposit.`)
    } catch (error) {
        this.logger.info("[Account ${this.addressIndex}][withdrawalFromOkx] - An error to withdraw:");
        handleCcxtError(error);
    }

   
    

    const balanceCache = await this.confirmBalance(address);

    try {
        while (true) {
            await new Promise(resolve => setTimeout(resolve, 20 * 1000));
            const balance = await this.confirmBalance(address);
            if (balance > balanceCache) {
                this.logger.info(`[Account ${this.addressIndex}][withdrawalFromOkx] - Deposit of ${amount} ETH successfully confirmed on ${address}`);
                break;
            }
        }
    } catch (error) {
        console.error(`An error occurred while waiting for deposit: ${error}`)
    }
}
    callNetworkChoose(){
        let network, privateKey
        if (this.configOKX.withdrawalToNetwork === 'StarkNet') {
            network = 'StarkNet'
            privateKey = this.addressesAndKeys.startPrivateKey

        } else {
            network = 'Arbitrum One'
            privateKey = this.addressesAndKeys.mmKey
        }

        return {network, privateKey}
    }

    async confirmBalance(address){
        if (this.networkAndPrivateKeyAddress.network === 'StarkNet') {
            return await this.helperfunctions.balanceCheckerForToken('ETH', address, undefined)
        } else {
            return await this.web3.eth.getBalance(address)
        }
    }
}
    


