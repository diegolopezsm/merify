import { GOOGLE_SEND_THREAD_TO_TRASH } from '@/shared/constants/electron-api-events';

export const sendThreadToTrashService = async (threadId: string) => {
  return await window.electron.invoke(GOOGLE_SEND_THREAD_TO_TRASH, threadId);
};

export const sendThreadToTrash = async (threadId: string) => {
  const response = await sendThreadToTrashService(threadId);
  return response;
};
