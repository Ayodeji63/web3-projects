import {
    ChevronDownIcon,
    PlusIcon,
    WalletIcon,
} from "@heroicons/react/24/outline"
import React, { useContext, useState } from "react"
import { HookContext } from "../context/hook"
import AddLiquidity from "./components/AddLiquidity"
import Header from "./components/Header"
import LiquidityPosition from "./components/LiquidityPosition"

const Token = () => {
    const { addLiquidity } = useContext(HookContext)
    return (
        <div className="">
            <Header />

            {!addLiquidity ? <LiquidityPosition /> : <AddLiquidity />}
        </div>
    )
}

export default Token
