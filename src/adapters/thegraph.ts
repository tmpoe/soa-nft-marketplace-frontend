import {
    GetLatestOwnerNftDocument,
    GetPaginatedListingsDocument,
    GetOwnerListingsDocument,
    GetOwnedNftsForOwnerDocument,
    execute,
    GetNLatestNftsDocument,
} from "../../.graphclient"

export default class NftMarketplaceEventDB {
    private constructor() {}

    static async getLatestNft(address: string) {
        const result = await execute(GetLatestOwnerNftDocument, { owner: address })
        if (!result.data) {
            throw new Error("Failed to get latest NFT")
        }
        return result.data.ownedNfts[0] ? result.data.ownedNfts[0].tokenId : undefined
    }
    static async getAPageOfListings(pageLength: number, currentPageNumber: number) {
        const result = await execute(GetPaginatedListingsDocument, {
            get: pageLength,
            skip: currentPageNumber * pageLength,
        })
        if (!result.data) {
            throw new Error(`Failed to get page of listings (pl ${pageLength})!`)
        }
        console.debug("QL listing ", result)
        return result.data.activeListings
    }

    static async getOwnerNftData(address: string) {
        const result = await execute(GetOwnedNftsForOwnerDocument, { owner: address })
        if (!result.data) {
            throw new Error("Failed to get NFTs")
        }
        console.log("owner nft data", result)
        return result.data.ownedNfts
    }

    static async getOwnerListedNfts(address: string) {
        const result = await execute(GetOwnerListingsDocument, { owner: address })
        if (!result.data) {
            throw new Error("Failed to get NFTs")
        }
        return result.data.activeListings
    }

    static async getNLatestNfts(n: number) {
        const result = await execute(GetNLatestNftsDocument, { n: 10 })
        if (!result.data) {
            throw new Error("Failed to get latest NFTs")
        }
        console.log("latest nfts", result)
        return result.data.ownedNfts
    }
}
