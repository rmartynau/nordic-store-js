export class EventEmitter {
    constructor() {
        this.eventTarget = new EventTarget();
    }

    on(type, listener) {
        this.eventTarget.addEventListener(type, listener)
    }

    off(type, listener) {
        this.eventTarget.removeEventListener(type, listener)
    }

    emit(type, data) {
        return this.eventTarget.dispatchEvent(new CustomEvent(type, { detail: data }))
    }
}

export const eventEmitter = new EventEmitter();