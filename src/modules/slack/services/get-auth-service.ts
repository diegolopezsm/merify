import { SLACK_GET_AUTH } from "@/shared/contants";
import { safeRequest } from "@/shared/utils/safe-request";

type Auth = {
  ok: boolean;
  url: string;
  team: string;
  user: string;
  team_id: string;
  user_id: string;
  bot_id: string;
  is_enterprise_install: boolean;
  response_metadata: {
    scopes: string[];
  };
};

export const getAuthService = async (): Promise<Auth | null> => {
  const [auth, error] = await safeRequest(async () => {
    return await window.electron.invoke(SLACK_GET_AUTH);
  });
  return error ? null : auth;
};
