<script setup lang="ts">
import { watch } from 'vue';
import { BannerAlert } from '@/shared/components';
import GmailThread from '@/modules/gmail/components/thread/GmailThread.vue';
import { useGoogleAuth } from '@/modules/gmail/composables/use-google-auth';
import { useEnableGmail } from '@/modules/gmail/composables/use-enable-gmail';
import { useGetGmailThreads } from '@/modules/gmail/composables/use-get-gmail-threads';

const { isGmailEnable } = useEnableGmail();

const { executeGetGoogleAuth } = useGoogleAuth({
  immediate: false,
});

const {
  threadsResponse,
  isLoading: isThreadsLoading,
  executeGetThreads,
  error: threadsError,
} = useGetGmailThreads();

const initGmailThreads = async () => {
  await executeGetGoogleAuth();
  await executeGetThreads();
};

watch(
  isGmailEnable,
  newVal => {
    if (newVal) {
      initGmailThreads();
    }
  },
  { immediate: true }
);

watch(threadsError, newVal => {
  if (newVal) {
    window.setTimeout(() => {
      executeGetThreads();
    }, 3000);
  }
});
</script>

<template>
  <div>
    <BannerAlert
      v-if="!isGmailEnable"
      variant="warning"
      title="No integrations enabled"
    >
      Please enable at least one integration to receive notifications.
    </BannerAlert>
    <template v-else>
      <p v-if="isThreadsLoading">Loading threads...</p>
      <p v-if="threadsError">Error loading threads: {{ threadsError }}</p>
      <p
        v-if="
          !isThreadsLoading &&
          !threadsError &&
          threadsResponse?.threads?.length === 0
        "
      >
        No threads found
      </p>
      <div v-if="threadsResponse" class="flex flex-col gap-5">
        <GmailThread
          v-for="thread in threadsResponse.threads"
          :key="thread.id"
          :thread="thread"
        />
      </div>
    </template>
  </div>
</template>
