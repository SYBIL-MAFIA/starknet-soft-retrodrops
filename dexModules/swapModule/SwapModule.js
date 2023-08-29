import SDKOptions from '../../utils/SDKOptions.js';
import ModuleConfig from '../../utils/getCfgSetting.js';
import helpers from '../../utils/helpersClass.js';
import SetupTokens from './utils/setupTokens.js';
import ConfirmTx from '../../utils/txPayload.js'
import MakeSwap from './utils/makeSwap.js'
import {General} from "../../setting/config.js";

export default class SwapModuleClass extends SDKOptions {

    async execute(privateKeyStarknet, moduleName,logger,accountIndex,isFirstSwap) {
        await super.execute(privateKeyStarknet);

        const config = new ModuleConfig(moduleName, 'SWAP').getConfig();

        const helper = new helpers(config);
        const counterTx = helper.getTxCount();
        const balances = await helper.getBalance(this.address);
        logger.info(`[Account ${accountIndex}][${moduleName}][SWAP] - Selected tx count ${counterTx}`)
        for (let i = 0; i < counterTx; i++) {
            let attempts = General.attemptsStarkModules

            while (attempts > 0) {
                try {
                    const TokensForSwapData = await new SetupTokens(
                        config.address,
                        config.swapAllBalance,
                        isFirstSwap,
                        moduleName,
                        balances,
                        config.percentToSwap,
                        config.percentToSwapETH
                    ).execute();
                    const amount = Number(TokensForSwapData.fromBalance) / 10 ** TokensForSwapData.decimals;
                    logger.info(`[Account ${accountIndex}][${moduleName}][SWAP][tx №${i + 1}] - Start swapping ${TokensForSwapData.src} for ${TokensForSwapData.dst} | Amount ${amount}`);
                    const txPayload = await new MakeSwap(TokensForSwapData.fromBalance, TokensForSwapData.src, TokensForSwapData.dst, TokensForSwapData.pool_id, moduleName, this.address, this.provider, this.account).execute()


                    await new ConfirmTx(txPayload, this.account, this.provider, logger, `[Account ${accountIndex}][${moduleName}][SWAP][tx №${i + 1}]`).execute()
                    await helper.setupDelay(logger, `[Account ${accountIndex}][${moduleName}][SWAP][tx №${i + 1}]`)
                    isFirstSwap = false
                    break
                } catch (e) {
                    console.log(e)
                    logger.info(`[Account ${accountIndex}][${moduleName}][SWAP][tx №${Number(i) + 1}] - Error in SwapModule ${moduleName} ${e}`);
                    attempts--
                    if (attempts > 0) {
                        logger.info(`[Account ${accountIndex}][${moduleName}][SWAP][tx №${Number(i) + 1}] - Retrying... (${attempts} attempts left)`);
                        await helper.setupExactDealay(General.delayBeforeNextRetry, `[Account ${accountIndex}][${moduleName}][SWAP][tx №${Number(i) + 1}]`, logger);
                    } else {
                        logger.info(`[Account ${accountIndex}][${moduleName}][SWAP][tx №${Number(i) + 1}] - Maximum retry count reached. Stopping retries.`);
                        logger.info(`[Account ${accountIndex}][SWAP][tx №${Number(i) + 1}] - Data save successfully`)
                        break
                    }

                }
            }
            isFirstSwap = false
        }
    }
}

