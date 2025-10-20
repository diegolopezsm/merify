import { getThreads } from '@/modules/gmail/services/get-threads';
import { useAsyncState } from '@/shared/composables/use-async-state';
import type { ThreadsListParams } from '@/modules/gmail/domain/threads';

export const useGetGmailThreads = (params?: ThreadsListParams) => {
  const defaultParams = {
    q: 'is:unread',
  };
  const {
    state: threadsResponse,
    isLoading,
    execute: executeGetThreads,
    error,
  } = useAsyncState(
    () => {
      return getThreads({ ...defaultParams, ...params });
    },
    { threads: [] },
    {
      immediate: false,
    }
  );

  return {
    threadsResponse,
    isLoading,
    executeGetThreads,
    error,
  };
};
