import CallApprove from "../../../utils/ApproveCallData.js"
import callSwapData from "./SwapCallData.js"
import minAmount from "../../../utils/calculateMinAmount.js"
import { chainContract } from "../../../utils/other.js"
import helpersFunctions from "../../../utils/helpersClass.js"

export default class MakeSwap{

    constructor(amount,src,dst,pool_id,moduleName,address,provider,account){
        this.amount = amount 
        this.src = src
        this.srcContract = chainContract.Starknet[this.src]

        this.dst = dst
        this.dstContract = chainContract.Starknet[this.dst]

        this.address = address
        this.provider = provider
        this.account = account
        this.pool_id = pool_id
        
        this.moduleName = moduleName
        this.helpersFunctions = new helpersFunctions()
    }

    async execute(){

        const abies = this.helpersFunctions.callAbi(this.moduleName)        

        const minAmountValue = await new minAmount(
            this.src,
            this.dst,
            this.moduleName,
            this.pool_id,
            abies
        ).execute(this.amount)
        
        const approveData = new CallApprove(this.srcContract,this.dstContract,this.amount,this.moduleName).execute()

        const swapCallData = new callSwapData(chainContract.Starknet[this.src],chainContract.Starknet[this.dst],this.amount,minAmountValue.minDstAmount,this.moduleName,this.address,this.pool_id).execute()
        // console.log(txPayload)
        return [
            approveData,
            swapCallData
        ]
        
    }
}