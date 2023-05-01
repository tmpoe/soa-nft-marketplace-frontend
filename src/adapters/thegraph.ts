import {
    GetLatestOwnerNftDocument,
    GetPaginatedListingsDocument,
    GetOwnerListingsDocument,
    GetOwnerNftsDocument,
    execute,
} from "../../.graphclient"

export default class NftMarketplaceEventDB {
    // DIRECT GRAPH BAD. USE STORE AND MAPPING
    private constructor() {}

    static async getLatestNft(address: string) {
        const result = await execute(GetLatestOwnerNftDocument, { owner: address })
        if (!result) {
            throw new Error("Failed to get latest NFT")
        }
        return result.data.nftMinteds[0].tokenId
    }
    static async getAPageOfListings(pageLength: number, currentPageNumber: number) {
        const result = await execute(GetPaginatedListingsDocument, {
            get: pageLength,
            skip: currentPageNumber * pageLength,
        })
        if (!result) {
            throw new Error(`Failed to get page of listings (pl ${pageLength})!`)
        }
        console.debug("QL listing ", result)
        return result.data.nftListeds
    }

    static async getOwnerNftData(address: string) {
        const result = await execute(GetOwnerNftsDocument, { owner: address })
        if (!result) {
            throw new Error("Failed to get NFTs")
        }
        return result.data.nftMinteds
    }

    static async getOwnerListedNfts(address: string) {
        const result = await execute(GetOwnerListingsDocument, { owner: address })
        if (!result) {
            throw new Error("Failed to get NFTs")
        }
        return result.data.nftListeds
    }
}
