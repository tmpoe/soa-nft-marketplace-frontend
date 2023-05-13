import Header from "./Header"
import { EventEmitter, Events } from "./EventEmitter"
import React, { useEffect } from "react"
import { useAccount } from "wagmi"
import { toast } from "react-hot-toast"
import { InfoToaster } from "./InfoToast"
import NftMarketplaceEventDB from "@/adapters/thegraph"

export default function Layout({ children }: { children: React.ReactNode }) {
    const { address } = useAccount()
    let timer: any
    EventEmitter.subscribe(Events.WALLET_CONNECTED, (event) => setIsWalletConnected(true))

    const [latestTokenid, setLatestTokenid] = React.useState<string>()
    const [isWalletConnected, setIsWalletConnected] = React.useState<boolean>(false)

    async function initLatestNft() {
        try {
            const tokenId = await NftMarketplaceEventDB.getLatestNft(address!)
            setLatestTokenid(tokenId)
        } catch (error) {
            console.debug(error)
        }
    }

    function updateLatestNft() {
        timer =
            !timer &&
            setInterval(async () => {
                try {
                    const newTokenId = await NftMarketplaceEventDB.getLatestNft(address!)
                    console.log("Latest nft: ", newTokenId, latestTokenid)
                    if (newTokenId != latestTokenid && isWalletConnected) {
                        console.log("Latest nft changed!")
                        EventEmitter.dispatch(Events.MINTING_FINISHED, {})
                        toast.success("You acquired a new NFT!")
                    }
                    setLatestTokenid(newTokenId)
                } catch (error) {
                    console.error(error)
                }
            }, 1000)
    }

    useEffect(() => {
        initLatestNft()
    }, [isWalletConnected])

    useEffect(() => {
        updateLatestNft()
        return () => clearInterval(timer)
    }, [latestTokenid])
    return (
        <div>
            <Header />
            {children}
            <InfoToaster />
        </div>
    )
}
