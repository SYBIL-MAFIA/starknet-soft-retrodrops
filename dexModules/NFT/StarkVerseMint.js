import SDKOptions from '../../utils/SDKOptions.js';
import {General} from "../../setting/config.js";
import helpersFunctions from "../../utils/helpersClass.js";
import {CallData} from "starknet";
import txConfirmation from "../../utils/txPayload.js";

export default class StarkVerse extends SDKOptions {

    async execute(privateKeyStarknet,logger,accountIndex) {
        await super.execute(privateKeyStarknet);
        const [minCount, maxCount] = General.StarkVerseNFTToBuy;
        const counterNFTToMint =  Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
        const helper = new helpersFunctions(General)
        for (let i = 0; i < counterNFTToMint; i++) {
            let attempts = General.attemptsStarkModules
            while (attempts > 0){
                try {
                    logger.info(`[Account ${accountIndex}][StarkVerse][tx №${i+1}] - Start buying StarkVerse NFT`)
                    const txPayload = [
                        {
                            contractAddress: '0x060582df2cd4ad2c988b11fdede5c43f56a432e895df255ccd1af129160044b8',
                            entrypoint: "publicMint",
                            calldata: CallData.compile({
                                to: this.address
                            })
                        }
                    ]
                    await new txConfirmation(txPayload,this.account,this.provider,logger,`[Account ${accountIndex}][StarkVerse][tx №${i+1}]`).execute()
                    await helper.setupExactDealay(General.DELAY,`[Account ${accountIndex}][StarkVerse][tx №${i+1}]`,logger)
                    break
                }catch (e) {
                    logger.info(`[Account ${accountIndex}][StarkVerse][tx №${i+1}] - Error  ${e}`);
                    attempts--
                    if (attempts > 0) {
                        logger.info(`[Account ${accountIndex}][StarkVerse][tx №${i+1}] - Retrying... (${attempts} attempts left)`);
                        await helper.setupExactDealay(General.delayBeforeNextRetry, `[Account ${accountIndex}][StarkVerse][tx №${i+1}]`, logger);
                    } else {
                        logger.info(`[Account ${accountIndex}][StarkVerse][tx №${i+1}] - Maximum retry count reached. Stopping retries.`);
                        logger.info(`[Account ${accountIndex}][StarkVerse][tx №${i+1}] - Data save successfully`)
                        break
                    }

                }
            }
        }

    }
}

