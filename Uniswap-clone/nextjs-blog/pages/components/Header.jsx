import Image from "next/image"
import React, { useContext } from "react"
import {
    MagnifyingGlassIcon,
    AdjustmentsVerticalIcon,
    EllipsisHorizontalIcon,
    ChevronDownIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/solid"
import {
    useAccount,
    useConnect,
    useDisconnect,
    useEnsName,
    useNetwork,
} from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import { truncate } from "truncate-ethereum-address"
import Link from "next/link"
import { useRouter } from "next/router"
import { HookContext } from "../../context/hook"
const Header = () => {
    // const { address, isConnected } = useAccount()
    // const { data: ensName } = useEnsName({ address })
    // const { chain, chains } = useNetwork()
    // const { disconnect } = useDisconnect()
    // const { connect } = useConnect({
    //     connector: new InjectedConnector(),
    // })
    const { connectWallet, address, disConnectWallet } = useContext(HookContext)

    const router = useRouter()
    return (
        <div className="header p-4 w-full flex items-center justify-between fixed top-0 bg-[#111524]">
            <div className="flex items-center">
                <Image
                    src={"/uniswap.webp"}
                    width={40}
                    height={40}
                    className="mr-12"
                />

                {/* links Div  */}

                <ul className="flex flex-grow justify-around">
                    <li className="li">
                        <Link href={"/"}>Swap</Link>
                    </li>
                    <li className="li">Tokens</li>
                    <li className="li">
                        <Link href={"/NFT"}>NFTs</Link>
                    </li>
                    <li className="li">
                        <Link href={"/Pool"}>Pool</Link>
                    </li>
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
                        {/* {isConnected ? chain.name : "Ethereum"} */}
                        Ethereum
                    </h1>
                    <ChevronDownIcon className="h-4 w-4 text-gray-300" />
                </div>

                <div
                    className={
                        address ? "headerConnectDiv2" : "headerConnectDiv"
                    }
                >
                    {address ? (
                        <div className="flex items-center cursor-pointer">
                            <div
                                className="rounded-full overflow-hidden h-7 w-7 mr-2 cursor-pointer"
                                onClick={disConnectWallet}
                            >
                                <Image
                                    src={"/acct.webp"}
                                    height={40}
                                    width={40}
                                    className="h-full object-cover"
                                />
                            </div>
                            <p className="text-white text-base font-medium">
                                {truncate(address)}
                            </p>
                        </div>
                    ) : (
                        <h1 className="headerConnect" onClick={connectWallet}>
                            Connect
                        </h1>
                    )}

                    <ChevronDownIcon className="h-6 w-6 text-[#0d7ffb] ml-2 cursor-pointer" />
                </div>
            </div>
        </div>
    )
}

export default Header
