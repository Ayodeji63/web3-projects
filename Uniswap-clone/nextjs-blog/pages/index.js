import Head from "next/head"
import { useContext } from "react"
import { HookContext } from "../context/hook"
import "../styles/Home.module.css"
import HandleModal from "./components/HandleModal"
import Header from "./components/Header"
import SwapBoard from "./components/SwapBoard"

export default function Home() {
    const { showModal, setShowModal } = useContext(HookContext)
    return (
        <div className=" flex flex-col relative scrollbar-hide overflow-hidden">
            <Head>
                <title>Uniswap</title>
                <link rel="icon" href="/uniswap.webp" />
            </Head>

            <main>
                <Header />

                <SwapBoard />
            </main>
            {/* {showModal && <HandleModal />} */}
        </div>
    )
}
