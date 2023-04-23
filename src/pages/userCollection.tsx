import { useAccount } from "wagmi"
import { GetOwnerNftsDocument, execute } from "../../.graphclient"
import { useEffect, useState } from "react"
import { useDeepCompareEffect } from "react-use"
import NftCard from "@/components/NftCard"
import web3 from "../../provider/web3"
import contracts from "../../constants/abi/contracts.json"
import { AbiItem } from "web3-utils"
import getTokenMetadata from "@/adapters/ipfs"
import { FullTokenData, NFTCardElement, OnChainTokenData } from "@/types/nft"
const IPFS_URL = "https://ipfs.io/ipfs/"
// TODO do not duplicate backend data types

export default function UserCollection() {
    const { address } = useAccount()
    const [onChainNftData, setOnChainNftData] = useState<OnChainTokenData[]>([])
    const [fullNftData, setFullNftData] = useState<FullTokenData[]>([])

    async function getOwnerNftData() {
        const result = await execute(GetOwnerNftsDocument, { owner: address })
        if (!result) {
            throw new Error("Failed to get NFTs")
        }
        setOnChainNftData(result.data.nftMinteds)
    }

    async function getOwnerNfts() {
        const chainId: number = await web3.eth.getChainId()
        const nftArtifact =
            contracts[chainId.toString() as keyof typeof contracts][0]["contracts"]["Nft"]

        const nftContract = new web3.eth.Contract(
            nftArtifact!.abi as AbiItem[], // https://github.com/web3/web3.js/issues/3310
            nftArtifact!.address
        )

        // get owner nfts
        // https://ethereum.stackexchange.com/questions/68438/erc721-how-to-get-the-owned-tokens-of-an-address
        onChainNftData.map(async (data) => {
            const uri = await nftContract.methods.tokenURI(data.tokenId).call()
            const currentTokenMetadata = await getTokenMetadata(uri)
            setFullNftData((currentState) => [
                ...currentState,
                { ...currentTokenMetadata, ...data },
            ])
        })
        console.log("User token fullNftData: ", fullNftData)
    }

    useDeepCompareEffect(() => {
        getOwnerNftData()
    }, [])

    useDeepCompareEffect(() => {
        getOwnerNfts()
    }, [onChainNftData])

    console.log("fullNftData", fullNftData)

    let n: NFTCardElement[] = []
    fullNftData.map((data, index) => {
        n.push({
            owner: data.owner,
            id: data.tokenId,
            image: IPFS_URL + data.imageLocation,
            attributes: data.attributes,
        })
    })
    console.log("n", n)
    n.sort((a, b) => (a.id > b.id ? -1 : 1))
    return <NftCard posts={n} />
}
