export const StarkNetIDAbi = [
    {
        "name": "Uint256",
        "size": 2,
        "type": "struct",
        "members": [
            {
                "name": "low",
                "type": "felt",
                "offset": 0
            },
            {
                "name": "high",
                "type": "felt",
                "offset": 1
            }
        ]
    },
    {
        "data": [
            {
                "name": "from_",
                "type": "felt"
            },
            {
                "name": "to",
                "type": "felt"
            },
            {
                "name": "tokenId",
                "type": "Uint256"
            }
        ],
        "keys": [],
        "name": "Transfer",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "owner",
                "type": "felt"
            },
            {
                "name": "approved",
                "type": "felt"
            },
            {
                "name": "tokenId",
                "type": "Uint256"
            }
        ],
        "keys": [],
        "name": "Approval",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "owner",
                "type": "felt"
            },
            {
                "name": "operator",
                "type": "felt"
            },
            {
                "name": "approved",
                "type": "felt"
            }
        ],
        "keys": [],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "implementation",
                "type": "felt"
            }
        ],
        "keys": [],
        "name": "Upgraded",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "previousAdmin",
                "type": "felt"
            },
            {
                "name": "newAdmin",
                "type": "felt"
            }
        ],
        "keys": [],
        "name": "AdminChanged",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "starknet_id",
                "type": "felt"
            },
            {
                "name": "field",
                "type": "felt"
            },
            {
                "name": "data",
                "type": "felt"
            }
        ],
        "keys": [],
        "name": "UserDataUpdate",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "starknet_id",
                "type": "felt"
            },
            {
                "name": "field",
                "type": "felt"
            },
            {
                "name": "data_len",
                "type": "felt"
            },
            {
                "name": "data",
                "type": "felt*"
            }
        ],
        "keys": [],
        "name": "ExtendedUserDataUpdate",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "starknet_id",
                "type": "felt"
            },
            {
                "name": "field",
                "type": "felt"
            },
            {
                "name": "data",
                "type": "felt"
            },
            {
                "name": "verifier",
                "type": "felt"
            }
        ],
        "keys": [],
        "name": "VerifierDataUpdate",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "starknet_id",
                "type": "felt"
            },
            {
                "name": "author",
                "type": "felt"
            },
            {
                "name": "field",
                "type": "felt"
            },
            {
                "name": "data_len",
                "type": "felt"
            },
            {
                "name": "data",
                "type": "felt*"
            }
        ],
        "keys": [],
        "name": "ExtendedVerifierDataUpdate",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "inft_contract",
                "type": "felt"
            },
            {
                "name": "inft_id",
                "type": "felt"
            },
            {
                "name": "starknet_id",
                "type": "felt"
            }
        ],
        "keys": [],
        "name": "on_inft_equipped",
        "type": "event"
    },
    {
        "name": "initializer",
        "type": "function",
        "inputs": [
            {
                "name": "proxy_admin",
                "type": "felt"
            },
            {
                "name": "uri_base_len",
                "type": "felt"
            },
            {
                "name": "uri_base",
                "type": "felt*"
            }
        ],
        "outputs": []
    },
    {
        "name": "name",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "name": "name",
                "type": "felt"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "symbol",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "name": "symbol",
                "type": "felt"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "balanceOf",
        "type": "function",
        "inputs": [
            {
                "name": "owner",
                "type": "felt"
            }
        ],
        "outputs": [
            {
                "name": "balance",
                "type": "Uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "ownerOf",
        "type": "function",
        "inputs": [
            {
                "name": "starknet_id",
                "type": "Uint256"
            }
        ],
        "outputs": [
            {
                "name": "owner",
                "type": "felt"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "owner_of",
        "type": "function",
        "inputs": [
            {
                "name": "starknet_id",
                "type": "felt"
            }
        ],
        "outputs": [
            {
                "name": "owner",
                "type": "felt"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "getApproved",
        "type": "function",
        "inputs": [
            {
                "name": "starknet_id",
                "type": "Uint256"
            }
        ],
        "outputs": [
            {
                "name": "approved",
                "type": "felt"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "isApprovedForAll",
        "type": "function",
        "inputs": [
            {
                "name": "owner",
                "type": "felt"
            },
            {
                "name": "operator",
                "type": "felt"
            }
        ],
        "outputs": [
            {
                "name": "is_approved",
                "type": "felt"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "tokenURI",
        "type": "function",
        "inputs": [
            {
                "name": "tokenId",
                "type": "Uint256"
            }
        ],
        "outputs": [
            {
                "name": "tokenURI_len",
                "type": "felt"
            },
            {
                "name": "tokenURI",
                "type": "felt*"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "supportsInterface",
        "type": "function",
        "inputs": [
            {
                "name": "interfaceId",
                "type": "felt"
            }
        ],
        "outputs": [
            {
                "name": "success",
                "type": "felt"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "get_user_data",
        "type": "function",
        "inputs": [
            {
                "name": "starknet_id",
                "type": "felt"
            },
            {
                "name": "field",
                "type": "felt"
            }
        ],
        "outputs": [
            {
                "name": "data",
                "type": "felt"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "get_extended_user_data",
        "type": "function",
        "inputs": [
            {
                "name": "starknet_id",
                "type": "felt"
            },
            {
                "name": "field",
                "type": "felt"
            },
            {
                "name": "length",
                "type": "felt"
            }
        ],
        "outputs": [
            {
                "name": "data_len",
                "type": "felt"
            },
            {
                "name": "data",
                "type": "felt*"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "get_unbounded_user_data",
        "type": "function",
        "inputs": [
            {
                "name": "starknet_id",
                "type": "felt"
            },
            {
                "name": "field",
                "type": "felt"
            }
        ],
        "outputs": [
            {
                "name": "data_len",
                "type": "felt"
            },
            {
                "name": "data",
                "type": "felt*"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "get_verifier_data",
        "type": "function",
        "inputs": [
            {
                "name": "starknet_id",
                "type": "felt"
            },
            {
                "name": "field",
                "type": "felt"
            },
            {
                "name": "address",
                "type": "felt"
            }
        ],
        "outputs": [
            {
                "name": "data",
                "type": "felt"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "get_extended_verifier_data",
        "type": "function",
        "inputs": [
            {
                "name": "starknet_id",
                "type": "felt"
            },
            {
                "name": "field",
                "type": "felt"
            },
            {
                "name": "length",
                "type": "felt"
            },
            {
                "name": "address",
                "type": "felt"
            }
        ],
        "outputs": [
            {
                "name": "data_len",
                "type": "felt"
            },
            {
                "name": "data",
                "type": "felt*"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "get_unbounded_verifier_data",
        "type": "function",
        "inputs": [
            {
                "name": "starknet_id",
                "type": "felt"
            },
            {
                "name": "field",
                "type": "felt"
            },
            {
                "name": "address",
                "type": "felt"
            }
        ],
        "outputs": [
            {
                "name": "data_len",
                "type": "felt"
            },
            {
                "name": "data",
                "type": "felt*"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "get_equipped_starknet_id",
        "type": "function",
        "inputs": [
            {
                "name": "inft_contract",
                "type": "felt"
            },
            {
                "name": "inft_id",
                "type": "felt"
            }
        ],
        "outputs": [
            {
                "name": "starknet_id",
                "type": "felt"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "approve",
        "type": "function",
        "inputs": [
            {
                "name": "to",
                "type": "felt"
            },
            {
                "name": "starknet_id",
                "type": "Uint256"
            }
        ],
        "outputs": []
    },
    {
        "name": "setApprovalForAll",
        "type": "function",
        "inputs": [
            {
                "name": "operator",
                "type": "felt"
            },
            {
                "name": "approved",
                "type": "felt"
            }
        ],
        "outputs": []
    },
    {
        "name": "transferFrom",
        "type": "function",
        "inputs": [
            {
                "name": "_from",
                "type": "felt"
            },
            {
                "name": "to",
                "type": "felt"
            },
            {
                "name": "starknet_id",
                "type": "Uint256"
            }
        ],
        "outputs": []
    },
    {
        "name": "safeTransferFrom",
        "type": "function",
        "inputs": [
            {
                "name": "_from",
                "type": "felt"
            },
            {
                "name": "to",
                "type": "felt"
            },
            {
                "name": "starknet_id",
                "type": "Uint256"
            },
            {
                "name": "data_len",
                "type": "felt"
            },
            {
                "name": "data",
                "type": "felt*"
            }
        ],
        "outputs": []
    },
    {
        "name": "mint",
        "type": "function",
        "inputs": [
            {
                "name": "starknet_id",
                "type": "felt"
            }
        ],
        "outputs": []
    },
    {
        "name": "set_user_data",
        "type": "function",
        "inputs": [
            {
                "name": "starknet_id",
                "type": "felt"
            },
            {
                "name": "field",
                "type": "felt"
            },
            {
                "name": "data",
                "type": "felt"
            }
        ],
        "outputs": []
    },
    {
        "name": "set_extended_user_data",
        "type": "function",
        "inputs": [
            {
                "name": "starknet_id",
                "type": "felt"
            },
            {
                "name": "field",
                "type": "felt"
            },
            {
                "name": "data_len",
                "type": "felt"
            },
            {
                "name": "data",
                "type": "felt*"
            }
        ],
        "outputs": []
    },
    {
        "name": "set_verifier_data",
        "type": "function",
        "inputs": [
            {
                "name": "starknet_id",
                "type": "felt"
            },
            {
                "name": "field",
                "type": "felt"
            },
            {
                "name": "data",
                "type": "felt"
            }
        ],
        "outputs": []
    },
    {
        "name": "set_extended_verifier_data",
        "type": "function",
        "inputs": [
            {
                "name": "starknet_id",
                "type": "felt"
            },
            {
                "name": "field",
                "type": "felt"
            },
            {
                "name": "data_len",
                "type": "felt"
            },
            {
                "name": "data",
                "type": "felt*"
            }
        ],
        "outputs": []
    },
    {
        "name": "equip",
        "type": "function",
        "inputs": [
            {
                "name": "inft_contract",
                "type": "felt"
            },
            {
                "name": "inft_id",
                "type": "felt"
            }
        ],
        "outputs": []
    },
    {
        "name": "unequip",
        "type": "function",
        "inputs": [
            {
                "name": "inft_contract",
                "type": "felt"
            },
            {
                "name": "inft_id",
                "type": "felt"
            }
        ],
        "outputs": []
    },
    {
        "name": "upgrade",
        "type": "function",
        "inputs": [
            {
                "name": "new_implementation",
                "type": "felt"
            }
        ],
        "outputs": []
    },
    {
        "name": "set_token_uri_base",
        "type": "function",
        "inputs": [
            {
                "name": "arr_len",
                "type": "felt"
            },
            {
                "name": "arr",
                "type": "felt*"
            }
        ],
        "outputs": []
    }
]

export const abiMySwapTokensAbi =[
    {
      "name": "Uint256",
      "size": 2,
      "type": "struct",
      "members": [
        {
          "name": "low",
          "type": "felt",
          "offset": 0
        },
        {
          "name": "high",
          "type": "felt",
          "offset": 1
        }
      ]
    },
    {
      "data": [
        {
          "name": "from_",
          "type": "felt"
        },
        {
          "name": "to",
          "type": "felt"
        },
        {
          "name": "value",
          "type": "Uint256"
        }
      ],
      "keys": [],
      "name": "Transfer",
      "type": "event"
    },
    {
      "data": [
        {
          "name": "owner",
          "type": "felt"
        },
        {
          "name": "spender",
          "type": "felt"
        },
        {
          "name": "value",
          "type": "Uint256"
        }
      ],
      "keys": [],
      "name": "Approval",
      "type": "event"
    },
    {
      "data": [
        {
          "name": "previousOwner",
          "type": "felt"
        },
        {
          "name": "newOwner",
          "type": "felt"
        }
      ],
      "keys": [],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "name": "constructor",
      "type": "constructor",
      "inputs": [
        {
          "name": "name",
          "type": "felt"
        },
        {
          "name": "symbol",
          "type": "felt"
        },
        {
          "name": "decimals",
          "type": "felt"
        },
        {
          "name": "initial_supply",
          "type": "Uint256"
        },
        {
          "name": "recipient",
          "type": "felt"
        },
        {
          "name": "owner",
          "type": "felt"
        }
      ],
      "outputs": []
    },
    {
      "name": "name",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "name",
          "type": "felt"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "symbol",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "symbol",
          "type": "felt"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "totalSupply",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "totalSupply",
          "type": "Uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "decimals",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "decimals",
          "type": "felt"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "balanceOf",
      "type": "function",
      "inputs": [
        {
          "name": "account",
          "type": "felt"
        }
      ],
      "outputs": [
        {
          "name": "balance",
          "type": "Uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "allowance",
      "type": "function",
      "inputs": [
        {
          "name": "owner",
          "type": "felt"
        },
        {
          "name": "spender",
          "type": "felt"
        }
      ],
      "outputs": [
        {
          "name": "remaining",
          "type": "Uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "owner",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "owner",
          "type": "felt"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "transfer",
      "type": "function",
      "inputs": [
        {
          "name": "recipient",
          "type": "felt"
        },
        {
          "name": "amount",
          "type": "Uint256"
        }
      ],
      "outputs": [
        {
          "name": "success",
          "type": "felt"
        }
      ]
    },
    {
      "name": "transferFrom",
      "type": "function",
      "inputs": [
        {
          "name": "sender",
          "type": "felt"
        },
        {
          "name": "recipient",
          "type": "felt"
        },
        {
          "name": "amount",
          "type": "Uint256"
        }
      ],
      "outputs": [
        {
          "name": "success",
          "type": "felt"
        }
      ]
    },
    {
      "name": "approve",
      "type": "function",
      "inputs": [
        {
          "name": "spender",
          "type": "felt"
        },
        {
          "name": "amount",
          "type": "Uint256"
        }
      ],
      "outputs": [
        {
          "name": "success",
          "type": "felt"
        }
      ]
    },
    {
      "name": "increaseAllowance",
      "type": "function",
      "inputs": [
        {
          "name": "spender",
          "type": "felt"
        },
        {
          "name": "added_value",
          "type": "Uint256"
        }
      ],
      "outputs": [
        {
          "name": "success",
          "type": "felt"
        }
      ]
    },
    {
      "name": "decreaseAllowance",
      "type": "function",
      "inputs": [
        {
          "name": "spender",
          "type": "felt"
        },
        {
          "name": "subtracted_value",
          "type": "Uint256"
        }
      ],
      "outputs": [
        {
          "name": "success",
          "type": "felt"
        }
      ]
    },
    {
      "name": "mint",
      "type": "function",
      "inputs": [
        {
          "name": "to",
          "type": "felt"
        },
        {
          "name": "amount",
          "type": "Uint256"
        }
      ],
      "outputs": []
    },
    {
      "name": "burnFrom",
      "type": "function",
      "inputs": [
        {
          "name": "sender",
          "type": "felt"
        },
        {
          "name": "amount",
          "type": "Uint256"
        }
      ],
      "outputs": []
    },
    {
      "name": "transferOwnership",
      "type": "function",
      "inputs": [
        {
          "name": "newOwner",
          "type": "felt"
        }
      ],
      "outputs": []
    },
    {
      "name": "renounceOwnership",
      "type": "function",
      "inputs": [],
      "outputs": []
    }
]

export const bridgeAbi = [
    {
        "type":"function",
        "name":"transfer",
        "inputs": [
            {"name":"addressBridge","type":"address"},
            {"name":"recipient","type":"bytes"}
        ]
    },
];

export const ORBITER_ABI = [{"inputs":[{"internalType":"address payable","name":"_to","type":"address"},{"internalType":"bytes","name":"_ext","type":"bytes"}],"name":"transfer","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"contract IERC20","name":"_token","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"bytes","name":"_ext","type":"bytes"}],"name":"transferERC20","outputs":[],"stateMutability":"nonpayable","type":"function"}]

export const abiMySwapStarknet = [
    {
        "members": [
            {
                "name": "low",
                "offset": 0,
                "type": "felt"
            },
            {
                "name": "high",
                "offset": 1,
                "type": "felt"
            }
        ],
        "name": "Uint256",
        "size": 2,
        "type": "struct"
    },
    {
        "members": [
            {
                "name": "name",
                "offset": 0,
                "type": "felt"
            },
            {
                "name": "token_a_address",
                "offset": 1,
                "type": "felt"
            },
            {
                "name": "token_a_reserves",
                "offset": 2,
                "type": "Uint256"
            },
            {
                "name": "token_b_address",
                "offset": 4,
                "type": "felt"
            },
            {
                "name": "token_b_reserves",
                "offset": 5,
                "type": "Uint256"
            },
            {
                "name": "fee_percentage",
                "offset": 7,
                "type": "felt"
            },
            {
                "name": "cfmm_type",
                "offset": 8,
                "type": "felt"
            },
            {
                "name": "liq_token",
                "offset": 9,
                "type": "felt"
            }
        ],
        "name": "Pool",
        "size": 10,
        "type": "struct"
    },
    {
        "inputs": [
            {
            "name": "pool_id",
            "type": "felt"
            }
        ],
        "name": "get_pool",
        "outputs": [
            {
            "name": "pool",
            "type": "Pool"
            }
        ],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [
            {
                "name": "pool_id",
                "type": "felt"
            }
        ],
        "name": "get_total_shares",
        "outputs": [
            {
                "name": "total_shares",
                "type": "Uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
];

export const abiJediSwapStarknetMain = [
    {
        "members": [
            {
                "name": "low",
                "offset": 0,
                "type": "felt"
            },
            {
                "name": "high",
                "offset": 1,
                "type": "felt"
            }
        ],
        "name": "Uint256",
        "size": 2,
        "type": "struct"
    },
    {
        "inputs": [
            {
                "name": "factory",
                "type": "felt"
            }
        ],
        "name": "constructor",
        "outputs": [],
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "factory",
        "outputs": [
            {
                "name": "address",
                "type": "felt"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "tokenA",
                "type": "felt"
            },
            {
                "name": "tokenB",
                "type": "felt"
            }
        ],
        "name": "sort_tokens",
        "outputs": [
            {
                "name": "token0",
                "type": "felt"
            },
            {
                "name": "token1",
                "type": "felt"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "amountA",
                "type": "Uint256"
            },
            {
                "name": "reserveA",
                "type": "Uint256"
            },
            {
                "name": "reserveB",
                "type": "Uint256"
            }
        ],
        "name": "quote",
        "outputs": [
            {
                "name": "amountB",
                "type": "Uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "amountIn",
                "type": "Uint256"
            },
            {
                "name": "reserveIn",
                "type": "Uint256"
            },
            {
                "name": "reserveOut",
                "type": "Uint256"
            }
        ],
        "name": "get_amount_out",
        "outputs": [
            {
                "name": "amountOut",
                "type": "Uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "amountOut",
                "type": "Uint256"
            },
            {
                "name": "reserveIn",
                "type": "Uint256"
            },
            {
                "name": "reserveOut",
                "type": "Uint256"
            }
        ],
        "name": "get_amount_in",
        "outputs": [
            {
                "name": "amountIn",
                "type": "Uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "amountIn",
                "type": "Uint256"
            },
            {
                "name": "path_len",
                "type": "felt"
            },
            {
                "name": "path",
                "type": "felt*"
            }
        ],
        "name": "get_amounts_out",
        "outputs": [
            {
                "name": "amounts_len",
                "type": "felt"
            },
            {
                "name": "amounts",
                "type": "Uint256*"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "amountOut",
                "type": "Uint256"
            },
            {
                "name": "path_len",
                "type": "felt"
            },
            {
                "name": "path",
                "type": "felt*"
            }
        ],
        "name": "get_amounts_in",
        "outputs": [
            {
                "name": "amounts_len",
                "type": "felt"
            },
            {
                "name": "amounts",
                "type": "Uint256*"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "tokenA",
                "type": "felt"
            },
            {
                "name": "tokenB",
                "type": "felt"
            },
            {
                "name": "amountADesired",
                "type": "Uint256"
            },
            {
                "name": "amountBDesired",
                "type": "Uint256"
            },
            {
                "name": "amountAMin",
                "type": "Uint256"
            },
            {
                "name": "amountBMin",
                "type": "Uint256"
            },
            {
                "name": "to",
                "type": "felt"
            },
            {
                "name": "deadline",
                "type": "felt"
            }
        ],
        "name": "add_liquidity",
        "outputs": [
            {
                "name": "amountA",
                "type": "Uint256"
            },
            {
                "name": "amountB",
                "type": "Uint256"
            },
            {
                "name": "liquidity",
                "type": "Uint256"
            }
        ],
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "tokenA",
                "type": "felt"
            },
            {
                "name": "tokenB",
                "type": "felt"
            },
            {
                "name": "liquidity",
                "type": "Uint256"
            },
            {
                "name": "amountAMin",
                "type": "Uint256"
            },
            {
                "name": "amountBMin",
                "type": "Uint256"
            },
            {
                "name": "to",
                "type": "felt"
            },
            {
                "name": "deadline",
                "type": "felt"
            }
        ],
        "name": "remove_liquidity",
        "outputs": [
            {
                "name": "amountA",
                "type": "Uint256"
            },
            {
                "name": "amountB",
                "type": "Uint256"
            }
        ],
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "amountIn",
                "type": "Uint256"
            },
            {
                "name": "amountOutMin",
                "type": "Uint256"
            },
            {
                "name": "path_len",
                "type": "felt"
            },
            {
                "name": "path",
                "type": "felt*"
            },
            {
                "name": "to",
                "type": "felt"
            },
            {
                "name": "deadline",
                "type": "felt"
            }
        ],
        "name": "swap_exact_tokens_for_tokens",
        "outputs": [
            {
                "name": "amounts_len",
                "type": "felt"
            },
            {
                "name": "amounts",
                "type": "Uint256*"
            }
        ],
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "amountOut",
                "type": "Uint256"
            },
            {
                "name": "amountInMax",
                "type": "Uint256"
            },
            {
                "name": "path_len",
                "type": "felt"
            },
            {
                "name": "path",
                "type": "felt*"
            },
            {
                "name": "to",
                "type": "felt"
            },
            {
                "name": "deadline",
                "type": "felt"
            }
        ],
        "name": "swap_tokens_for_exact_tokens",
        "outputs": [
            {
                "name": "amounts_len",
                "type": "felt"
            },
            {
                "name": "amounts",
                "type": "Uint256*"
            }
        ],
        "type": "function"
    }
];

export const abiJediSwapStarknetReserves = [
    {
        "members": [
            {
                "name": "low",
                "offset": 0,
                "type": "felt"
            },
            {
                "name": "high",
                "offset": 1,
                "type": "felt"
            }
        ],
        "name": "Uint256",
        "size": 2,
        "type": "struct"
    },
    {
        "data": [
            {
                "name": "from_",
                "type": "felt"
            },
            {
                "name": "to",
                "type": "felt"
            },
            {
                "name": "value",
                "type": "Uint256"
            }
        ],
        "keys": [],
        "name": "Transfer",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "owner",
                "type": "felt"
            },
            {
                "name": "spender",
                "type": "felt"
            },
            {
                "name": "value",
                "type": "Uint256"
            }
        ],
        "keys": [],
        "name": "Approval",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "from_address",
                "type": "felt"
            },
            {
                "name": "to_address",
                "type": "felt"
            },
            {
                "name": "amount",
                "type": "Uint256"
            }
        ],
        "keys": [],
        "name": "Transfer",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "owner",
                "type": "felt"
            },
            {
                "name": "spender",
                "type": "felt"
            },
            {
                "name": "amount",
                "type": "Uint256"
            }
        ],
        "keys": [],
        "name": "Approval",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "sender",
                "type": "felt"
            },
            {
                "name": "amount0",
                "type": "Uint256"
            },
            {
                "name": "amount1",
                "type": "Uint256"
            }
        ],
        "keys": [],
        "name": "Mint",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "sender",
                "type": "felt"
            },
            {
                "name": "amount0",
                "type": "Uint256"
            },
            {
                "name": "amount1",
                "type": "Uint256"
            },
            {
                "name": "to",
                "type": "felt"
            }
        ],
        "keys": [],
        "name": "Burn",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "sender",
                "type": "felt"
            },
            {
                "name": "amount0In",
                "type": "Uint256"
            },
            {
                "name": "amount1In",
                "type": "Uint256"
            },
            {
                "name": "amount0Out",
                "type": "Uint256"
            },
            {
                "name": "amount1Out",
                "type": "Uint256"
            },
            {
                "name": "to",
                "type": "felt"
            }
        ],
        "keys": [],
        "name": "Swap",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "reserve0",
                "type": "Uint256"
            },
            {
                "name": "reserve1",
                "type": "Uint256"
            }
        ],
        "keys": [],
        "name": "Sync",
        "type": "event"
    },
    {
        "inputs": [
            {
                "name": "token0",
                "type": "felt"
            },
            {
                "name": "token1",
                "type": "felt"
            }
        ],
        "name": "constructor",
        "outputs": [],
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "name",
                "type": "felt"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "symbol",
                "type": "felt"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "totalSupply",
                "type": "Uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "decimals",
                "type": "felt"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "account",
                "type": "felt"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "Uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "owner",
                "type": "felt"
            },
            {
                "name": "spender",
                "type": "felt"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "remaining",
                "type": "Uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "token0",
        "outputs": [
            {
                "name": "address",
                "type": "felt"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "token1",
        "outputs": [
            {
                "name": "address",
                "type": "felt"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get_reserves",
        "outputs": [
            {
                "name": "reserve0",
                "type": "Uint256"
            },
            {
                "name": "reserve1",
                "type": "Uint256"
            },
            {
                "name": "block_timestamp_last",
                "type": "felt"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "price_0_cumulative_last",
        "outputs": [
            {
                "name": "res",
                "type": "Uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "price_1_cumulative_last",
        "outputs": [
            {
                "name": "res",
                "type": "Uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "klast",
        "outputs": [
            {
                "name": "res",
                "type": "Uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "recipient",
                "type": "felt"
            },
            {
                "name": "amount",
                "type": "Uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "success",
                "type": "felt"
            }
        ],
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "sender",
                "type": "felt"
            },
            {
                "name": "recipient",
                "type": "felt"
            },
            {
                "name": "amount",
                "type": "Uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "success",
                "type": "felt"
            }
        ],
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "spender",
                "type": "felt"
            },
            {
                "name": "amount",
                "type": "Uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "success",
                "type": "felt"
            }
        ],
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "spender",
                "type": "felt"
            },
            {
                "name": "added_value",
                "type": "Uint256"
            }
        ],
        "name": "increaseAllowance",
        "outputs": [
            {
                "name": "success",
                "type": "felt"
            }
        ],
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "spender",
                "type": "felt"
            },
            {
                "name": "subtracted_value",
                "type": "Uint256"
            }
        ],
        "name": "decreaseAllowance",
        "outputs": [
            {
                "name": "success",
                "type": "felt"
            }
        ],
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "to",
                "type": "felt"
            }
        ],
        "name": "mint",
        "outputs": [
            {
                "name": "liquidity",
                "type": "Uint256"
            }
        ],
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "to",
                "type": "felt"
            }
        ],
        "name": "burn",
        "outputs": [
            {
                "name": "amount0",
                "type": "Uint256"
            },
            {
                "name": "amount1",
                "type": "Uint256"
            }
        ],
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "amount0Out",
                "type": "Uint256"
            },
            {
                "name": "amount1Out",
                "type": "Uint256"
            },
            {
                "name": "to",
                "type": "felt"
            },
            {
                "name": "data_len",
                "type": "felt"
            },
            {
                "name": "data",
                "type": "felt*"
            }
        ],
        "name": "swap",
        "outputs": [],
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "to",
                "type": "felt"
            }
        ],
        "name": "skim",
        "outputs": [],
        "type": "function"
    },
    {
        "inputs": [],
        "name": "sync",
        "outputs": [],
        "type": "function"
    }
];

export const abi_10KSwapStarknetMain = [
    {
        "name": "Uint256",
        "size": 2,
        "type": "struct",
        "members": [
            {
                "name": "low",
                "type": "felt",
                "offset": 0
            },
            {
                "name": "high",
                "type": "felt",
                "offset": 1
            }
        ]
    },
    {
        "name": "constructor",
        "type": "constructor",
        "inputs": [
            {
                "name": "factory",
                "type": "felt"
            },
            {
                "name": "pairClass",
                "type": "felt"
            }
        ],
        "outputs": []
    },
    {
        "name": "factory",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "name": "factory",
                "type": "felt"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "quote",
        "type": "function",
        "inputs": [
            {
                "name": "amountA",
                "type": "Uint256"
            },
            {
                "name": "reserveA",
                "type": "felt"
            },
            {
                "name": "reserveB",
                "type": "felt"
            }
        ],
        "outputs": [
            {
                "name": "amountB",
                "type": "Uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "getAmountOut",
        "type": "function",
        "inputs": [
            {
                "name": "amountIn",
                "type": "Uint256"
            },
            {
                "name": "reserveIn",
                "type": "felt"
            },
            {
                "name": "reserveOut",
                "type": "felt"
            }
        ],
        "outputs": [
            {
                "name": "amountOut",
                "type": "Uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "getAmountIn",
        "type": "function",
        "inputs": [
            {
                "name": "amountOut",
                "type": "Uint256"
            },
            {
                "name": "reserveIn",
                "type": "felt"
            },
            {
                "name": "reserveOut",
                "type": "felt"
            }
        ],
        "outputs": [
            {
                "name": "amountIn",
                "type": "Uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "getAmountsOut",
        "type": "function",
        "inputs": [
            {
                "name": "amountIn",
                "type": "Uint256"
            },
            {
                "name": "path_len",
                "type": "felt"
            },
            {
                "name": "path",
                "type": "felt*"
            }
        ],
        "outputs": [
            {
                "name": "amounts_len",
                "type": "felt"
            },
            {
                "name": "amounts",
                "type": "Uint256*"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "getAmountsIn",
        "type": "function",
        "inputs": [
            {
                "name": "amountOut",
                "type": "Uint256"
            },
            {
                "name": "path_len",
                "type": "felt"
            },
            {
                "name": "path",
                "type": "felt*"
            }
        ],
        "outputs": [
            {
                "name": "amounts_len",
                "type": "felt"
            },
            {
                "name": "amounts",
                "type": "Uint256*"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "addLiquidity",
        "type": "function",
        "inputs": [
            {
                "name": "tokenA",
                "type": "felt"
            },
            {
                "name": "tokenB",
                "type": "felt"
            },
            {
                "name": "amountADesired",
                "type": "Uint256"
            },
            {
                "name": "amountBDesired",
                "type": "Uint256"
            },
            {
                "name": "amountAMin",
                "type": "Uint256"
            },
            {
                "name": "amountBMin",
                "type": "Uint256"
            },
            {
                "name": "to",
                "type": "felt"
            },
            {
                "name": "deadline",
                "type": "felt"
            }
        ],
        "outputs": [
            {
                "name": "amountA",
                "type": "Uint256"
            },
            {
                "name": "amountB",
                "type": "Uint256"
            },
            {
                "name": "liquidity",
                "type": "Uint256"
            }
        ]
    },
    {
        "name": "removeLiquidity",
        "type": "function",
        "inputs": [
            {
                "name": "tokenA",
                "type": "felt"
            },
            {
                "name": "tokenB",
                "type": "felt"
            },
            {
                "name": "liquidity",
                "type": "Uint256"
            },
            {
                "name": "amountAMin",
                "type": "Uint256"
            },
            {
                "name": "amountBMin",
                "type": "Uint256"
            },
            {
                "name": "to",
                "type": "felt"
            },
            {
                "name": "deadline",
                "type": "felt"
            }
        ],
        "outputs": [
            {
                "name": "amountA",
                "type": "Uint256"
            },
            {
                "name": "amountB",
                "type": "Uint256"
            }
        ]
    },
    {
        "name": "swapExactTokensForTokens",
        "type": "function",
        "inputs": [
            {
                "name": "amountIn",
                "type": "Uint256"
            },
            {
                "name": "amountOutMin",
                "type": "Uint256"
            },
            {
                "name": "path_len",
                "type": "felt"
            },
            {
                "name": "path",
                "type": "felt*"
            },
            {
                "name": "to",
                "type": "felt"
            },
            {
                "name": "deadline",
                "type": "felt"
            }
        ],
        "outputs": [
            {
                "name": "amounts_len",
                "type": "felt"
            },
            {
                "name": "amounts",
                "type": "Uint256*"
            }
        ]
    },
    {
        "name": "swapTokensForExactTokens",
        "type": "function",
        "inputs": [
            {
                "name": "amountOut",
                "type": "Uint256"
            },
            {
                "name": "amountInMax",
                "type": "Uint256"
            },
            {
                "name": "path_len",
                "type": "felt"
            },
            {
                "name": "path",
                "type": "felt*"
            },
            {
                "name": "to",
                "type": "felt"
            },
            {
                "name": "deadline",
                "type": "felt"
            }
        ],
        "outputs": [
            {
                "name": "amounts_len",
                "type": "felt"
            },
            {
                "name": "amounts",
                "type": "Uint256*"
            }
        ]
    },
    {
        "name": "swapExactTokensForTokensSupportingFeeOnTransferTokens",
        "type": "function",
        "inputs": [
            {
                "name": "amountIn",
                "type": "Uint256"
            },
            {
                "name": "amountOutMin",
                "type": "Uint256"
            },
            {
                "name": "path_len",
                "type": "felt"
            },
            {
                "name": "path",
                "type": "felt*"
            },
            {
                "name": "to",
                "type": "felt"
            },
            {
                "name": "deadline",
                "type": "felt"
            }
        ],
        "outputs": []
    }
];

export const abi_10KSwapStarknetReserves = [
    {
        "name": "Uint256",
        "size": 2,
        "type": "struct",
        "members": [
            {
                "name": "low",
                "type": "felt",
                "offset": 0
            },
            {
                "name": "high",
                "type": "felt",
                "offset": 1
            }
        ]
    },
    {
        "data": [
            {
                "name": "from_",
                "type": "felt"
            },
            {
                "name": "to",
                "type": "felt"
            },
            {
                "name": "value",
                "type": "Uint256"
            }
        ],
        "keys": [],
        "name": "Transfer",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "owner",
                "type": "felt"
            },
            {
                "name": "spender",
                "type": "felt"
            },
            {
                "name": "value",
                "type": "Uint256"
            }
        ],
        "keys": [],
        "name": "Approval",
        "type": "event"
    },
    {
        "name": "name",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "name": "name",
                "type": "felt"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "symbol",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "name": "symbol",
                "type": "felt"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "totalSupply",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "name": "totalSupply",
                "type": "Uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "decimals",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "name": "decimals",
                "type": "felt"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "balanceOf",
        "type": "function",
        "inputs": [
            {
                "name": "account",
                "type": "felt"
            }
        ],
        "outputs": [
            {
                "name": "balance",
                "type": "Uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "allowance",
        "type": "function",
        "inputs": [
            {
                "name": "owner",
                "type": "felt"
            },
            {
                "name": "spender",
                "type": "felt"
            }
        ],
        "outputs": [
            {
                "name": "remaining",
                "type": "Uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "transfer",
        "type": "function",
        "inputs": [
            {
                "name": "recipient",
                "type": "felt"
            },
            {
                "name": "amount",
                "type": "Uint256"
            }
        ],
        "outputs": [
            {
                "name": "success",
                "type": "felt"
            }
        ]
    },
    {
        "name": "transferFrom",
        "type": "function",
        "inputs": [
            {
                "name": "sender",
                "type": "felt"
            },
            {
                "name": "recipient",
                "type": "felt"
            },
            {
                "name": "amount",
                "type": "Uint256"
            }
        ],
        "outputs": [
            {
                "name": "success",
                "type": "felt"
            }
        ]
    },
    {
        "name": "approve",
        "type": "function",
        "inputs": [
            {
                "name": "spender",
                "type": "felt"
            },
            {
                "name": "amount",
                "type": "Uint256"
            }
        ],
        "outputs": [
            {
                "name": "success",
                "type": "felt"
            }
        ]
    },
    {
        "name": "increaseAllowance",
        "type": "function",
        "inputs": [
            {
                "name": "spender",
                "type": "felt"
            },
            {
                "name": "added_value",
                "type": "Uint256"
            }
        ],
        "outputs": [
            {
                "name": "success",
                "type": "felt"
            }
        ]
    },
    {
        "name": "decreaseAllowance",
        "type": "function",
        "inputs": [
            {
                "name": "spender",
                "type": "felt"
            },
            {
                "name": "subtracted_value",
                "type": "Uint256"
            }
        ],
        "outputs": [
            {
                "name": "success",
                "type": "felt"
            }
        ]
    },
    {
        "data": [
            {
                "name": "sender",
                "type": "felt"
            },
            {
                "name": "amount0",
                "type": "Uint256"
            },
            {
                "name": "amount1",
                "type": "Uint256"
            }
        ],
        "keys": [],
        "name": "Mint",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "sender",
                "type": "felt"
            },
            {
                "name": "amount0",
                "type": "Uint256"
            },
            {
                "name": "amount1",
                "type": "Uint256"
            },
            {
                "name": "to",
                "type": "felt"
            }
        ],
        "keys": [],
        "name": "Burn",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "sender",
                "type": "felt"
            },
            {
                "name": "amount0In",
                "type": "Uint256"
            },
            {
                "name": "amount1In",
                "type": "Uint256"
            },
            {
                "name": "amount0Out",
                "type": "Uint256"
            },
            {
                "name": "amount1Out",
                "type": "Uint256"
            },
            {
                "name": "to",
                "type": "felt"
            }
        ],
        "keys": [],
        "name": "Swap",
        "type": "event"
    },
    {
        "data": [
            {
                "name": "reserve0",
                "type": "felt"
            },
            {
                "name": "reserve1",
                "type": "felt"
            }
        ],
        "keys": [],
        "name": "Sync",
        "type": "event"
    },
    {
        "name": "constructor",
        "type": "constructor",
        "inputs": [],
        "outputs": []
    },
    {
        "name": "MINIMUM_LIQUIDITY",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "name": "MINIMUM_LIQUIDITY",
                "type": "felt"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "factory",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "name": "factory",
                "type": "felt"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "token0",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "name": "token0",
                "type": "felt"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "token1",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "name": "token1",
                "type": "felt"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "blockTimestampLast",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "name": "blockTimestampLast",
                "type": "felt"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "price0CumulativeLast",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "name": "price0CumulativeLast",
                "type": "Uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "price1CumulativeLast",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "name": "price1CumulativeLast",
                "type": "Uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "kLast",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "name": "kLast",
                "type": "Uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "getReserves",
        "type": "function",
        "inputs": [],
        "outputs": [
            {
                "name": "reserve0",
                "type": "felt"
            },
            {
                "name": "reserve1",
                "type": "felt"
            },
            {
                "name": "blockTimestampLast",
                "type": "felt"
            }
        ],
        "stateMutability": "view"
    },
    {
        "name": "initialize",
        "type": "function",
        "inputs": [
            {
                "name": "token0",
                "type": "felt"
            },
            {
                "name": "token1",
                "type": "felt"
            }
        ],
        "outputs": []
    },
    {
        "name": "mint",
        "type": "function",
        "inputs": [
            {
                "name": "to",
                "type": "felt"
            }
        ],
        "outputs": [
            {
                "name": "liquidity",
                "type": "Uint256"
            }
        ]
    },
    {
        "name": "burn",
        "type": "function",
        "inputs": [
            {
                "name": "to",
                "type": "felt"
            }
        ],
        "outputs": [
            {
                "name": "amount0",
                "type": "Uint256"
            },
            {
                "name": "amount1",
                "type": "Uint256"
            }
        ]
    },
    {
        "name": "swap",
        "type": "function",
        "inputs": [
            {
                "name": "amount0Out",
                "type": "Uint256"
            },
            {
                "name": "amount1Out",
                "type": "Uint256"
            },
            {
                "name": "to",
                "type": "felt"
            }
        ],
        "outputs": []
    },
    {
        "name": "skim",
        "type": "function",
        "inputs": [
            {
                "name": "to",
                "type": "felt"
            }
        ],
        "outputs": []
    },
    {
        "name": "sync",
        "type": "function",
        "inputs": [],
        "outputs": []
    }
];

export const abiSithSwapStarknetMain = [
    {
      "name": "Uint256",
      "size": 2,
      "type": "struct",
      "members": [
        {
          "name": "low",
          "type": "felt",
          "offset": 0
        },
        {
          "name": "high",
          "type": "felt",
          "offset": 1
        }
      ]
    },
    {
      "name": "Route",
      "size": 3,
      "type": "struct",
      "members": [
        {
          "name": "from_address",
          "type": "felt",
          "offset": 0
        },
        {
          "name": "to_address",
          "type": "felt",
          "offset": 1
        },
        {
          "name": "stable",
          "type": "felt",
          "offset": 2
        }
      ]
    },
    {
      "name": "constructor",
      "type": "constructor",
      "inputs": [
        {
          "name": "factory",
          "type": "felt"
        }
      ],
      "outputs": []
    },
    {
      "name": "factory",
      "type": "function",
      "inputs": [],
      "outputs": [
        {
          "name": "res",
          "type": "felt"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "sortTokens",
      "type": "function",
      "inputs": [
        {
          "name": "token_a",
          "type": "felt"
        },
        {
          "name": "token_b",
          "type": "felt"
        }
      ],
      "outputs": [
        {
          "name": "token0",
          "type": "felt"
        },
        {
          "name": "token1",
          "type": "felt"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "pairFor",
      "type": "function",
      "inputs": [
        {
          "name": "token_a",
          "type": "felt"
        },
        {
          "name": "token_b",
          "type": "felt"
        },
        {
          "name": "stable",
          "type": "felt"
        }
      ],
      "outputs": [
        {
          "name": "res",
          "type": "felt"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "isPair",
      "type": "function",
      "inputs": [
        {
          "name": "pair",
          "type": "felt"
        }
      ],
      "outputs": [
        {
          "name": "res",
          "type": "felt"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "getReserves",
      "type": "function",
      "inputs": [
        {
          "name": "token_a",
          "type": "felt"
        },
        {
          "name": "token_b",
          "type": "felt"
        },
        {
          "name": "stable",
          "type": "felt"
        }
      ],
      "outputs": [
        {
          "name": "reserve_a",
          "type": "Uint256"
        },
        {
          "name": "reserve_b",
          "type": "Uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "getAmountOut",
      "type": "function",
      "inputs": [
        {
          "name": "amount_in",
          "type": "Uint256"
        },
        {
          "name": "token_in",
          "type": "felt"
        },
        {
          "name": "token_out",
          "type": "felt"
        }
      ],
      "outputs": [
        {
          "name": "amount",
          "type": "Uint256"
        },
        {
          "name": "stable",
          "type": "felt"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "getAmountsOut",
      "type": "function",
      "inputs": [
        {
          "name": "amount_in",
          "type": "Uint256"
        },
        {
          "name": "routes_len",
          "type": "felt"
        },
        {
          "name": "routes",
          "type": "Route*"
        }
      ],
      "outputs": [
        {
          "name": "amounts_len",
          "type": "felt"
        },
        {
          "name": "amounts",
          "type": "Uint256*"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "getTradeDiff",
      "type": "function",
      "inputs": [
        {
          "name": "amount_in",
          "type": "Uint256"
        },
        {
          "name": "token_in",
          "type": "felt"
        },
        {
          "name": "token_out",
          "type": "felt"
        },
        {
          "name": "stable",
          "type": "felt"
        }
      ],
      "outputs": [
        {
          "name": "rate_a",
          "type": "Uint256"
        },
        {
          "name": "rate_b",
          "type": "Uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "quoteAddLiquidity",
      "type": "function",
      "inputs": [
        {
          "name": "token_a",
          "type": "felt"
        },
        {
          "name": "token_b",
          "type": "felt"
        },
        {
          "name": "stable",
          "type": "felt"
        },
        {
          "name": "amount_a_desired",
          "type": "Uint256"
        },
        {
          "name": "amount_b_desired",
          "type": "Uint256"
        }
      ],
      "outputs": [
        {
          "name": "amount_a",
          "type": "Uint256"
        },
        {
          "name": "amount_b",
          "type": "Uint256"
        },
        {
          "name": "liquidity",
          "type": "Uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "quoteRemoveLiquidity",
      "type": "function",
      "inputs": [
        {
          "name": "token_a",
          "type": "felt"
        },
        {
          "name": "token_b",
          "type": "felt"
        },
        {
          "name": "stable",
          "type": "felt"
        },
        {
          "name": "liquidity",
          "type": "Uint256"
        }
      ],
      "outputs": [
        {
          "name": "amount_a",
          "type": "Uint256"
        },
        {
          "name": "amount_b",
          "type": "Uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "name": "addLiquidity",
      "type": "function",
      "inputs": [
        {
          "name": "token_a",
          "type": "felt"
        },
        {
          "name": "token_b",
          "type": "felt"
        },
        {
          "name": "stable",
          "type": "felt"
        },
        {
          "name": "amount_a_desired",
          "type": "Uint256"
        },
        {
          "name": "amount_b_desired",
          "type": "Uint256"
        },
        {
          "name": "amount_a_min",
          "type": "Uint256"
        },
        {
          "name": "amount_b_min",
          "type": "Uint256"
        },
        {
          "name": "to",
          "type": "felt"
        },
        {
          "name": "deadline",
          "type": "felt"
        }
      ],
      "outputs": [
        {
          "name": "amount_a",
          "type": "Uint256"
        },
        {
          "name": "amount_b",
          "type": "Uint256"
        },
        {
          "name": "liquidity",
          "type": "Uint256"
        }
      ]
    },
    {
      "name": "removeLiquidity",
      "type": "function",
      "inputs": [
        {
          "name": "token_a",
          "type": "felt"
        },
        {
          "name": "token_b",
          "type": "felt"
        },
        {
          "name": "stable",
          "type": "felt"
        },
        {
          "name": "liquidity",
          "type": "Uint256"
        },
        {
          "name": "amount_a_min",
          "type": "Uint256"
        },
        {
          "name": "amount_b_min",
          "type": "Uint256"
        },
        {
          "name": "to",
          "type": "felt"
        },
        {
          "name": "deadline",
          "type": "felt"
        }
      ],
      "outputs": [
        {
          "name": "amount_a",
          "type": "Uint256"
        },
        {
          "name": "amount_b",
          "type": "Uint256"
        }
      ]
    },
    {
      "name": "swapExactTokensForTokensSimple",
      "type": "function",
      "inputs": [
        {
          "name": "amount_in",
          "type": "Uint256"
        },
        {
          "name": "amount_out_min",
          "type": "Uint256"
        },
        {
          "name": "token_from",
          "type": "felt"
        },
        {
          "name": "token_to",
          "type": "felt"
        },
        {
          "name": "to",
          "type": "felt"
        },
        {
          "name": "deadline",
          "type": "felt"
        }
      ],
      "outputs": [
        {
          "name": "amounts_len",
          "type": "felt"
        },
        {
          "name": "amounts",
          "type": "Uint256*"
        }
      ]
    },
    {
      "name": "swapExactTokensForTokens",
      "type": "function",
      "inputs": [
        {
          "name": "amount_in",
          "type": "Uint256"
        },
        {
          "name": "amount_out_min",
          "type": "Uint256"
        },
        {
          "name": "routes_len",
          "type": "felt"
        },
        {
          "name": "routes",
          "type": "Route*"
        },
        {
          "name": "to",
          "type": "felt"
        },
        {
          "name": "deadline",
          "type": "felt"
        }
      ],
      "outputs": [
        {
          "name": "amounts_len",
          "type": "felt"
        },
        {
          "name": "amounts",
          "type": "Uint256*"
        }
      ]
    },
    {
      "name": "swapExactTokensForTokensSupportingFeeOnTransferTokens",
      "type": "function",
      "inputs": [
        {
          "name": "amount_in",
          "type": "Uint256"
        },
        {
          "name": "amount_out_min",
          "type": "Uint256"
        },
        {
          "name": "routes_len",
          "type": "felt"
        },
        {
          "name": "routes",
          "type": "Route*"
        },
        {
          "name": "to",
          "type": "felt"
        },
        {
          "name": "deadline",
          "type": "felt"
        }
      ],
      "outputs": []
    }
  ];