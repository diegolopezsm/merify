import { el_api_getGoogleAuth } from "@/shared/services/electron-api";

export const getGoogleAuth = async () => {
  return await el_api_getGoogleAuth();
};