import SDKOptions from '../../utils/SDKOptions.js';
import ModuleConfig from '../../utils/getCfgSetting.js';
import helpers from '../../utils/helpersClass.js';

import minAmount from '../../utils/calculateMinAmount.js'
import CallApprove from '../../utils/ApproveCallData.js'
import { chainContract } from '../../utils/other.js';
import addLPCallData from './utils/addLPCallData.js';
import ConfirmTx from '../../utils/txPayload.js'
import extraSwap from './utils/extraSwap.js';

export default class addLPMoudule extends SDKOptions {
    async execute(privateKeyStarknet, moduleName,logger,accountIndex) {
        await super.execute(privateKeyStarknet);
        const config = new ModuleConfig(moduleName, 'ADDLP').getConfig();
        const helper = new helpers(config);
        const len = config.poolsForAddLP.length
        
        logger.info(`[Account ${accountIndex}][${moduleName}][addLP] - Starting add LP for ${len} pair(s)`)
        for (let i = 0; i < len; i++ ){

            const tokens = helper.getPoolPair(config.poolsForAddLP)
            logger.info(`[Account ${accountIndex}][${moduleName}][addLP][Pair №${i+1}] - Selected pair ${tokens.src}/${tokens.dst}`)

            let pool_id
            if (moduleName === 'MySwap'){
                pool_id = helper.getPoolId(tokens.src,tokens.dst)
            }
            const srcBalance = await helper.balanceCheckerForToken(tokens.src,this.address)
            const dstBalance = await helper.balanceCheckerForToken(tokens.dst,this.address)
            
            const amountToAddLP = helper.getRandomPercentAmount(srcBalance,config.persentToAddLP) 
            const moduleString = `[Account ${accountIndex}][${moduleName}][addLP][Pair №${i+1}]`
            logger.info(`${moduleString} - Amount for add ${Number(amountToAddLP)/(10**18)}`)
            
            const abies  =  helper.callAbi(moduleName)
            
            const minAmountValue = await new minAmount(tokens.src,tokens.dst,moduleName,pool_id,abies).execute(amountToAddLP)
            
            await new extraSwap(srcBalance,dstBalance,tokens.src,tokens.dst,minAmountValue,moduleName,abies,pool_id,this.address,this.account,this.provider,logger,moduleString).execute()
            

            const approveDataSrcToken = new CallApprove(chainContract.Starknet[tokens.src],chainContract.Starknet[tokens.dst],amountToAddLP,moduleName).execute()

            const approveDataDstToken = new CallApprove(chainContract.Starknet[tokens.dst],chainContract.Starknet[tokens.dst],minAmountValue.maxDstAmount,moduleName).execute()

            const addLPdata = new addLPCallData(chainContract.Starknet[tokens.src],chainContract.Starknet[tokens.dst],amountToAddLP,minAmountValue,this.address,moduleName).execute()
            
            const txPayload = [
                approveDataSrcToken,
                approveDataDstToken,
                addLPdata
              ]
              
            
            
            await new ConfirmTx(txPayload,this.account,this.provider,logger,`[Account ${accountIndex}][${moduleName}][addLP][Pair №${i+1}]`).execute()
            await helper.setupDelay(logger,`[Account ${accountIndex}][${moduleName}][addLP][Pair №${i+1}]`)
        }
    }
}