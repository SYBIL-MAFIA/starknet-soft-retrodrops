import { explorerTx } from './other.js';
import helpersFunctions from "./helpersClass.js";
import { General } from "../setting/config.js";
import { constants, Provider } from "starknet";


export default class txConfirmation {
    constructor (txPayload, account, provider, logger, moduleString) {
        this.txPayload = txPayload
        this.account = account
        this.provider = new Provider({ sequencer: { network: constants.NetworkName.SN_MAIN } });
        this.logger = logger
        this.moduleString = moduleString
        this.helpersFunction = new helpersFunctions()
    }

    async execute() {

        return await this.retryOnFail(async () => {
            const account = this.account;

            try {
                await this.helpersFunction.waitForGasTxStarknet(this.logger, this.txPayload, this.moduleString, account)
                let nonceCash = 0;
                let nonce;
                try {
                    nonceCash = await account.getNonce();
                    nonceCash = parseInt(nonceCash, 16);
                } catch (e) {
                    this.logger.error(`${this.moduleString} - Error while fetching nonce: ${e}`);
                }

                let executeHash;
                while (true) {
                    try {
                        executeHash = await account.execute(this.txPayload);
                        break;
                    } catch (e) {
                        if (e.message.includes('Transaction with hash')) {
                            await new Promise(resolve => setTimeout(resolve, 15 * 1000));
                        } else {
                            await new Promise(resolve => setTimeout(resolve, 15 * 1000));
                            this.logger.error(`${this.moduleString} - An error while executing tx:\n${e}`);
                            throw new Error(`${this.moduleString} - An error while executing tx\n`);
                        }
                    }
                }
                this.logger.info(`${this.moduleString} - Send TX: ${explorerTx.Starknet + executeHash.transaction_hash}`);
                this.logger.info(`${this.moduleString} - Waiting for tx status...`);

                let res; let flag;

                while (true) {
                    try {
                        res = await this.provider.getTransactionReceipt(executeHash.transaction_hash);
                        if (res.status === 'ACCEPTED_ON_L2' && res.finality_status === 'ACCEPTED_ON_L2' && res.execution_status === 'SUCCEEDED') {
                            flag = 1;
                            break;
                        } else if (res.status === 'REJECTED' || res.execution_status === 'REJECTED') {
                            flag = 0;
                            break;
                        } else if (res.status === 'REVERTED' || res.execution_status === 'REVERTED') {
                            flag = -1
                            break;
                        }
                    } catch (error) {
                        this.logger.info('An error occurred while getting txn status.');
                    }

                    await new Promise(resolve => setTimeout(resolve, 2 * 1000));
                }

                if (flag === 1) {
                    nonce = await account.getNonce();
                    nonce = parseInt(nonce, 16);
                    if (nonce === nonceCash) {
                        this.logger.info(`${this.moduleString} - Transaction success, but nonce still low | Nonce ${nonce}`);
                        for (let i = 0; i < 90; i++) {
                            await new Promise(resolve => setTimeout(resolve, 2 * 1000));
                            nonce = await account.getNonce();
                            nonce = parseInt(nonce, 16);
                            if (nonce > nonceCash) {
                                this.logger.info(`\x1b[32m${this.moduleString} - The transaction is fully confirmed in the blockchain | Nonce ${nonce}\x1b[0m`);
                                 await new Promise(resolve => setTimeout(resolve, 20 * 1000));
                                return;
                            }
                        }
                    } else if (nonce > nonceCash) {
                        await new Promise(resolve => setTimeout(resolve, 20 * 1000));
                        this.logger.info(`\x1b[32m${this.moduleString} - The transaction is fully confirmed in the blockchain | Nonce ${nonce}\x1b[0m`);
                    }
                } else if (flag === 0) {
                    this.logger.error(`${this.moduleString} - Transaction rejected.`);
                    throw new Error(`${this.moduleString} - Transaction rejected.`)
                } else if (flag === -1) {
                    this.logger.error(`${this.moduleString} - Transaction Reverted`);
                    throw new Error(`${this.moduleString} - Transaction rejected.`)
                } else {
                    this.logger.error(`${this.moduleString} - An error occurred in transaction.`);
                    throw new Error(`${this.moduleString} - Transaction rejected.`)
                }

            } catch (error) {
                this.logger.error(`\x1b[31m${this.moduleString} - An error occurred txPayload error: ${error}\x1b[0m`);
                throw new Error(`${this.moduleString} - Transaction rejected error.`)
            }
        }, General.attemptsStarkModules);
    }


    async retryOnFail(func, maxAttempts) {
        let attempts = 0;
        while (attempts < maxAttempts) {
            try {
                return await func();
            } catch (error) {
                this.logger.error(`${this.moduleString} - Attempt ${attempts + 1} failed with error: ${error}. Retrying...`);
                attempts++;
                await new Promise(resolve => setTimeout(resolve, 60 * 1000))
                await this.helpersFunction.setupExactDealay(General.delayBeforeNextRetry,this.moduleString,this.logger)
                if (attempts >= maxAttempts) {
                    break
                }
            }
        }
    }
}
