import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { createClient, configureChains, mainnet, WagmiConfig } from "wagmi"
import { publicProvider } from "wagmi/providers/public"
import Layout from "@/components/Layout"

const { provider, webSocketProvider } = configureChains([mainnet], [publicProvider()])

const client = createClient({
    provider,
    webSocketProvider,
    autoConnect: true,
})

export default function App({ Component, pageProps }: AppProps) {
    return (
        <WagmiConfig client={client}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </WagmiConfig>
    )
}
