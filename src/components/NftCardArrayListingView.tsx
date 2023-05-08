import { NFTCardElement } from "@/types/nft"
import React from "react"
import { ContractHandlerFactory } from "@/adapters/contracts"
import { catAttributesHtmlListElements } from "@/components/CatAttributesHtmlListElements"
import web3 from "web3"

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
                                className="rounded-lg bg-zinc-300 shadow-md col-start-2 col-span-1 row-start-1 row-span-3 p-4 items-center flex"
                                key={`${key}_sub_card`}
                            >
                                <ul className="list-none space-y-4">
                                    {...catAttributesHtmlListElements(token)}
                                </ul>
                            </div>
                            <p className="mb-2 leading-normal col-start-1 col-span-2 row-span-1 row-start-2">
                                Token Id: {token.id} <br />
                                Price: {web3.utils.fromWei(token.price!)} eth
                            </p>
                            <button
                                className="px-4 py-2 row-span-1 row-start-3 col-start-1 col-span-1 text-sm text-blue-100 bg-blue-500 rounded shadow"
                                onClick={() => {
                                    if (observerIsOwner(token.owner)) {
                                        cancelListing(token.id)
                                    } else {
                                        buy(token)
                                    }
                                }}
                            >
                                {observerIsOwner(token.owner) ? "Cancel" : "Buy"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
