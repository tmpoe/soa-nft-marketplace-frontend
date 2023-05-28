import NavigationBar from "./NavigationBar"
import { EventEmitter, Events } from "./EventEmitter"
import React, { ReactNode, useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { toast } from "react-hot-toast"
import { InfoToaster } from "./InfoToast"
import NftMarketplaceEventDB from "@/adapters/thegraph"
import { FullTokenData, Listing } from "@/types/nft"
import { ContractHandlerFactory } from "@/adapters/contracts"
import { Spinner } from "./Spinner"

type ChildrenProps = {
    readonly fullNftData: FullTokenData[]
    readonly ownerListings: Listing[]
}

export default function Layout({ children }: { children: ReactNode }) {
    const { address } = useAccount()
    let timer: any
    EventEmitter.subscribe(Events.WALLET_CONNECTED, (event) => setIsWalletConnected(true))
    EventEmitter.subscribe(Events.WALLET_DISCONNECTED, (event) => {
        reset()
    })

    const [numberOfTokens, setNumberOfTokens] = useState<number>(0)
    const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false)
    const [isChainSupported, setIsChainSupported] = useState<boolean>(false)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    function updateNumberOfNfts() {
        timer =
            !timer &&
            setInterval(async () => {
                try {
                    const currentNumTokens = (
                        await NftMarketplaceEventDB.getOwnerNftData(address!)
                    ).length
                    console.debug("Latest nft number: ", currentNumTokens, numberOfTokens)
                    if (currentNumTokens > numberOfTokens && isWalletConnected) {
                        EventEmitter.dispatch(Events.MINTING_FINISHED, {})
                        toast.success("You acquired a new NFT!")
                    } else if (currentNumTokens < numberOfTokens && isWalletConnected) {
                        toast.success("You sold an NFT!")
                    }
                    setNumberOfTokens(currentNumTokens)
                } catch (error) {
                    console.error(error)
                }
            }, 5000)
    }

    function reset() {
        setIsWalletConnected(false)
    }

    useEffect(() => {
        const fetchData = async () => {
            await ContractHandlerFactory.isChainSupported().then(setIsChainSupported)
            setIsLoaded(true)
        }
        fetchData()
    })

    useEffect(() => {
        if (!isChainSupported || isWalletConnected) {
            updateNumberOfNfts()
        }
        return () => clearInterval(timer)
    }, [numberOfTokens])

    if (!isLoaded) {
        return (
            <div className="p-10">
                <Spinner />
            </div>
        )
    }

    if (isChainSupported) {
        return (
            <div>
                <NavigationBar />
                {children}
                <InfoToaster />
            </div>
        )
    }

    return (
        <div>
            <NavigationBar />
            <p className="p-10 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
                Unfortunately currently chosen chain is not supported!
            </p>
        </div>
    )
}
