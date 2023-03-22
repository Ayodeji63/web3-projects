import "../styles/globals.css"
import { WagmiConfig, createClient, configureChains, goerli } from "wagmi"

import { avalanche, bsc, mainnet, sepolia } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"
import { HookProvider } from "../context/hook"

function MyApp({ Component, pageProps }) {
    return (
        <HookProvider>
            <Component {...pageProps} />
        </HookProvider>
    )
}

export default MyApp
