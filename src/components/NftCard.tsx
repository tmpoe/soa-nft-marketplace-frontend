import { NFTCardElement } from "@/types/nft"
import React from "react"

export default function NftCard({ posts }: { posts: Array<NFTCardElement> }) {
    return (
        <>
            <div className="grid gap-2 lg:grid-cols-4">
                {posts.map((item, key) => (
                    <div className="w-full rounded-lg shadow-md lg:max-w-sm" key={key}>
                        <img className="object-cover w-full h-48" src={item.image} alt="image" />
                        <div className="p-4">
                            <h4 className="text-xl font-semibold text-blue-600">
                                {item.owner.slice(0, 8)}
                            </h4>
                            <p className="mb-2 leading-normal">{item.id}</p>
                            <button
                                className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow"
                                onClick={() => console.log("Sell popup")}
                            >
                                Sell
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
