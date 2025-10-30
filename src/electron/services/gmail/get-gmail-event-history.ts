import { fetchWithToken } from '../google/fetch-with-token.js';
import type { GmailEventHistoryResponse } from '../../../shared/domain/gmail-event-history.ts';
const GMAIL_EVENT_HISTORY_URL =
  'https://gmail.googleapis.com/gmail/v1/users/me/history';

/**
 * Gets the Gmail event history
 * @param startHistoryId - The start history ID
 * @returns The response from the API
 */
export const getGmailEventHistory = async (
  startHistoryId: string
): Promise<GmailEventHistoryResponse> => {
  const response = await fetchWithToken<GmailEventHistoryResponse>({
    url: GMAIL_EVENT_HISTORY_URL,
    params: {
      startHistoryId,
    },
    operationName: 'get Gmail event history',
  });
  return response;
};
