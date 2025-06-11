import { EVENT_TYPES } from "../constants/eventTypes";
import { TOAST_TYPE } from "../constants/toast";
import { eventEmitter } from "../core/EventEmitter";

export const useToastNotification = ({ message, type = TOAST_TYPE.error }) => {
  eventEmitter.emit(EVENT_TYPES.toastNotification, {
    message,
    type,
  });
};
