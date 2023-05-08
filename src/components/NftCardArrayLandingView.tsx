import { NFTCardElement } from "@/types/nft"
import React from "react"
import { catAttributesHtmlListElements } from "@/components/CatAttributesHtmlListElements"

export default function NftCardArrayListingView({ posts }: { posts: Array<NFTCardElement> }) {
    return (
        <>
            <div className="carousel carousel-center bg-neutral rounded-box">
                {posts.map((token: NFTCardElement, key) => (
                    <div className="carousel-item">
                        <div className="w-full rounded-lg shadow-md lg:max-w-sm" key={key}>
                            <img
                                className="object-cover w-full h-48"
                                src={token.image}
                                alt="image"
                            />
                            <div className="bg-accent rounded-lg mb-4 p-2">
                                <div className="grid gap-2 lg:grid-cols-2 grid-rows-3 col-start-1 col-span-4 p-4">
                                    <h4 className="text-xl font-semibold text-black">
                                        Owner: {token.owner.slice(0, 8)}
                                    </h4>
                                    <p className="mb-2 leading-normal col-start-1 col-span-2 row-span-1 row-start-2">
                                        Token Id: {token.id}
                                    </p>
                                </div>

                                <div
                                    className="rounded-lg bg-accent shadow-md col-start-2 col-span-1 row-start-1 row-span-3 p-3 items-center flex"
                                    key={`${key}_sub_card`}
                                >
                                    <ul className="list-none space-y-4">
                                        {...catAttributesHtmlListElements(token)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
