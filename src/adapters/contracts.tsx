import contracts from "../../constants/abi/contracts.json"
import { AbiItem } from "web3-utils"
import web3 from "../../provider/web3"
import { Contract } from "web3-eth-contract"

export class ContractHandler {
    private chainId: number
    private nftMarketplaceContract: Contract
    private nftContract: Contract

    private constructor(chainId: number, nftMarketplaceContract: Contract, nftContract: Contract) {
        this.chainId = chainId
        this.nftMarketplaceContract = nftMarketplaceContract
        this.nftContract = nftContract
    }

    static async getContractHandler() {
        const chainId: number = await web3.eth.getChainId()
        const nftMarketplaceContract = await this.fetchNftMarketplaceContract(chainId)
        const nftContract = await this.fetchNftContract(chainId)
        return new ContractHandler(chainId, nftMarketplaceContract, nftContract)
    }

    private static async fetchNftMarketplaceContract(chainId: number) {
        const nftMarketplaceArtifact =
            contracts[chainId.toString() as keyof typeof contracts][0]["contracts"][
                "NftMarketplace"
            ]
        return new web3.eth.Contract(
            nftMarketplaceArtifact!.abi as AbiItem[], // https://github.com/web3/web3.js/issues/3310
            nftMarketplaceArtifact!.address
        )
    }

    private static async fetchNftContract(chainId: number) {
        const nftArtifact = await this.fetchNftContractArtifact(chainId)
        return new web3.eth.Contract(
            nftArtifact!.abi as AbiItem[], // https://github.com/web3/web3.js/issues/3310
            nftArtifact!.address
        )
    }

    private static async fetchNftContractArtifact(chainId: number) {
        return contracts[chainId.toString() as keyof typeof contracts][0]["contracts"]["Nft"]
    }

    async approveMarketplaceToHandleNftOwnerChange(tokenId: number, owner: string) {
        console.debug("approving marketplace to handle owner change")
        console.debug(
            this.nftContract.options.address,
            this.nftMarketplaceContract.options.address,
            tokenId,
            owner
        )
        const hash = await this.nftContract.methods
            .approve(this.nftMarketplaceContract.options.address, tokenId)
            .send({ from: owner })
        console.debug("Approval hash: ", hash)
    }

    getNftContract() {
        return this.nftContract
    }

    getNftMarketplaceContract() {
        return this.nftMarketplaceContract
    }

    async getNftContractAddress() {
        return this.nftContract.options.address
    }
}
