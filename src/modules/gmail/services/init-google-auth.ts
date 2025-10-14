import { GOOGLE_INIT_AUTH } from "@/shared/constants/electron-api-events";

export const initGoogleAuth = async (): Promise<{ success: boolean }> => {
  return await window.electron.invoke(GOOGLE_INIT_AUTH);
};
