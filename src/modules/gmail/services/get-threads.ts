import type {
  ThreadsListParams,
  GmailThreadsResponse,
} from '@/modules/gmail/domain/threads';
import { GOOGLE_GET_THREADS } from '@/shared/constants/electron-api-events';

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
