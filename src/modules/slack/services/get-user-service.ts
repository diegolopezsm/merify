import { el_api_getSlackUser } from "@/shared/services/electron-api";
import type { UsersInfoArguments, UsersInfoResponse } from "@slack/web-api";

export const getUserService = async (
  args: UsersInfoArguments
): Promise<UsersInfoResponse["user"]> => {
  const response = await el_api_getSlackUser(args);
  return response.user;
};
