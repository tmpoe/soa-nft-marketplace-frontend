import { useAccount, useConnect, useDisconnect } from "wagmi"
import ClientOnly from "../ClientOnly"
import { useEffect, useState } from "react"
import { EventEmitter, Events } from "../EventEmitter"

export default function Profile() {
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
    const { address, isConnected } = useAccount()
    const { disconnect } = useDisconnect()

    const [isDefinitelyConnected, setIsDefinitelyConnected] = useState(false)

    useEffect(() => {
        if (isConnected) {
            setIsDefinitelyConnected(true)
            EventEmitter.dispatch(Events.WALLET_CONNECTED, {})
        } else {
            setIsDefinitelyConnected(false)
        }
    }, [address])

    if (isDefinitelyConnected) {
        return (
            <ClientOnly>
                <div>
                    Connected to {address?.slice(0, 8)}
                    <br />
                    <button
                        onClick={() => {
                            disconnect()
                            EventEmitter.dispatch(Events.WALLET_DISCONNECTED, {})
                        }}
                    >
                        Disconnect
                    </button>
                </div>
            </ClientOnly>
        )
    }

    return (
        <div>
            <ClientOnly>
                {connectors.map((connector) => (
                    <button
                        disabled={!connector.ready}
                        key={connector.id}
                        onClick={() => {
                            connect({ connector })
                        }}
                    >
                        {!isConnected && "Connect Wallet"}
                        {!connector.ready && " (unsupported)"}
                        {isLoading && connector.id === pendingConnector?.id && " (connecting)"}
                    </button>
                ))}

                {error && <div>{error.message}</div>}
            </ClientOnly>
        </div>
    )
}
