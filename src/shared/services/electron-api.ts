import {
  GET_USER,
  SET_IN_STORE,
  GET_FROM_STORE,
  SLACK_GET_AUTH,
  SLACK_INIT_AUTH,
  DELETE_FROM_STORE,
  SLACK_GET_CONVERSATIONS,
  SLACK_GET_CONVERSATION_HISTORY,
} from "@/shared/constants/electron-api-events";
import type {
  AuthTestResponse,
  UsersInfoResponse,
  UsersInfoArguments,
  ConversationsListResponse,
  ConversationsHistoryResponse,
  ConversationsHistoryArguments,
} from "@slack/web-api";

// Store
export const el_api_getFromStore = (key: string): Promise<string | undefined> => {
  return window.electron.invoke(GET_FROM_STORE, key);
};

export const el_api_setInStore = (key: string, value: any) => {
  return window.electron.invoke(SET_IN_STORE, key, value);
};

export const el_api_deleteFromStore = (key: string) => {
  return window.electron.invoke(DELETE_FROM_STORE, key);
};

// Slack
export const el_api_initSlackAuth = (): Promise<{ success: boolean }> => {
  return window.electron.invoke(SLACK_INIT_AUTH);
};

export const el_api_getSlackConversations = (): Promise<ConversationsListResponse> => {
  return window.electron.invoke(SLACK_GET_CONVERSATIONS);
};

export const el_api_getSlackConversationHistory = (
  args: ConversationsHistoryArguments
): Promise<ConversationsHistoryResponse> => {
  return window.electron.invoke(SLACK_GET_CONVERSATION_HISTORY, args);
};

export const el_api_getSlackAuth = (): Promise<AuthTestResponse> => {
  return window.electron.invoke(SLACK_GET_AUTH);
};

export const el_api_getSlackUser = (args: UsersInfoArguments): Promise<UsersInfoResponse> => {
  return window.electron.invoke(GET_USER, args);
};
