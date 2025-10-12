import { el_api_initSlackAuth } from "@/shared/services/electron-api";

export const initSlackAuth = async (): Promise<{ success: boolean }> => {
  return await el_api_initSlackAuth();
};
