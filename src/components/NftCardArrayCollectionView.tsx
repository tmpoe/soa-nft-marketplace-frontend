import { NFTCardElement, NftActionData } from "@/types/nft"
import React, { useState } from "react"
import { EventEmitter, Events } from "./EventEmitter"
import NftActionModal from "./NftActionModal"
import { ContractHandlerFactory } from "@/adapters/contracts"
import { catAttributesHtmlListElements } from "@/components/CatAttributesHtmlListElements"
import web3 from "web3"
import { BasicNftView } from "./BasicNftView"
import { NftViewActionButton } from "./NftViewActionButton"

export default function NftCardArrayCollectionView({
    posts,
    observerAddress,
}: {
    posts: Array<NFTCardElement>
    observerAddress: string
}) {
    const [showSellingModal, setShowSellingModal] = useState(false)
    const [tokenToHandle, setTokenToHandle] = useState<NftActionData>({
        tokenId: "undefined",
        isListed: false,
    })
    EventEmitter.subscribe(Events.MODAL_CLOSED, (event) => {
        setShowSellingModal(false)
        setTokenToHandle({ tokenId: "undefined", isListed: false })
    })

    async function cancelListing(tokenId: string) {
        try {
            console.debug("cancel listing")
            const nft = await ContractHandlerFactory.getNftContractHandler()
            const nftMarketplace = await ContractHandlerFactory.getNftMarketplaceContractHandler()

            await nftMarketplace.cancelListing(tokenId, nft.getAddress(), observerAddress)
            EventEmitter.dispatch(Events.MODAL_CLOSED, {
                modal_name: "nft_action_modal",
            })
        } catch (error) {
            console.error(error)
        }
    }

    function handleCardClick(token: NFTCardElement) {
        if (!token.isListed) {
            setShowSellingModal(true)
            setTokenToHandle({
                tokenId: token.id,
                isListed: token.isListed,
            })
        } else {
            cancelListing(token.id)
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
                                text={token.isListed ? "Cancel" : "Sell"}
                                onClick={handleCardClick}
                                onClickArg={token}
                            />
                        }
                    />
                ))}

                {showSellingModal && <NftActionModal nftActionData={tokenToHandle} />}
            </div>
        </>
    )
}
