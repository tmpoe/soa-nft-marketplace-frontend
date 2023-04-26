import { Contract } from "web3-eth-contract"

export default class Nft {
    contract: Contract
    constructor(nftContract: Contract) {
        this.contract = nftContract
    }

    async getTokenURI(id: number) {
        return await this.contract.methods.tokenURI(id).call()
    }
}
