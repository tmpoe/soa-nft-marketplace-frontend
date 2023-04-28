import { Listing, ListingTokenData, NFTCardElement } from "@/types/nft"
import { useEffect, useState } from "react"
import { GetPaginatedListingsDocument, execute } from "../../.graphclient"
import NftCard from "@/components/NftCard"
import { ContractHandler } from "@/adapters/contracts"
import { useDeepCompareEffect } from "react-use"
import Nft from "@/adapters/nft"
import getTokenMetadata from "@/adapters/ipfs"
import { IPFS_URL } from "@/utils/constants"
import { useAccount } from "wagmi"

export default function listings() {
    const { address } = useAccount()

    const [listingsPaginated, setListingsPaginated] = useState<Listing[]>([])
    const [fullNftData, setFullNftData] = useState<ListingTokenData[]>([])

    async function getAPageOfListings(pageLength: number, currentPageNumber: number) {
        const result = await execute(GetPaginatedListingsDocument, {
            get: pageLength,
            skip: currentPageNumber * pageLength,
        })
        if (!result) {
            throw new Error(`Failed to get page of listings (pl ${pageLength})!`)
        }
        console.debug("QL listing ", result)
        setListingsPaginated(result.data.nftListeds)
    }

    async function getFullNftData() {
        const nft = new Nft(await ContractHandler.fetchNftContract())

        setFullNftData([])
        listingsPaginated.map(async (listing) => {
            try {
                const uri = await nft.getTokenURI(parseInt(listing.nftId))
                const currentTokenMetadata = await getTokenMetadata(uri)

                setFullNftData((currentState) => [
                    ...currentState,
                    { ...currentTokenMetadata, ...listing },
                ])
            } catch (error) {
                console.error(error)
            }
        })
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
            id: data.tokenId,
            image: IPFS_URL + data.imageLocation,
            attributes: data.attributes,
            price: data.price,
            isListed: true,
        })
    })
    console.debug(n)
    return <NftCard posts={n} observerAddress={address!} />
}
