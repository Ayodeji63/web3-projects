import "../styles/globals.css"
import {
    WagmiConfig,
    createClient,
    configureChains,
    mainnet,
    goerli,
    sepolia,
} from "wagmi"
import { publicProvider } from "wagmi/providers/public"

const { chains, provider, webSocketProvider } = configureChains(
    [goerli],
    [publicProvider()]
)

const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
})
function MyApp({ Component, pageProps }) {
    return (
        <WagmiConfig client={client}>
            <Component {...pageProps} />
        </WagmiConfig>
    )
}

export default MyApp
