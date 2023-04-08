import React, { useContext, useState } from "react"
import Image from "next/image"
import Header from "./components/Header"
import CreateNFT from "./page/CreateNFT"
import { nftData } from "./nftData"
import { HookContext, nftDataContext } from "../context/hook"
import { Router, useRouter } from "next/router"
import Link from "next/link"
import { useEffect } from "react"
import { fetchAllAuction } from "../utils/Auction/CreateNFT"
import { ethers, utils } from "ethers"

const Nft = () => {
    const href = CreateNFT
    const router = useRouter()
    const [nftInfo, setNftInfo] = useState([])
    const { provider } = useContext(HookContext)
    let [clickedNFT, setClickedNFT] = useContext(nftDataContext)
    const handleClick = (nft) => {
        console.log("pushed")
        setClickedNFT(nft)
        console.log(nft)
        router.push(`/page/Bid?${nft.id}`)
    }

    const fetch = async () => {
        const data = await fetchAllAuction(provider)
        console.log(data)
        setNftInfo(data)
    }

    useEffect(() => {
        console.log("Getting Auctions")
        fetch()
    }, [provider])
    return (
        <div>
            <Header />
            <div className="nfts-container">
                <div className="nft-text-button">
                    <h2 className="nft-text">NFT Collections</h2>
                    {/* <a href="Bid" className="create-nft-button cursor-pointer">
                        Create NFT
                    </a> */}
                    <div className="create-nft-button cursor-pointer">
                        <Link href={"/page/CreateNFT"}>Create NFT</Link>
                    </div>
                </div>
                <div className="nft-cards">
                    {nftInfo?.map((nft) => (
                        <div
                            key={ethers.utils.formatEther(nft.auctionId)}
                            className="nft-card"
                            onClick={() => handleClick(nft)}
                        >
                            <Image
                                src={nft.nft_Image[0]}
                                alt="nft-main-image"
                                width={100}
                                height={100}
                            />
                            <span className="owner">{}</span>
                            <h5 className="nft-name">{nft.nft_Name}</h5>
                            <div className="price-container">
                                <div className="price">
                                    <span>Price</span>
                                    <h5>
                                        {utils.formatEther(nft.nft_price)} ETH
                                    </h5>
                                </div>
                                <div className="bid">
                                    <span>Highest bid</span>
                                    <h5>
                                        {utils.formatEther(nft.nft_price)} ETH
                                    </h5>
                                </div>
                            </div>
                            <div className="overlay">
                                <div className="action-container">
                                    <button className="action-buy">
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Nft
