import React, { useContext, useState } from "react"
import {
    ChevronDownIcon,
    PlusIcon,
    WalletIcon,
} from "@heroicons/react/24/outline"
import { HookContext, HookProvider, lpBalance } from "../../context/hook"
import { BigNumber, ethers, utils } from "ethers"
import {
    getTokensAfterRemove,
    removeLiquidity,
} from "../../utils/Exchange/removeLiquidity"
import {
    getEtherBalance,
    getReserveOfCDTokens,
} from "../../utils/Exchange/getAmounts"
import { ClipLoader } from "react-spinners"
const LiquidityPosition = () => {
    const { addLiquidity, setAddLiquidity, lpBalance, provider, getAmounts } =
        useContext(HookContext)
    const zero = BigNumber.from(0)
    const [loading, setLoading] = useState(false)
    const [color, setColor] = useState("#fff")
    const [removeLPTokens, setRemoveLPTokens] = useState("0")
    const [removeCD, setRemoveCD] = useState(zero)
    const [removeEther, setRemoveEther] = useState(zero)
    const [removeDiv, setRemoveDiv] = useState(false)

    const _removeLiquidity = async () => {
        try {
            if (lpBalance > removeLPTokens) {
                const signer = await provider.getSigner()
                const removeLPTokensWei = utils.parseEther(removeLPTokens)
                setLoading(true)

                await removeLiquidity(signer, removeLPTokensWei)
                await getAmounts()
                setRemoveCD(zero)
                setRemoveEther(zero)
                setLoading(false)
            }
        } catch (e) {
            console.error(e)
            alert("You dont have enough LP Tokens")
            setLoading(false)
            setRemoveCD(zero)
            setRemoveEther(zero)
        }
    }

    /**
     * _getTokensAfterRemove: Calculates the amount of `Ether` and `CD` tokens
     * that would be returned back to user after he removes `removeLPTokenWei` amount
     * of LP tokens from the contract
     */

    const _getTokensAfterRemove = async (_removeLPTokens) => {
        try {
            const removeLPTokensWei = utils.parseEther(_removeLPTokens)
            const _ethBalance = await getEtherBalance(provider, null, true)
            const cryptoDevTokenReserve = await getReserveOfCDTokens(provider)

            const { _removeEther, _removeCD } = await getTokensAfterRemove(
                provider,
                removeLPTokensWei,
                _ethBalance,
                cryptoDevTokenReserve
            )
            setRemoveEther(_removeEther)
            setRemoveCD(_removeCD)
        } catch (e) {
            console.error(e)
        }
    }
    return (
        <div className="w-full h-full mt-40 flex flex-col items-center">
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
                        <h1 className="text-base font-medium">Add Liquidity</h1>
                    </div>
                </div>
            </div>

            <div className="wrapper w-[50%] mt-7 flex flex-col justify-center items-center">
                <WalletIcon className="h-12 w-12 text-white" />
                {!lpBalance ? (
                    <h1 className="text-center text-white">
                        Your active V1 Liquidity Position <br /> will appear
                        here
                    </h1>
                ) : (
                    <>
                        <h1 className="text-center text-2xl">
                            You have: {ethers.utils.formatEther(lpBalance)} LP
                            Tokens
                        </h1>
                        {!removeDiv ? (
                            <div
                                className="connectBtn mt-3"
                                onClick={() => setRemoveDiv(true)}
                            >
                                Remove Tokens
                            </div>
                        ) : (
                            <div>
                                <div className="flex items-center border-1 p-0 border-2 text-black my-3 rounded-md bg-white border-[#291328] ">
                                    <input
                                        type={"text"}
                                        value={removeLPTokens}
                                        placeholder="Amount of LP tokens"
                                        onChange={async (e) => {
                                            setRemoveLPTokens(
                                                e.target.value || "0"
                                            )
                                            await _getTokensAfterRemove(
                                                e.target.value || "0"
                                            )
                                        }}
                                        className=" w-full outline-none bg-transparent rounded-md p-1
                                        focus:outline-none shadow-inner text-3xl "
                                    />
                                    <p
                                        className="mx-3 text-blue-600 cursor-pointer"
                                        onClick={async () => {
                                            setRemoveLPTokens(
                                                utils.formatEther(lpBalance)
                                            )
                                            await _getTokensAfterRemove(
                                                utils.formatEther(lpBalance)
                                            )
                                        }}
                                    >
                                        Max
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xl text-white">
                                        {`You will get ${utils.formatEther(
                                            removeCD
                                        )} Crypto Dev Tokens`}{" "}
                                    </p>
                                    <p className="text-xl text-white">{`You will get ${utils.formatEther(
                                        removeEther
                                    )} Eth`}</p>
                                </div>
                                <div
                                    className="connectBtn mt-3"
                                    onClick={_removeLiquidity}
                                >
                                    {!loading ? (
                                        "Remove Tokens"
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
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default LiquidityPosition
