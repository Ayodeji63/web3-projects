import Image from "next/image"
import React from "react"
import {
    MagnifyingGlassIcon,
    AdjustmentsVerticalIcon,
    EllipsisHorizontalIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/solid"

const Header = () => {
    return (
        <div className="p-4 flex items-center justify-between">
            <div className="flex items-center">
                <Image
                    src={"/uniswap.webp"}
                    width={40}
                    height={40}
                    className="mr-12"
                />

                {/* links Div  */}

                <ul className="flex flex-grow justify-around">
                    <li className="li current">Swap</li>
                    <li className="li">Tokens</li>
                    <li className="li">NFTs</li>
                    <li className="li">Pool</li>
                </ul>
            </div>

            {/* input div  */}

            <div className="h-12 bg-[#232634] w-[35%] rounded-2xl border border-[#313849] flex items-center p-4">
                <MagnifyingGlassIcon className="icon " />
                <input
                    type={"text"}
                    placeholder="Search tokens and NFT collections"
                    className="h-full bg-transparent p-3 outline-none focus:outline-none border-0 flex flex-grow "
                />
                <AdjustmentsVerticalIcon className="icon" />
            </div>

            {/* last div  */}
            <div className="flex items-center">
                <EllipsisHorizontalIcon className="text-gray-400 mr-7 h-8 w-8" />

                <div className="flex items-center mr-7">
                    <Image
                        src={"/ethre.webp"}
                        width={20}
                        height={20}
                        className="mr-2"
                    />
                    <h1 className="text-base text-white font-medium mr-1">
                        Ethereum
                    </h1>
                    <ChevronDownIcon className="h-4 w-4 text-gray-300" />
                </div>

                <div className="flex items-center bg-[#10315b] p-2 rounded-full">
                    <h1 className="text-lg font-normal text-[#0d7ffb] hover:text-[#174c93] cursor-pointer pr-2 border-r border-[#0d7ffb]">
                        Connect
                    </h1>
                    <ChevronDownIcon className="h-6 w-6 text-[#0d7ffb] ml-2 cursor-pointer" />
                </div>
            </div>
        </div>
    )
}

export default Header
