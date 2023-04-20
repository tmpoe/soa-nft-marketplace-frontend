import { useAccount } from "wagmi"
import { GetOwnerNftsDocument, execute } from "../../.graphclient"
import { useEffect, useState } from "react"
import NftCard from "@/components/NftCard"
import web3 from "../../provider/web3"
import contracts from "../../constants/abi/contracts.json"
import { AbiItem } from "web3-utils"

export default function UserCollection() {
    const { address } = useAccount()
    const [nftData, setNftData] = useState([])
    const [nfts, setNfts] = useState([])

    async function getOwnerNftData() {
        const result = await execute(GetOwnerNftsDocument, { owner: address })
        if (!result) {
            throw new Error("Failed to get NFTs")
        }
        setNftData(result.data.nftMinteds)
    }

    async function getOwnerNfts() {
        const chainId: number = await web3.eth.getChainId()
        const nftArtifact =
            contracts[chainId.toString() as keyof typeof contracts][0]["contracts"]["Nft"]

        const nftContract = new web3.eth.Contract(
            nftArtifact!.abi as AbiItem[], // https://github.com/web3/web3.js/issues/3310
            nftArtifact!.address
        )
        try {
            // get owner nfts
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getOwnerNftData()
        getOwnerNfts()
    }, [])
    console.log(nftData)
    const n = [
        {
            owner: nftData[0]["owner"],
            id: nftData[0]["tokenId"],
            image: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
        },
        {
            owner: nftData[1]["owner"],
            id: nftData[1]["tokenId"],
            image: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
        },
        {
            owner: nftData[0]["owner"],
            id: nftData[0]["tokenId"],
            image: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
        },
        {
            owner: nftData[1]["owner"],
            id: nftData[1]["tokenId"],
            image: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
        },
        {
            owner: nftData[0]["owner"],
            id: nftData[0]["tokenId"],
            image: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
        },
        {
            owner: nftData[1]["owner"],
            id: nftData[1]["tokenId"],
            image: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
        },
    ]
    return <NftCard posts={n} />
}
