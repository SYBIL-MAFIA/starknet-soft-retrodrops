import {chainContract} from './other.js';
import {CallData} from 'starknet';

export default class CallApprove {
    constructor(SrcContract, dstContract, amount, moduleName) {
      this.SrcContract = SrcContract;
      this.amount = amount;
      this.moduleName = moduleName;
    }
  
    execute() {
        return {
            contractAddress: this.SrcContract,
            entrypoint: "approve",
            calldata: CallData.compile({
                spender: chainContract.Starknet[this.moduleName].Router,
                amount: {low: this.amount, high: '0'}
            })
        }
    }
  }