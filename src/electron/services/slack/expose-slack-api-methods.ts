import { ipcMain } from "electron";
import { getFromStore, SLACK_TOKEN } from "../db/store.js";
import { WebClient } from "@slack/web-api";
import { slackAuth } from "./slack-auth.js";
import {
  GET_USER,
  SLACK_GET_AUTH,
  SLACK_INIT_AUTH,
  SLACK_GET_CONVERSATIONS,
  SLACK_GET_CONVERSATION_HISTORY,
} from "../../../shared/constants/electron-api-events.js";


export const exposeSlackApiMethods = () => {
  const client = new WebClient(getFromStore(SLACK_TOKEN) as string);

  ipcMain.on(SLACK_INIT_AUTH, slackAuth);
  
  ipcMain.handle(SLACK_GET_AUTH, (_, args) => client.auth.test(args));

  ipcMain.handle(GET_USER, (_, args) => client.users.info(args));
  
  ipcMain.handle(SLACK_GET_CONVERSATIONS, (_, args) => client.conversations.list(args));

  ipcMain.handle(SLACK_GET_CONVERSATION_HISTORY, (_, args) =>
    client.conversations.history(args)
  );
};
