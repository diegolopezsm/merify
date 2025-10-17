<script setup lang="ts">
import { getThreads } from '@/modules/gmail/services/get-threads';
import GmailThread from '@/modules/gmail/components/GmailThread.vue';
import { useAsyncState } from '@/shared/composables/use-async-state';

const { state: threadsResponse, isLoading } = useAsyncState(
  () => getThreads({ q: 'is:unread', maxResults: 5 }),
  { threads: [] }
);
</script>

<template>
  <div>
    <p v-if="isLoading">Loading...</p>
    <div v-if="threadsResponse" class="flex flex-col gap-5">
      <GmailThread
        v-for="thread in threadsResponse.threads"
        :key="thread.id"
        :thread="thread"
      />
    </div>
    <p v-if="threadsResponse && threadsResponse.threads?.length === 0">
      No threads found
    </p>
  </div>
</template>
