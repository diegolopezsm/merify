import {
  GOOGLE_ON_GMAIL_EVENT,
  GOOGLE_ON_GMAIL_EVENT_ERROR,
} from '@/shared/constants/electron-api-events';
import type { GmailEventHistoryResponse } from '@/shared/domain/gmail-event-history';
import { initGmailEventSubscription } from './init-gmail-event-subscription';

/**
 * Listen for new Gmail events
 * @param callback Function to handle the incoming Gmail event history
 * @param errorCallback Function to handle the error event
 */
export const listenToGmailEvents = async (
  callback: (
    // eslint-disable-next-line no-unused-vars
    history: GmailEventHistoryResponse
  ) => void,
  errorCallback: (
    // eslint-disable-next-line no-unused-vars
    error: Error
  ) => void
) => {
  try {
    await initGmailEventSubscription();

    window.electron.on(GOOGLE_ON_GMAIL_EVENT, (history: unknown) =>
      callback(history as GmailEventHistoryResponse)
    );
    window.electron.on(GOOGLE_ON_GMAIL_EVENT_ERROR, (error: unknown) =>
      errorCallback(error as Error)
    );
  } catch (error) {
    errorCallback(error as Error);
  }
};
