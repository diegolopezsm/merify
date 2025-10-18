import { GOOGLE_MARK_THREAD_AS_READ } from '@/shared/constants/electron-api-events';

const markThreadAsReadService = async (threadId: string) => {
  return await window.electron.invoke(GOOGLE_MARK_THREAD_AS_READ, threadId);
};

export const markThreadAsRead = async (threadId: string) => {
  const response = await markThreadAsReadService(threadId);
  return response;
};
