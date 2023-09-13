import { Account, RpcProvider } from 'starknet';
import { General } from '../setting/config.js';
import { rpc } from './other.js';
import helpersFunctions from './helpersClass.js';

export default class SDKOptions {

    constructor() {
        this.provider = null;
        this.address = null;
        this.account = null;
        this.cairoVersion = null;
        this.helpersFunctions = new helpersFunctions()
    };

    async execute(privateKeyStarknet) {

        this.provider = new RpcProvider({ nodeUrl: rpc.Starknet });

        this.address = await this.helpersFunctions.getStarknetAddress(privateKeyStarknet);

        if (General.walletName === 'Braavos') {
            this.account = new Account(this.provider, this.address, privateKeyStarknet, '0');
        } else {
            try {
                this.cairoVersion = await this.helpersFunctions.checkVersion(this.provider, this.address);
            } catch (error) {
                this.address = await this.helpersFunctions.getArgentXWalletNew(privateKeyStarknet);
                this.cairoVersion = await this.helpersFunctions.checkVersion(this.provider, this.address);
            }
            this.account = new Account(this.provider, this.address, privateKeyStarknet, this.cairoVersion);
        }
    };
}
