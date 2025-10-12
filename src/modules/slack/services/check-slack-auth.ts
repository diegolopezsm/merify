import { SLACK_TOKEN } from "@/shared/constants/store-keys";
import {
  el_api_getFromStore,
  el_api_getSlackAuth,
} from "@/shared/services/electron-api";

type Auth = {
  slackToken: string | undefined;
  ok: boolean;
};

export const checkSlackAuth = async (): Promise<Auth> => {
  const slackToken = await el_api_getFromStore(SLACK_TOKEN);
  if (!slackToken) {
    return {
      slackToken: undefined,
      ok: false,
    };
  }
  const auth = await el_api_getSlackAuth();
  return {
    slackToken,
    ok: auth.ok,
  };
};
