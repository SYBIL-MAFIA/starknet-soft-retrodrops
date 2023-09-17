import helpersFunctions from "../../utils/helpersClass.js";
import SDKOptions from '../../utils/SDKOptions.js';
import txConfirmation from "../../utils/txPayload.js";
import {Dmail, General} from "../../setting/config.js";
import {RpcProvider, CallData} from 'starknet'
import {rpc,wordsForEmail} from "../../utils/other.js";
import crypto from "crypto";

export default class DmailClass extends SDKOptions {
    async execute(logger, accountIndex, privateKey) {
        await super.execute(privateKey)
        const helper = new helpersFunctions(Dmail);
        let address = await helper.getStarknetAddress(privateKey)

        const provider = new RpcProvider({nodeUrl: rpc.Starknet});
        const moduleSting = `[Account ${accountIndex}][Dmail]`;
        const counterTx = helper.getTxCount()
        for (let i = 0; i < counterTx; i++) {
            let attempts = General.attemptsStarkModules
            while (attempts > 0) {
                    try {
                        logger.info(`${moduleSting}[tx №${Number(i) + 1}] - Processing transaction`);
                        await this.executeSingleDmail( i, logger, this.account, provider, address, moduleSting, helper);
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

            let emailToSendHas = this.hashString(emailToSend)
            let emailToSendEncoded =  ((this.encoder(`${emailToSendHas}`))).substring(0, 65)

            let NewAddress = `${this.removeLeadingZeroes(address)}@dmail.ai`
            let NewAddressHash = this.hashString(NewAddress)
            let NewAddressEncoded = ((this.encoder(`${NewAddressHash}`))).substring(0, 65)

        
            const txPayload = {
                    contractAddress: "0x0454f0bd015e730e5adbb4f080b075fdbf55654ff41ee336203aa2e1ac4d4309",
                    entrypoint: "transaction",
                    calldata: CallData.compile({
                        NewAddressEncoded,
                        emailToSendEncoded
                    })
            };

            await new txConfirmation(txPayload, account, provider, logger, `${moduleSting}[tx №${Number(i) + 1}]`).execute();


    }
    
    hashString(str) {
        return crypto.createHash('sha256').update(str).digest('hex');
    }


     encoder(message) {
        if ("" === message)
            return "";
        let t = [];
        t.push("0x");
        for (let n = 0; n < message.length; n++)
            t.push(message.charCodeAt(n).toString(16));
        return t.join("")
    }

    removeLeadingZeroes(str) {
        if (str[2] !== '0') {
            return str;
        }
        const newStr = str.slice(0, 2) + str.slice(3);
        return this.removeLeadingZeroes(newStr);
    }


}
