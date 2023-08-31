import { General } from "../setting/config.js";
import ModuleConfig from '../utils/getCfgSetting.js'; 

import SwapModuleClass from './swapModule/SwapModule.js';
import addLPMoudule from './addLPModule/addLPModule.js'
import burnLP from "./burnLPModule/burnLP.js";
import DmailClass from "./Dmail/indexDmail.js";
import StarkVerse from "./NFT/StarkVerseMint.js";
import StarkNetIdClass from "./NFT/StarkNetId.js";

export default class ModuleManager {
    constructor(modules) {
        this.modules = modules;
        this.SwapModuleClass = new SwapModuleClass(); 
        this.addLPMoudule = new addLPMoudule()
        this.burnLP = new burnLP();
        this.dmail = new DmailClass()
        this.starkVerse = new StarkVerse()
        this.starknetID = new StarkNetIdClass()
    }

    async startModules(privateKey,logger,accountIndex) {
        const activeModules = General.shuffle ? this.shuffleModules(this.modules) : this.modules;
        let isFirstSwap = General.isFirstSwap
        for (const moduleName of activeModules) {
            logger.info(`[Account ${accountIndex}][${moduleName}] - Star working with module ${moduleName}`)
            await this.runModule(privateKey, moduleName,logger,accountIndex,isFirstSwap);
            isFirstSwap = false
        }
    }

    shuffleModules(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    async runModule(privateKey, moduleName,logger,accountIndex,isFirstSwap) {
        let config
        let moduleConfig
        if ( (moduleName !== 'Dmail') && (moduleName !== 'StarkVerse') && (moduleName !== 'StarkNetId')){

             moduleConfig = new ModuleConfig(moduleName, "MAIN");
             config = moduleConfig.getConfig();
            if (config.swapModule === true && config.swapModule !== undefined) {
                await this.SwapModuleClass.execute(privateKey, moduleName,logger,accountIndex,isFirstSwap);
            }

            if (config.addLP === true && config.addLP !== undefined) {
                await this.addLPMoudule.execute(privateKey,moduleName,logger,accountIndex)
            }

            if (config.burnLP === true && config.burnLP !== undefined) {
                await this.burnLP.execute(privateKey,moduleName,logger,accountIndex)
            }

        } else {
            if (moduleName === 'Dmail'){
                await this.dmail.execute(logger,accountIndex,privateKey)
            }

            if ((moduleName === 'StarkVerse') && (General.StarkVerseNFTToBuy !== 0)){
                await this.starkVerse.execute(privateKey,logger,accountIndex)
            }

            if ((moduleName === 'StarkNetId') && (General.StarkNerIDNFTToBuy !== 0)){
                await this.starknetID.execute(privateKey,logger,accountIndex)
            }
        }


        

    }
}
