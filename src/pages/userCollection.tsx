import { useAccount } from "wagmi"
import { useEffect, useState } from "react"
import { useDeepCompareEffect } from "react-use"
import getTokenMetadata from "@/adapters/ipfs"
import { FullTokenData, Listing, NFTCardElement, OnChainTokenData } from "@/types/nft"
import { IPFS_URL } from "@/utils/constants"
import { ContractHandlerFactory } from "@/adapters/contracts"
import NftMarketplaceEventDB from "@/adapters/thegraph"
import NftCardArrayCollectionView from "@/components/NftViews/NftCardArrayCollectionView"
// TODO do not duplicate backend data types

export default function UserCollection() {
    const { address } = useAccount()
    const [onChainNftData, setOnChainNftData] = useState<OnChainTokenData[]>([])
    const [fullNftData, setFullNftData] = useState<FullTokenData[]>([])
    const [ownerListings, setOwnerListings] = useState<Listing[]>([])

    async function getOwnerNftData() {
        try {
            const data = await NftMarketplaceEventDB.getOwnerNftData(address!)

            if (data) {
                setOnChainNftData(await NftMarketplaceEventDB.getOwnerNftData(address!))
                console.log("Got the data boss", onChainNftData)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async function getOwnerNfts() {
        const nft = await ContractHandlerFactory.getNftContractHandler()

        // get owner nfts
        // https://ethereum.stackexchange.com/questions/68438/erc721-how-to-get-the-owned-tokens-of-an-address
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
        console.debug("User token fullNftData: ", fullNftData)
    }

    async function getOwnerListedNfts() {
        try {
            const data = await NftMarketplaceEventDB.getOwnerListedNfts(address!)
            if (data) {
                setOwnerListings(await NftMarketplaceEventDB.getOwnerListedNfts(address!))
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getOwnerNftData()
    }, [])

    useDeepCompareEffect(() => {
        getOwnerNfts()
        getOwnerListedNfts()
    }, [onChainNftData])

    console.debug("fullNftData", fullNftData)
    let listedIds: string[] = []
    ownerListings.map((listing) => {
        listedIds.push(listing.tokenId)
    })
    console.debug("listedIds", listedIds)

    let n: NFTCardElement[] = []
    fullNftData.map((data, index) => {
        n.push({
            owner: data.owner,
            id: data.tokenId!,
            image: IPFS_URL + data.imageLocation,
            attributes: data.attributes,
            isListed: listedIds.includes(data.tokenId!) ? true : false,
        })
    })
    console.debug("n", n)
    n.sort((a, b) => (a.id > b.id ? -1 : 1))
    return (
        <div>
            {!address && (
                <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center py-10">
                    Please connect your wallet.
                </p>
            )}
            <NftCardArrayCollectionView posts={n} observerAddress={address!} />
        </div>
    )
}
