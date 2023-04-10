import Web3 from "web3"

let web3: Web3

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    // We are in the browser and metamask is running.
    console.log("ethereum is running")
    window.ethereum.request({ method: "eth_requestAccounts" })
    web3 = new Web3(window.ethereum)
} else {
    // We are on the server *OR* the user is not running metamask
    console.log("infura is running")
    const provider = new Web3.providers.HttpProvider(
        process.env.SEPOLIA_RPC_URL || process.env.MAINNET_RPC_URL || "dumdum"
    )
    web3 = new Web3(provider)
}

export default web3
