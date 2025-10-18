import { fetchWithToken } from './fetch-with-token.js';

const GMAIL_THREAD_TO_TRASH_URL = (threadId: string) =>
  `https://gmail.googleapis.com/gmail/v1/users/me/threads/${threadId}/trash`;

/**
 * Sends a thread to trash
 * Automatically handles token refresh if the current token is expired
 * @param threadId - The ID of the thread to send to trash
 * @returns The response from the API
 */
export const sendThreadToTrash = async (threadId: string) => {
  const response = await fetchWithToken({
    url: GMAIL_THREAD_TO_TRASH_URL(threadId),
    method: 'POST',
    operationName: 'send thread to trash',
  });
  return response;
};
