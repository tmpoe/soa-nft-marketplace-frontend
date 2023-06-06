import { NFTCardElement } from "@/types/nft"
import web3 from "web3"
import Bar from "../Bar"

const COLOR_BASED_ON_RARITY = [
    "red-border",
    "yellow-border",
    "purple-border",
    "blue-border",
    "green-border",
    "white-border",
]

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

    const rarity = token.attributes.find((attribute) => attribute.trait_type == "rarity")
    console.log("rarity: ", rarity)
    const rarityValue = rarity ? rarity.value : 0
    console.log("rarityValue: ", rarityValue)
    let borderColor =
        COLOR_BASED_ON_RARITY[
            typeof rarityValue === "string" ? parseInt(rarityValue) : rarityValue
        ]
    console.log("border color: ", borderColor)

    const mainDivClassName = actionButton ? "rounded-lg w-96 p-10 bg-neutral-800" : ""
    const buttonDivClassName = actionButton ? "flex justify-center py-4" : ""

    return (
        <div className={mainDivClassName}>
            <div
                className={`w-106 rounded-lg lg:max-w-sm bg-primary border-solid border-4 ${borderColor}`}
                key={keyId ? keyId : 1}
            >
                <img
                    className="object-cover rounded-lg w-full h-48"
                    src={token.image}
                    alt="image"
                />
                <div className="p-4">
                    <div
                        className="grid rounded-lg bg-accent shadow-md p-3 items-center flex"
                        key={`${keyId ? keyId : 1}_sub_card`}
                    >
                        <p className="text-xl font-semibold text-black col-start-1 col-span-1 row-start-1 row-span-1 mr-3">
                            Owner: {token.owner.slice(0, 8)}
                        </p>
                        <p className="leading-normal col-start-3 col-span-1 row-span-1 row-start-1 text-black">
                            Id: {token.id} <br />
                            {token.isListed &&
                                token.price &&
                                web3.utils.fromWei(token.price) + " eth"}
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
                </div>
            </div>
            <div className={buttonDivClassName}>{actionButton && actionButton}</div>
        </div>
    )
}
