import { SLACK_INIT_AUTH } from '@/shared/constants/electron-api-events';

export const initSlackAuth = async (): Promise<{ success: boolean }> => {
  return await window.electron.invoke(SLACK_INIT_AUTH);
};
