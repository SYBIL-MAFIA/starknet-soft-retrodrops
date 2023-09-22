import { chainContract } from '../../../utils/other.js';
import { CallData } from 'starknet';

export default class callSwapData {
    constructor(SrcContract, DstContract, amount, minAmount, moduleName,address,pool_id) {
        this.SrcContract = SrcContract;
        this.DstContract = DstContract
        this.amount = amount;
        this.minAmount  = minAmount
        this.moduleName = moduleName;
        this.address = address
        const Timestamp = Math.floor(Date.now() / 1000);
        this.deadline = Timestamp + (60 * 60)
        this.pool_id = pool_id
    }
  
    execute() {
        return {
            contractAddress: chainContract.Starknet[this.moduleName].Router,
            entrypoint: this.callEntryPoint(),
            calldata: CallData.compile(this.callData())
        }
    }

    callEntryPoint(){
        switch(this.moduleName){
            case "JediSwap":
                return "swap_exact_tokens_for_tokens"
            case "MySwap":
                return "swap"
            case "_10KSwap":
                return "swapExactTokensForTokens"
            case "SithSwap":
                return "swapExactTokensForTokens"
            

        }
    }

    callData(){
        switch (this.moduleName){
            case "JediSwap":
                return this.DefaultSwapCallData()
            case "_10KSwap":
                return this.DefaultSwapCallData()
            case "SithSwap":
                return this.SithSwapCallData()
            case "MySwap":
                return this.MySwapCallData()
        }
    }


    DefaultSwapCallData(){
        return {
            amountIn: {low: this.amount, high: '0'},
            amountOutMin: {low: this.minAmount, high: '0'},
            path: [
                this.SrcContract,
                this.DstContract
            ],
            to: this.address,
            deadline: this.deadline
        }
    }

    SithSwapCallData(){

        return {
            amountIn: {low: this.amount, high: '0'},
            amountOutMin: {low: this.minAmount, high: '0'},
            routes: [{from_address: this.SrcContract, to_address: this.DstContract, stable: 0}],
            to: this.address,
            deadline: this.deadline
        }
    }

    MySwapCallData(){

        return {
            pool_id: this.pool_id,
            token_from_addr: this.SrcContract,
            amount_from: {low: this.amount, high: '0'},
            amount_to_min: {low: this.minAmount, high: '0'},
        }
    }

  }