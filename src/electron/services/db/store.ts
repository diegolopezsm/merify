import fs from "fs";
import os from "os";
import path from "path";
import Store from "electron-store";
import { randomBytes } from "crypto";

const keyPath = path.join(os.homedir(), ".merify-key");
function getOrCreateSecretKey() {
  if (fs.existsSync(keyPath)) {
    return fs.readFileSync(keyPath, "utf8");
  } else {
    const newKey = randomBytes(32).toString("hex");
    fs.writeFileSync(keyPath, newKey, { mode: 0o600 });
    return newKey;
  }
}

const STORE_SECRET_KEY = getOrCreateSecretKey();

const store = new Store({
  name: "merify-store",
  encryptionKey: STORE_SECRET_KEY,
});

export const getStore = () => {
  return store;
};

export const setInStore = (key: string, value: any) => {
  return store.set(key, value);
};

export const getFromStore = (key: string) => {
  return store.get(key, undefined);
};

export const deleteFromStore = (key: string) => {
  return store.delete(key);
};
