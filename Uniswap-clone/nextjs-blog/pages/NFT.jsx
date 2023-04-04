import React from "react"
import Image from "next/image"
import Header from "./components/Header"
import CreateNFT from "./page/CreateNFT"
import { nftData } from "./nftData"
import { Router, useRouter } from "next/router"
import Link from "next/link"

const Nft = () => {
    const href = CreateNFT
    const router = useRouter()
    const handleClick = (e) => {
        console.log("pushed")

        router.push("/page/Bid")
    }
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
                    {nftData.map((nft) => (
                        <div className="nft-card" onClick={() => handleClick()}>
                            <Image src={nft.nft_Image} alt="" />
                            <span className="owner">{nft.owner}</span>
                            <h5 className="nft-name">{nft.nft_Name}</h5>
                            <div className="price-container">
                                <div className="price">
                                    <span>Price</span>
                                    <h5>{nft.price}</h5>
                                </div>
                                <div className="bid">
                                    <span>Highest bid</span>
                                    <h5>{nft.bid}</h5>
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
