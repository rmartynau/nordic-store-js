import { EVENT_TYPES } from "../constants/eventTypes";
import { eventEmitter } from "../core/EventEmitter";

export const useNavigate = (target) => {
    eventEmitter.emit(EVENT_TYPES.changeRoute, { target });
};
