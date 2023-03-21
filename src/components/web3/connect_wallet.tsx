import { useConnect } from "wagmi"
import React from "react"
import ClientOnly from "../ClientOnly"

export default function Profile() {
    const { connect, connectors, error, isLoading, pendingConnector } = useConnect()

    return (
        <div>
            <ClientOnly>
                {connectors.map((connector) => (
                    <button
                        disabled={!connector.ready}
                        key={connector.id}
                        onClick={() => connect({ connector })}
                    >
                        {connector.name}
                        {!connector.ready && " (unsupported)"}
                        {isLoading && connector.id === pendingConnector?.id && " (connecting)"}
                    </button>
                ))}

                {error && <div>{error.message}</div>}
            </ClientOnly>
        </div>
    )
}
