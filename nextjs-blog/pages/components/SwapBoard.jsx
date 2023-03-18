import { Cog8ToothIcon } from "@heroicons/react/24/outline"
import { ArrowDownIcon, ChevronDownIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import React, { useState } from "react"
import { useAccount, useBalance, useConnect, useEnsName } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import Input from "./Input"

const SwapBoard = () => {
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })
    const { address, isConnected } = useAccount()
    const { data: ensName } = useEnsName({ address })
    const { data, isError, isLoading } = useBalance({ address })
    const [changeToken, setChangeToken] = useState(false)

    const tokens = [
        {
            name: "ETH",
            src: "/ethre.webp",
            token: "",
        },
        {
            name: "CDT",
            src: "/learn.jpg",
            token: "0x7F311a52734fF9604Dd3CCBa1C5666598165a7C6",
        },
    ]

    return (
        <div className="w-full h-full mt-20 flex justify-center mr-auto ">
            <div className="w-[30%] h-fit bg-[#0b111c] rounded-2xl border border-[#1c2231] shadow-xl p-4 relative">
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
                <div className="connectBtn mt-3" onClick={() => connect()}>
                    {isConnected ? "Select Token" : "Connect Wallet"}
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
