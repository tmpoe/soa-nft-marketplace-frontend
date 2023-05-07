import { ContractHandler } from "@/adapters/contracts"
import getTokenMetadata from "@/adapters/ipfs"
import NftMarketplaceEventDB from "@/adapters/thegraph"
import NftCardArrayLandingView from "@/components/NftCardArrayLandingView"
import { FullTokenData, NFTCardElement, OnChainTokenData } from "@/types/nft"
import { IPFS_URL } from "@/utils/constants"
import { useState } from "react"
import { useDeepCompareEffect } from "react-use"

export default function Index() {
    const [onChainNftData, setOnChainNftData] = useState<OnChainTokenData[]>([])
    const [fullNftData, setFullNftData] = useState<FullTokenData[]>([])

    async function getNftData() {
        try {
            setOnChainNftData(await NftMarketplaceEventDB.getNLatestNfts(10))
            console.log("Got the data boss", onChainNftData)
        } catch (error) {
            console.error(error)
        }
    }

    async function getLatestNfts() {
        const nft = await ContractHandler.getNftContractHandler()

        onChainNftData.map(async (data) => {
            try {
                const uri = await nft.getTokenURI(parseInt(data.tokenId!))
                const currentTokenMetadata = await getTokenMetadata(uri)
                setFullNftData((currentState) => [
                    ...currentState,
                    { ...currentTokenMetadata, ...data },
                ])
            } catch (error) {
                console.error(error)
            }
        })
        console.debug("Latest token fullNftData: ", fullNftData)
    }

    useDeepCompareEffect(() => {
        getNftData()
    }, [])

    useDeepCompareEffect(() => {
        getLatestNfts()
    }, [onChainNftData])

    let n: NFTCardElement[] = []
    fullNftData.map((data, index) => {
        n.push({
            owner: data.owner,
            id: data.tokenId!,
            image: IPFS_URL + data.imageLocation,
            attributes: data.attributes,
            isListed: false,
        })
    })
    console.debug("n", n)
    n.sort((a, b) => (a.id > b.id ? -1 : 1))
    return <NftCardArrayLandingView posts={n} />
}
