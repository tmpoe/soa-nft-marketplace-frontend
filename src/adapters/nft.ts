import { Contract } from "web3-eth-contract"
import NftMarketplace from "./nftMarketplace"

export default class Nft {
    private contract: Contract
    constructor(nftContract: Contract) {
        this.contract = nftContract
    }

    async getTokenURI(id: number) {
        return await this.contract.methods.tokenURI(id).call()
    }

    async approveMarketplaceToHandleNftOwnerChange(
        nftMarketplaceContract: NftMarketplace,
        tokenId: number,
        owner: string
    ) {
        console.debug("approving marketplace to handle owner change")
        console.debug(
            this.contract.options.address,
            nftMarketplaceContract.getAddress(),
            tokenId,
            owner
        )
        const hash = await this.contract.methods
            .approve(nftMarketplaceContract.getAddress(), tokenId)
            .send({ from: owner })
        console.debug("Approval hash: ", hash)
    }

    getAddress() {
        return this.contract.options.address
    }
}
