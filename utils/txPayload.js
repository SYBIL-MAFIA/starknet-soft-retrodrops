import { explorerTx } from './other.js';


export default class txConfirmation {
    constructor (txPayload, account, provider, logger, moduleString) {
        this.txPayload = txPayload
        this.account = account
        this.provider = provider
        this.logger = logger
        this.moduleString = moduleString
    }

    async execute() {

        try {
            let nonceCash
            try {
                nonceCash = await this.account.getNonce()
            } catch (e) {
                nonceCash = 0
            }

            const executeHash = await this.account.execute(this.txPayload);
            this.logger.info(`${this.moduleString} - Send TX: ${explorerTx.Starknet + executeHash.transaction_hash}`);
            this.logger.info(`${this.moduleString} - Waiting for tx status... `)
            let res;

            try {
                res = await this.provider.waitForTransaction(executeHash.transaction_hash, { retryInterval: 1500 });
            } catch (error) {
                res = false
            }

            if (res.status === 'ACCEPTED_ON_L2') {
                this.logger.info(`${ this.moduleString } - Transaction success, but nonce still low | Nonce ${ nonceCash }`);
                let currentNonce = await this.account.getNonce()
                let checker = 0;
                while (checker < 15) {
                    await new Promise(resolve => setTimeout(resolve, 10 * 1000));
                    if (currentNonce > nonceCash) {
                        this.logger.info(`\x1b[32m${this.moduleString} - The transaction is fully confirmed in the blockchain | Nonce ${currentNonce}\x1b[0m`);
                        return;
                    } else {
                        this.logger.info(`${this.moduleString} - Nonce is still low, waiting for 10sec... | Nonce ${currentNonce}` )
                        currentNonce = await this.account.getNonce()
                        checker = checker + 1
                    }
                }
            } else if (!res) {
                this.logger.info(`\x1b[31m${ this.moduleString } - Transaction rejected.\x1b[0m`);
                await new Promise(resolve => setTimeout(resolve, 5 * 1000));
            }
        } catch (e) {
            this.logger.info(e)
        }
    }
}