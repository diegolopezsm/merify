<script setup lang="ts">
import { watch } from 'vue';
import { BannerAlert } from '@/shared/components';
import { useGmailStore } from '@/modules/gmail/store/gmail-store';
import { useGoogleAuth } from '@/shared/composables/use-google-auth';
import GmailThread from '@/modules/gmail/components/thread/GmailThread.vue';
import { useEnableGmail } from '@/modules/gmail/composables/use-enable-gmail';

const { isGmailEnable } = useEnableGmail();

const { executeGetGoogleAuth } = useGoogleAuth({
  immediate: false,
});

const { threads, isThreadsLoading, threadsError, getAndSetThreads } =
  useGmailStore();

const initGmailThreads = async () => {
  await executeGetGoogleAuth();
  await getAndSetThreads();
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
      getAndSetThreads();
    }, 2000);
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
      <div v-if="threads?.length > 0" class="flex flex-col gap-5">
        <GmailThread
          v-for="thread in threads"
          :key="thread.id"
          :thread="thread"
        />
      </div>
      <p v-if="isThreadsLoading">Loading threads...</p>
      <p v-if="threadsError">Error loading threads: {{ threadsError }}</p>
      <p v-if="!isThreadsLoading && !threadsError && threads?.length === 0">
        No threads found
      </p>
    </template>
  </div>
</template>
