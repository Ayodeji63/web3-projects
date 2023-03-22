export const TOKEN_CONTRACT_ADDRESS =
    "0x3E5789040ce4b7B4a35e8f7CDE28CaF55A1c4E8e"

export const TOKEN_CONTRACT_ABI = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_cryptoDevsContract",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        stateMutability: "payable",
        type: "fallback",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
        ],
        name: "allowance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "claim",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "decimals",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "subtractedValue",
                type: "uint256",
            },
        ],
        name: "decreaseAllowance",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "addedValue",
                type: "uint256",
            },
        ],
        name: "increaseAllowance",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "maxTotalSupply",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "tokenIdsClaimed",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "tokenPrice",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "tokensPerNFT",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalSupply",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "transfer",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        stateMutability: "payable",
        type: "receive",
    },
]
// goerli "0x7F311a52734fF9604Dd3CCBa1C5666598165a7C6"

export const EXCHANGE_CONTRACT_ADDRESS =
    "0x0C8F633e5980E750367e72aA3B21b2350AbD626c"
// goerli "0x6B474170e75F70f861B171E65d282f31D6173BF7"

// export const TOKEN_CONTRACT_ABI = [
//     {
//         inputs: [
//             {
//                 internalType: "address",
//                 name: "_cryptoDevsContract",
//                 type: "address",
//             },
//         ],
//         stateMutability: "nonpayable",
//         type: "constructor",
//     },
//     {
//         anonymous: false,
//         inputs: [
//             {
//                 indexed: true,
//                 internalType: "address",
//                 name: "owner",
//                 type: "address",
//             },
//             {
//                 indexed: true,
//                 internalType: "address",
//                 name: "spender",
//                 type: "address",
//             },
//             {
//                 indexed: false,
//                 internalType: "uint256",
//                 name: "value",
//                 type: "uint256",
//             },
//         ],
//         name: "Approval",
//         type: "event",
//     },
//     {
//         anonymous: false,
//         inputs: [
//             {
//                 indexed: true,
//                 internalType: "address",
//                 name: "previousOwner",
//                 type: "address",
//             },
//             {
//                 indexed: true,
//                 internalType: "address",
//                 name: "newOwner",
//                 type: "address",
//             },
//         ],
//         name: "OwnershipTransferred",
//         type: "event",
//     },
//     {
//         anonymous: false,
//         inputs: [
//             {
//                 indexed: true,
//                 internalType: "address",
//                 name: "from",
//                 type: "address",
//             },
//             {
//                 indexed: true,
//                 internalType: "address",
//                 name: "to",
//                 type: "address",
//             },
//             {
//                 indexed: false,
//                 internalType: "uint256",
//                 name: "value",
//                 type: "uint256",
//             },
//         ],
//         name: "Transfer",
//         type: "event",
//     },
//     {
//         stateMutability: "payable",
//         type: "fallback",
//     },
//     {
//         inputs: [
//             {
//                 internalType: "address",
//                 name: "owner",
//                 type: "address",
//             },
//             {
//                 internalType: "address",
//                 name: "spender",
//                 type: "address",
//             },
//         ],
//         name: "allowance",
//         outputs: [
//             {
//                 internalType: "uint256",
//                 name: "",
//                 type: "uint256",
//             },
//         ],
//         stateMutability: "view",
//         type: "function",
//     },
//     {
//         inputs: [
//             {
//                 internalType: "address",
//                 name: "spender",
//                 type: "address",
//             },
//             {
//                 internalType: "uint256",
//                 name: "amount",
//                 type: "uint256",
//             },
//         ],
//         name: "approve",
//         outputs: [
//             {
//                 internalType: "bool",
//                 name: "",
//                 type: "bool",
//             },
//         ],
//         stateMutability: "nonpayable",
//         type: "function",
//     },
//     {
//         inputs: [
//             {
//                 internalType: "address",
//                 name: "account",
//                 type: "address",
//             },
//         ],
//         name: "balanceOf",
//         outputs: [
//             {
//                 internalType: "uint256",
//                 name: "",
//                 type: "uint256",
//             },
//         ],
//         stateMutability: "view",
//         type: "function",
//     },
//     {
//         inputs: [],
//         name: "claim",
//         outputs: [],
//         stateMutability: "payable",
//         type: "function",
//     },
//     {
//         inputs: [],
//         name: "decimals",
//         outputs: [
//             {
//                 internalType: "uint8",
//                 name: "",
//                 type: "uint8",
//             },
//         ],
//         stateMutability: "view",
//         type: "function",
//     },
//     {
//         inputs: [
//             {
//                 internalType: "address",
//                 name: "spender",
//                 type: "address",
//             },
//             {
//                 internalType: "uint256",
//                 name: "subtractedValue",
//                 type: "uint256",
//             },
//         ],
//         name: "decreaseAllowance",
//         outputs: [
//             {
//                 internalType: "bool",
//                 name: "",
//                 type: "bool",
//             },
//         ],
//         stateMutability: "nonpayable",
//         type: "function",
//     },
//     {
//         inputs: [
//             {
//                 internalType: "address",
//                 name: "spender",
//                 type: "address",
//             },
//             {
//                 internalType: "uint256",
//                 name: "addedValue",
//                 type: "uint256",
//             },
//         ],
//         name: "increaseAllowance",
//         outputs: [
//             {
//                 internalType: "bool",
//                 name: "",
//                 type: "bool",
//             },
//         ],
//         stateMutability: "nonpayable",
//         type: "function",
//     },
//     {
//         inputs: [],
//         name: "maxTotalSupply",
//         outputs: [
//             {
//                 internalType: "uint256",
//                 name: "",
//                 type: "uint256",
//             },
//         ],
//         stateMutability: "view",
//         type: "function",
//     },
//     {
//         inputs: [
//             {
//                 internalType: "uint256",
//                 name: "amount",
//                 type: "uint256",
//             },
//         ],
//         name: "mint",
//         outputs: [],
//         stateMutability: "payable",
//         type: "function",
//     },
//     {
//         inputs: [],
//         name: "name",
//         outputs: [
//             {
//                 internalType: "string",
//                 name: "",
//                 type: "string",
//             },
//         ],
//         stateMutability: "view",
//         type: "function",
//     },
//     {
//         inputs: [],
//         name: "owner",
//         outputs: [
//             {
//                 internalType: "address",
//                 name: "",
//                 type: "address",
//             },
//         ],
//         stateMutability: "view",
//         type: "function",
//     },
//     {
//         inputs: [],
//         name: "renounceOwnership",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//     },
//     {
//         inputs: [],
//         name: "symbol",
//         outputs: [
//             {
//                 internalType: "string",
//                 name: "",
//                 type: "string",
//             },
//         ],
//         stateMutability: "view",
//         type: "function",
//     },
//     {
//         inputs: [
//             {
//                 internalType: "uint256",
//                 name: "",
//                 type: "uint256",
//             },
//         ],
//         name: "tokenIdsClaimed",
//         outputs: [
//             {
//                 internalType: "bool",
//                 name: "",
//                 type: "bool",
//             },
//         ],
//         stateMutability: "view",
//         type: "function",
//     },
//     {
//         inputs: [],
//         name: "tokenPrice",
//         outputs: [
//             {
//                 internalType: "uint256",
//                 name: "",
//                 type: "uint256",
//             },
//         ],
//         stateMutability: "view",
//         type: "function",
//     },
//     {
//         inputs: [],
//         name: "tokensPerNFT",
//         outputs: [
//             {
//                 internalType: "uint256",
//                 name: "",
//                 type: "uint256",
//             },
//         ],
//         stateMutability: "view",
//         type: "function",
//     },
//     {
//         inputs: [],
//         name: "totalSupply",
//         outputs: [
//             {
//                 internalType: "uint256",
//                 name: "",
//                 type: "uint256",
//             },
//         ],
//         stateMutability: "view",
//         type: "function",
//     },
//     {
//         inputs: [
//             {
//                 internalType: "address",
//                 name: "to",
//                 type: "address",
//             },
//             {
//                 internalType: "uint256",
//                 name: "amount",
//                 type: "uint256",
//             },
//         ],
//         name: "transfer",
//         outputs: [
//             {
//                 internalType: "bool",
//                 name: "",
//                 type: "bool",
//             },
//         ],
//         stateMutability: "nonpayable",
//         type: "function",
//     },
//     {
//         inputs: [
//             {
//                 internalType: "address",
//                 name: "from",
//                 type: "address",
//             },
//             {
//                 internalType: "address",
//                 name: "to",
//                 type: "address",
//             },
//             {
//                 internalType: "uint256",
//                 name: "amount",
//                 type: "uint256",
//             },
//         ],
//         name: "transferFrom",
//         outputs: [
//             {
//                 internalType: "bool",
//                 name: "",
//                 type: "bool",
//             },
//         ],
//         stateMutability: "nonpayable",
//         type: "function",
//     },
//     {
//         inputs: [
//             {
//                 internalType: "address",
//                 name: "newOwner",
//                 type: "address",
//             },
//         ],
//         name: "transferOwnership",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//     },
//     {
//         inputs: [],
//         name: "withdraw",
//         outputs: [],
//         stateMutability: "nonpayable",
//         type: "function",
//     },
//     {
//         stateMutability: "payable",
//         type: "receive",
//     },
// ]

export const EXCHANGE_CONTRACT_ABI = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_CryptoDevtoken",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "addLiquidity",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
        ],
        name: "allowance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "cryptoDevTokenAddress",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_tokensSold",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_minEth",
                type: "uint256",
            },
        ],
        name: "cryptoDevTokenToEth",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "decimals",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "subtractedValue",
                type: "uint256",
            },
        ],
        name: "decreaseAllowance",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_minTokens",
                type: "uint256",
            },
        ],
        name: "ethToCryptoDevToken",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "inputAmount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "inputReserve",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "outputReserve",
                type: "uint256",
            },
        ],
        name: "getAmountOfTokens",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [],
        name: "getReserve",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "addedValue",
                type: "uint256",
            },
        ],
        name: "increaseAllowance",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "removeLiquidity",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalSupply",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "transfer",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
]

export const WAGMI_ABI = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "caretaker",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "CaretakerLoved",
        type: "event",
    },
    {
        inputs: [],
        name: "clean",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "feed",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "getAlive",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getBoredom",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getHunger",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getSleepiness",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getStatus",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getUncleanliness",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "love",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "play",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "sleep",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
]
