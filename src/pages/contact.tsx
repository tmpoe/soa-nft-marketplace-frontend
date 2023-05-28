import { useAccount } from "wagmi"
import { FullTokenData, Listing } from "@/types/nft"

export default function Summon() {
    const { address } = useAccount()

    return (
        <div className="grid justify-items-center p-10">
            <div className="card w-96 bg-primary text-primary-content">
                <div className="card-body">
                    <h2 className="card-title">Contact me!</h2>
                    <div className="card-actions justify-center">
                        <button className="btn">
                            <a href="https://www.linkedin.com/in/tmp/">Linkedin</a>
                        </button>
                        <button className="btn">
                            <a href="https://github.com/tmpoe">Github</a>
                        </button>
                    </div>
                </div>
            </div>
            <div className="card w-96 bg-primary text-primary-content my-10">
                <div className="card-body">
                    <h2 className="card-title">Check out the source code!</h2>
                    <div className="card-actions justify-center">
                        <button className="btn">
                            <a href="https://github.com/tmpoe/soa-nft-marketplace-frontend">
                                Frontend
                            </a>
                        </button>
                        <button className="btn">
                            <a href="https://github.com/tmpoe/soa-nft-marketplace-backend">
                                Backend
                            </a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
