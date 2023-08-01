import {chainContract} from "../../../utils/other.js"
import {CallData} from 'starknet';

export default class burnLPCallData {

    constructor(src,dst,moduleName,address,fromBalance,minSrcAmount,minDstAmount,pool_id){
        this.src = src
        
        this.dst = dst
        
        this.moduleName = moduleName
        
        this.address = address
        
        this.fromBalance = fromBalance
        
        this.minSrcAmount = minSrcAmount
        
        this.minDstAmount = minDstAmount
        
        const Timestamp = Math.floor(Date.now() / 1000);
        this.deadline = Timestamp + (60 * 60)
        
        this.pool_id = pool_id
        

    }

    execute(){
        return {
            contractAddress: chainContract.Starknet[this.moduleName].Router,
            entrypoint: this.callEntryPoint(),
            calldata: CallData.compile(this.callData())
        }
    }

    callEntryPoint(){
        switch (this.moduleName){
            case "JediSwap":
                return 'remove_liquidity'
            case "MySwap":
                return 'withdraw_liquidity'
            case "_10KSwap":
                return 'removeLiquidity'
            case "SithSwap":
                return 'removeLiquidity'
            case "Protoss":
                return 'removeLiquidity'
            case "StarEx":
                return 'removeLiquidity'

        }
    }

    callData(){
        switch (this.moduleName){
            case "JediSwap":
                return this.defaultCallData()
            case "MySwap":
                return this.MySwapCallData()
            case "_10KSwap":
                return this.defaultCallData()
            case "SithSwap":
                return this.SithSwapCallData()
            case "Protoss":
                return this.defaultCallData()
            case "StarEx":
                return this.defaultCallData()

        }
    }

    defaultCallData(){
        return {

            tokenA: chainContract.Starknet[this.src],
            tokenB: chainContract.Starknet[this.dst],
            liquidity: {low: this.fromBalance, high: 0n},
            amountAMin: {low: this.minSrcAmount, high: 0n},
            amountBMin: {low: this.minDstAmount, high: 0n},
            to: this.address,
            deadline: this.deadline

        }
    }

    MySwapCallData(){

        return {

            pool_id: this.pool_id,
            shares_amount: {low: this.fromBalance, high: '0'},
            amount_min_a: {low: this.minSrcAmount, high: '0'},
            amount_min_b: {low: this.minDstAmount, high: '0'},

        }
    }

    SithSwapCallData(){

        return {
            token_a: chainContract.Starknet[this.src],
            token_b: chainContract.Starknet[this.dst],
            stable: 1,
            liquidity: {low: this.fromBalance, high: 0n},
            amountAMin: {low: this.minSrcAmount, high: 0n},
            amountBMin: {low: this.minDstAmount, high: 0n},
            to: this.address,
            deadline: this.deadline
        }
    }
}