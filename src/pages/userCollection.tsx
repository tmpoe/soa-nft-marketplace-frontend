import { useAccount } from "wagmi"
import { GetOwnerNftsDocument, execute } from "../../.graphclient"
import { useState } from "react"
import { useDeepCompareEffect } from "react-use"
import NftCard from "@/components/NftCard"
import getTokenMetadata from "@/adapters/ipfs"
import { FullTokenData, NFTCardElement, OnChainTokenData } from "@/types/nft"
import { IPFS_URL } from "@/utils/constants"
import { ContractHandler } from "@/utils/contracts"
import Nft from "@/adapters/nft"
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
        const contractHandler = await ContractHandler.getContractHandler()
        const nftContract = await contractHandler.getNftContract()
        const nft = new Nft(nftContract)

        // get owner nfts
        // https://ethereum.stackexchange.com/questions/68438/erc721-how-to-get-the-owned-tokens-of-an-address
        onChainNftData.map(async (data) => {
            try {
                const uri = await nft.getTokenURI(parseInt(data.tokenId))
                const currentTokenMetadata = await getTokenMetadata(uri)
                setFullNftData((currentState) => [
                    ...currentState,
                    { ...currentTokenMetadata, ...data },
                ])
            } catch (error) {
                console.error(error)
            }
        })
        console.debug("User token fullNftData: ", fullNftData)
    }

    useDeepCompareEffect(() => {
        getOwnerNftData()
    }, [])

    useDeepCompareEffect(() => {
        getOwnerNfts()
    }, [onChainNftData])

    console.debug("fullNftData", fullNftData)

    let n: NFTCardElement[] = []
    fullNftData.map((data, index) => {
        n.push({
            owner: data.owner,
            id: data.tokenId,
            image: IPFS_URL + data.imageLocation,
            attributes: data.attributes,
        })
    })
    console.debug("n", n)
    n.sort((a, b) => (a.id > b.id ? -1 : 1))
    return <NftCard posts={n} />
}
