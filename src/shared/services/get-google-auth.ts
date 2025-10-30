import { GOOGLE_GET_AUTH } from '@/shared/constants/electron-api-events';

type GetGoogleAuthResponse = {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  hd: string;
};

const getGoogleAuthService = async (): Promise<GetGoogleAuthResponse> => {
  return await window.electron.invoke(GOOGLE_GET_AUTH);
};

export const getGoogleAuth = async (): Promise<GetGoogleAuthResponse> => {
  const data = await getGoogleAuthService();
  return data;
};
