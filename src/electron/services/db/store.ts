import Store from "electron-store";

export const store = new Store();

export const getStore = () => {
  return store;
};

export const setStore = (key: string, value: any) => {
  store.set(key, value);
};

export const getStoreValue = (key: string) => {
  const value = store.get(key) || "";
  return value;
};

export const deleteStore = (key: string) => {
  store.delete(key);
};
