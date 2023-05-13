import { NFTCardElement } from "@/types/nft"
import web3 from "web3"
import { catAttributesHtmlListElements } from "../CatAttributesHtmlListElements"

export function BasicNftView({
    token,
    keyId,
    actionButton,
}: {
    token: NFTCardElement
    keyId?: number
    actionButton?: JSX.Element
}) {
    return (
        <div className="w-96 rounded-lg shadow-md lg:max-w-sm bg-teal-700" key={keyId ? keyId : 1}>
            <img className="object-cover rounded-lg w-full h-48" src={token.image} alt="image" />
            <div className="grid gap-2 lg:grid-cols-2 grid-rows-1 col-start-1 col-span-1 p-4">
                <div className="bg-accent rounded-lg mb-4 p-2">
                    <h4 className="text-xl font-semibold text-black">
                        Owner: {token.owner.slice(0, 8)}
                    </h4>
                    <p className="mb-2 leading-normal col-start-1 col-span-1 row-span-1 row-start-2 text-black p-2">
                        Token Id: {token.id} <br />
                        {token.isListed && "Price: " + web3.utils.fromWei(token.price!) + " eth"}
                    </p>
                </div>
                <div
                    className="rounded-lg bg-accent shadow-md col-start-2 col-span-1 row-start-1 row-span-3 p-3 items-center flex"
                    key={`${keyId ? keyId : 1}_sub_card`}
                >
                    <ul className="list-none space-y-4">
                        {...catAttributesHtmlListElements(token)}
                    </ul>
                </div>

                {actionButton && actionButton}
            </div>
        </div>
    )
}
