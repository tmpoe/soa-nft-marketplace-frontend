import { EventEmitter, Events } from "@/components/EventEmitter"
import MintingView from "@/components/NftViews/MintingView"
import { useState } from "react"

export default function mint() {
    const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false)

    EventEmitter.subscribe(Events.WALLET_CONNECTED, (event) => setIsWalletConnected(true))
    return (
        <div className="grid justify-items-center p-10">
            {isWalletConnected && <MintingView />}
            {!isWalletConnected && (
                <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center py-10">
                    Please connect your wallet...
                </p>
            )}
        </div>
    )
}
