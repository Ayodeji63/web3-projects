import { Contract, logger, utils } from "ethers"
import {
    EXCHANGE_CONTRACT_ABI,
    EXCHANGE_CONTRACT_ADDRESS,
    TOKEN_CONTRACT_ABI,
    TOKEN_CONTRACT_ADDRESS,
} from "../../constants"

/**
 * removeLiquidity: Removes the `removeLPTokensWei` amount of LP tokens from liquidity and also the calculated amount of `ether` and `CD` tokens
 */

export const removeLiquidity = async (signer, remmoveLPTokensWei) => {
    const exchangeContract = new Contract(
        EXCHANGE_CONTRACT_ADDRESS,
        EXCHANGE_CONTRACT_ABI,
        signer
    )
    const tx = await exchangeContract.removeLiquidity(remmoveLPTokensWei)
    await tx.wait()
}

/**
 * getTokensAfteremove: Calculates the amount of `ETH` and `CD` tokens that would be returned back to user after he removes `removeLPTokenWei` amount of LP tokens from the contract
 */

export const getTokensAfterRemove = async (
    provider,
    removeLPtokensWei,
    _ethBalance,
    cryptoDevTokenReserve
) => {
    try {
        const exchangeContract = new Contract(
            EXCHANGE_CONTRACT_ADDRESS,
            EXCHANGE_CONTRACT_ABI,
            provider
        )
        const _totalSupply = await exchangeContract.totalSupply()
        // Here we are using the BigNumber methods of multiplication and division
        // The amount of Eth that would be sent back to the user after he withdraws the LP token
        // is calculated based on a ratio,
        // Ratio is -> (amount of Eth that would be sent back to the user / Eth reserve) = (LP tokens withdrawn) / (total supply of LP tokens)
        // By some maths we get -> (amount of Eth that would be sent back to the user) = (Eth Reserve * LP tokens withdrawn) / (total supply of LP tokens)
        // Similarly we also maintain a ratio for the `CD` tokens, so here in our case
        // Ratio is -> (amount of CD tokens sent back to the user / CD Token reserve) = (LP tokens withdrawn) / (total supply of LP tokens)
        // Then (amount of CD tokens sent back to the user) = (CD token reserve * LP tokens withdrawn) / (total supply of LP tokens)
        const _removeEther = _ethBalance
            .mul(removeLPtokensWei)
            .div(_totalSupply)

        const _removeCD = cryptoDevTokenReserve
            .mul(removeLPtokensWei)
            .div(_totalSupply)

        return {
            _removeEther,
            _removeCD,
        }
    } catch (e) {
        console.error(e)
    }
}
