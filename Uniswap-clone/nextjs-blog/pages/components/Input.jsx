import { BigNumber, ethers, utils } from "ethers"
import Image from "next/image"
import React, { useContext, useState } from "react"
import { useAccount, useBalance } from "wagmi"
import { HookContext } from "../../context/hook"
import { calaculateCD } from "../../utils/Exchange/addLiquidity"

const Input = ({ param }) => {
    // const { value, setValue } = param
    console.log(param)
    const zero = BigNumber.from(0)
    const { walletConnected, reserveCD, etherBalanceContract } =
        useContext(HookContext)
    const handleChange = async (e) => {
        if (param?.setValue) {
            if (!param?.setCdTokens) {
                param?.setValue(e.target.value)
            } else {
                param?.setValue(e.target.value || "0")
                const _addCDtokens = await calaculateCD(
                    e.target.value || "0",
                    etherBalanceContract,
                    reserveCD
                )
                console.log(utils.formatEther(_addCDtokens).substring(0, 5))
                param?.setCdTokens(utils.formatEther(_addCDtokens))
            }
        }
    }
    return (
        <div className="h-24 w-full bg-[#101a2a] shadow-xl rounded-xl p-3 mb-1">
            <div className="h-[70%] flex justify-between items-center">
                <input
                    text={"number"}
                    placeholder="0"
                    value={
                        param?.tokenValue !== undefined
                            ? param?.tokenValue
                            : "0"
                    }
                    onChange={(e) => handleChange(e)}
                    className="h-full w-full  outline-none 
                                bg-transparent focus:outline-none border-none text-3xl text-white"
                />
                <div className="rounded-full flex items-center p-1 bg-[#253348]">
                    <div className="h-6 w-6 rounded-full  overflow-hidden">
                        <Image
                            src={param?.src}
                            width={30}
                            height={30}
                            className="object-cover"
                        />
                    </div>
                    <h1 className="text-xl text-white mx-3 font-medium">
                        {param?.name}
                    </h1>
                </div>
            </div>
            <div className="flex justify-between">
                <h1></h1>

                {walletConnected && param?.token && (
                    <p>
                        Balance:{" "}
                        {ethers.utils.formatEther(param?.token).substring(0, 5)}{" "}
                        {param?.setValue && (
                            <span
                                className="text-blue-500 cursor-pointer"
                                onClick={() =>
                                    param?.setValue(
                                        ethers.utils
                                            .formatEther(param?.token)
                                            .substring(0, 10)
                                    )
                                }
                            >
                                Max
                            </span>
                        )}
                    </p>
                )}
            </div>
        </div>
    )
}

export default Input
