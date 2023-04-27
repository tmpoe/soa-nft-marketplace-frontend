import contracts from "../../constants/abi/contracts.json"
import { AbiItem } from "web3-utils"
import web3 from "../../provider/web3"
import { Contract } from "web3-eth-contract"

export class ContractHandler {
    static async fetchNftMarketplaceContract() {
        const chainId: number = await web3.eth.getChainId()
        const nftMarketplaceArtifact =
            contracts[chainId.toString() as keyof typeof contracts][0]["contracts"][
                "NftMarketplace"
            ]
        return new web3.eth.Contract(
            nftMarketplaceArtifact!.abi as AbiItem[], // https://github.com/web3/web3.js/issues/3310
            nftMarketplaceArtifact!.address
        )
    }

    static async fetchNftContract() {
        const chainId: number = await web3.eth.getChainId()
        const nftArtifact = await this.fetchNftContractArtifact()
        return new web3.eth.Contract(
            nftArtifact!.abi as AbiItem[], // https://github.com/web3/web3.js/issues/3310
            nftArtifact!.address
        )
    }

    static async fetchNftContractArtifact() {
        const chainId: number = await web3.eth.getChainId()
        return contracts[chainId.toString() as keyof typeof contracts][0]["contracts"]["Nft"]
    }
}
