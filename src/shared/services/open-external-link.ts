import { OPEN_EXTERNAL_LINK } from '@/shared/constants/electron-api-events.js';

export const openExternalLink = async (url: string) => {
  return await window.electron.invoke(OPEN_EXTERNAL_LINK, url);
};
