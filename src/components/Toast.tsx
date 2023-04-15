import React from "react"
import classNames from "classnames"
import toast, { Toaster } from "react-hot-toast"
import { MdOutlineClose } from "react-icons/md"
import { HiLightningBolt } from "react-icons/hi"

export default function showToast() {
    toast.custom(
        (t) => (
            <div className={classNames([".notificationWrapper", t.visible ? "top-0" : "-top-96"])}>
                <div className=".iconWrapper">
                    <HiLightningBolt />
                </div>
                <div className=".contentWrapper">
                    <h1>Your NFT is ready!</h1>
                    <p>
                        We are happy to inform you that our hardworking minters just finished you
                        newest NFT.
                    </p>
                </div>
                <div className=".closeIcon" onClick={() => toast.dismiss(t.id)}>
                    <MdOutlineClose />
                </div>
            </div>
        ),
        { id: "unique-notification", position: "top-center" }
    )
}
