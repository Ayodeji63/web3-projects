import Image from "next/image"
import React from "react"
import { useContext } from "react"
import { truncate } from "truncate-ethereum-address"
import { HookContext } from "../../../context/hook"
import {
    ArrowUpIcon,
    ArrowUpRightIcon,
    EyeIcon,
} from "@heroicons/react/24/solid"
import { ArrowPathIcon } from "@heroicons/react/24/outline"
import { BigNumber, utils } from "ethers"

const Overview = ({ highestBidder, highestBid, owner, nftAddress }) => {
    const { address } = useContext(HookContext)
    const zero = BigNumber.from(0)
    return (
        <div className="mt-10 scrollbar-hide w-full mb-40">
            <h1 className="text-white text-2xl font-medium">Latest Bids</h1>

            <div className="w-full border-[1px] border-[#1c2231] rounded-xl mt-5 p-5">
                {highestBid != 0.0 ? (
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                            <Image
                                src={"/background.webp"}
                                height={50}
                                width={50}
                                className="rounded-full h-10 w-10 object-cover"
                            />
                            <p className="text-white text-xl ml-2 font-medium">
                                {truncate(highestBidder)}
                            </p>
                        </div>
                        <p className="text-white text-xl font-medium">
                            {utils.formatEther(highestBid)} ETH
                        </p>
                    </div>
                ) : (
                    <div>
                        <p>No bids, be the first to bid</p>
                    </div>
                )}
            </div>

            <div className="mt-10">
                <h1 className="text-white text-2xl font-medium">
                    Royalties <span>10%</span>
                </h1>
                <p className="mt-2">
                    Split royalties are automatically deposited into each
                    recipient's wallet
                </p>
                <div className="w-full border-[1px] border-[#1c2231] rounded-xl mt-5 p-4 flex items-center justify-center ">
                    <Image src="/ethre.webp" width={50} height={50} />
                    <div className="flex flex-col justify-between w-full ml-2">
                        <div className="flex justify-between">
                            <p className="text-white text-base font-medium">
                                {nftAddress}
                            </p>
                            <p className="text-white text-base font-medium">
                                100%
                            </p>
                        </div>
                        <hr className="text-white h-[5px] mt-3 rounded-lg bg-white text-2xl w-[100%]" />
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <h1 className="text-white text-2xl font-medium">Details</h1>

                <div className="w-full border-[1px] border-[#1c2231] rounded-xl mt-5 p-4 flex flex-col items-stretch justify-between ">
                    <div className="flex items-center">
                        <Image src="/eth.webp" width={30} height={30} />
                        <h3 className="font-medium">Ethereum (ERC-721)</h3>
                    </div>

                    <div className="flex items-center mt-7 cursor-pointer ml-1">
                        <EyeIcon className="icon" />
                        <h3 className="font-medium ml-1 flex items-center">
                            Open original{" "}
                            <ArrowUpRightIcon className="h-4 w-4 text-gray-400 ml-2" />
                        </h3>
                    </div>

                    <hr className=" h-[3px] mt-3 rounded-lg bg-[#1c2231] border-[#1c2231]  text-2xl w-[100%]" />

                    <div className="flex items-center mt-7 cursor-pointer ml-1">
                        <ArrowPathIcon className="icon" />
                        <h3 className="font-medium ml-1 flex items-center">
                            Refresh metadata
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Overview
