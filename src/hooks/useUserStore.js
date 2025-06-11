import { store } from "../store/Store";

export const useUserStore = () => {
  const setUser = (user) => {
    store.setState({ user });
  };

  const getUser = () => {
    return store.getState().user;
  };

  const removeUser = () => {
    store.setUser({ user: null });
  };

  return {
    setUser,
    getUser,
    removeUser,
  };
};
