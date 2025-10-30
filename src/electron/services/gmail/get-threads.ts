import { fetchWithToken } from '../google/fetch-with-token.js';

const GMAIL_THREADS_URL =
  'https://gmail.googleapis.com/gmail/v1/users/me/threads';

interface ThreadsListParams {
  maxResults?: number;
  pageToken?: string;
  q?: string;
  labelIds?: string[];
}

interface GmailThreadsResponse {
  threads?: Array<{
    id: string;
    snippet: string;
    historyId: string;
  }>;
  nextPageToken?: string;
  resultSizeEstimate?: number;
}

/**
 * Gets Gmail threads for the authenticated user
 * Automatically handles token refresh if the current token is expired
 * @param params - The parameters for the request
 * @returns The response from the API
 */
export const getThreads = async (
  params: ThreadsListParams = {}
): Promise<GmailThreadsResponse> => {
  const response = await fetchWithToken<GmailThreadsResponse>({
    url: GMAIL_THREADS_URL,
    params: params as Record<string, string | number | string[] | undefined>,
    operationName: 'get Gmail threads',
  });
  return response;
};
