import { Contract, logger } from "ethers"
import {
    EXCHANGE_CONTRACT_ABI,
    EXCHANGE_CONTRACT_ADDRESS,
    TOKEN_CONTRACT_ABI,
    TOKEN_CONTRACT_ADDRESS,
} from "../../constants"

/**
 * getAmountOfTokensReceivedFromSwap: Returns the number of Eth/Crypto Dev tokens that can be received when the user swaps `_swapAmountWei` amount of Eth/Crypto Dev tokens.
 */

export const getAmountOfTokensReceivedFromSwap = async (
    _swapAmountWei,
    provider,
    ethSelected,
    ethBalance,
    resereCD
) => {
    const exchangeContract = new Contract(
        EXCHANGE_CONTRACT_ADDRESS,
        EXCHANGE_CONTRACT_ABI,
        provider
    )
    let amountOfTokens
    // If `Eth` is selected this means our input value is `Eth` which means our input amount would be
    // `_swapAmountWei`, the input reserve would be the `ethBalance` of the contract and output reserve
    // would be the `Crypto Dev` token reserve
    if (ethSelected) {
        amountOfTokens = await exchangeContract.getAmountOfTokens(
            _swapAmountWei,
            ethBalance,
            resereCD
        )
    } else {
        // If `Eth` is not selected this means our input value is `Crypto Dev` tokens which means our input amount would be
        // `_swapAmountWei`, the input reserve would be the `Crypto Dev` token reserve of the contract and output reserve
        // would be the `ethBalance`
        amountOfTokens = await exchangeContract.getAmountOfTokens(
            _swapAmountWei,
            resereCD,
            ethBalance
        )
    }
    return amountOfTokens
}

/**
 * swapTokens: Swaps `swapAmountWei` of Eth/Crypto Dev tokens with `tokenToBeReceivedAfterSwap` amount of Eth/Crypto Dev tokens.
 */

export const swapTokens = async (
    signer,
    swapAmountWei,
    tokenToBeReceivedAfterSwap,
    ethSelected
) => {
    const exchangeContract = new Contract(
        EXCHANGE_CONTRACT_ADDRESS,
        EXCHANGE_CONTRACT_ABI,
        signer
    )
    const tokenContract = new Contract(
        TOKEN_CONTRACT_ADDRESS,
        TOKEN_CONTRACT_ABI,
        signer
    )
    let tx
    console.log(ethSelected)

    if (ethSelected) {
        tx = await exchangeContract.ethToCryptoDevToken(
            tokenToBeReceivedAfterSwap,
            {
                value: swapAmountWei,
            }
        )
    } else {
        tx = await tokenContract.approve(
            EXCHANGE_CONTRACT_ADDRESS,
            swapAmountWei.toString()
        )

        await tx.wait()

        tx = await exchangeContract.cryptoDevTokenToEth(
            swapAmountWei,
            tokenToBeReceivedAfterSwap
        )
    }
    await tx.wait()
}
