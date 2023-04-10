import contracts from "../../constants/abi/contracts.json"
import { AbiItem } from "web3-utils"
import { useAccount } from "wagmi"
import web3 from "../../provider/web3"
import MintingModal from "../components/MintingModal"
import { useState } from "react"

export default function mint() {
    const { address } = useAccount()
    const [minting, setMinting] = useState(false)

    // forget moralis, use hardhat maybe? I do not want another service with APis or whatever just to call a goddamn contract
    async function requestMint(address: `0x${string}`) {
        const chainId: number = await web3.eth.getChainId()

        const nftMarketplaceArtifact =
            contracts[chainId.toString() as keyof typeof contracts][0]["contracts"][
                "NftMarketplace"
            ]
        const nftMarketplace = new web3.eth.Contract(
            nftMarketplaceArtifact!.abi as AbiItem[], // https://github.com/web3/web3.js/issues/3310
            nftMarketplaceArtifact!.address
        )
        try {
            const tx = await nftMarketplace.methods
                .gatekeep()
                .send({ from: address, value: web3.utils.toWei("0.01", "ether") })
            console.debug(tx.events.NftRequested)
            console.debug("Money sent!")
            const response = await fetch(`http://localhost:5000/${address}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                },
            })
            console.debug(response)
            console.debug(await response.text())
            setMinting(true)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <button
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                onClick={() => requestMint(address!)}
            >
                Mint
            </button>
            {minting && <MintingModal />}
        </div>
    )
}
