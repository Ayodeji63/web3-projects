import { Contract, ethers, utils } from "ethers"
import {
    AUCTION_ABI,
    AUCTION_ADDRESS,
    TOKEN_ABI,
    TOKEN_FACTORY_ABI,
    TOKEN_FACTORY_ADDRESS,
} from "../../constants"
import { fetchAuctionById, getAuctionContractInstance } from "./CreateNFT"

export const placeBid = async (provider, bid, auctionIndex) => {
    try {
        const signer = provider.getSigner()
        const setBid = utils.parseEther(String(bid))
        console.log(setBid)
        const auctionContract = getAuctionContractInstance(signer)
        const tx = auctionContract.placeBid(auctionIndex, {
            value: setBid,
        })
        tx.wait(1)
    } catch (e) {
        console.log(e.reason)
    }
}

export const getAuctionState = async (provider, auctionIndex) => {
    try {
        const auctionContract = getAuctionContractInstance(provider)
        const startState = await auctionContract.auctionStartState(auctionIndex)
        return startState
    } catch (e) {
        console.error(e.reason)
    }
}

export const getAuctionEndState = async (provider, auctionIndex) => {
    try {
        const auctionContract = getAuctionContractInstance(provider)
        const endState = await auctionContract.auctionEndState(auctionIndex)
        return endState
    } catch (e) {
        console.error(e.reason)
    }
}

export const claim = async (provider, auctionIndex) => {
    try {
        console.log(auctionIndex)
        const signer = provider.getSigner()
        const auctionContract = getAuctionContractInstance(signer)
        const tx = await auctionContract.claim(auctionIndex)
        tx.wait()
    } catch (e) {
        console.error(e.reason)
    }
}
