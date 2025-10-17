import { GOOGLE_GET_AUTH } from '@/shared/constants/electron-api-events';

export const getGoogleAuth = async () => {
  return await window.electron.invoke(GOOGLE_GET_AUTH);
};
