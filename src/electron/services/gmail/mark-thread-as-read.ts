import { fetchWithToken } from '../google/fetch-with-token.js';

const GMAIL_MARK_THREAD_AS_READ_URL = (threadId: string) =>
  `https://gmail.googleapis.com/gmail/v1/users/me/threads/${threadId}/modify`;

/**
 * Marks a thread as read
 * Automatically handles token refresh if the current token is expired
 * @param threadId - The ID of the thread to mark as read
 * @returns The response from the API
 */
export const markThreadAsRead = async (threadId: string) => {
  const response = await fetchWithToken({
    url: GMAIL_MARK_THREAD_AS_READ_URL(threadId),
    method: 'POST',
    body: JSON.stringify({
      removeLabelIds: ['UNREAD'],
    }),
    operationName: 'mark thread as read',
  });
  return response;
};
