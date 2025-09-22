import { getStoreValue, setStore } from "../db/store.js";

export const SLACK_TOKEN = "slackToken";

export const saveToken = (token: string) => {
  setStore(SLACK_TOKEN, token);
};

export const getToken = () => {
  const token = getStoreValue(SLACK_TOKEN);
  return token;
};
