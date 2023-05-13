import { NFTCardElement } from "@/types/nft"
import React from "react"
import { BasicNftView } from "./BasicNftView"

export default function NftCardArrayListingView({ posts }: { posts: Array<NFTCardElement> }) {
    return (
        <>
            <div className="carousel carousel-center bg-neutral rounded-box space-x-6 p-4">
                {posts.map((token: NFTCardElement, key) => (
                    <div className="carousel-item">
                        <BasicNftView token={token} keyId={key} />
                    </div>
                ))}
            </div>
        </>
    )
}
