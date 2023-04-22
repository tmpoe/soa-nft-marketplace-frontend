import { useAccount } from "wagmi"
import { GetOwnerNftsDocument, execute } from "../../.graphclient"
import { useEffect, useState } from "react"
import NftCard from "@/components/NftCard"
import web3 from "../../provider/web3"
import contracts from "../../constants/abi/contracts.json"
import { AbiItem } from "web3-utils"
import getTokenMetadata from "@/adapters/ipfs"

export default function UserCollection() {
    const { address } = useAccount()
    const [nftData, setNftData] = useState([])
    const [tokenUris, setTokenUris] = useState<string[]>([])

    const infuraKey: string = process.env.REACT_APP_INFURA_IPFS_API_KEY || "api"
    const infuraSecret: string = process.env.REACT_APP_INFURA_IPFS_API_KEY_SECRET || "secret"
    console.log(infuraKey)

    async function getOwnerNftData() {
        const result = await execute(GetOwnerNftsDocument, { owner: address })
        if (!result) {
            throw new Error("Failed to get NFTs")
        }
        setNftData(result.data.nftMinteds)
    }

    async function getOwnerNfts() {
        const chainId: number = await web3.eth.getChainId()
        const nftArtifact =
            contracts[chainId.toString() as keyof typeof contracts][0]["contracts"]["Nft"]

        const nftContract = new web3.eth.Contract(
            nftArtifact!.abi as AbiItem[], // https://github.com/web3/web3.js/issues/3310
            nftArtifact!.address
        )
        let userTokenUris: string[] = []
        try {
            // get owner nfts
            // https://ethereum.stackexchange.com/questions/68438/erc721-how-to-get-the-owned-tokens-of-an-address
            nftData.map(async (data, index) => {
                const uri = await nftContract.methods.tokenURI(data["tokenId"]).call()
                userTokenUris.push(uri)
                await getTokenMetadata(uri, infuraKey, infuraSecret)
            })
            setTokenUris(userTokenUris)
            console.log("User token uris: ", tokenUris)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getOwnerNftData()
    }, [])

    useEffect(() => {
        getOwnerNfts()
    }, [nftData])

    console.log(nftData)
    const n = nftData[0]
        ? [
              {
                  owner: nftData[0]["owner"],
                  id: nftData[0]["tokenId"],
                  image: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
              },
              {
                  owner: nftData[1]["owner"],
                  id: nftData[1]["tokenId"],
                  image: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
              },
              {
                  owner: nftData[0]["owner"],
                  id: nftData[0]["tokenId"],
                  image: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
              },
              {
                  owner: nftData[1]["owner"],
                  id: nftData[1]["tokenId"],
                  image: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
              },
              {
                  owner: nftData[0]["owner"],
                  id: nftData[0]["tokenId"],
                  image: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
              },
              {
                  owner: nftData[1]["owner"],
                  id: nftData[1]["tokenId"],
                  image: "https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png",
              },
          ]
        : []
    return <NftCard posts={n} />
}
