import contracts from "../../constants/abi/contracts.json"
import { prepareWriteContract, writeContract } from "@wagmi/core"
import { useAccount } from "wagmi"

export default function mint() {
    const { address } = useAccount()
    async function requestMint(address: `0x${string}`) {
        const nftMarketplaceArtifact = contracts["31337"][0]["contracts"]["NftMarketplace"]

        try {
            console.debug("Money sent!")
        } catch (error) {
            console.error(error)
        }

        /* const response = await fetch(
            "http://localhost:5000/0xC75444ef801b50f5601230db66F784e2078BE7Bb",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
            }
        )
        console.debug(response)
        console.debug(await response.text()) */
    }
    return (
        <div>
            <button
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                onClick={() => requestMint(address!)}
            >
                Mint
            </button>
        </div>
    )
}
