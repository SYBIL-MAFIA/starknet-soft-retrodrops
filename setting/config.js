export const StarknetNode = 'https://starknet-mainnet.public.blastapi.io'
export const ERC20Node = 'https://rpc.ankr.com/eth'
export class General {

  static walletName = 'Argent_X' // Braavos | Argent_X
  static usePrivateKeys = false // если включен, то нужно загружать приватники, а не сид фразы
  static shuffle = false
  static slippage = 0.5
  static threads_counter = 1
  static attemptsStarkModules = 3 // количество повторов если транзакция не пройдет
  static swapNonZeroTokens = false
  static DELAY = [5,5] // общая задержка, которая будет использоваться во всех модулях, если что, можно настроить задержку в каждом модуле отдельно
  static delayBeforeNextRetry = General.DELAY
  static UseProxy = true
  static isFirstSwap = true // при true первый свап всегда будет из ETH в какой-то токен
/*
если не хотите минтить нфт нужно ставить 0
если хотите минтить нфт, до нужно ставить диапозон [от скольки,до скольки] - например [1,5]
 */
  static StarkVerseNFTToBuy = 0 // сколько нфт купить https://starkverse.art/ дешевые транзакции за 0.2$
  static StarkNerIDNFTToBuy = [3,4] // сколько нфт купить https://app.starknet.id/identities, дешевые транзакции

  static maxGwei = 22 // гвей для перевода из EVM сетей в Starknet
  static maxStarknetFee = 0.0006 // максимальная цена транзакции для ЛЮБОЙ транзакции в сети Starknet

  // если баланс какого-то токена, будет меньше, то в свапах он использоваться не будет
  static usdcBalance = 0
  static usdtBalance = 0
  static ethBalance = 0
  static wbtcBalance = 0
  static daiBalance = 0

}

export class Modules {
  static module = ['Dmail','StarkVerse','StarkNetId']
  //   ['_10KSwap','JediSwap','SithSwap','MySwap','Dmail','StarkVerse','StarkNetId']
}

export class OKX {

  static withdrawalFromOkxToWallet = false
  static amountToWithdrawal = [0.007, 0.007]
  static withdrawalToNetwork = 'Arbitrum One' // 'StarkNet'

  static withdrawalFromWalletToOkx = false
  static amountToSaveOnWallet = [0.0008, 0.0008]
  static withdrawalFromNetwork = 'StarkNet' // 'Arbitrum One'

  static delay = General.DELAY

  static withdraw_fees = [0.0001, 0.0002];  // не рекомендуется менять
}

export class OKXAuth {
    static use_okx_proxy = false;  // use proxy | true || false |
    static okx_proxy = '';  // proxy url | http://login:password@ip:port |
    static okx_apiKey = '';
    static okx_apiSecret = '';
    static okx_apiPassword = '';
}


export class Dmail{

  static counterTx = [1, 1] // количество транзакций
  static delay = General.DELAY
  static worldsCount = [1, 2] // количество слов в письме, больше двух не рекомендуется
}


export class Bridge {
  
  static useBridging = false // хотим ли мы вообще использовать мосты
  static useBridgeToStark = false // если мы хотим использовать мосты, то хотим ли мы использовать мост, чтобы депнуть в сеть старка
  static useBridgeFromStark = false // если мы хотим использовать мосты, то хотим ли мы использовать мост, чтобы вывести деньги из старка
  static useOrbiterBridge = false // используем ли мы orbiter мост, чтобы бриджануть в/из старка
  static delay = General.DELAY

  static swapAllBalanceToStark = false // включив этот параметр, для моста Orbiter, будем переводиться максимальная сумма доступная для бриджа
  static  amountToBridgeToStark = [0.001,0.002] // минимум 0.005
  
  static swapAllBalanceFromStark = true // включив этот параметр, для моста Orbiter, будем переводиться максимальная сумма доступная для бриджа
  static  amountToBridgeFromStark = [0.001,0.002] // минимум 0.005
  static amountToSaveOnWalletStark = [0,0] // хотим ли мы оставить ETH в сети старкнет, перед выводом на окекс, если оставлять не нужно, то пишем [0,0]
}



export class _10KSwap {
  static swapAllBalance = true;

  static swapModule = true
  static addLP = true
  static burnLP = true

  static counterTx = [4, 4];
  static percentToSwap = [5,5];
  static delay =General.DELAY

  static percentToSwapETH = [10, 15];

  static poolsForAddLP = ['ETH/USDC','ETH/USDT']
  static poolsForBurnLP = ['ETH/USDC','ETH/USDT']
  static persentToAddLP = [5,5]
}

export class JediSwap {
  static swapAllBalance = true;

  static swapModule = true
  static addLP = true
  static burnLP = true

  static counterTx = [2, 2];
  static percentToSwap = [10, 15];
  static delay = General.DELAY;

  static percentToSwapETH = [90, 90];

  static poolsForAddLP = ['ETH/USDC','ETH/USDT']
  static poolsForBurnLP = ['ETH/USDC','ETH/USDT']
  static persentToAddLP = [5,5]
}

export class SithSwap {
  static swapAllBalance = true;

  static swapModule = true
  static addLP = true
  static burnLP = true

  static counterTx = [1, 2];
  static percentToSwap = [10, 15];
  static delay = General.DELAY

  static percentToSwapETH = [10, 15];

  static poolsForAddLP = ['ETH/USDC','ETH/USDT']
  static poolsForBurnLP = ['ETH/USDC','ETH/USDT']
  static persentToAddLP = [5,5]
}


export class MySwap {
  
  static swapAllBalance = true;

  static swapModule = true
  static addLP = true
  static burnLP = true

  static counterTx = [1, 2];
  static percentToSwap = [10, 15];
  static delay = General.DELAY

  static percentToSwapETH = [10, 15];

  static poolsForAddLP = ['ETH/USDC','ETH/USDT']
  static poolsForBurnLP = ['ETH/USDC']
  static persentToAddLP = [5,5]
}

export class ProviderMapping { 
  static provider = {
      'Arbitrum One': 'https://arb1.arbitrum.io/rpc',
      'StarkNet': 'https://starknet-mainnet.public.blastapi.io'
  }
}