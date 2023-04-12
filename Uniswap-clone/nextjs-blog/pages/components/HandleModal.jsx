import { ArrowUpCircleIcon, XMarkIcon } from "@heroicons/react/24/outline"
import React, { useContext, useState } from "react"
import { ClipLoader } from "react-spinners"
import { HookContext } from "../../context/hook"

const HandleModal = ({ ethSelected, ethValue, cdtValue, isSwaped }) => {
    const [color, setColor] = useState("#fff")
    const [loading, setLoading] = useState(true)
    const { showModal, setShowModal } = useContext(HookContext)
    const swapedEth = ethValue
    const swapedCDT = cdtValue
    const render = () => {
        if (!isSwaped) {
            return (
                <>
                    <div className="w-full flex flex-row-reverse mb-10">
                        <XMarkIcon
                            className="h-7 w-7 text-white flex cursor-pointer "
                            onClick={() => setShowModal(false)}
                        />
                    </div>
                    <ClipLoader
                        color={"blue"}
                        loading={loading}
                        size={70}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                        className="mb-7"
                    />
                    <p className="text-xl text-white">
                        Waiting For Confirmation...
                    </p>

                    <p className="text-xl text-white">
                        {ethSelected
                            ? `Swaping ${ethValue} ETH for ${cdtValue} CDT`
                            : `Swaping ${cdtValue} CDT for ${ethValue} ETH`}
                    </p>
                    <span className="text-sm mt-2">
                        Confirm this transaction in your wallet
                    </span>
                </>
            )
        } else {
            return (
                <>
                    <p className="text-2xl text-center text-white mt-10">
                        Transaction Completed
                    </p>
                    <ArrowUpCircleIcon className="h-14 w-14 text-blue-600 mt-5" />
                    <div
                        className="swapBtn bg-[#0152a9] mt-5"
                        onClick={() => setShowModal(false)}
                    >
                        Close
                    </div>
                </>
            )
        }
    }
    return (
        <div className="before z-10 absolute justify-center flex w-screen h-screen">
            <div
                className="h-[40%] w-[25%] flex justify-start items-center mt-60 flex-col border-[2px]
            border-[#50596d] rounded-2xl p-4 bg-[#0b111c] duration-150 transition-all "
            >
                {render()}
            </div>
        </div>
    )
}

export default HandleModal
