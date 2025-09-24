import { GET_USER } from "@/shared/contants";
import type { UsersInfoArguments, UsersInfoResponse } from "@slack/web-api";

const getUserApi = async (args: UsersInfoArguments): Promise<UsersInfoResponse> => {
  return await window.electron.invoke(GET_USER, args);
};


export const getUserService = async (args: UsersInfoArguments): Promise<UsersInfoResponse['user']> => {
  const response = await getUserApi(args);
  return response.user;
};
