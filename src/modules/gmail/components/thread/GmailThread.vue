<script setup lang="ts">
import { ref } from 'vue';
import { Card } from '@/shared/components';
import type { GmailThread } from '@/modules/gmail/domain/thread';
import GmailLogo from '@/modules/gmail/components/GmailLogo.vue';
import { useAsyncState } from '@/shared/composables/use-async-state';
import DeleteThread from '@/modules/gmail/components/thread/DeleteThread.vue';
import { getThreadDetails } from '@/modules/gmail/services/get-thread-detailts';

const props = defineProps<{
  thread: GmailThread;
}>();

const wasSentToTrash = ref(false);

const { state: threadDetails } = useAsyncState(
  () => getThreadDetails(props.thread.id, { format: 'full' }),
  null
);
</script>

<template>
  <div
    v-if="!wasSentToTrash"
    class="flex gap-2 relative hover:[&_.trash-button]:translate-y-0"
  >
    <div
      class="flex items-center justify-center rounded-full bg-secondary/10 p-2 size-11 shadow-md flex-shrink-0"
    >
      <GmailLogo class="w-full h-full object-contain" />
    </div>
    <div class="flex flex-col">
      <div class="flex items-center justify-between gap-2 pb-2 px-1">
        <span class="text-sm text-gray-500">
          {{ threadDetails?.lastMessageDate }}
        </span>
        <DeleteThread
          :thread="thread"
          class="trash-button translate-y-10 transition-all duration-500 ease-in-out"
        />
      </div>
      <Card class="rounded-tl-none z-10">
        <div class="flex flex-col gap-2">
          <p class="line-clamp-3" v-html="thread.snippet"></p>
        </div>
      </Card>
    </div>
  </div>
</template>
