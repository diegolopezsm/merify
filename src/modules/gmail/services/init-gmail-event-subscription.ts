import { GOOGLE_INIT_GMAIL_EVENTS_SUBSCRIPTION } from '@/shared/constants/electron-api-events';

export const initGmailEventSubscription = () => {
  return window.electron.invoke(GOOGLE_INIT_GMAIL_EVENTS_SUBSCRIPTION);
};
