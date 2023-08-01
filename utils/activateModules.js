import FromOkxToWallet from "../okx/FromOkxToWallet.js"
import FromWalletToOkx from "../okx/FromWalletToOkx.js"
import { Modules } from "../setting/config.js"
import ModuleManager from "../dexModules/moduleManager.js"
import BridgeToStar from "../bridges/BridgeToStark.js"
import BridgeFromStar from "../bridges/BridgeFromStark.js"

export default class ActivateMainModules{
    constructor(){
        
    }

    async withdrawalFromOkxToWallet(configOKX,configBridge,addressesAndKeys,logger,addressIndex){

        
        if (configOKX.withdrawalFromOkxToWallet === true && configOKX.withdrawalFromOkxToWallet !== undefined){
            
            const depositFromOkx = new FromOkxToWallet(configOKX,configBridge,addressesAndKeys,logger,addressIndex)
            await depositFromOkx.execute()
        }
    }

    async BridgeToStark(configBridge, addressesAndKeys, logger,addressIndex){
        if (configBridge.useBridgeToStark === true && configBridge.useBridgeToStark !== undefined && configBridge.useBridging === true){
            const bridgeToStark = new BridgeToStar(configBridge, addressesAndKeys, logger,addressIndex);
            await bridgeToStark.execute();
        }
    }
    
    async BridgeFromStark(configBridge, addressesAndKeys, logger,addressIndex){

        if (configBridge.useBridgeFromStark === true && configBridge.useBridgeFromStark !== undefined && configBridge.useBridging === true){
            const bridgeFromStark = new BridgeFromStar(configBridge, addressesAndKeys, logger,addressIndex);
            await bridgeFromStark.execute();
        }
    }
    
    async withdrawalFromWalletToOkx(configOKX,configBridge,addressesAndKeys,logger,okecx,addressIndex,StarknetOkx){
        
        if (configOKX.withdrawalFromWalletToOkx === true && configOKX.withdrawalFromWalletToOkx !== undefined) {
            const FromWalletToOkxClass = new FromWalletToOkx(configOKX,configBridge, addressesAndKeys , logger, okecx,addressIndex,StarknetOkx);
            await FromWalletToOkxClass.execute();
        }
    }

    async startDexModules(privateKey,logger,accountIndex){
        const moduleManager = new ModuleManager(Modules.module);
        await moduleManager.startModules(privateKey,logger,accountIndex);
    }


}