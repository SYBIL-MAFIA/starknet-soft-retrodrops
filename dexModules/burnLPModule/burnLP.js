import SDKOptions from '../../utils/SDKOptions.js';
import ModuleConfig from '../../utils/getCfgSetting.js';
import helpers from '../../utils/helpersClass.js';
import getMinAmountForBurnLP from './utils/getMinAmountForBurnLP.js';
import { Contract } from 'starknet';
import CallApprove from '../../utils/ApproveCallData.js'
import { chainContract } from '../../utils/other.js';
import burnLPCallData from './utils/setupTxPayload.js'
import ConfirmTx from '../../utils/txPayload.js'
import {General} from "../../setting/config.js";

export default class burnLP extends SDKOptions {
    async execute(privateKeyStarknet, moduleName,logger,accountIndex) {
        await super.execute(privateKeyStarknet);
        const config = new ModuleConfig(moduleName, 'BURNLP').getConfig();
        const helper = new helpers(config);
        const len = config.poolsForBurnLP.length
        
        logger.info(`[Account ${accountIndex}][${moduleName}][burnLP] - Starting burn LP for ${len} pair(s)`)

        for (let i = 0; i < len; i++ ) {
            let attempts = General.attemptsStarkModules
            while (attempts > 0) {
                try {

                    const moduleString = `[Account ${accountIndex}][${moduleName}][burnLP][Pair №${i + 1}]`

                    const tokens = helper.getPoolPair(config.poolsForBurnLP)
                    logger.info(`${moduleString} - Start work with ${tokens.src} ${tokens.dst}`)

                    let pool_id
                    if (moduleName === 'MySwap') {

                        pool_id = helper.getPoolId(tokens.src, tokens.dst)

                    }

                    const abies = helper.callAbi(moduleName)
                    const contract = new Contract(abies.mainAbi, chainContract.Starknet[moduleName].Router, this.provider);
                    const tokenName = `${tokens.src}${tokens.dst}`

                    const lPBalance = await helper.balanceCheckerForToken(tokenName, this.address, moduleName)


                    logger.info(`${moduleString} - Amount LP tokens to burn ${Number(lPBalance) / (10 ** 12)}`)

                    const minAmount = await new getMinAmountForBurnLP(tokens.src, tokens.dst, moduleName, lPBalance, abies, contract, this.provider, pool_id).execute()

                    const approve = new CallApprove(minAmount.contractAddress, chainContract.Starknet[tokens.dst], lPBalance, moduleName).execute()

                    const callData = new burnLPCallData(tokens.src, tokens.dst, moduleName, this.address, lPBalance, minAmount.minSrcAmount, minAmount.minDstAmount, pool_id).execute()

                    const txPayload = [
                        approve,
                        callData
                    ]


                    await new ConfirmTx(txPayload, this.account, this.provider, logger, moduleString).execute()
                    await helper.setupDelay(logger, `[Account ${accountIndex}][${moduleName}][burnLP][Pair №${i + 1}]`)
                    break
                } catch (e) {
                    logger.info(`Error burnLP ${moduleName} for pair №${Number(i) + 1}: ${e}`);
                    attempts --
                    if (attempts > 0) {
                        logger.info(`[Account ${accountIndex}][${moduleName}][burnLP][Pair №${Number(i) + 1}] - Retrying... (${attempts} attempts left)`);
                        await helper.setupExactDealay(General.delayBeforeNextRetry, `[Account ${accountIndex}][${moduleName}][burnLP][Pair №${Number(i) + 1}]`, logger);
                    } else {
                        logger.info(`[Account ${accountIndex}][${moduleName}][burnLP][Pair №${Number(i) + 1}] - Maximum retry count reached. Stopping retries for this pair.`);
                        logger.info(`[Account ${accountIndex}][${moduleName}] - Data save successfully`)
                        await helper.setupDelay(logger, `[Account ${accountIndex}][${moduleName}][burnLP][Pair №${Number(i) + 1}]`)
                        break
                    }
                }
            }
        }
    }
}