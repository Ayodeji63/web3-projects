import { BoltIcon } from "@heroicons/react/24/solid"
import React from "react"

const History = () => {
    return (
        <div className="mt-10 scrollbar-hide w-full mb-40">
            <div className="w-full h-[200px] border-[#1c2231] border rounded-lg flex flex-col mt-5 justify-center items-center">
                <BoltIcon className="h-10" />
                <h1 className="text-xl">No history entries found</h1>
            </div>
        </div>
    )
}

export default History
