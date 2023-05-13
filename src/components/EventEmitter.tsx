// @ts-nocheck
export enum Events {
    MINTING_FINISHED = "minting_finished",
    MODAL_CLOSED = "modal_closed",
    WALLET_CONNECTED = "wallet_connected",
    // use an enum to keep track of events similar to action types set as variables in redux
}
export const EventEmitter = {
    _events: {},
    dispatch(event: Events, data: any) {
        if (!this._events[event]) return
        this._events[event].forEach((callback) => callback(data))
    },
    subscribe(event: Events, callback: (data: any) => any) {
        if (!this._events[event]) this._events[event] = []
        this._events[event].push(callback)
    },
    unsubscribe(event: Events) {
        if (!this._events[event]) return
        delete this._events[event]
    },
}
