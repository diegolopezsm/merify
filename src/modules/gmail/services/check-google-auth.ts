import { GOOGLE_TOKEN } from "@/shared/constants/store-keys";
import {
  el_api_getFromStore,
  el_api_getGoogleAuth,
} from "@/shared/services/electron-api";

export const checkGoogleAuth = async () => {
  const googleToken = await el_api_getFromStore(GOOGLE_TOKEN);
  if (!googleToken) {
    return false;
  }
  const user = await el_api_getGoogleAuth();
  return !!user;
};
