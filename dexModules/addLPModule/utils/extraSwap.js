import { Contract } from 'starknet';
import { chainContract } from '../../../utils/other.js';
import minAmount from '../../../utils/calculateMinAmount.js'
import ConfirmTx from '../../../utils/txPayload.js'
import MakeSwap from '../../swapModule/utils/makeSwap.js';

export default class extraSwap {

    constructor(srcBalance, dstBalance, src, dst, minAmountValue, moduleName, abies, pool_id, address, account, provider, logger, moduleString) {

        this.dstBalance = dstBalance
        this.src = src 
        this.dst = dst 
        this.minAmountValue = minAmountValue
        this.moduleName = moduleName
        this.abies = abies
        this.pool_id = pool_id
        this.address = address
        this.account = account
        this.provider = provider 
        this.abies = abies
        this.logger = logger
        this.moduleString  = moduleString
    }

    async execute(){
        const contract = new Contract(this.abies.mainAbi, chainContract.Starknet[this.moduleName].Router, this.provider);
    
        if (this.minAmountValue.maxDstAmount > this.dstBalance){
            
            this.logger.info(`${this.moduleString} - Not enough ${this.dst} to add to the LP, need more ${ Number((BigInt(this.minAmountValue.maxDstAmount) - BigInt(this.dstBalance)))/(10**6)}`)

            const tempDstValue = BigInt(this.minAmountValue.maxDstAmount) - BigInt(this.dstBalance)
            const newMinAmountValue =  new minAmount(this.src,this.dst,this.moduleName,this.pool_id,this.abies)

            const [reserveSrc, reserveDst]  = await newMinAmountValue.callGetReserves(this.abies)
            
            
            const maxSrcAmount = await newMinAmountValue.callMaxDstAmount(contract,tempDstValue,reserveSrc,reserveDst)
            this.logger.info(`${this.moduleString}[extraSwap] - Staring new swap for ${Number(maxSrcAmount)/(10**18)} ${this.src}`)
            const txPayload  = await new MakeSwap(maxSrcAmount,this.src,this.dst,this.pool_id,this.moduleName,this.address,this.provider,this.account).execute()
            await new ConfirmTx(txPayload,this.account,this.provider,this.logger,`${this.moduleString}[extraSwap]`).execute()
        }
    }
}