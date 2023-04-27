import { useAccount } from "wagmi"
import MintingModal from "../components/MintingModal"
import { EventEmitter, Events } from "../components/EventEmitter"
import { useState } from "react"
import { ContractHandler } from "@/adapters/contracts"
import NftMarketplace from "@/adapters/nftMarketplace"

export default function mint() {
    const { address } = useAccount()
    const [minting, setMinting] = useState(false)
    EventEmitter.subscribe(Events.MODAL_CLOSED, (event) => setMinting(false))

    async function requestMint(address: `0x${string}`) {
        const nftMarketplace = new NftMarketplace(
            await ContractHandler.fetchNftMarketplaceContract()
        )
        try {
            await nftMarketplace.payForNft(address)
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
