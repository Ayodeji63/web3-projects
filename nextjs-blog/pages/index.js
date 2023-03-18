import Head from "next/head"
import "../styles/Home.module.css"
import Header from "./components/Header"
import SwapBoard from "./components/SwapBoard"

export default function Home() {
    return (
        <div className="body bg-[#111524] flex flex-col">
            <Head>
                <title>Uniswap</title>
                <link rel="icon" href="/uniswap.webp" />
            </Head>

            <main>
                <Header />

                <SwapBoard />
            </main>
        </div>
    )
}
