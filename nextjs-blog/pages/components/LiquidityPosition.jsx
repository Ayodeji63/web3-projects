import React, { useContext } from "react"
import {
    ChevronDownIcon,
    PlusIcon,
    WalletIcon,
} from "@heroicons/react/24/outline"
import { HookContext, HookProvider } from "../../context/hook"
const LiquidityPosition = () => {
    const { addLiquidity, setAddLiquidity } = useContext(HookContext)
    return (
        <div className="w-full h-full mt-20 flex flex-col items-center">
            <div className=" flex justify-between h-fit w-[50%] md:[70%]">
                <h1 className="text-4xl text-white">Pools</h1>

                <div className="flex items-center">
                    <div className="flex items-center mx-2 bg-black text-white p-1 rounded-xl">
                        <p>More</p>
                        <ChevronDownIcon className="h-4 w-4 text-white" />
                    </div>
                    <div
                        className="position"
                        onClick={() => setAddLiquidity(true)}
                    >
                        <PlusIcon className="h-4 w-4 text-white" />
                        <h1 className="text-base font-medium">New Position</h1>
                    </div>
                </div>
            </div>

            <div className="wrapper w-[50%] mt-7 flex flex-col justify-center items-center">
                <WalletIcon className="h-12 w-12 text-white" />
                <h1 className="text-center text-white">
                    Your active V1 Liquidity Position <br /> will appear here
                </h1>
            </div>
        </div>
    )
}

export default LiquidityPosition
