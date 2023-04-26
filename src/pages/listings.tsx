import { Listing, ListingTokenData, NFTCardElement } from "@/types/nft"
import { useEffect, useState } from "react"
import { GetPaginatedListingsDocument, execute } from "../../.graphclient"
import NftCard from "@/components/NftCard"
import { ContractHandler } from "@/utils/contracts"
import { useDeepCompareEffect } from "react-use"
import Nft from "@/adapters/nft"
import getTokenMetadata from "@/adapters/ipfs"
import { IPFS_URL } from "@/utils/constants"

export default function listings() {
    const [listingsPaginated, setListingsPaginated] = useState<Listing[]>([])
    const [fullNftData, setFullNftData] = useState<ListingTokenData[]>([])

    async function getAPageOfListings(pageLength: number) {
        const result = await execute(GetPaginatedListingsDocument, {
            get: pageLength,
            skip: pageLength,
        })
        if (!result) {
            throw new Error(`Failed to get page of listings (pl ${pageLength})!`)
        }
        console.debug("QL listing ", result)
        setListingsPaginated(result.data.nftListeds)
    }

    async function getFullNftData() {
        const contractHandler = await ContractHandler.getContractHandler()
        const nftContract = await contractHandler.getNftContract()
        const nft = new Nft(nftContract)

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
        getAPageOfListings(1)
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
        })
    })
    console.debug(n)
    return <NftCard posts={n} />
}
