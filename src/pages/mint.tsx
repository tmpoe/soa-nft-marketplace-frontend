import { useAccount } from "wagmi"
import MintingView from "@/components/NftViews/MintingView"

export default function mint() {
    const { address } = useAccount()

    return (
        <div className="grid justify-items-center p-10">
            {address && <MintingView />}
            {!address && (
                <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 text-center">
                    Please connect your wallet.
                </p>
            )}
        </div>
    )
}
