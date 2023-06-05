import { Listing, ListingTokenData, NFTCardElement } from "@/types/nft"
import { useEffect, useState } from "react"
import { ContractHandlerFactory } from "@/adapters/contracts"
import { useDeepCompareEffect } from "react-use"
import getTokenMetadata from "@/adapters/ipfs"
import { IPFS_URL } from "@/utils/constants"
import { useAccount } from "wagmi"
import NftMarketplaceEventDB from "@/adapters/thegraph"
import NftCardArrayListingView from "@/components/NftViews/NftCardArrayListingView"
import { Spinner } from "@/components/Spinner"

export default function CatMarket() {
    const { address } = useAccount()
    console.debug("observerAddress: ", address)
    const [listings, setListings] = useState<Listing[]>([])
    const [fullNftDataAll, setFullNftDataAll] = useState<ListingTokenData[]>([])
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    async function getAPageOfListings(pageLength: number, currentPageNumber: number) {
        try {
            const listings = await NftMarketplaceEventDB.getListings()
            if (listings) {
                setListings(listings)
            }
            console.debug("listings: ", listings)
        } catch (error) {
            console.error(error)
        }
    }

    async function getFullNftData() {
        const nft = await ContractHandlerFactory.getNftContractHandler()

        setFullNftDataAll([])
        listings.map(async (listing) => {
            try {
                const uri = await nft.getTokenURI(parseInt(listing.tokenId))
                const currentTokenMetadata = await getTokenMetadata(uri)
                console.debug("currentTokenMetadata: ", listings)
                console.debug(listing)

                setFullNftDataAll((currentState) => [
                    ...currentState,
                    { ...currentTokenMetadata, ...listing },
                ])
            } catch (error) {
                console.error(error)
            }
        })
        console.debug("listing: ", listings)
        console.debug("FullNftData: ", fullNftDataAll)
    }

    useEffect(() => {
        getAPageOfListings(5, 0)
    }, [])

    useDeepCompareEffect(() => {
        const fetchData = async () => {
            await getFullNftData()
            setIsLoaded(true)
        }
        fetchData()
    }, [listings])

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
            {!isLoaded && (
                <div className="p-10">
                    <Spinner />
                </div>
            )}
            {n.length === 0 && isLoaded && (
                <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center py-10">
                    No Cats to buy at the moment, come back later!
                </p>
            )}
        </div>
    )
}
