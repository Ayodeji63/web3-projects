import { Cog6ToothIcon } from "@heroicons/react/24/outline"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import React, { useContext, useState } from "react"
import { _AddLiquidity } from "../../utils/Exchange/addLiquidity"
import { HookContext } from "../../context/hook"
import Input from "./Input"
import { BigNumber, utils } from "ethers"
import { ClipLoader } from "react-spinners"

const AddLiquidity = () => {
    const {
        addLiquidity,
        setAddLiquidity,
        provider,
        getAmounts,
        ethBalance,
        cdBalance,
        reserveCD,
    } = useContext(HookContext)
    const zero = BigNumber.from(0)
    const [addCDTokens, setAddCDTokens] = useState("0")
    const [addEther, setAddEther] = useState("0")
    const [loading, setLoading] = useState(false)
    const [color, setColor] = useState("#fff")

    // console.log(addCDTokens.eq(zero))
    const _addLiquidity = async () => {
        try {
            // console.log(addCDTokens.eq(zero))
            const addEtherWei = utils.parseEther(addEther.toString())
            const addTokenCDT = utils.parseEther(addCDTokens.toString())
            console.log(addEtherWei.eq(zero))
            console.log(addTokenCDT.eq(zero))

            if (addTokenCDT != zero && addEther != zero) {
                setLoading(true)
                const signer = await provider.getSigner()
                await _AddLiquidity(signer, addTokenCDT, addEtherWei)
                await getAmounts()
                setAddCDTokens(zero)
                setAddEther(zero)
                setLoading(false)
            } else {
                alert("Add Token Amount")
                setAddCDTokens(zero)
                setAddEther(zero)
                setLoading(false)
            }
        } catch (e) {
            console.error(e)
            alert("Add Token Amount")
            setAddCDTokens(zero)
            setAddEther(zero)
            setLoading(false)
        }
    }

    const tokensA = [
        {
            name: "ETH",
            src: "/ethre.webp",
            token: ethBalance,
            tokenValue: addEther || "0",
            setValue: setAddEther,
        },
        {
            name: "CDT",
            src: "/learn.jpg",
            token: cdBalance,
            tokenValue: addCDTokens || "0",
            setValue: setAddCDTokens,
        },
    ]
    const tokensB = [
        {
            name: "ETH",
            src: "/ethre.webp",
            token: ethBalance,
            value: addEther,
            setValue: setAddEther,
            setCdTokens: setAddCDTokens,
        },
        {
            name: "CDT",
            src: "/learn.jpg",
            token: cdBalance,
            value: addCDTokens,
        },
    ]
    console.log(addCDTokens)
    return (
        <div className="section">
            <div className="wrapper w-[50%] text-white">
                <div className="flex justify-between border-b pb-7 border-[#1c2231]">
                    <ArrowLeftIcon
                        className="icon cursor-pointer"
                        onClick={() => setAddLiquidity(false)}
                    />
                    <h1 className="text-xl">Add Liquidity</h1>
                    <Cog6ToothIcon className="icon" />
                </div>

                <div className="p-3">
                    <div className="">
                        <h1 className="text-white font-medium mb-3">
                            Deposit Amount
                        </h1>

                        <div>
                            {utils.parseEther(reserveCD.toString()).eq(zero) ? (
                                <>
                                    <Input param={tokensA[0]} />
                                    <Input param={tokensA[1]} />
                                </>
                            ) : (
                                <>
                                    <Input param={tokensB[0]} />
                                    <Input param={tokensB[1]} />
                                </>
                            )}
                        </div>

                        <div
                            className="connectBtn mt-3"
                            onClick={_addLiquidity}
                        >
                            {!loading ? (
                                "Add Tokens"
                            ) : (
                                <ClipLoader
                                    color={color}
                                    loading={loading}
                                    size={30}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddLiquidity
