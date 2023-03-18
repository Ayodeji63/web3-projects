import Image from "next/image"
import React, { useState } from "react"
import { useAccount, useBalance } from "wagmi"

const Input = ({ param }) => {
    console.log(param)
    const { address, isConnected } = useAccount()
    const { data } = useBalance({
        address,
        token: param.token || "",
    })
    const [value, setValue] = useState(0)
    return (
        <div className="h-24 w-full bg-[#101a2a] shadow-xl rounded-xl p-3 mb-1">
            <div className="h-[70%] flex justify-between items-center">
                <input
                    text={"number"}
                    placeholder="0"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="h-full w-full  outline-none 
                                bg-transparent focus:outline-none border-none text-3xl text-white"
                />
                <div className="rounded-full flex items-center p-1 bg-[#253348]">
                    <div className="h-6 w-6 rounded-full  overflow-hidden">
                        <Image
                            src={param.src}
                            width={30}
                            height={30}
                            className="object-cover"
                        />
                    </div>
                    <h1 className="text-xl text-white mx-3 font-medium">
                        {param.name}
                    </h1>
                </div>
            </div>
            <div className="flex justify-between">
                <h1></h1>

                {data && (
                    <p>
                        Balance: {data?.formatted.substring(0, 5)}{" "}
                        <span
                            className="text-blue-500 cursor-pointer"
                            onClick={() =>
                                setValue(
                                    data?.formatted.substring(0, 14) + "..."
                                )
                            }
                        >
                            Max
                        </span>
                    </p>
                )}
            </div>
        </div>
    )
}

export default Input
