export default async function getTokenMetadata(uri: string, api_key: string, api_secret: string) {
    const url = `https://ref-nft-mark.infura-ipfs.io/ipfs/${uri}`
    const response = await fetch(url)
    const metadata = await response.json()
    console.log(metadata)
    return metadata
}
