import { NFTCardElement } from "@/types/nft"
import React from "react"
import { ContractHandlerFactory } from "@/adapters/contracts"
import { BasicNftView } from "./BasicNftView"
import { NftViewActionButton } from "./NftViewActionButton"

export default function NftCardArrayListingView({
    posts,
    observerAddress,
}: {
    posts: Array<NFTCardElement>
    observerAddress: string
}) {
    async function cancelListing(tokenId: string) {
        try {
            const nft = await ContractHandlerFactory.getNftContractHandler()
            const nftMarketplace = await ContractHandlerFactory.getNftMarketplaceContractHandler()

            await nftMarketplace.cancelListing(tokenId, nft.getAddress(), observerAddress!)
        } catch (error) {
            console.error(error)
        }
    }

    async function buy(token: NFTCardElement) {
        const nft = await ContractHandlerFactory.getNftContractHandler()
        const nftMarketplace = await ContractHandlerFactory.getNftMarketplaceContractHandler()
        try {
            await nftMarketplace.buyNft(token.id, nft.getAddress(), token.price!, observerAddress)
        } catch (error) {
            console.error(error)
        }
    }

    function observerIsOwner(owner: string) {
        return owner.toLowerCase() === observerAddress.toLowerCase()
    }

    function handleCardClick(token: NFTCardElement) {
        if (observerIsOwner(token.owner)) {
            cancelListing(token.id)
        } else {
            buy(token)
        }
    }

    return (
        <>
            <div className="grid gap-6 lg:grid-cols-4">
                {posts.map((token: NFTCardElement, key) => (
                    <BasicNftView
                        token={token}
                        key={key}
                        actionButton={
                            <NftViewActionButton
                                text={observerIsOwner(token.owner) ? "Cancel" : "Buy"}
                                onClick={handleCardClick}
                                onClickArg={token}
                            />
                        }
                    />
                ))}
            </div>
        </>
    )
}
