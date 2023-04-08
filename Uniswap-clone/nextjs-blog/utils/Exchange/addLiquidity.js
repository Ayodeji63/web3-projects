import { Contract, logger, utils } from "ethers"
import {
    EXCHANGE_CONTRACT_ABI,
    EXCHANGE_CONTRACT_ADDRESS,
    TOKEN_CONTRACT_ADDRESS,
    TOKEN_CONTRACT_ABI,
} from "../../constants"

export const _AddLiquidity = async (
    signer,
    addCDAmountWei,
    addEtherAmountWei
) => {
    try {
        const tokenContract = new Contract(
            TOKEN_CONTRACT_ADDRESS,
            TOKEN_CONTRACT_ABI,
            signer
        )
        const exchangeContract = new Contract(
            EXCHANGE_CONTRACT_ADDRESS,
            EXCHANGE_CONTRACT_ABI,
            signer
        )

        let tx = await tokenContract.approve(
            EXCHANGE_CONTRACT_ADDRESS,
            addCDAmountWei.toString()
        )
        await tx.wait()
        console.log(utils.formatEther(addCDAmountWei))

        const add = await exchangeContract.addLiquidity(addCDAmountWei, {
            value: addEtherAmountWei,
        })
        await add.wait()
    } catch (e) {
        console.error(e)
    }
}

/**
 * **
 * calaculateCD calculates the CD tokens that need to be added to the liquidity given `_addEtherAmountWei` amount of ether
 */

export const calaculateCD = async (
    _addEther = "0",
    etherBalanceContract,
    cdTokenReserve
) => {
    const _addEtherAmountWei = utils.parseEther(_addEther)

    const cryptoDevTokenAmount = _addEtherAmountWei
        .mul(cdTokenReserve)
        .div(etherBalanceContract)
    return cryptoDevTokenAmount
}
