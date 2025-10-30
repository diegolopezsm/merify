import { fetchWithToken } from '../google/fetch-with-token.js';

const GMAIL_SET_WATCH_URL =
  'https://gmail.googleapis.com/gmail/v1/users/me/watch';

interface SetInboxWatchResponse {
  historyId: string;
  expiration: string;
}

/**
 * Sets the watch for the inbox
 * Automatically handles token refresh if the current token is expired
 * @param topicName - The name of the topic to watch
 * @param labelIds - The labels to watch
 * @returns The response from the API
 */
export const setInboxWatch = async ({
  topicName,
  labelIds,
}: {
  topicName: string;
  labelIds: string[];
}) => {
  const response = await fetchWithToken<SetInboxWatchResponse>({
    url: GMAIL_SET_WATCH_URL,
    method: 'POST',
    operationName: 'set inbox watch',
    body: JSON.stringify({ topicName, labelIds }),
  });
  return {
    historyId: response.historyId,
    expiration: response.expiration,
  };
};
