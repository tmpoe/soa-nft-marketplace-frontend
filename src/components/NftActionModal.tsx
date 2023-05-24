import React from "react"
import { EventEmitter, Events } from "./EventEmitter"
import { useAccount } from "wagmi"
import { ContractHandlerFactory } from "@/adapters/contracts"
import { NftActionData } from "@/types/nft"

// https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/react/modals/regular
export default function NftActionModal({ nftActionData }: { nftActionData: NftActionData }) {
    const { address } = useAccount()
    const [price, setPrice] = React.useState<string>("")

    async function listNft(tokenId: string) {
        console.debug("list nft")
        const nft = await ContractHandlerFactory.getNftContractHandler()
        const nftMarketplace =
            await await ContractHandlerFactory.getNftMarketplaceContractHandler()

        await nft.approveMarketplaceToHandleNftOwnerChange(
            nftMarketplace,
            parseInt(tokenId),
            address!
        )

        await nftMarketplace.listNft(tokenId, nft.getAddress(), price, address!)
        EventEmitter.dispatch(Events.MODAL_CLOSED, {
            modal_name: "nft_action_modal",
        })
    }

    function updatePrice(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        setPrice(event.target.value)
    }

    function getListingBody() {
        return (
            <div className="relative p-6 flex-auto">
                <form>
                    <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                        Price
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                ></path>
                            </svg>
                        </div>
                        <input
                            id="list-price"
                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Price"
                            onChange={updatePrice}
                            required
                        />
                        <button
                            type="submit"
                            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={(event) => {
                                event.preventDefault()
                                listNft(nftActionData.tokenId)
                            }}
                        >
                            List
                        </button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">List NFT</h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() =>
                                    EventEmitter.dispatch(Events.MODAL_CLOSED, {
                                        modal_name: "minting_modal",
                                    })
                                }
                            >
                                <span className="text-black h-6 w-6 text-2xl block">×</span>
                            </button>
                        </div>
                        {/*body*/}
                        {!nftActionData.isListed && getListingBody()}
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}
