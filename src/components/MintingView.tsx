import { useAccount } from "wagmi"
import MintingModal from "../components/MintingModal"
import { EventEmitter, Events } from "../components/EventEmitter"
import { useState } from "react"
import { ContractHandlerFactory } from "@/adapters/contracts"
import { NFTCardElement } from "@/types/nft"
import { catAttributesHtmlListElements } from "@/components/CatAttributesHtmlListElements"

export default function MintingView() {
    const { address } = useAccount()
    const [minting, setMinting] = useState(false)
    EventEmitter.subscribe(Events.MODAL_CLOSED, (event) => setMinting(false))
    const dummyToken: NFTCardElement = {
        owner: "You :)",
        id: "??",
        image: "https://st.depositphotos.com/1341440/2350/v/600/depositphotos_23508031-stock-illustration-black-silhouette-of-cat-vector.jpg",
        attributes: [
            { trait_type: "Breed", value: "??" },
            { trait_type: "Playfulness", value: "??" },
            { trait_type: "Eye color", value: "??" },
            { trait_type: "Cuteness", value: "??" },
        ],
        price: "??",
        isListed: false,
    }

    async function requestMint(address: `0x${string}`) {
        const nftMarketplace = await ContractHandlerFactory.getNftMarketplaceContractHandler()

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
            <div className="w-full rounded-lg shadow-md lg:max-w-sm bg-teal-700">
                <img className="object-cover w-full h-48" src={dummyToken.image} alt="image" />
                <div className="grid gap-2 lg:grid-cols-2 grid-rows-1 col-start-1 col-span-1 p-4">
                    <div className="bg-accent rounded-lg mb-4 p-2">
                        <h4 className="text-xl font-semibold text-black">
                            Owner: {dummyToken.owner.slice(0, 8)}
                        </h4>
                        <p className="mb-2 leading-normal col-start-1 col-span-1 row-span-1 row-start-2 text-black p-2">
                            Token Id: {dummyToken.id} <br />
                            Price: {dummyToken.price!} eth
                        </p>
                    </div>
                    <div className="rounded-lg bg-accent shadow-md col-start-2 col-span-1 row-start-1 row-span-3 p-3 items-center flex">
                        <ul className="list-none space-y-4">
                            {...catAttributesHtmlListElements(dummyToken)}
                        </ul>
                    </div>
                    <button
                        className="row-start-3 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-2 border-blue-700 hover:border-blue-500 rounded"
                        onClick={() => requestMint(address!)}
                    >
                        Mint
                    </button>
                </div>
            </div>

            {minting && <MintingModal />}
        </div>
    )
}
