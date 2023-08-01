import { explorerTx } from "./other.js";

export default class txСonfirmation {
    constructor (txPayload,account,provider,logger,moduleString){
        this.txPayload = txPayload
        this.account = account
        this.provider = provider
        this.logger = logger
        this.moduleString = moduleString
    }

    async execute(){

        try {
            
            const nonceCash = await this.account.getNonce()
            const executeHash = await this.account.execute(this.txPayload);
            this.logger.info(`${this.moduleString} - Send TX: ${explorerTx.Starknet + executeHash.transaction_hash}`);
            this.logger.info(`${this.moduleString} - Waiting for tx status... `)
            const res = await this.provider.waitForTransaction(executeHash.transaction_hash)

            if (res.status === 'ACCEPTED_ON_L2'){

                this.logger.info(`${this.moduleString} - Transaction success, but nonce still low`)
                while(true){

                    let currentNonce = await this.account.getNonce()
                    await new Promise(resolve => setTimeout(resolve, 30 * 1000));

                    if (currentNonce > nonceCash){
                        this.logger.info(`${this.moduleString} - The transaction is fully confirmed in the blockchain`)
                        return
                    }
                    else {
                        this.logger.info(`${this.moduleString} - Nonce is still low, waiting for 30sec...`)
                        await new Promise(resolve => setTimeout(resolve, 15 * 1000));
                    }
                }

            }
            else {
                this.logger.info('error')
            }
        } catch (error){
            this.logger.info(`Error Starknet TX: ${error}`);
        }

    }
}