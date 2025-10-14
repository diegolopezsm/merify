import { GOOGLE_TOKEN } from "@/shared/constants/store-keys";
import { el_api_getFromStore } from "@/shared/services/electron-api";
import { getGoogleAuth } from "@/modules/gmail/services/get-google-auth";

export const checkGoogleAuth = async (): Promise<boolean> => {
  const googleToken = await el_api_getFromStore(GOOGLE_TOKEN);
  if (!googleToken) {
    return false;
  }
  const user = await getGoogleAuth();
  return !!user;
};
