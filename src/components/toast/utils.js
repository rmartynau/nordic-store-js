import { TOAST_TYPE } from "../../constants/toast";

export const getToastType = (type) => {
  const types = {
    [TOAST_TYPE.error]: "border-t-red-500",
    [TOAST_TYPE.info]: "border-t-blue-500",
    [TOAST_TYPE.warning]: "border-t-amber-500",
    [TOAST_TYPE.success]: "border-t-green-500",
  };

  return types[type];
};
