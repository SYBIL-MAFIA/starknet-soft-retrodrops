import { JediSwap, _10KSwap, SithSwap, MySwap, OKX, Bridge} from '../setting/config.js';

export default class ModuleConfig {
    constructor(moduleName, additionalModule) {
      this.moduleName = moduleName;
      this.additionalModule = additionalModule;
    }

    getConfig() {
        let swapModule, addLP, burnLP, swapAllBalance, counterTx, percentToSwap, delay, percentToSwapETH, poolsForAddLP, persentToAddLP, poolsForBurnLP
    
        switch (this.additionalModule) {
            case 'MAIN':
                ({ swapModule, addLP, burnLP } = eval(this.moduleName));
                return { swapModule, addLP, burnLP };
            case 'SWAP':
                ({ swapAllBalance, counterTx, percentToSwap, delay, percentToSwapETH } = eval(this.moduleName));
                return { swapAllBalance, counterTx, percentToSwap, delay, percentToSwapETH };
            case 'ADDLP':
                ({ poolsForAddLP, persentToAddLP, delay } = eval(this.moduleName));
                return { poolsForAddLP, persentToAddLP, delay };
            case 'BURNLP':
                ({ poolsForBurnLP, delay } = eval(this.moduleName));
                return { poolsForBurnLP,delay };
            default:
                console.log("Unknown moduleName:", this.moduleName);
                return null;
        }
    }

    getConfigOKX(){
        let withdrawalFromOkxToWallet, amountToWithdrawal, withdrawalFromWalletToOkx, amountToSaveOnWallet, delay, use_proxy, proxy, apikey, apisecret, passphrase, withdraw_fee, withdrawalToNetwork, withdrawalFromNetwork
        ({ withdrawalFromOkxToWallet, amountToWithdrawal, withdrawalFromWalletToOkx, amountToSaveOnWallet, delay, use_proxy, proxy,apikey, apisecret, passphrase, withdraw_fee, withdrawalToNetwork, withdrawalFromNetwork } = eval("OKX"));
        return { withdrawalFromOkxToWallet, amountToWithdrawal, withdrawalFromWalletToOkx, amountToSaveOnWallet, delay, use_proxy, proxy, apikey, apisecret, passphrase, withdraw_fee, withdrawalToNetwork, withdrawalFromNetwork }
    }

    getBridgeConfig() {
        let useBridging, useBridgeToStark, useBridgeFromStark, useOrbiterBridge, delay, swapAllBalanceToStark, amountToBridgeToStark, swapAllBalanceFromStark, amountToBridgeFromStark;
        ({
            useBridging,
            useBridgeToStark,
            useBridgeFromStark,
            useOrbiterBridge,
            delay,
            swapAllBalanceToStark, 
            amountToBridgeToStark, 
            swapAllBalanceFromStark, 
            amountToBridgeFromStark
        } = eval('Bridge'));
        return {
            useBridging,
            useBridgeToStark,
            useBridgeFromStark,
            useOrbiterBridge,
            delay,
            swapAllBalanceToStark, 
            amountToBridgeToStark, 
            swapAllBalanceFromStark,
            amountToBridgeFromStark
        };
    }
    
    

}