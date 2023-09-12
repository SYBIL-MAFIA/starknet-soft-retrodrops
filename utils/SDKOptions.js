import { Account, RpcProvider } from 'starknet';
import { rpc } from './other.js';
import helpersFunctions from './helpersClass.js';

export default class SDKOptions {

    constructor() {
        this.provider = null;
        this.address = null;
        this.account = null;
        this.helpersFunctions = new helpersFunctions()
        
    }

    async execute(privateKeyStarknet) {

        this.provider = new RpcProvider({ nodeUrl: rpc.Starknet });

        this.address = await this.helpersFunctions.getStarknetAddress(privateKeyStarknet)
        
        this.account = new Account(this.provider, this.address, privateKeyStarknet, '1');
        
    }

  
}
