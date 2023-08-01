import { chainContract } from '../../../utils/other.js';
import { CallData } from 'starknet';

export default class addLPCallData {
    constructor(SrcContract, DstContract, amount, minAmountValue,address,moduleName){

        this.SrcContract = SrcContract;
        this.DstContract = DstContract
        this.amount = amount
        this.minAmountValue = minAmountValue
        this.address = address
        this.moduleName = moduleName
        const Timestamp = Math.floor(Date.now() / 1000);
        this.deadline = Timestamp + (60 * 60)

    }

    execute(){

        return {
            contractAddress: chainContract.Starknet[this.moduleName].Router,
            entrypoint: this.callEntryPoint(),
            calldata: CallData.compile(this.callData())
        }
    }

    callEntryPoint(){
        switch(this.moduleName){
            case "JediSwap":
            case "MySwap":
                return "add_liquidity"
            case "_10KSwap":
            case "SithSwap":
                return "addLiquidity"
        }
    }

    callData(){
        switch (this.moduleName){
            case "JediSwap":
                return this.defaultCallData()
            case "_10KSwap":
                return this.defaultCallData()
            case "SithSwap":
                return this.SithSwapCallData()
            case "MySwap":
                return this.mySwapCallData()
        }
    }

    defaultCallData(){

        return {

            tokenA: this.SrcContract,
            tokenB: this.DstContract,
            amountADesired: {low: this.amount, high: 0n},
            amountBDesired: {low: this.minAmountValue.maxDstAmount, high: 0n},
            amountAMin: {low: this.minAmountValue.minSrcAmount, high: 0n},
            amountBMin: {low: this.minAmountValue.minDstAmount, high: 0n},
            to: this.address,
            deadline: this.deadline

        }
    }

    mySwapCallData(){

        return {
            a_address: this.SrcContract,
            a_amount: {low: this.amount, high: 0n},
            a_min_amount: {low: this.minAmountValue.minSrcAmount, high: 0n},
            b_address: this.DstContract,
            b_amount: {low: this.minAmountValue.maxDstAmount, high: 0n},
            b_min_amount: {low: this.minAmountValue.minDstAmount, high: 0n},
        }
    }

    SithSwapCallData(){

        return {
            token_a: this.SrcContract,
            token_b: this.DstContract,
            stable: '1',
            amount_a_desired: {low: this.amount, high: 0n},
            amount_b_desired: {low: this.minAmountValue.maxDstAmount, high: 0n},
            amount_a_min: {low: this.minAmountValue.minSrcAmount, high: 0n},
            amount_b_min: {low: this.minAmountValue.minDstAmount, high: 0n},
            to: this.address,
            deadline: this.deadline
        }
    }


}