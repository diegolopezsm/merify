import { getToken } from "./token.js";
import { WebClient } from "@slack/web-api";

export const getChannels = async () => {
  const client = new WebClient(getToken() as string);
  const result = await client.conversations.list();
  return result;
};
