import React, { useState } from "react"
import Header from "./components/Header"
import Image from "next/image"
import { Box, Tab, Tabs } from "@mui/material"
import { TabPanel } from "@mui/lab"
import Overview from "./components/Tabs/Overview"
import Bids from "./components/Tabs/Bids"
import History from "./components/Tabs/History"
// import {  } from "../";
export const Bid = () => {
    const [page, setPage] = useState("Overview")

    return (
        <section className="min-h-screen min-w-screen mb-40">
            <Header />
            {/* first-div  */}
            <div className="w-[50%] px-5 ml-40 overflow-hidden h-full flex flex-col items-center mt-40">
                <div className="h-[70%] w-[33%] rounded-lg flex flex-col justify-center items-center">
                    <div className="h-full bg-blue-500 w-full rounded-lg">
                        <Image
                            src="/Fotor_AI.png"
                            width={1000}
                            height={1000}
                            className="h-full rounded-lg w-full"
                        />
                    </div>

                    <div className="flex w-full h-12 py-1 bg-[#111524] rounded-2xl justify-evenly mt-5">
                        <div
                            className={`nav ${
                                page == "Overview" ? `active` : ``
                            }`}
                            onClick={() => setPage("Overview")}
                        >
                            <p>Overview</p>
                        </div>

                        <div
                            className={`nav ${page == "Bids" ? "active" : ""}`}
                            onClick={() => setPage("Bids")}
                        >
                            <p>Bids</p>
                        </div>

                        <div
                            className={`nav ${
                                page == "History" ? "active" : ""
                            }`}
                            onClick={() => setPage("History")}
                        >
                            <p>History</p>
                        </div>
                    </div>
                </div>
                {page == "Overview" && <Overview />}
                {page == "Bids" && <Bids />}
                {page == "History" && <History />}
            </div>
            {/* second-div  */}
            <div></div>
        </section>
    )
}

export default Bid
