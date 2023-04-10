import Header from "./Header"
import React, { useEffect } from "react"
import { GetLatestOwnerNftDocument, GetLatestOwnerNftQuery, execute } from "../../.graphclient"
import { useAccount } from "wagmi"

export default function Layout({ children }: { children: React.ReactNode }) {
    const { address } = useAccount()

    const [data, setData] = React.useState<GetLatestOwnerNftQuery>()
    const [latestTokenid, setLatestTokenid] = React.useState<string>()
    // TODO make it interval queried
    useEffect(() => {
        execute(GetLatestOwnerNftDocument, { owner: address }).then((result) => {
            setData(result?.data)
        })
        console.log("Nfts for", address)
        console.log(data)
    }, [setData])
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}
