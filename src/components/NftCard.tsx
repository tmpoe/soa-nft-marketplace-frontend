import { NFTCardElement } from "@/types/nft"
import { cleanString } from "@/utils/string"
import React, { useState } from "react"
import { EventEmitter, Events } from "../components/EventEmitter"
import SellingModal from "./SellingModal"

export default function NftCard({ posts }: { posts: Array<NFTCardElement> }) {
    const [showSellingModal, setShowSellingModal] = useState(false)
    const [tokenToSell, setTokenToSell] = useState("")
    EventEmitter.subscribe(Events.MODAL_CLOSED, (event) => {
        setShowSellingModal(false)
        setTokenToSell("")
    })

    function createAttributesListElements(token: NFTCardElement) {
        let listElements: JSX.Element[] = []
        token.attributes.map((attribute) => {
            let cleanedTraitType: string = cleanString(attribute.trait_type)
            let cleanedTraitValue: string | number =
                typeof attribute.value === "string"
                    ? cleanString(attribute.value)
                    : attribute.value
            listElements.push(
                <li key={attribute.trait_type}>
                    {cleanedTraitType}: {cleanedTraitValue}
                </li>
            )
        })
        return listElements
    }
    return (
        <>
            <div className="grid gap-6 lg:grid-cols-4">
                {posts.map((item: NFTCardElement, key) => (
                    <div className="w-full rounded-lg shadow-md lg:max-w-sm" key={key}>
                        <img className="object-cover w-full h-48" src={item.image} alt="image" />
                        <div className="grid gap-2 lg:grid-cols-2 grid-rows-3 col-start-1 col-span-4 p-4">
                            <h4 className="text-xl font-semibold text-blue-600">
                                Owner: {item.owner.slice(0, 8)}
                            </h4>
                            <div
                                className="rounded-lg shadow-md col-start-2 col-span-1 row-start-1 row-span-3 p-4 items-center flex"
                                key={`${key}_sub_card`}
                            >
                                <ul className="list-none space-y-4">
                                    {...createAttributesListElements(item)}
                                </ul>
                            </div>
                            <p className="mb-2 leading-normal col-start-1 col-span-2 row-span-1 row-start-2">
                                Token Id: {item.id}
                            </p>
                            <button
                                className="px-4 py-2 row-span-1 row-start-3 col-start-1 col-span-1 text-sm text-blue-100 bg-blue-500 rounded shadow"
                                onClick={() => {
                                    setShowSellingModal(true)
                                    setTokenToSell(item.id)
                                }}
                            >
                                {item.isListed ? "Options" : "Sell"}
                            </button>
                        </div>
                    </div>
                ))}
                {showSellingModal && <SellingModal tokenId={tokenToSell} />}
            </div>
        </>
    )
}
