import React from "react"

interface NFTCardElement {
    owner: string
    id: string
    image: string
}

export default function NftCard({ posts }: { posts: Array<NFTCardElement> }) {
    return (
        <>
            <div className="grid gap-2 lg:grid-cols-4">
                {posts.map((items, key) => (
                    <div className="w-full rounded-lg shadow-md lg:max-w-sm" key={key}>
                        <img className="object-cover w-full h-48" src={items.image} alt="image" />
                        <div className="p-4">
                            <h4 className="text-xl font-semibold text-blue-600">{items.owner}</h4>
                            <p className="mb-2 leading-normal">{items.id}</p>
                            <button className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow">
                                Read more
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
