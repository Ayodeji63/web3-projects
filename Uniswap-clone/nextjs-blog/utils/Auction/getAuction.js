import { Contract, ethers, utils } from "ethers"
import {
    AUCTION_ABI,
    AUCTION_ADDRESS,
    TOKEN_ABI,
    TOKEN_FACTORY_ABI,
    TOKEN_FACTORY_ADDRESS,
} from "../../constants"
import { getAuctionContractInstance } from "./CreateNFT"

export const placeBid = async (provider, bid, auctionIndex) => {
    try {
        const signer = provider.getSigner()
        const setBid = utils.parseEther(String(bid))
        console.log(setBid)
        const auctionContract = getAuctionContractInstance(signer)
        const tx = auctionContract.placeBid(auctionIndex, {
            value: setBid,
        })
    } catch (e) {
        alert(e.message)
    }
}
