import { FullTokenData, Listing, ListingTokenData, NFTCardElement } from "@/types/nft"
import { useEffect, useState } from "react"
import { ContractHandlerFactory } from "@/adapters/contracts"
import { useDeepCompareEffect } from "react-use"
import getTokenMetadata from "@/adapters/ipfs"
import { IPFS_URL } from "@/utils/constants"
import { useAccount } from "wagmi"
import NftMarketplaceEventDB from "@/adapters/thegraph"
import NftCardArrayListingView from "@/components/NftViews/NftCardArrayListingView"

export default function CatMarket({
    fullNftData,
    ownerListings,
}: {
    fullNftData: FullTokenData[]
    ownerListings: Listing[]
}) {
    const { address } = useAccount()
    console.log("observerAddress: ", address)
    const [listingsPaginated, setListingsPaginated] = useState<Listing[]>([])
    const [fullNftDataAll, setFullNftDataAll] = useState<ListingTokenData[]>([])
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    async function getAPageOfListings(pageLength: number, currentPageNumber: number) {
        try {
            const paginated = await NftMarketplaceEventDB.getAPageOfListings(
                pageLength,
                currentPageNumber
            )
            if (paginated) {
                setListingsPaginated(paginated)
            }
            console.log("paginated listings: ", listingsPaginated)
        } catch (error) {
            console.error(error)
        }
    }

    async function getFullNftData() {
        const nft = await ContractHandlerFactory.getNftContractHandler()

        setFullNftDataAll([])
        listingsPaginated.map(async (listing) => {
            try {
                const uri = await nft.getTokenURI(parseInt(listing.tokenId))
                const currentTokenMetadata = await getTokenMetadata(uri)
                console.debug("currentTokenMetadata: ", listingsPaginated)
                console.debug(listing)

                setFullNftDataAll((currentState) => [
                    ...currentState,
                    { ...currentTokenMetadata, ...listing },
                ])
            } catch (error) {
                console.error(error)
            }
        })
        console.debug("listing: ", listingsPaginated)
        console.debug("FullNftData: ", fullNftDataAll)
    }

    useEffect(() => {
        getAPageOfListings(5, 0)
        setIsLoaded(true)
    }, [])

    useDeepCompareEffect(() => {
        getFullNftData()
    }, [listingsPaginated])

    let n: NFTCardElement[] = []
    fullNftDataAll.map((data, index) => {
        n.push({
            owner: data.owner,
            id: data.tokenId!,
            image: IPFS_URL + data.imageLocation,
            attributes: data.attributes,
            price: data.price,
            isListed: true,
        })
    })
    console.debug("posts", n)
    if (!address) {
        return (
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center py-10">
                Please connect your wallet.
            </p>
        )
    }

    return (
        <div>
            {n.length > 0 && <NftCardArrayListingView posts={n} observerAddress={address!} />}
            {n.length === 0 && !isLoaded && (
                <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center py-10">
                    Loading...
                </p>
            )}
            {n.length === 0 && isLoaded && (
                <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center py-10">
                    No Cats to buy at the moment, come back later!
                </p>
            )}
        </div>
    )
}
