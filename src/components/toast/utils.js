import { TOAST_TYPE } from "../../constants/toast";

export const getToastType = (type) => {
  const types = {
    [TOAST_TYPE.error]: "border-red-500",
    [TOAST_TYPE.info]: "border-blue-500",
    [TOAST_TYPE.warning]: "border-yellow-500",
    [TOAST_TYPE.success]: "border-green-500",
  };

  return types[type];
};
