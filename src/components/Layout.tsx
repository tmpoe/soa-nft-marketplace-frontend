import Header from "./Header"
import { EventEmitter, Events } from "./EventEmitter"
import React, { useEffect } from "react"
import { GetLatestOwnerNftDocument, GetLatestOwnerNftQuery, execute } from "../../.graphclient"
import { useAccount } from "wagmi"
import showToast from "./Toast"

export default function Layout({ children }: { children: React.ReactNode }) {
    const { address } = useAccount()
    let timer: any

    const [latestTokenid, setLatestTokenid] = React.useState<string>()

    async function getLatestNft() {
        const result = await execute(GetLatestOwnerNftDocument, { owner: address })
        if (!result) {
            throw new Error("Failed to get latest NFT")
        }
        return result.data.nftMinteds[0].tokenId
    }

    async function initLatestNft() {
        try {
            const tokenId = await getLatestNft()
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
                    const newTokenId = await getLatestNft()
                    if (newTokenId != latestTokenid) {
                        console.debug("Latest nft changed!")
                        showToast()
                    }
                    setLatestTokenid(newTokenId)
                } catch (error) {
                    console.debug(error)
                }
            }, 1000)
    }

    useEffect(() => {
        initLatestNft()
    }, [])

    useEffect(() => {
        updateLatestNft()
        return () => clearInterval(timer)
    }, [latestTokenid])
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}
