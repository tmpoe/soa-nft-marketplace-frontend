import { useAccount } from "wagmi"
import { useState } from "react"
import { useDeepCompareEffect } from "react-use"
import NftCard from "@/components/NftCard"
import getTokenMetadata from "@/adapters/ipfs"
import { FullTokenData, Listing, NFTCardElement, OnChainTokenData } from "@/types/nft"
import { IPFS_URL } from "@/utils/constants"
import { ContractHandler } from "@/adapters/contracts"
import Nft from "@/adapters/nft"
import NftMarketplaceEventDB from "@/adapters/thegraph"
// TODO do not duplicate backend data types

export default function UserCollection() {
    const { address } = useAccount()
    const [onChainNftData, setOnChainNftData] = useState<OnChainTokenData[]>([])
    const [fullNftData, setFullNftData] = useState<FullTokenData[]>([])
    const [ownerListings, setOwnerListings] = useState<Listing[]>([])

    async function getOwnerNftData() {
        try {
            setOnChainNftData(await NftMarketplaceEventDB.getOwnerNftData(address!))
            console.log("Got the data boss", onChainNftData)
        } catch (error) {
            console.error(error)
        }
    }

    async function getOwnerNfts() {
        const nft = new Nft(await ContractHandler.fetchNftContract())

        // get owner nfts
        // https://ethereum.stackexchange.com/questions/68438/erc721-how-to-get-the-owned-tokens-of-an-address
        onChainNftData.map(async (data) => {
            try {
                console.debug("GetOwnerNFTs", data)
                console.debug(parseInt(data.nftId!))
                const uri = await nft.getTokenURI(parseInt(data.nftId!))
                console.debug("fos1")
                const currentTokenMetadata = await getTokenMetadata(uri)
                console.debug("fos2")
                setFullNftData((currentState) => [
                    ...currentState,
                    { ...currentTokenMetadata, ...data },
                ])
                console.debug("fos3")
            } catch (error) {
                console.error(error)
            }
        })
        console.debug("User token fullNftData: ", fullNftData)
    }

    async function getOwnerListedNfts() {
        try {
            setOwnerListings(await NftMarketplaceEventDB.getOwnerListedNfts(address!))
        } catch (error) {
            console.error(error)
        }
    }

    useDeepCompareEffect(() => {
        getOwnerNftData()
    }, [])

    useDeepCompareEffect(() => {
        getOwnerNfts()
        getOwnerListedNfts()
    }, [onChainNftData])

    console.debug("fullNftData", fullNftData)
    let listedIds: string[] = []
    ownerListings.map((listing) => {
        listedIds.push(listing.nftId)
    })
    console.debug("listedIds", listedIds)

    let n: NFTCardElement[] = []
    fullNftData.map((data, index) => {
        n.push({
            owner: data.owner,
            id: data.nftId!,
            image: IPFS_URL + data.imageLocation,
            attributes: data.attributes,
            isListed: listedIds.includes(data.nftId!) ? true : false,
        })
    })
    console.debug("n", n)
    n.sort((a, b) => (a.id > b.id ? -1 : 1))
    return <NftCard posts={n} observerAddress={address!} />
}
