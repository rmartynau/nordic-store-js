import { STORAGE_KEYS } from "../constants/storageKeys";
import { storageService } from "../services/Storage";

export const useCartStorage = () => {
  const getAllItems = () => {
    return storageService.getItem(STORAGE_KEYS.cart) ?? [];
  };

  const setItem = (id, data) => {
    const items = getAllItems().filter((item) => item.id != id);
    storageService.setItem(STORAGE_KEYS.cart, items.concat(data));
    changePriceCount();
    // changeCartCount();
  };

  const removeItem = (id) => {
    const items = getAllItems().filter((item) => item.id != id);
    storageService.setItem(STORAGE_KEYS.cart, items);
    changePriceCount();
  };

  const changePriceCount = () => {
    const cartElem = getAllItems();
    let totalPrice = 0;
    cartElem.forEach((item) => {
      totalPrice = Number(item.price) + totalPrice;
    });
    document.querySelector(".total-price").innerHTML = totalPrice;
  };

  // const changeCartCount = () => {
  //   const cartElem = getAllItems();
  //   let totalCount = 0;
  //   cartElem.forEach((item) => {
  //     totalCount = Number(item.qty) + totalCount;
  //   });
  //   document.querySelectorAll(".qty").forEach((item) => {
  //     item.innerHTML = totalCount;
  //   });
  // };

  return {
    getAllItems,
    setItem,
    removeItem,
  };
};
