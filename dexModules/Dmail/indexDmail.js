import helpersFunctions from "../../utils/helpersClass.js";
import txConfirmation from "../../utils/txPayload.js";
import {Dmail, General} from "../../setting/config.js";
import {RpcProvider, Account, CallData} from 'starknet'
import {rpc,wordsForEmail} from "../../utils/other.js";

export default class DmailClass {
    async execute(logger, accountIndex,privateKey) {

        const helper = new helpersFunctions(Dmail);
        let address = await helper.getStarknetAddress(privateKey)

        const provider = new RpcProvider({nodeUrl: rpc.Starknet});
        const account = new Account(provider, address, privateKey);
        const moduleSting = `[Account ${accountIndex}][Dmail]`;
        const counterTx = helper.getTxCount()
        for (let i = 0; i < counterTx; i++) {
            let attempts = General.attemptsStarkModules
            while (attempts > 0) {
                    try {
                        logger.info(`${moduleSting}[tx №${Number(i) + 1}] - Processing transaction`);
                        await this.executeSingleDmail( i, logger, account, provider, address, moduleSting, helper);
                        logger.info(`[Account ${accountIndex}]['Dmail'] - Data save successfully`)
                        await helper.setupDelay(logger, moduleSting);
                        break
                    } catch (error) {
                        logger.info(`${moduleSting}[tx №${Number(i) + 1}] - Error in Dmail: ${error}`);
                        attempts--
                        if (attempts > 0) {
                            logger.info(`${moduleSting}[tx №${Number(i) + 1}] - Retrying... (${attempts} attempts left)`);
                            await helper.setupExactDealay(General.delayBeforeNextRetry, `${moduleSting}[tx №${Number(i) + 1}]`, logger)
                        } else {
                            logger.info(`${moduleSting}[tx №${Number(i) + 1}] - Maximum retry count reached. Stopping retries for this transaction.`);
                            logger.info(`[Account ${accountIndex}]['Dmail'] - Data save successfully`)
                            await helper.setupDelay(logger, moduleSting);
                            break
                        }
                    }

                break
            }

        }
    }
    async executeSingleDmail( i,logger, account, provider,address, moduleSting,helper) {
            const emailToSend = helper.getRandomEmail()
            logger.info(`${moduleSting}[tx №${Number(i) + 1}] - Start sending Dmail to ${emailToSend}`);

            const sentToSend = helper.getRandomSentence(Dmail.worldsCount, wordsForEmail);
            logger.info(`${moduleSting}[tx №${Number(i) + 1}] - Msg to Send (${sentToSend})`);

хуй
        
            const txPayload = {
                contractAddress: "0x0454f0bd015e730e5adbb4f080b075fdbf55654ff41ee336203aa2e1ac4d4309",
                entrypoint: "transaction",
                calldata: CallData.compile({
                    emailToSend,
                    sentToSend
                })
            };

            await new txConfirmation(txPayload, account, provider, logger, `${moduleSting}[tx №${Number(i) + 1}]`).execute();


    }


}
