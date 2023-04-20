import { useAccount } from "wagmi"
import { GetOwnerNftsDocument, execute } from "../../.graphclient"
import { useEffect, useState } from "react"

export default function UserCollection() {
    const { address } = useAccount()
    const [nfts, setNfts] = useState([])

    async function getOwnerNfts() {
        const result = await execute(GetOwnerNftsDocument, { owner: address })
        if (!result) {
            throw new Error("Failed to get NFTs")
        }
        setNfts(result.data.nftMinteds)
    }
    useEffect(() => {
        getOwnerNfts()
    }, [])
    console.log(nfts)
    return <div>Your Nfts</div>
}
