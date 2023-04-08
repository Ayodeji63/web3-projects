import { Cog8ToothIcon } from "@heroicons/react/24/outline"
import { ArrowDownIcon, ChevronDownIcon } from "@heroicons/react/24/solid"
import { BigNumber, ethers, utils } from "ethers"
import Image from "next/image"
import React, { useContext, useState } from "react"
import { ClipLoader } from "react-spinners"
import { useAccount, useBalance, useConnect, useEnsName } from "wagmi"
import { InjectedConnector } from "wagmi/connectors/injected"
import { HookContext } from "../../context/hook"
import { getEtherBalance } from "../../utils/Exchange/getAmounts"
import {
    getAmountOfTokensReceivedFromSwap,
    swapTokens,
} from "../../utils/Exchange/swap"
import HandleModal from "./HandleModal"
import Input from "./Input"
import Swap from "./Swap"
import Button from "./Button"

const SwapBoard = () => {
    const zero = BigNumber.from(0)
    const [changeToken, setChangeToken] = useState(false)
    const [ethSelected, setEthSelected] = useState(true)
    const [swapAmount, setSwapAmount] = useState("")
    const [loading, setLoading] = useState(false)
    const [color, setColor] = useState("#fff")
    const [tokenToBeReceivedAfterSwap, setTokenToBeReceivedAfterSwap] =
        useState(zero)
    const [isSwaped, setIsSwaped] = useState(false)
    const {
        ethBalance,
        cdBalance,
        connectWallet,
        walletConnected,
        provider,
        reserveCD,
        getAmounts,
        showModal,
        setShowModal,
    } = useContext(HookContext)
    const tR = utils.formatEther(tokenToBeReceivedAfterSwap).substring(0, 7)
    // const ethValue = ethSelected ? swapAmount : tR
    // const setEth = ethSelected ? setSwapAmount : undefined
    const _swapTokens = async () => {
        try {
            const swapAmountWei = utils.parseEther(swapAmount)
            setIsSwaped(false)
            if (!swapAmountWei.eq(zero)) {
                const signer = await provider.getSigner()
                setShowModal(true)
                setLoading(true)
                await swapTokens(
                    signer,
                    swapAmountWei,
                    tokenToBeReceivedAfterSwap,
                    ethSelected
                )
                await getAmounts()
                setSwapAmount("")
                setTokenToBeReceivedAfterSwap(zero)
                setLoading(false)
                setIsSwaped(true)
            }
        } catch (e) {
            console.error(e)
            setSwapAmount("")
            setTokenToBeReceivedAfterSwap(zero)
            setShowModal(false)
        }
    }

    const _getAmountOfTokenReceivedFromSwap = async (_swapAmount) => {
        try {
            const _swapAmountWei = utils.parseEther(_swapAmount.toString())
            if (!_swapAmountWei.eq(zero)) {
                const _ethBalance = await getEtherBalance(provider, null, true)
                const amountOfTokens = await getAmountOfTokensReceivedFromSwap(
                    _swapAmountWei,
                    provider,
                    ethSelected,
                    _ethBalance,
                    reserveCD
                )
                setTokenToBeReceivedAfterSwap(amountOfTokens)
            } else {
                setTokenToBeReceivedAfterSwap(zero)
            }
        } catch (e) {
            console.error(e)
        }
    }

    let cdtValue, ethValue, setEth, setCdt, getAmtCdt, getAmtEth
    if (ethSelected) {
        cdtValue = tR
        ethValue = swapAmount
        setEth = setSwapAmount
        setCdt = undefined
        getAmtEth = _getAmountOfTokenReceivedFromSwap
        getAmtCdt = undefined
    } else {
        cdtValue = swapAmount
        ethValue = tR
        setEth = undefined
        setCdt = setSwapAmount
        getAmtEth = undefined
        getAmtCdt = _getAmountOfTokenReceivedFromSwap
    }
    const tokens = [
        {
            name: "ETH",
            src: "/ethre.webp",
            token: ethBalance,
            value: ethValue.substring(0, 5),
            setValue: setEth,
            select: ethSelected,
            getAmt: getAmtEth,
        },
        {
            name: "CDT",
            src: "/learn.jpg",
            token: cdBalance,
            select: ethSelected,
            value: cdtValue.substring(0, 5),
            setValue: setCdt,
            getAmt: getAmtCdt,
        },
    ]

    const toggle = () => {
        setChangeToken((prev) => !prev)
        setEthSelected((prev) => !prev)
        setSwapAmount("")
        setTokenToBeReceivedAfterSwap(zero)
    }
    console.log(ethSelected)

    return (
        <div className="section relative">
            <div className="lg:w-[30%] w-[50%]  wrapper">
                {/* first div  */}
                <div className="flex w-full justify-between items-center">
                    <h1 className="text-lg text-white font-medium">Swap</h1>
                    <Cog8ToothIcon className="icon" />
                </div>
                {/* second div:: inputs  */}
                <div className="w-full mt-5">
                    <Swap param={!changeToken ? tokens[0] : tokens[1]} />

                    <Swap param={!changeToken ? tokens[1] : tokens[0]} />
                </div>
                {/* last div: connect button  */}
                {!walletConnected ? (
                    <div className="connectBtn mt-3" onClick={connectWallet}>
                        {!loading ? (
                            "Connect Wallet"
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
                ) : (
                    <Button click={_swapTokens} text={"Swap Token"} />
                )}

                {/* overflow: button  */}
                <div>
                    <ArrowDownIcon
                        className="h-9 w-9 cursor-pointer absolute top-[42%] left-[45%] bg-[#253348] p-1 border-[#0b131c] border-4 rounded-xl hover:bg-[#324158]"
                        onClick={toggle}
                    />
                </div>
            </div>
            {showModal && (
                <HandleModal
                    ethSelected={ethSelected}
                    ethValue={ethValue}
                    cdtValue={cdtValue}
                    isSwaped={isSwaped}
                />
            )}
        </div>
    )
}

export default SwapBoard
