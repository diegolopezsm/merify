import type { AuthTestResponse } from "@slack/web-api";
import { SLACK_TOKEN } from "@/shared/constants/store-keys";
import { el_api_getFromStore } from "@/shared/services/electron-api";
import { SLACK_GET_AUTH } from "@/shared/constants/electron-api-events";

const checkSlackAuthApi = async (): Promise<AuthTestResponse> => {
  return window.electron.invoke(SLACK_GET_AUTH);
};

export const checkSlackAuth = async (): Promise<boolean> => {
  const slackToken = await el_api_getFromStore(SLACK_TOKEN);
  if (!slackToken) {
    return false;
  }
  const auth = await checkSlackAuthApi();
  return !!auth;
};
