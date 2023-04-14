import Header from "./Header"
import web3 from "../../provider/web3"
import React, { useEffect } from "react"
import { GetLatestOwnerNftDocument, GetLatestOwnerNftQuery, execute } from "../../.graphclient"
import { useAccount } from "wagmi"

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
            console.debug("address", address)
            console.debug("initLatestNft", tokenId)
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
                    }
                    setLatestTokenid(newTokenId)

                    console.debug("address", address)
                    console.debug("latest", latestTokenid)
                    console.debug("new", newTokenId)
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
