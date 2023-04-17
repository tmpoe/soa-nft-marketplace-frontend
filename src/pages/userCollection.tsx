import { useAccount } from "wagmi"
import { GetOwnerNftsDocument, execute } from "../../.graphclient"
import { useState } from "react"

export default async function UserCollection() {
    const { address } = await useAccount()
    const [nfts, setNfts] = useState([])

    async function getOwnerNfts() {
        const result = await execute(GetOwnerNftsDocument, { owner: address })
        if (!result) {
            throw new Error("Failed to get NFTs")
        }
        setNfts(result.data.nftMinteds)
    }
    await getOwnerNfts()

    return <div>Your Nfts</div>
}
