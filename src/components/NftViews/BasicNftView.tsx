import { NFTCardElement } from "@/types/nft"
import web3 from "web3"
import Bar from "../Bar"

export function BasicNftView({
    token,
    keyId,
    actionButton,
}: {
    token: NFTCardElement
    keyId?: number
    actionButton?: JSX.Element
}) {
    const cuteness = token.attributes.find((attribute) => attribute.trait_type == "cuteness")
    const cutenessValue = cuteness ? cuteness.value : 0

    const playfulness = token.attributes.find((attribute) => attribute.trait_type == "playfulness")
    const playfulnessValue = playfulness ? playfulness.value : 0

    return (
        <div className="w-96 rounded-lg shadow-md lg:max-w-sm bg-primary" key={keyId ? keyId : 1}>
            <img className="object-cover rounded-lg w-full h-48" src={token.image} alt="image" />
            <div className="p-4">
                <div
                    className="grid rounded-lg bg-accent shadow-md p-3 items-center flex"
                    key={`${keyId ? keyId : 1}_sub_card`}
                >
                    <h4 className="text-xl font-semibold text-black col-start-1 col-span-1 row-start-1 row-span-1">
                        Owner: {token.owner.slice(0, 8)}
                    </h4>
                    <p className="leading-normal col-start-3 col-span-1 row-span-1 row-start-1 text-black">
                        Token Id: {token.id} <br />
                        {token.isListed &&
                            token.price &&
                            "Price: " + web3.utils.fromWei(token.price) + " eth"}
                    </p>
                    <ul className="col-start-1 col-span-4 row-start-2 row-span-2">
                        {" "}
                        <li className="col-start-1 col-span-4 row-start-2 row-span-1">
                            {" "}
                            <p className="text-black">Cuteness </p>
                            <Bar value={cutenessValue} />
                        </li>
                        <li className="col-start-1 col-span-4 row-start-3 row-span-1">
                            {" "}
                            <p className="text-black">Playfulness </p>
                            <Bar value={playfulnessValue} />
                        </li>
                    </ul>
                </div>

                {actionButton && actionButton}
            </div>
        </div>
    )
}
