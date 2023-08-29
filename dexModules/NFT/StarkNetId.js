import SDKOptions from '../../utils/SDKOptions.js';
import {General} from "../../setting/config.js";
import helpersFunctions from "../../utils/helpersClass.js";
import {CallData, Contract} from "starknet";
import {StarkNetIDAbi} from "../../utils/abi.js";
import txConfirmation from "../../utils/txPayload.js";

export default class StarkNetIdClass extends SDKOptions {

    async execute(privateKeyStarknet,logger,accountIndex) {
        await super.execute(privateKeyStarknet);

        const [minCount, maxCount] = General.StarkNerIDNFTToBuy;
        const counterNFTToMint =  Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount;
        const helper = new helpersFunctions(General)

        for (let i = 0; i < counterNFTToMint; i++) {
            let attempts = General.attemptsStarkModules
            let moduleString = `[Account ${accountIndex}][StarkNetID][tx №${i+1}]`
            while (attempts > 0){

                try{
                    logger.info(`${moduleString} - Start Mint StarkNet ID`)
                    let generatedNumber = await this.helpersFunctions.generateRandomNumber()
                    while (true){
                        generatedNumber = await this.helpersFunctions.generateRandomNumber()
                        try {
                            const contract = new Contract(StarkNetIDAbi, '0x05dbdedc203e92749e2e746e2d40a768d966bd243df04a6b712e222bc040a9af', this.provider);
                            let flag = await contract.owner_of(generatedNumber)
                        } catch (e) {
                            break
                        }

                    }

                    const txPayload = [
                        {
                            contractAddress: '0x05dbdedc203e92749e2e746e2d40a768d966bd243df04a6b712e222bc040a9af',
                            entrypoint: "mint",
                            calldata: CallData.compile({
                                starknet_id: generatedNumber
                            })
                        }
                    ]

                    await new txConfirmation(txPayload,this.account,this.provider,logger,`${moduleString}`).execute()

                }catch (e) {
                    logger.info(`${moduleString} - Error  ${e}`);
                    attempts--
                    if (attempts > 0) {
                        logger.info(`${moduleString} - Retrying... (${attempts} attempts left)`);
                        await helper.setupExactDealay(General.delayBeforeNextRetry, `${moduleString}`, logger);
                    } else {
                        logger.info(`${moduleString} - Maximum retry count reached. Stopping retries.`);
                        logger.info(`${moduleString} - Data save successfully`)
                        break
                    }
                }

            }
        }

    }
}

