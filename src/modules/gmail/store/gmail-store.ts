import { computed, ref } from 'vue';
import { createGlobalState } from '@vueuse/core';
import { safeRequest } from '@/shared/utils/safe-request';
import { getThreads } from '@/modules/gmail/services/get-threads';
import { openMainWindow } from '@/shared/services/open-main-window';
import { getThreadDetails } from '@/modules/gmail/services/get-thread-details';
import { listenToGmailEvents } from '@/modules/gmail/services/gmail-events-listener';
import type { GmailEventHistoryResponse } from '@/shared/domain/gmail-event-history';
import { usePriorityEmailsStore } from '@/modules/gmail/composables/use-priority-emails-store';
import type {
  GmailThread,
  ThreadsListParams,
} from '@/modules/gmail/domain/threads';

export const useGmailStore = createGlobalState(() => {
  const threads = ref<GmailThread[]>([]);
  const error = ref<Error | null>(null);
  const isLoading = ref(false);

  const { primaryEmails, customEmails } = usePriorityEmailsStore();
  const allEmailAddresses = computed(() => [
    ...primaryEmails.value,
    ...customEmails.value,
  ]);

  const getAndSetThreads = async (params?: ThreadsListParams) => {
    if (isLoading.value) return;
    isLoading.value = true;
    const defaultParams: ThreadsListParams = {
      q: `newer_than:30d ${allEmailAddresses.value.map(email => `from:${email}`).join(' OR ')}`,
    };
    const [response, errorResponse] = await safeRequest(async () =>
      getThreads({ ...defaultParams, ...params })
    );
    error.value = null;
    if (errorResponse) {
      error.value = errorResponse;
      isLoading.value = false;
      return;
    }
    threads.value = response?.threads ?? [];
    isLoading.value = false;
    listenToGmailEvents(onGmailEvent, onGmailEventError);
  };

  async function onGmailEvent(history: GmailEventHistoryResponse) {
    const messaggeAdded = history.history?.find(
      event => event.messagesAdded && event.messagesAdded.length > 0
    );
    const threadId = messaggeAdded?.messagesAdded?.[0]?.message.threadId;
    if (!threadId) return;
    const [thread, errorResponse] = await safeRequest(async () =>
      getThreadDetails(threadId)
    );
    if (errorResponse) {
      console.error(errorResponse);
    }
    const isThreadAlreadyInList = threads.value.some(t => t.id === thread?.id);
    if (!thread || isThreadAlreadyInList) return;
    const isPriorityEmail = allEmailAddresses.value.some(email =>
      thread.from.toLowerCase().includes(email.toLowerCase())
    );

    if (!isPriorityEmail) return;
    threads.value.unshift({
      id: thread.id,
      historyId: thread.historyId,
      snippet: thread.snippet,
    });
    openMainWindow();
  }

  function onGmailEventError(error: Error) {
    console.error('Error listening to gmail events:', error);
  }

  return {
    threads,
    threadsError: error,
    isThreadsLoading: isLoading,
    getAndSetThreads,
  };
});
