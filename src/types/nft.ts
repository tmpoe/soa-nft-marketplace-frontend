// TODO: when to use interface vs type?
export interface NFTCardElement {
    owner: string
    id: string
    image: string
}

export type Attribute = {
    trait_type: string
    value: number | string
}

export type TokenMetadata = {
    name: string
    imageLocation: string
    attributes: Array<Attribute>
}

export type OnChainTokenData = {
    owner: string
    tokenId: string
    hash: string
}

export type FullTokenData = OnChainTokenData & TokenMetadata
