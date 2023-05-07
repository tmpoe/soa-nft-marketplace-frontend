import { cleanString } from "../utils/string"
import { NFTCardElement } from "@/types/nft"

export function catAttributesHtmlListElements(token: NFTCardElement) {
    let listElements: JSX.Element[] = []
    token.attributes.map((attribute) => {
        let cleanedTraitType: string = cleanString(attribute.trait_type)
        let cleanedTraitValue: string | number =
            typeof attribute.value === "string" ? cleanString(attribute.value) : attribute.value
        listElements.push(
            <li key={attribute.trait_type}>
                {cleanedTraitType}: {cleanedTraitValue}
            </li>
        )
    })
    return listElements
}
