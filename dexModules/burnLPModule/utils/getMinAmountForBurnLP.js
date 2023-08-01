import { Contract } from 'starknet';
import { chainContract } from '../../../utils/other.js';
import { poolTokens } from '../../../utils/other.js';

export default class getMinAmountForBurnLP{
    constructor(src,dst,moduleName,lPBalance,abies,contract,provider,pool_id){

        this.src = src 
        this.dst = dst 
        this.moduleName = moduleName
        this.lPBalance = lPBalance
        this.abies = abies
        this.provider  = provider
        this.pool_id = pool_id
    }

    async execute(){
        return await this.callMinAmountBurnLP()
    }

    async callMinAmountBurnLP(){

        switch(this.moduleName){
            
            case "JediSwap":
                return await this.defaultBurnLP()
            case "_10KSwap":
                return await this.defaultBurnLP()
            case "SithSwap":
                return await this.SithSwapBurnLP()
            case "MySwap":
                return await this.MySwapCallBurnLP()
    }
}

    async defaultBurnLP(){

        const slippage = BigInt(25);
        const divider = BigInt(1000);
    
        const [reserveSrc, reserveDst, contractAddress,totalSupply] = await this.callGetReservesForBurnLP();

        const maxSrcAmount = (BigInt(this.lPBalance) * reserveSrc) / totalSupply;


        const minSrcAmount = (maxSrcAmount - ((maxSrcAmount * slippage) / divider));


        const maxDstAmount = (BigInt(this.lPBalance) * reserveDst) / totalSupply;


        const minDstAmount = (maxDstAmount - ((maxDstAmount * slippage)) / divider);


        return {minSrcAmount, minDstAmount, contractAddress};
    }

    async MySwapCallBurnLP(){
        const key1 = `${this.src}${this.dst}`;
        
        const contractAddress = chainContract.Starknet.MySwap[key1];
        
        const contract = new Contract(this.abies.mainAbi, chainContract.Starknet.MySwapRouter, this.provider);
    
        const pool = await contract.get_pool(this.pool_id);
        if (!pool) {
            throw new Error("Pool object is undefined.");
        }

        const poolTokensForCurrentPool = poolTokens.MySwap[this.pool_id];
        let poolSrc, poolDst;

        if (this.src === poolTokensForCurrentPool.token_a) {
            poolSrc = pool.pool.token_a_reserves.low;
            poolDst = pool.pool.token_b_reserves.low;
        } else {
            poolSrc = pool.pool.token_b_reserves.low;
            poolDst = pool.pool.token_a_reserves.low;
        }
        

        const slippage = BigInt(5); 
        const divider = BigInt(100);

        const NewContract = new Contract(this.abies.tokensAbi,contractAddress,this.provider)

        const totalSupplyLP = await NewContract.totalSupply();
        const totalSupply = totalSupplyLP.totalSupply.low;

        const maxSrcAmount = (BigInt(this.lPBalance) * poolSrc) / totalSupply;
        const minSrcAmount = (maxSrcAmount - ((maxSrcAmount * slippage) / divider));
        const maxDstAmount = (BigInt(this.lPBalance) * poolDst) / totalSupply;
        const minDstAmount = (maxDstAmount - ((maxDstAmount * slippage)) / divider);

        
        return {minSrcAmount, minDstAmount, contractAddress}

    }

    async SithSwapBurnLP(){

        const contractAddress = chainContract.Starknet.SithSwap.Router;

        const contract = new Contract(this.abies.mainAbi, contractAddress, this.provider)

        const LPAmount = { low: BigInt(this.lPBalance), high: 0n };
        const amounts = await contract.quoteRemoveLiquidity(chainContract.Starknet[this.src], chainContract.Starknet[this.dst], 1, LPAmount);

        const minSrcAmount = amounts.amount_a.low;
        const minDstAmount = amounts.amount_b.low;

        return {minSrcAmount, minDstAmount, contractAddress}
    }

    async callGetReservesForBurnLP(){
        switch (this.moduleName){
            case "JediSwap":
                return await this.getReserves()
            case "_10KSwap":
                return await this._10KSwapGetReserves()
            case "Protoss":
                return await this._10KSwapGetReserves()
            case "StarEx":
                return await this._10KSwapGetReserves()

        }
    }

    async getReserves(){

        const key1 = `${this.src}${this.dst}`;
    
        const contractAddress = chainContract.Starknet[this.moduleName][key1];
    
        if (!contractAddress) {
            throw new Error(`Invalid src-dst pair: ${this.src}-${this.dst}`);
        }
        
        
        const contract = new Contract(this.abies.reserveAbi, contractAddress, this.provider);
    
        const reserves = await contract.get_reserves();
    
        const reserveSrc = reserves.reserve0.low;
        const reserveDst = reserves.reserve1.low;
        const totalSupplyLP = await contract.totalSupply()
        const totalSupply = totalSupplyLP.totalSupply.low
    
        return [reserveSrc, reserveDst, contractAddress,totalSupply];
    }

    async _10KSwapGetReserves(){
        const key1 = `${this.src}${this.dst}`;
        const contractAddress = chainContract.Starknet[this.moduleName][key1];

        if (!contractAddress) {
            throw new Error(`Invalid src-dst pair: ${this.src}-${this.dst}`);
        }

        const contract = new Contract(this.abies.reserveAbi, contractAddress, this.provider);

        const reserves = await contract.getReserves();

        const reserveSrc = reserves.reserve0;
        const reserveDst = reserves.reserve1;

        const totalSupplyLP = await contract.totalSupply()
        const totalSupply = totalSupplyLP.totalSupply.low
    
        return [reserveSrc, reserveDst, contractAddress,totalSupply];
    }
}