import { ContractHandlerFactory } from "@/adapters/contracts"
import getTokenMetadata from "@/adapters/ipfs"
import NftMarketplaceEventDB from "@/adapters/thegraph"
import NftCardArrayLandingView from "@/components/NftViews/NftCardArrayLandingView"
import { FullTokenData, Listing, NFTCardElement, OnChainTokenData } from "@/types/nft"
import { IPFS_URL } from "@/utils/constants"
import { useEffect, useState } from "react"
import { useDeepCompareEffect } from "react-use"
import Link from "next/link"
import { Spinner } from "@/components/Spinner"

export default function Index() {
    const [onChainNftData, setOnChainNftData] = useState<OnChainTokenData[]>([])
    const [fullNftDataPreview, setFullNftDataPreview] = useState<FullTokenData[]>([])
    const [numQuery, setNumQuery] = useState<number>(0)

    async function getNftData() {
        try {
            setOnChainNftData(await NftMarketplaceEventDB.getNLatestNfts(10))
            setNumQuery(numQuery + 1)
            console.debug("Got the data boss", onChainNftData)
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
                setFullNftDataPreview((currentState) => [
                    ...currentState,
                    { ...currentTokenMetadata, ...data },
                ])
            } catch (error) {
                console.error(error)
            }
        })
        console.debug("Latest token fullNftData: ", fullNftDataPreview)
    }

    useEffect(() => {
        getNftData()
    }, [])

    useDeepCompareEffect(() => {
        getLatestNfts()
    }, [onChainNftData])

    let n: NFTCardElement[] = []
    fullNftDataPreview.map((data, index) => {
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
                Welcome to Cat in the Summoning Bag!
            </h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center">
                Let luck be on your side and get the cutest Cat out of the Summoning Bag!
            </p>

            {n.length > 0 && (
                <div>
                    <p className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
                        See the latest cute Cats who found their new home
                    </p>
                    <NftCardArrayLandingView posts={n} />
                </div>
            )}
            {n.length == 0 && numQuery == 1 && <Spinner />}
            {n.length == 0 && numQuery > 1 && (
                <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center">
                    No Cats have been summoned yet. Be the first one to{" "}
                    <Link href="summon" className="text-teal-600">
                        summon
                    </Link>
                    !
                </p>
            )}
        </div>
    )
}
