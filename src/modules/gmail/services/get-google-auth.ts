import type { oauth2_v2 } from 'googleapis';
import { GOOGLE_GET_AUTH } from '@/shared/constants/electron-api-events';

export const getGoogleAuth = async (): Promise<oauth2_v2.Schema$Userinfo> => {
  return await window.electron.invoke(GOOGLE_GET_AUTH);
};
