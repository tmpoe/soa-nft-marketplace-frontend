import { useAccount } from "wagmi"
import MintingModal from "../MintingModal"
import { EventEmitter, Events } from "../EventEmitter"
import { useState } from "react"
import { ContractHandlerFactory } from "@/adapters/contracts"
import { NFTCardElement } from "@/types/nft"
import { BasicNftView } from "./BasicNftView"
import { NftViewActionButton } from "./NftViewActionButton"
import web3 from "../../../provider/web3"

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

    // TODO why does it try to fetch frontend_host/backend_host/mint?????
    async function requestMint(address: `0x${string}`) {
        const nftMarketplace = await ContractHandlerFactory.getNftMarketplaceContractHandler()
        const chainId = await web3.eth.getChainId()
        try {
            await nftMarketplace.payForNft(address)
            console.debug("Money sent!")
            console.debug("chainId", chainId)
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/${address}?chainId=${chainId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    },
                }
            )
            console.debug(response)
            console.debug(await response.text())
            setMinting(true)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <BasicNftView
                token={dummyToken}
                actionButton={
                    <NftViewActionButton
                        text="Summon"
                        onClick={requestMint}
                        onClickArg={address!}
                    />
                }
            />

            {minting && <MintingModal />}
        </div>
    )
}
