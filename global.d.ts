import { MetaMaskInpageProvider } from "@metamask/providers"

// https://stackoverflow.com/questions/65504958/web3-js-extending-the-window-interface-type-definitions
declare global {
    interface Window {
        ethereum: MetaMaskInpageProvider
    }
}
