import { General } from "../setting/config.js";
import ModuleConfig from '../utils/getCfgSetting.js'; 

import SwapModuleClass from './swapModule/SwapModule.js';
import addLPMoudule from './addLPModule/addLPModule.js'
import burnLP from "./burnLPModule/burnLP.js";

export default class ModuleManager {
    constructor(modules) {
        this.modules = modules;
        this.SwapModuleClass = new SwapModuleClass(); 
        this.addLPMoudule = new addLPMoudule()
        this.burnLP = new burnLP();
    }

    async startModules(privateKey,logger,accountIndex) {
        const activeModules = General.shuffle ? this.shuffleModules(this.modules) : this.modules;
        let isFirstSwap = true
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

        const moduleConfig = new ModuleConfig(moduleName, "MAIN");
        const config = moduleConfig.getConfig();
        
        
        if (config.swapModule === true && config.swapModule !== undefined) {
            await this.SwapModuleClass.execute(privateKey, moduleName,logger,accountIndex,isFirstSwap); 
        }

        if (config.addLP === true && config.addLP !== undefined) {
            await this.addLPMoudule.execute(privateKey,moduleName,logger,accountIndex)
        }

        if (config.burnLP === true && config.burnLP !== undefined) {
            await this.burnLP.execute(privateKey,moduleName,logger,accountIndex)
        }
    }
}
