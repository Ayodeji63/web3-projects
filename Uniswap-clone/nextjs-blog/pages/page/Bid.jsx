import React, { useContext, useState } from "react"
import Header from "../components/Header"
import Image from "next/image"
import Button from "../components/Button"
import Overview from "../components/Tabs/Overview"
import Bids from "../components/Tabs/Bids"
import History from "../components/Tabs/History"
import { truncate } from "truncate-ethereum-address"
import { HookContext, nftDataContext } from "../../context/hook"
import { HeartIcon } from "@heroicons/react/24/solid"
import { ArrowPathIcon, ShareIcon } from "@heroicons/react/24/solid"
import { utils } from "ethers"
import FormInput from "../components/FormInput"
import {
    getAuctionEndState,
    getAuctionState,
    placeBid,
} from "../../utils/Auction/getAuction"
import { getAuction } from "../../utils/Auction/CreateNFT"
// import {  } from "../";
export const Bid = () => {
    const [clickedNft, setClickedNFT] = useContext(nftDataContext)
    console.log(clickedNft)
    const [page, setPage] = useState("Overview")
    const [bid, setBid] = useState("")
    const { address, provider } = useContext(HookContext)

    const PlaceBid = async () => {
        console.log(clickedNft.auctionId)
        await placeBid(provider, bid, clickedNft.auctionId)
    }
    // setInterval(async () => {
    //     if (provider) {
    //         const startState = await getAuctionState(
    //             provider,
    //             clickedNft.auctionId
    //         )
    //         console.log(
    //             `Auction ${clickedNft.auctionId} Start State, ${startState}`
    //         )

    //         const endState = await getAuctionEndState(
    //             provider,
    //             clickedNft.auctionId
    //         )
    //         console.log(
    //             `Auction, ${clickedNft.auctionId} End State, ${endState}`
    //         )
    //     }
    // }, 5000)
    return (
        <section className="min-h-screen min-w-screen mb-40 flex">
            <Header />
            {/* first-div  */}
            <div className="w-[50%] px-5 ml-40 overflow-hidden h-full flex flex-col items-center mt-40">
                <div className="h-[70%] w-[33%] rounded-lg flex flex-col justify-center items-center">
                    <div className="h-full bg-blue-500 w-full rounded-lg">
                        <Image
                            src={clickedNft?.nft_Image[0]}
                            width={1000}
                            height={1000}
                            className="h-full object-cover rounded-lg w-full"
                            alt="nft-bid-image"
                        />
                    </div>

                    <div className="flex w-full h-12 py-1 bg-[#111524] rounded-2xl justify-evenly mt-5">
                        <div
                            className={`nav ${
                                page == "Overview" ? `active` : ``
                            }`}
                            onClick={() => setPage("Overview")}
                        >
                            <p>Overview</p>
                        </div>

                        <div
                            className={`nav ${page == "Bids" ? "active" : ""}`}
                            onClick={() => setPage("Bids")}
                        >
                            <p>Bids</p>
                        </div>

                        <div
                            className={`nav ${
                                page == "History" ? "active" : ""
                            }`}
                            onClick={() => setPage("History")}
                        >
                            <p>History</p>
                        </div>
                    </div>
                </div>
                {page == "Overview" && <Overview />}
                {page == "Bids" && <Bids />}
                {page == "History" && <History />}
            </div>
            {/* second-div  */}
            <div className=" w-[35%] px-5 h-full mr-5  flex flex-col top-[15%] right-0 fixed ">
                <div className="">
                    <div className="flex items-center mb-2 ">
                        <Image
                            src={clickedNft.nft_Image[0]}
                            width={50}
                            height={50}
                            alt="nft-uniswap-logo"
                            className="rounded-full"
                        />
                        <h1 className="text-white font-medium ml-2 text-4xl  font-small">
                            {clickedNft.nft_Name}
                        </h1>
                    </div>

                    <div className="mt-2 flex items-center mb-7">
                        <div className="">
                            <p className="">Current owner</p>
                            <p className="text-white font-medium">
                                {truncate(clickedNft.nft_Owner)}
                            </p>
                        </div>
                    </div>
                    <hr className=" h-[1px] mt-1 rounded-lg bg-[#1c2231] border-[#1c2231]  text-2xl w-[100%]" />

                    <div className="flex items-center mt-4 justify-between">
                        <div className="icon2">
                            <HeartIcon className="icon  " />
                            <p className="ml-2">0</p>
                        </div>

                        <div className="icon2">
                            <ShareIcon className="icon" />
                            <p className="ml-2">Share</p>
                        </div>

                        <div className="icon2">
                            <ArrowPathIcon className="icon" />
                            <p className="ml-2">Refresh</p>
                        </div>
                    </div>
                </div>

                <div className="border mt-2 p-4 border-[#1c2231] rounded-xl">
                    <div className="flex justify-between">
                        <div className="bg-[#1c2231] rounded-xl p-2 h-[6rem] w-[45%] ">
                            <p>Time left</p>
                            <h1 className="text-white text-2xl font-medium mt-2">
                                00:14:48:38
                            </h1>
                        </div>
                        <div className="bg-[#1c2231] rounded-xl p-2 h-[6rem] w-[45%] ">
                            <p>Minimum bid</p>
                            <h1 className="text-white text-2xl font-medium mt-2">
                                {utils.formatEther(clickedNft.nft_price)} ETH
                            </h1>
                        </div>
                    </div>
                    <FormInput
                        name={"Bid"}
                        placeholder={"Enter Bid"}
                        required={"required"}
                        nftParam={bid}
                        setNftParam={setBid}
                    />
                    <Button text={"Place a bid"} click={() => PlaceBid()} />
                </div>
            </div>
        </section>
    )
}

export default Bid
