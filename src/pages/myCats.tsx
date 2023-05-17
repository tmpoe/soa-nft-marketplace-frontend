import { useAccount } from "wagmi"
import { FullTokenData, Listing, NFTCardElement } from "@/types/nft"
import { IPFS_URL } from "@/utils/constants"
import NftCardArrayCollectionView from "@/components/NftViews/NftCardArrayCollectionView"
import Link from "next/link"

// TODO do not duplicate backend data types

export default function MyCats({
    fullNftData,
    ownerListings,
}: {
    fullNftData: FullTokenData[]
    ownerListings: Listing[]
}) {
    const { address } = useAccount()

    console.debug("fullNftData", fullNftData)
    let listedIds: string[] = []
    ownerListings.map((listing) => {
        listedIds.push(listing.tokenId)
    })
    console.debug("listedIds", listedIds)

    let n: NFTCardElement[] = []
    fullNftData.map((data, index) => {
        n.push({
            owner: data.owner,
            id: data.tokenId!,
            image: IPFS_URL + data.imageLocation,
            attributes: data.attributes,
            isListed: listedIds.includes(data.tokenId!) ? true : false,
        })
    })
    console.debug("n", n)
    n.sort((a, b) => (a.id > b.id ? -1 : 1))
    return (
        <div>
            {!address && (
                <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center py-10">
                    Please connect your wallet.
                </p>
            )}
            {address && n.length == 0 && (
                <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center py-10">
                    Oh no! You do not have any cats! Maybe you should{" "}
                    <Link href="summon" className="text-fuchsia-600">
                        summon
                    </Link>{" "}
                    one or{" "}
                    <Link href="catMarket" className="text-teal-600">
                        buy
                    </Link>{" "}
                    one?
                </p>
            )}
            <NftCardArrayCollectionView posts={n} observerAddress={address!} />
        </div>
    )
}