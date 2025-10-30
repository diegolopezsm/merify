import { OPEN_MAIN_WINDOW } from '@/shared/constants/electron-api-events.js';

export const openMainWindow = async () => {
  return await window.electron.invoke(OPEN_MAIN_WINDOW);
};
