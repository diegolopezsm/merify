import type { GmailThread } from '@/modules/gmail/domain/thread';
import { GOOGLE_GET_THREADS } from '@/shared/constants/electron-api-events';

type ThreadsListParams = {
  maxResults?: number;
  pageToken?: string;
  q?: string;
  labelIds?: string[];
};

interface GmailThreadsResponse {
  threads?: GmailThread[];
  nextPageToken?: string;
  resultSizeEstimate?: number;
}
const getThreadsService = async (
  args: ThreadsListParams
): Promise<GmailThreadsResponse> => {
  return await window.electron.invoke(GOOGLE_GET_THREADS, args);
};

export const getThreads = async (
  args: ThreadsListParams = {}
): Promise<GmailThreadsResponse> => {
  const response = await getThreadsService(args);
  return response;
};
