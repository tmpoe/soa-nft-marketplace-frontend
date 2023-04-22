export default async function getTokenMetadata(uri: string) {
    console.log(`https://${process.env.NEXT_PUBLIC_IPFS_SUBDOMAIN}.infura-ipfs.io/ipfs/${uri}`)
    const url = `https://${process.env.NEXT_PUBLIC_IPFS_SUBDOMAIN}.infura-ipfs.io/ipfs/${uri}`
    const response = await fetch(url)
    const metadata = await response.json()
    console.log(metadata)
    return metadata
}
