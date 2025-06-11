import { EVENT_TYPES } from "../constants/eventTypes";
import { eventEmitter } from "../core/EventEmitter";

export class Store {
  constructor(initialState) {
    this._state = initialState;
  }

  getState() {
    return this._state;
  }

  setState(state) {
    this._state = Object.assign(this._state, state);
    eventEmitter.emit(EVENT_TYPES.store, { state: this._state });
  } 

  subscribe(callback) {
    eventEmitter.on(EVENT_TYPES.store, callback);
  }

  unSubscribe(callback) {
    eventEmitter.off(EVENT_TYPES.store, callback);
  }
}

export const store = new Store({ user: null });
