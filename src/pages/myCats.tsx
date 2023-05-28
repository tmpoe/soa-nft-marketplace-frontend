import { useAccount } from "wagmi"
import { FullTokenData, Listing, NFTCardElement, OnChainTokenData } from "@/types/nft"
import { IPFS_URL } from "@/utils/constants"
import NftCardArrayCollectionView from "@/components/NftViews/NftCardArrayCollectionView"
import Link from "next/link"
import { EventEmitter, Events } from "@/components/EventEmitter"
import { useEffect, useState } from "react"
import NftMarketplaceEventDB from "@/adapters/thegraph"
import { ContractHandlerFactory } from "@/adapters/contracts"
import getTokenMetadata from "@/adapters/ipfs"
import { useDeepCompareEffect } from "react-use"
import { Spinner } from "@/components/Spinner"

// TODO do not duplicate backend data types

export default function MyCats() {
    const { address } = useAccount()

    const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false)
    const [onChainNftData, setOnChainNftData] = useState<OnChainTokenData[]>([])
    const [fullNftData, setFullNftData] = useState<FullTokenData[]>([])
    const [ownerListings, setOwnerListings] = useState<Listing[]>([])
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    EventEmitter.subscribe(Events.WALLET_CONNECTED, (event) => setIsWalletConnected(true))
    EventEmitter.subscribe(Events.WALLET_DISCONNECTED, (event) => {
        reset()
    })
    console.debug("fullNftData", fullNftData)
    let listedIds: string[] = []

    function reset() {
        setIsWalletConnected(false)
        setOnChainNftData([])
        setFullNftData([])
        setOwnerListings([])
    }

    async function getOwnerNftData() {
        if (!isWalletConnected) {
            console.log("reset")
            reset()
            return
        }
        console.log("Loding stuff")
        try {
            const data = await NftMarketplaceEventDB.getOwnerNftData(address!)

            if (data) {
                setOnChainNftData(data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    async function getOwnerNfts() {
        if (!isWalletConnected) return
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
        setIsWalletConnected(address != undefined)
    })

    useEffect(() => {
        getOwnerNftData()
    }, [isWalletConnected])

    useDeepCompareEffect(() => {
        const fetchData = async () => {
            await getOwnerNfts()
            await getOwnerListedNfts()
            setIsLoaded(true)
        }
        fetchData()
    }, [onChainNftData])

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

    if (!isLoaded) {
        return (
            <div className="p-10">
                <Spinner />
            </div>
        )
    }
    return (
        <div>
            {!address && (
                <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center py-10">
                    Please connect your wallet.
                </p>
            )}
            {address && n.length == 0 && (
                <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center py-10">
                    Oh no! You do not have any cats! Maybe you should{" "}
                    <Link href="summon" className="text-fuchsia-600">
                        summon
                    </Link>{" "}
                    one or{" "}
                    <Link href="catMarket" className="text-teal-600">
                        buy
                    </Link>{" "}
                    one?
                </p>
            )}
            <NftCardArrayCollectionView posts={n} observerAddress={address!} />
        </div>
    )
}
