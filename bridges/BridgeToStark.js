import Web3 from "web3";
import { rpc } from "../utils/other.js";
import { ORBITER_ABI } from "../utils/abi.js";
import helpersFunctions from "../utils/helpersClass.js";
import { getChecksumAddress } from "starknet";
export default class BridgeToStar {
  constructor(config, addressesAndKeys,logger,addressIndex) {
    this.config = config;
    this.addressesAndKeys = addressesAndKeys;
    this.logger = logger
    this.helpersFunctions = new helpersFunctions(this.config)
    this.addressIndex = addressIndex

  }

  async execute() {

      try {
        this.logger.info(`[Account ${this.addressIndex}][OrbiterBridge][toStarknet] - Start bridging from Arbitrum to Starknet`)
        let explorer = 'https://arbiscan.io/tx/'
        let web3 = new Web3(rpc.ARB);
        let contract = new web3.eth.Contract(ORBITER_ABI, '0xd9d74a29307cc6fc8bf424ee4217f1a587fbc8dc');
        
        let bal_eth = await this.setupAmountToBridge(web3)


        let numberOfTokensToSend = bal_eth - BigInt(0.0012*10**18);
        
        if (numberOfTokensToSend >= 0.011163 * 10 ** 18){
            numberOfTokensToSend = 0.011163 * 10 ** 18 
            this.logger.info(`[Account ${this.addressIndex}][OrbiterBridge][toStarknet] - Amount to bridge more then maxLimAmount on OrbiterBridge, start bridging maxLimAmount`)
            
        }

        
        
        let addressStark = getChecksumAddress(this.addressesAndKeys.starkAddress)
        let starknetData = '0x03' + addressStark.slice(2)
        
        let gasPrice = await web3.eth.getGasPrice()
        let gas = await contract.methods
            .transfer('0x80C67432656d59144cEFf962E8fAF8926599bCF8', starknetData)
            .estimateGas({ from: this.addressesAndKeys.ethAddress, value: Number(numberOfTokensToSend) });
        numberOfTokensToSend =    BigInt(numberOfTokensToSend) - BigInt(gas * gasPrice)
        numberOfTokensToSend = (numberOfTokensToSend.toString().slice(0, -5)) + "09004";
        
        let tx = {
            from: this.addressesAndKeys.ethAddress,
            to: '0xd9d74a29307cc6fc8bf424ee4217f1a587fbc8dc',
            gas,
            maxFeePerGas: Number(gasPrice),
            maxPriorityFeePerGas : gasPrice,
            value:numberOfTokensToSend,
            data: contract.methods
                .transfer('0x80C67432656d59144cEFf962E8fAF8926599bCF8', starknetData)
                .encodeABI()
        }
        
        const balanceCash = await this.helpersFunctions.balanceCheckerForToken('ETH',this.addressesAndKeys.starkAddress,undefined)
        
        let signedTx = await web3.eth.accounts.signTransaction(tx, this.addressesAndKeys.mmKey);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction)

        this.logger.info(`[Account ${this.addressIndex}][OrbiterBridge][toStarknet] - Withdrawal from wallet successfully, TX HASH: ${explorer}${receipt.transactionHash}, start waiting for ETH on dst wallet`)
        
        await this.helpersFunctions.waitForUpdateBalanceStark(this.addressesAndKeys.starkAddress,this.logger,this.addressIndex,balanceCash,`[OrbiterBridge][toStarknet]`)
        await this.helpersFunctions.setupDelay(this.logger, `[OrbiterBridge][fromStark]`)
    } catch (e) {
       console.log(e)
    }
  }

  async setupAmountToBridge(web3){
    if (this.config.swapAllBalanceToStark){
      return await web3.eth.getBalance(this.addressesAndKeys.ethAddress);
    }
    else {
      return (Math.random() * (this.config.amountToBridgeToStark[1] - this.config.amountToBridgeToStark[0]) + this.config.amountToBridgeToStark[0]).toFixed(5)
    }
  }
}

