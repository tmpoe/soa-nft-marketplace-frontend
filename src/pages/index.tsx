import { ContractHandlerFactory } from "@/adapters/contracts"
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
        const nft = await ContractHandlerFactory.getNftContractHandler()

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
    return (
        <div className="p-10">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
                Welcome to cat in the bag!
            </h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center">
                Let luck be on your side and get the cutest cat out of the bag!
            </p>
            <p className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
                See the latest cute cats who found their new home
            </p>
            <NftCardArrayLandingView posts={n} />
        </div>
    )
}
