import { Contract, logger } from "ethers"
import {
    EXCHANGE_CONTRACT_ABI,
    EXCHANGE_CONTRACT_ADDRESS,
    TOKEN_CONTRACT_ABI,
    TOKEN_CONTRACT_ADDRESS,
} from "../constants"

/**
 * getAmountOfTokensReceivedFromSwap: Returns the number of Eth/Crypto Dev tokens that can be received when the user swaps `_swapAmountWei` amount of Eth/Crypto Dev tokens.
 */
