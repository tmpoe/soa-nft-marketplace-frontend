import { NFTCardElement, NftActionData } from "@/types/nft"
import React, { useState } from "react"
import { EventEmitter, Events } from "./EventEmitter"
import NftActionModal from "./NftActionModal"
import { ContractHandler } from "@/adapters/contracts"
import { catAttributesHtmlListElements } from "@/components/CatAttributesHtmlListElements"

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
            const nft = await ContractHandler.getNftContractHandler()
            const nftMarketplace = await ContractHandler.getNftMarketplaceContractHandler()

            await nftMarketplace.cancelListing(tokenId, nft.getAddress(), observerAddress)
            EventEmitter.dispatch(Events.MODAL_CLOSED, {
                modal_name: "nft_action_modal",
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className="grid gap-6 lg:grid-cols-4">
                {posts.map((token: NFTCardElement, key) => (
                    <div className="w-full rounded-lg shadow-md lg:max-w-sm" key={key}>
                        <img className="object-cover w-full h-48" src={token.image} alt="image" />
                        <div className="grid gap-2 lg:grid-cols-2 grid-rows-3 col-start-1 col-span-4 p-4">
                            <h4 className="text-xl font-semibold text-blue-600">
                                Owner: {token.owner.slice(0, 8)}
                            </h4>
                            <div
                                className="rounded-lg shadow-md col-start-2 col-span-1 row-start-1 row-span-3 p-4 items-center flex"
                                key={`${key}_sub_card`}
                            >
                                <ul className="list-none space-y-4">
                                    {...catAttributesHtmlListElements(token)}
                                </ul>
                            </div>
                            <p className="mb-2 leading-normal col-start-1 col-span-2 row-span-1 row-start-2">
                                Token Id: {token.id}
                            </p>
                            <button
                                className="px-4 py-2 row-span-1 row-start-3 col-start-1 col-span-1 text-sm text-blue-100 bg-blue-500 rounded shadow"
                                onClick={() => {
                                    if (token.isListed) {
                                        setShowSellingModal(true)
                                        setTokenToHandle({
                                            tokenId: token.id,
                                            isListed: token.isListed,
                                        })
                                    } else {
                                        cancelListing(token.id)
                                    }
                                }}
                            >
                                {token.isListed ? "Cancel" : "Sell"}
                            </button>
                        </div>
                    </div>
                ))}
                {showSellingModal && <NftActionModal nftActionData={tokenToHandle} />}
            </div>
        </>
    )
}
