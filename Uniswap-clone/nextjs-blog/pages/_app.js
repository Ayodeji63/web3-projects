import "../styles/globals.css"
import { WagmiConfig, createClient, configureChains, goerli } from "wagmi"

import { avalanche, bsc, mainnet, sepolia } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"
import { HookProvider, nftDataContext } from "../context/hook"
import { useState } from "react"

function MyApp({ Component, pageProps }) {
    const [clickedNFT, setClickedNFT] = useState([])
    return (
        <HookProvider>
            <nftDataContext.Provider value={[clickedNFT, setClickedNFT]}>
                <Component {...pageProps} />
            </nftDataContext.Provider>
        </HookProvider>
    )
}

export default MyApp
