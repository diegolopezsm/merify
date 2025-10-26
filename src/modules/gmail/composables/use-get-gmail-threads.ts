import { getThreads } from '@/modules/gmail/services/get-threads';
import { useAsyncState } from '@/shared/composables/use-async-state';
import type { ThreadsListParams } from '@/modules/gmail/domain/threads';
import { PRIMEAI_EMAIL_ADDRESSES } from '@/modules/gmail/domain/constants';

export const useGetGmailThreads = (params?: ThreadsListParams) => {
  const emailAddresses = PRIMEAI_EMAIL_ADDRESSES.map(
    email => `from:${email}`
  ).join(' OR ');

  const defaultParams = {
    q: `newer_than:30d ${emailAddresses}`,
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
