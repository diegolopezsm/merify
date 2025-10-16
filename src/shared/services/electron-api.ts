import {
  SET_IN_STORE,
  GET_FROM_STORE,
  DELETE_FROM_STORE,
  SLACK_GET_CONVERSATIONS,
} from '@/shared/constants/electron-api-events';
import type { ConversationsListResponse } from '@slack/web-api';

// Store
export const el_api_getFromStore = (
  key: string
): Promise<string | undefined> => {
  return window.electron.invoke(GET_FROM_STORE, key);
};

export const el_api_setInStore = (key: string, value: unknown) => {
  return window.electron.invoke(SET_IN_STORE, key, value);
};

export const el_api_deleteFromStore = (key: string) => {
  return window.electron.invoke(DELETE_FROM_STORE, key);
};

// Slack
export const el_api_getSlackConversations =
  (): Promise<ConversationsListResponse> => {
    return window.electron.invoke(SLACK_GET_CONVERSATIONS);
  };
