import { useAccount } from "wagmi"
import { GetOwnerNftsDocument, execute } from "../../.graphclient"
import { useEffect, useState } from "react"
import NftCard from "@/components/NftCard"

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
    const n = [
        {
            owner: nfts[0]["owner"],
            hash: nfts[0]["tokenId"],
            image: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
        },
        {
            owner: nfts[1]["owner"],
            hash: nfts[1]["tokenId"],
            image: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
        },
        {
            owner: nfts[0]["owner"],
            hash: nfts[0]["tokenId"],
            image: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
        },
        {
            owner: nfts[1]["owner"],
            hash: nfts[1]["tokenId"],
            image: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
        },
        {
            owner: nfts[0]["owner"],
            hash: nfts[0]["tokenId"],
            image: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
        },
        {
            owner: nfts[1]["owner"],
            hash: nfts[1]["tokenId"],
            image: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
        },
    ]
    return <NftCard posts={n} />
}
