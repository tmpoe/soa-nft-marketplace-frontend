import React from "react"
import { EventEmitter, Events } from "./EventEmitter"

interface ShowModal {
    show: boolean
}

// https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/react/modals/regular
export default function MintingModal() {
    return (
        <>
            (
            <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                <h3 className="text-3xl font-semibold">Minting</h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() =>
                                        EventEmitter.dispatch(Events.MODAL_CLOSED, {
                                            modal_name: "minting_modal",
                                        })
                                    }
                                >
                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                    </span>
                                </button>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                    We are minting your new NFT very hard! We will notify you when
                                    we are ready. Until then kick back and relax.
                                </p>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() =>
                                        EventEmitter.dispatch(Events.MODAL_CLOSED, {
                                            modal_name: "minting_modal",
                                        })
                                    }
                                >
                                    Okay
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
            )
        </>
    )
}
