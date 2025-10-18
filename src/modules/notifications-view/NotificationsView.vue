<script setup lang="ts">
import { onMounted } from 'vue';
import { getThreads } from '@/modules/gmail/services/get-threads';
import { useAsyncState } from '@/shared/composables/use-async-state';
import { getGoogleAuth } from '@/modules/gmail/services/get-google-auth';
import GmailThread from '@/modules/gmail/components/thread/GmailThread.vue';

const {
  state: threadsResponse,
  isLoading,
  execute: executeGetThreads,
  error,
} = useAsyncState(
  () => getThreads({ q: 'is:unread' }),
  { threads: [] },
  {
    immediate: false,
  }
);

onMounted(() => {
  getGoogleAuth().then(() => {
    // wait for google auth to be initialized before getting threads
    executeGetThreads();
  });
});
</script>

<template>
  <div>
    {{ error }}
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
