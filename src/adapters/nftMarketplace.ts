import { Contract } from "web3-eth-contract"
import web3 from "../../provider/web3"

export default class NftMarketplace {
    contract: Contract
    constructor(nftMarketplaceContract: Contract) {
        this.contract = nftMarketplaceContract
    }

    async payForNft(address: string) {
        const tx = await this.contract.methods
            .gatekeep()
            .send({ from: address, value: web3.utils.toWei("0.01", "ether") })
        console.debug(tx.events.NftRequested)
    }
}
