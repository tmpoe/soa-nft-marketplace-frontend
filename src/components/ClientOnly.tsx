"use client"
// source: https://codingwithmanny.medium.com/understanding-hydration-errors-in-nextjs-13-with-a-web3-wallet-connection-8155c340fbd5
import React, { useState, useEffect } from "react"

export default function ClientOnly({ children }: { children: React.ReactNode }) {
    // State / Props
    const [hasMounted, setHasMounted] = useState(false)

    // Hooks
    useEffect(() => {
        setHasMounted(true)
    }, [])

    // Render
    if (!hasMounted) return null

    return <div>{children}</div>
}
