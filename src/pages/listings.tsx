import { Listing, ListingTokenData, NFTCardElement } from "@/types/nft"
import { useEffect, useState } from "react"
import { ContractHandlerFactory } from "@/adapters/contracts"
import { useDeepCompareEffect } from "react-use"
import getTokenMetadata from "@/adapters/ipfs"
import { IPFS_URL } from "@/utils/constants"
import { useAccount } from "wagmi"
import NftMarketplaceEventDB from "@/adapters/thegraph"
import NftCardArrayListingView from "@/components/NftCardArrayListingView"

export default function listings() {
    const { address } = useAccount()
    console.log("observerAddress: ", address)
    const [listingsPaginated, setListingsPaginated] = useState<Listing[]>([])
    const [fullNftData, setFullNftData] = useState<ListingTokenData[]>([])

    async function getAPageOfListings(pageLength: number, currentPageNumber: number) {
        try {
            setListingsPaginated(
                await NftMarketplaceEventDB.getAPageOfListings(pageLength, currentPageNumber)
            )
            console.log("paginated listings: ", listingsPaginated)
        } catch (error) {
            console.error(error)
        }
    }

    async function getFullNftData() {
        const nft = await ContractHandlerFactory.getNftContractHandler()

        setFullNftData([])
        listingsPaginated.map(async (listing) => {
            try {
                const uri = await nft.getTokenURI(parseInt(listing.tokenId))
                const currentTokenMetadata = await getTokenMetadata(uri)
                console.debug("currentTokenMetadata: ", listingsPaginated)
                console.debug(listing)

                setFullNftData((currentState) => [
                    ...currentState,
                    { ...currentTokenMetadata, ...listing },
                ])
            } catch (error) {
                console.error(error)
            }
        })
        console.debug("listing: ", listingsPaginated)
        console.debug("FullNftData: ", fullNftData)
    }

    useEffect(() => {
        getAPageOfListings(5, 0)
    }, [])

    useDeepCompareEffect(() => {
        getFullNftData()
    }, [listingsPaginated])

    let n: NFTCardElement[] = []
    fullNftData.map((data, index) => {
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
    return <NftCardArrayListingView posts={n} observerAddress={address!} />
}
