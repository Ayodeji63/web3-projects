import { Cog8ToothIcon } from "@heroicons/react/24/outline"
import { ArrowDownIcon, ChevronDownIcon } from "@heroicons/react/24/solid"
import { BigNumber, ethers } from "ethers"
import Image from "next/image"
import React, { useContext, useState } from "react"
import { useAccount, useBalance, useConnect, useEnsName } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import { HookContext } from "../../context/hook"
import Input from "./Input"

const SwapBoard = () => {
    const [changeToken, setChangeToken] = useState(false)
    const { ethBalance, cdBalance, connectWallet, walletConnected } =
        useContext(HookContext)

    const tokens = [
        {
            name: "ETH",
            src: "/ethre.webp",
            token: ethBalance,
        },
        {
            name: "CDT",
            src: "/learn.jpg",
            token: cdBalance,
        },
    ]

    return (
        <div className="section">
            <div className="w-[30%] wrapper">
                {/* first div  */}
                <div className="flex w-full justify-between items-center">
                    <h1 className="text-lg text-white font-medium">Swap</h1>
                    <Cog8ToothIcon className="icon" />
                </div>
                {/* second div:: inputs  */}
                <div className="w-full mt-5">
                    <Input param={!changeToken ? tokens[0] : tokens[1]} />

                    <Input param={!changeToken ? tokens[1] : tokens[0]} />
                </div>
                {/* last div: connect button  */}
                <div className="connectBtn mt-3" onClick={connectWallet}>
                    {walletConnected ? "Select Token" : "Connect Wallet"}
                </div>

                {/* overflow: button  */}
                <div>
                    <ArrowDownIcon
                        className="h-9 w-9 cursor-pointer absolute top-[42%] left-[45%] bg-[#253348] p-1 border-[#0b131c] border-4 rounded-xl hover:bg-[#324158]"
                        onClick={() => setChangeToken((prev) => !prev)}
                    />
                </div>
            </div>
        </div>
    )
}

export default SwapBoard
