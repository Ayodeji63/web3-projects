import { Contract, ethers, utils } from "ethers"
import {
    AUCTION_ABI,
    AUCTION_ADDRESS,
    TOKEN_ABI,
    TOKEN_FACTORY_ABI,
    TOKEN_FACTORY_ADDRESS,
} from "../../constants"
import { NFTStorage } from "nft.storage"

const API_KEY = process.env.API_KEY

// Helper function to return a TokenFactory contract instance given a provider/signer
export const getTokenFactoryContractInstance = (providerOrSigner) => {
    return new Contract(
        TOKEN_FACTORY_ADDRESS,
        TOKEN_FACTORY_ABI,
        providerOrSigner
    )
}

// Helper function to return a Auction contract instance given a provider/signer
export const getAuctionContractInstance = (providerOrSigner) => {
    return new Contract(AUCTION_ADDRESS, AUCTION_ABI, providerOrSigner)
}
export const createNFt = async (provider, name, symbol, image, description) => {
    try {
        const client = new NFTStorage({ token: API_KEY })
        const imageData = new Blob([image])
        const ipfHash = await client.storeBlob(imageData)
        console.log(ipfHash)
        const signer = provider.getSigner()
        const TokenFactory = new Contract(
            TOKEN_FACTORY_ADDRESS,
            TOKEN_FACTORY_ABI,
            signer
        )
        const tx = await TokenFactory.createNewToken(name, symbol, ipfHash)
        await tx.wait()
    } catch (e) {
        console.error(e)
    }
}

export const createAuction = async (provider, minBid, endTime, startTime) => {
    const signer = provider.getSigner()

    const TokenFactory = getTokenFactoryContractInstance(signer)
    const Auction = getAuctionContractInstance(signer)
    const tokenId = await TokenFactory._getTokenId()
    const nftaddress = await TokenFactory.getTokenAddress()
    console.log(nftaddress)
    // 0xc2537c5bf9904bd25b42c6f189469f5b6c1f6f24
    const _startTime = startTime.toString()
    const _endTime = endTime.toString()
    console.log(_startTime)
    console.log(_endTime)

    const crtAuction = await Auction.createAuction(
        tokenId,
        minBid,
        _endTime,
        _startTime,
        nftaddress
    )
    await crtAuction.wait()
    console.log(Number(ethers.utils.formatEther(crtAuction.value)))
    const infoNum = Number(ethers.utils.formatEther(crtAuction.value))
    const auctionInfo = await Auction.nftAuction(infoNum)
    // console.log(auctionInfo)
}

export const approveAuction = async (provider, address) => {
    try {
        const signer = provider.getSigner()
        const TokenFactory = getTokenFactoryContractInstance(signer)
        const nftaddress = await TokenFactory.getTokenAddress()
        console.log(nftaddress)
        const tokenId = await TokenFactory._getTokenId()
        console.log(utils.formatEther(tokenId))
        console.log(address)
        const tokenContract = new Contract(nftaddress, TOKEN_ABI, signer)
        const tx = await tokenContract.transferFrom(
            address,
            AUCTION_ADDRESS,
            tokenId
        )
        tx.wait()
        // const gptx = await tokenContract.getApproved(tokenId)
        gptx.wait()
        console.log(gptx)
    } catch (e) {
        console.log(e.message)
    }
}
// 0xaac8b8ad66984140e70792aba0c29d41da9951dc

export const fetchAuctionById = async (provider, id) => {
    try {
        const signer = await provider.getSigner()
        const auctionContract = getAuctionContractInstance(signer)
        const auction = await auctionContract.nftAuction(id)
        console.log(auction)
        // auction.wait()
        const nft_Image = await fetchMetadata(auction.tokenURI)
        const auctionProposal = {
            auctionId: id,
            nft_tokenId: auction.tokenId,
            nft_Name: auction.nftName,
            nft_Symbol: auction.nftSymbol,
            nft_tokenURI: auction.tokenURI,
            nft_Image: nft_Image,
            nft_price: auction.minBid,
            nft_highestBidder: auction.highestBidder,
            nft_Owner: auction.nftOwner,
            nft_highestBid: auction.highestBid,
            nft_startTime: auction.auctionStartTime,
            nft_endTime: auction.auctionEndTime,
            nft_address: auction.contractAddress,
        }
        return auctionProposal
    } catch (e) {
        console.error(e.reason)
    }
}

export const getNumOfAuctions = async (provider) => {
    try {
        const auctionContract = new Contract(
            AUCTION_ADDRESS,
            AUCTION_ABI,
            provider
        )
        return auctionContract.numAuctions()
    } catch (e) {
        console.error(e.reason)
    }
}
export const fetchAllAuction = async (provider) => {
    try {
        const auctions = []
        const numOfAuctions = await getNumOfAuctions(provider)
        for (let i = 0; i < numOfAuctions; i++) {
            const auction = await fetchAuctionById(provider, i)
            auctions.push(auction)
        }
        console.log(auctions)
        return auctions
    } catch (e) {
        console.error(e)
    }
}

const fetchMetadata = async (hash) => {
    try {
        // console.log(ipfsHash)s
        let fileResult = []
        const res = await fetch(`https://ipfs.io/ipfs/${hash}`)
        // console.log(res)
        const blob = await res.blob()
        const fileReader = new FileReader()
        fileReader.readAsBinaryString(blob)
        fileReader.onloadend = () => {
            const dataUrl = fileReader.result
            // console.log(dataUrl)
            fileResult.push(dataUrl)
        }
        console.log(fileResult)
        return fileResult
    } catch (e) {
        console.log(e.message)
    }
}

export const getParam = async (provider) => {
    try {
        const signer = provider.getSigner()
        const auctionContract = getAuctionContractInstance(signer)
        const auctionNum = await auctionContract.numAuctions()

        console.log(parseInt(auctionNum))
        const param = await fetchAuctionById(provider, parseInt(auctionNum) - 1)
        // console.log(param)
        return param
    } catch (e) {
        console.log(e.reason)
    }
}
