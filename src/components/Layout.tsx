import Header from "./Header"
import React from "react"
import { ExampleQueryDocument, ExampleQueryQuery, execute } from "graphclient"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}
