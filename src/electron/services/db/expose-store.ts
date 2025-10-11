import { ipcMain } from "electron";
import {
  getStore,
  setInStore,
  getFromStore,
  deleteFromStore,
} from "./store.js";
import {
  GET_STORE,
  SET_IN_STORE,
  GET_FROM_STORE,
  DELETE_FROM_STORE,
} from "../../../shared/constants/electron-api-events.js";

export const exposeStore = () => {
  ipcMain.handle(GET_STORE, () => getStore());
  ipcMain.handle(GET_FROM_STORE, (_, key: string) => getFromStore(key));
  ipcMain.handle(SET_IN_STORE, (_, key: string, value: any) =>
    setInStore(key, value)
  );
  ipcMain.handle(DELETE_FROM_STORE, (_, key: string) => deleteFromStore(key));
};
