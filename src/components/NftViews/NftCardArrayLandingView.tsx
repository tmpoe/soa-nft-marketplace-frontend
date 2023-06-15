import { NFTCardElement } from "@/types/nft"
import React from "react"
import { BasicNftView } from "./BasicNftView"

export default function NftCardArrayListingView({
    nftCardElements,
}: {
    nftCardElements: Array<NFTCardElement>
}) {
    return (
        <>
            <div className="carousel carousel-center bg-neutral rounded-box space-x-6 p-4">
                {nftCardElements.map((token: NFTCardElement, key) => (
                    <div className="carousel-item">
                        <BasicNftView token={token} keyId={key} />
                    </div>
                ))}
            </div>
        </>
    )
}
