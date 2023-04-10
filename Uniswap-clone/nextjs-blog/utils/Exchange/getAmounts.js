import { Contract, logger } from "ethers"
import {
    EXCHANGE_CONTRACT_ABI,
    EXCHANGE_CONTRACT_ADDRESS,
    TOKEN_CONTRACT_ADDRESS,
    TOKEN_CONTRACT_ABI,
} from "../../constants"

/**
 * @dev getEtherBalance: Retrieves the ether balance of the user of the contract
 */
export const getEtherBalance = async (provider, address, contract = false) => {
    try {
        if (contract) {
            const balance = await provider.getBalance(EXCHANGE_CONTRACT_ADDRESS)
            return balance
        } else {
            const balance = await provider.getBalance(address)
            return balance
        }
    } catch (e) {
        console.log(e)
        return 0
    }
}

/**
 * getCDTokensBalance: Retrieves the Crypto Dev tokensin the account of the provided `address`
 */

export const getCDTokensBalance = async (provider, address) => {
    try {
        const tokenContract = new Contract(
            TOKEN_CONTRACT_ADDRESS,
            TOKEN_CONTRACT_ABI,
            provider
        )
        const balanceOfCryptoDevTokens = await tokenContract.balanceOf(address)
        console.log(balanceOfCryptoDevTokens)
        return balanceOfCryptoDevTokens
    } catch (e) {
        console.error(e)
    }
}

export const getLPTokensBalance = async (provider, address) => {
    try {
        const exchangeContract = new Contract(
            EXCHANGE_CONTRACT_ADDRESS,
            EXCHANGE_CONTRACT_ABI,
            provider
        )
        const code = await provider.getCode(address)
        console.log(code)
        const balanceOfLPTokens = await exchangeContract.balanceOf(address)
        console.log(balanceOfLPTokens)
        return balanceOfLPTokens
    } catch (e) {
        console.error(e)
    }
}

/**
 * getReserveOfTokens: Retrieves the amount of CD Tokens in the exchange contract address
 */

export const getReserveOfCDTokens = async (provider) => {
    try {
        const exchangeContract = new Contract(
            EXCHANGE_CONTRACT_ADDRESS,
            EXCHANGE_CONTRACT_ABI,
            provider
        )
        const reserve = await exchangeContract.getReserve()
        console.log(reserve)
        return reserve
    } catch (e) {
        console.error(e)
    }
}
