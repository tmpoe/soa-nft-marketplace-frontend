import Header from "./Header"
import { EventEmitter, Events } from "./EventEmitter"
import React, { ReactNode, useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { toast } from "react-hot-toast"
import { InfoToaster } from "./InfoToast"
import NftMarketplaceEventDB from "@/adapters/thegraph"
import { FullTokenData, Listing, OnChainTokenData } from "@/types/nft"
import { useDeepCompareEffect } from "react-use"
import getTokenMetadata from "@/adapters/ipfs"
import { ContractHandlerFactory } from "@/adapters/contracts"

type ChildrenProps = {
    readonly fullNftData: FullTokenData[]
    readonly ownerListings: Listing[]
}

export default function Layout({ children }: { children: ReactNode }) {
    const { address } = useAccount()
    let timer: any
    EventEmitter.subscribe(Events.WALLET_CONNECTED, (event) => setIsWalletConnected(true))

    const [latestTokenid, setLatestTokenid] = useState<string>()
    const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false)

    const [onChainNftData, setOnChainNftData] = useState<OnChainTokenData[]>([])
    const [fullNftData, setFullNftData] = useState<FullTokenData[]>([])
    const [ownerListings, setOwnerListings] = useState<Listing[]>([])

    function addPropsToReactElement(element: ReactNode) {
        if (React.isValidElement(element)) {
            return React.cloneElement(element as React.ReactElement<ChildrenProps>, {
                fullNftData: fullNftData,
                ownerListings: ownerListings,
            })
        }
        return element
    }

    function renderChildren() {
        if (!Array.isArray(children)) {
            return addPropsToReactElement(children)
        }
        return children.map((childElement) => addPropsToReactElement(childElement))
    }

    async function initLatestNft() {
        try {
            const tokenId = await NftMarketplaceEventDB.getLatestNft(address!)
            setLatestTokenid(tokenId)
        } catch (error) {
            console.debug(error)
        }
    }

    function updateLatestNft() {
        timer =
            !timer &&
            setInterval(async () => {
                try {
                    const newTokenId = await NftMarketplaceEventDB.getLatestNft(address!)
                    console.log("Latest nft: ", newTokenId, latestTokenid)
                    if (newTokenId != latestTokenid && isWalletConnected) {
                        console.log("Latest nft changed!")
                        EventEmitter.dispatch(Events.MINTING_FINISHED, {})
                        toast.success("You acquired a new NFT!")
                    }
                    setLatestTokenid(newTokenId)
                } catch (error) {
                    console.error(error)
                }
            }, 1000)
    }

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
        initLatestNft()
        getOwnerNftData()
    }, [isWalletConnected])

    useEffect(() => {
        updateLatestNft()
        return () => clearInterval(timer)
    }, [latestTokenid])

    useDeepCompareEffect(() => {
        getOwnerNfts()
        getOwnerListedNfts()
    }, [onChainNftData])

    return (
        <div>
            <Header />
            {renderChildren()}
            <InfoToaster />
        </div>
    )
}
