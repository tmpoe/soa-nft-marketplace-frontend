import contracts from "../../constants/abi/contracts.json"
import { AbiItem } from "web3-utils"
import web3 from "../../provider/web3"
import NftHandler from "@/adapters/nftHandler"
import NftMarketplaceHandler from "@/adapters/nftMarketplaceHandler"

export class ContractHandlerFactory {
    static async fetchNftContractArtifact() {
        return this._getContractArtifact("Nft")
    }

    static async fetchNftMarketplaceContractArtifact() {
        return this._getContractArtifact("NftMarketplace")
    }

    static async getNftContractHandler() {
        return new NftHandler(await ContractHandlerFactory._fetchNftContract())
    }

    static async getNftMarketplaceContractHandler() {
        return new NftMarketplaceHandler(
            await ContractHandlerFactory._fetchNftMarketplaceContract()
        )
    }

    static async _getContractArtifact(contractName: "Nft" | "NftMarketplace") {
        const chainId: number = await web3.eth.getChainId()
        return contracts[chainId.toString() as keyof typeof contracts][0]["contracts"][
            contractName
        ]
    }

    static async _fetchNftMarketplaceContract() {
        const nftMarketplaceArtifact = await this.fetchNftMarketplaceContractArtifact()
        return new web3.eth.Contract(
            nftMarketplaceArtifact!.abi as AbiItem[], // https://github.com/web3/web3.js/issues/3310
            nftMarketplaceArtifact!.address
        )
    }

    static async _fetchNftContract() {
        const nftArtifact = await this.fetchNftContractArtifact()
        return new web3.eth.Contract(
            nftArtifact!.abi as AbiItem[], // https://github.com/web3/web3.js/issues/3310
            nftArtifact!.address
        )
    }
}
