import { chainContract, poolIds,SrcDstTokens } from '../../../utils/other.js';

export default class SetupTokens {
    constructor(address, swapAllBalance, isFirstSwap, moduleName,balances,percentToSwap,percentToSwapETH) {
        this.address = address;
        this.swapAllBalance = swapAllBalance;
        this.isFirstSwap = isFirstSwap;
        this.moduleName = moduleName;
        this.balances = balances
        this.percentToSwap = percentToSwap
        this.percentToSwapETH = percentToSwapETH
    }

    async execute() {
        
        try {

            let TokensForSwapData = await this.selectTokensForSwap( this.balances, this.isFirstSwap,this.moduleName);

            if (this.swapAllBalance) {
                if (TokensForSwapData.src === 'ETH') {
                    let fromAmountPercentage;
                    const [minPercent, maxPercent] = this.percentToSwapETH;
                    fromAmountPercentage = Math.random() * (maxPercent - minPercent) + minPercent;
                    
                    TokensForSwapData.fromBalance = BigInt(
                        Math.floor(Number(TokensForSwapData.fromBalance) * fromAmountPercentage / 100)
                    );
                    return TokensForSwapData;
                } else {
                    return TokensForSwapData;
                }
            } else {
                return await this.amountForPercentage(TokensForSwapData);
            }
        } catch (error) {
            throw error;
        }
    }

    async selectTokensForSwap(balances, isFirstSwap,moduleName) {
        let tokens = SrcDstTokens[moduleName]
        
        let availableTokens;
        if (isFirstSwap) {
            availableTokens = tokens.filter(t => {
                return t.token === 'ETH' && balances[t.token] > t.minBalance;
            });
        } else {
            availableTokens = tokens.filter(t => {
                return t.token !== 'ETH' && balances[t.token] > t.minBalance;
            });
    
            if (availableTokens.length === 0) {
                availableTokens = tokens.filter(t => {
                    return t.token === 'ETH' && balances[t.token] > t.minBalance;
                });
            }
        }
    
        if (availableTokens.length === 0) {
            throw new Error('No tokens with positive balance found.');
        }
        
        const fromTokenObject = availableTokens[Math.floor(Math.random() * availableTokens.length)];
    
        const src = fromTokenObject.token;
        const SrcContract = chainContract.Starknet[fromTokenObject.token];
       
        const dst = fromTokenObject.toTokens[Math.floor(Math.random() * fromTokenObject.toTokens.length)];
        const DstContract = chainContract.Starknet[dst];
    
        let fromBalance = balances[fromTokenObject.token];
        
        let pool_id
        if (moduleName === 'MySwap'){
            pool_id = this.getPoolID(src,dst)
        }
        
        let decimals
        if (src === 'ETH' || src === 'DAI'){decimals = 18}
        if (src === 'USDC' || src === 'USDT'){decimals = 6}
        if (src === 'WBTC'){decimals = 8}
        
        return {fromBalance, SrcContract, DstContract, src, dst,pool_id,decimals};

        
    }

    getPoolID(src,dst){

            const key = `${src}/${dst}`;
            return poolIds[key];
    }

    async amountForPercentage(TokensForSwapData) {

        let fromAmountPercentage
        const [minPercent, maxPercent] = this.percentToSwap;
        fromAmountPercentage = Math.random() * (maxPercent - minPercent) + minPercent;
        TokensForSwapData.fromBalance = Math.round((fromAmountPercentage / 100) * Number(TokensForSwapData.fromBalance));
        return TokensForSwapData
        
    }
}
