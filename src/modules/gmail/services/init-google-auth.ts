import { el_api_initGoogleAuth } from "@/shared/services/electron-api";

export const initGoogleAuth = async (): Promise<{ success: boolean }> => {
  return await el_api_initGoogleAuth();
};