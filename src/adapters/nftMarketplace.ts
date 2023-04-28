import { Contract } from "web3-eth-contract"
import web3 from "../../provider/web3"

export default class NftMarketplace {
    private contract: Contract
    constructor(nftMarketplaceContract: Contract) {
        this.contract = nftMarketplaceContract
    }

    async payForNft(address: string) {
        const tx = await this.contract.methods
            .gatekeep()
            .send({ from: address, value: web3.utils.toWei("0.01", "ether") })
        console.debug(tx.events.NftRequested)
    }

    async listNft(tokenId: string, nftAddress: string, price: string, owner: string) {
        const result = await this.contract.methods
            .listNft(parseInt(tokenId), nftAddress, web3.utils.toWei(price, "ether"))
            .send({ from: owner })
        console.debug(result)
    }

    async cancelListing(tokenId: string, nftAddress: string, owner: string) {
        console.debug("fos3")
        console.debug(tokenId, nftAddress, owner)
        const result = await this.contract.methods
            .cancelListing(parseInt(tokenId), nftAddress)
            .send({ from: owner })
        console.debug("listing result", result)
    }

    async getListedNfts(tokenId: string, nftAddress: string) {
        // TODO think of something how I can do this efficiently with minimal change in the marketplace contract
        // Problem:
        // Currently I query listed nfts by querying the graph. It has every listed event every
        // meaning if I cancel a listing THE EVENT WILL STAY THERE which will falsely show up
        // on the Listings page
    }

    getAddress() {
        return this.contract.options.address
    }
}
