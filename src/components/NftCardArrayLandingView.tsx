import { NFTCardElement } from "@/types/nft"
import React from "react"
import { catAttributesHtmlListElements } from "@/components/CatAttributesHtmlListElements"
import { BasicNftView } from "./BasicNftView"
import { NftViewActionButton } from "./NftViewActionButton"

export default function NftCardArrayListingView({ posts }: { posts: Array<NFTCardElement> }) {
    return (
        <>
            <div className="carousel carousel-center bg-neutral rounded-box">
                {posts.map((token: NFTCardElement, key) => (
                    <div className="carousel-item">
                        <BasicNftView token={token} key={key} />
                    </div>
                ))}
            </div>
        </>
    )
}