import { getThreads } from '@/modules/gmail/services/get-threads';
import { useAsyncState } from '@/shared/composables/use-async-state';
import { usePriorityEmailsStore } from './use-priority-emails-store';
import type { ThreadsListParams } from '@/modules/gmail/domain/threads';

export const useGetGmailThreads = (params?: ThreadsListParams) => {
  const { primaryEmails, customEmails } = usePriorityEmailsStore();
  const emailAddresses = [
    ...primaryEmails.value.map(email => `from:${email}`),
    ...customEmails.value.map(email => `from:${email}`),
  ].join(' OR ');

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
