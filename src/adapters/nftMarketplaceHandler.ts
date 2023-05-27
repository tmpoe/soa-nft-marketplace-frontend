import { Contract } from "web3-eth-contract"
import web3 from "../../provider/web3"

export default class NftMarketplaceHandler {
    private contract: Contract
    constructor(nftMarketplaceContract: Contract) {
        this.contract = nftMarketplaceContract
    }

    async payForNft(address: string) {
        const mintingFee = await this.contract.methods.getMintingFee().call()
        console.debug(process.env.NEXT_PUBLIC_BACKEND_URL)
        const tx = await this.contract.methods.gatekeep().send({
            from: address,
            value: mintingFee,
        })
        console.debug(tx.events.NftRequested)
    }

    async listNft(tokenId: string, nftAddress: string, price: string, owner: string) {
        const result = await this.contract.methods
            .listNft(parseInt(tokenId), nftAddress, web3.utils.toWei(price, "ether"))
            .send({ from: owner })
        console.debug(result)
    }

    async cancelListing(tokenId: string, nftAddress: string, owner: string) {
        console.debug(tokenId, nftAddress, owner)
        const result = await this.contract.methods
            .cancelListing(parseInt(tokenId), nftAddress)
            .send({ from: owner })
        console.debug("listing result", result)
    }

    async buyNft(tokenId: string, nftAddress: string, price: string, buyer: string) {
        const result = await this.contract.methods
            .buyNft(tokenId, nftAddress)
            .send({ value: price, from: buyer })
        console.debug("buy result", result)
    }

    getAddress() {
        return this.contract.options.address
    }
}
