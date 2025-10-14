import { SLACK_TOKEN } from "@/shared/constants/store-keys";
import {
  el_api_getFromStore,
  el_api_getSlackAuth,
} from "@/shared/services/electron-api";

export const checkSlackAuth = async (): Promise<boolean> => {
  const slackToken = await el_api_getFromStore(SLACK_TOKEN);
  if (!slackToken) {
    return false;
  }
  const auth = await el_api_getSlackAuth();
  return !!auth;
};
