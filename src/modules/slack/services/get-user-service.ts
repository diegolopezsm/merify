import { GET_USER } from '@/shared/constants/electron-api-events';
import type { UsersInfoArguments, UsersInfoResponse } from '@slack/web-api';

const getSlackUserApi = async (
  args: UsersInfoArguments
): Promise<UsersInfoResponse> => {
  return window.electron.invoke(GET_USER, args);
};

export const getSlackUser = async (
  args: UsersInfoArguments
): Promise<UsersInfoResponse['user']> => {
  const response = await getSlackUserApi(args);
  return response.user;
};
