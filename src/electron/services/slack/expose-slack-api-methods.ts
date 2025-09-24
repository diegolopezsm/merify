import { ipcMain } from "electron";
import { getToken } from "./token.js";
import { WebClient } from "@slack/web-api";
import { slackAuth } from "./slack-auth.js";
import {
  SLACK_GET_AUTH,
  SLACK_INIT_AUTH,
  SLACK_GET_CONVERSATIONS,
  SLACK_GET_CONVERSATION_HISTORY,
  GET_USER,
} from "../../../shared/contants.js";


export const exposeSlackApiMethods = () => {
  const client = new WebClient(getToken() as string);

  ipcMain.on(SLACK_INIT_AUTH, slackAuth);
  
  ipcMain.handle(SLACK_GET_AUTH, (_, args) => client.auth.test(args));

  ipcMain.handle(GET_USER, (_, args) => client.users.info(args));
  
  ipcMain.handle(SLACK_GET_CONVERSATIONS, (_, args) => client.conversations.list(args));

  ipcMain.handle(SLACK_GET_CONVERSATION_HISTORY, (_, args) =>
    client.conversations.history(args)
  );
};
