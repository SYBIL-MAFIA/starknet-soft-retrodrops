export class General{

  static walletName = 'Argent_X' // Braavos | Argent_X

  static shuffle = true
  static threads_counter = 1
  static swapNonZeroTokens = false

  // если баланс какого-то токена, будет меньше, то в свапах он использоваться не будет
  static usdcBalance = 7
  static usdtBalance = 100
  static ethBalance = 0.004
  static wbtcBalance = 100
  static daiBalance = 100

}

export class Modules {
  static module = ['_10KSwap','JediSwap','SithSwap','MySwap']
  //   ['_10KSwap','JediSwap','SithSwap','MySwap']
}

export class OKX {

  static withdrawalFromOkxToWallet = false
  static amountToWithdrawal = [0.007, 0.007]
  static withdrawalToNetwork = 'Arbitrum One' // 'Arbitrum One'

  static withdrawalFromWalletToOkx = false
  static amountToSaveOnWallet = [0.0008, 0.0008]
  static withdrawalFromNetwork = 'StarkNet' // 'Arbitrum One'

  static delay = [1, 2];

  static withdraw_fees = [0.0001, 0.0002];  // не рекомендуется менять
}

export class OKXAuth {
    static use_okx_proxy = false;  // use proxy | true || false |
    static okx_proxy = '';  // proxy url | http://login:password@ip:port |
    static okx_apiKey = '';
    static okx_apiSecret = '';
    static okx_apiPassword = '';
}



export class Bridge {
  
  static useBridging = false // хотим ли мы вообще использовать мосты
  static useBridgeToStark = false // если мы хотим использовать мосты, то хотим ли мы использовать мост, чтобы депнуть в сеть старка
  static useBridgeFromStark = false // если мы хотим использовать мосты, то хотим ли мы использовать мост, чтобы вывести деньги из старка
  static useOrbiterBridge = false // используем ли мы orbiter мост, чтобы бриджануть в/из старка
  static delay = [10,15]

  static swapAllBalanceToStark = false // включив этот параметр, для моста Orbiter, будем переводиться максимальная сумма доступная для бриджа
  static  amountToBridgeToStark = [0.001,0.002] // минимум 0.005
  
  static swapAllBalanceFromStark = false // включив этот параметр, для моста Orbiter, будем переводиться максимальная сумма доступная для бриджа
  static  amountToBridgeFromStark = [0.001,0.002] // минимум 0.005
}



export class _10KSwap {
  static swapAllBalance = true;

  static swapModule = true
  static addLP = true
  static burnLP = true

  static counterTx = [4, 4];
  static percentToSwap = [5,5];
  static delay = [1, 2];

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
  static delay = [1, 2];

  static percentToSwapETH = [10, 15];

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
  static delay = [1, 2];

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
  static delay = [1, 2];

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