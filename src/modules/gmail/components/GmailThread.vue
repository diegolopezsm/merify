<script setup lang="ts">
import { Card, Button } from '@/shared/components';
import TrashIcon from '@/shared/components/icons/TrashIcon.vue';
import type { GmailThread } from '@/modules/gmail/domain/thread';
import GmailLogo from '@/modules/gmail/components/GmailLogo.vue';
import { useAsyncState } from '@/shared/composables/use-async-state';
import { getThreadDetails } from '@/modules/gmail/services/get-thread-detailts';

const props = defineProps<{
  thread: GmailThread;
}>();

const { state: threadDetails } = useAsyncState(
  () => getThreadDetails(props.thread.id, { format: 'full' }),
  null
);
</script>
<template>
  <div class="flex gap-2">
    <div
      class="flex items-center justify-center rounded-full bg-secondary/10 p-2 size-11 shadow-md flex-shrink-0"
    >
      <GmailLogo class="w-full h-full object-contain" />
    </div>
    <div class="flex flex-col gap-2">
      <div class="flex items-center justify-between gap-2">
        <span class="text-sm text-gray-500">
          {{ threadDetails?.lastMessageDate }}
        </span>
        <Button variant="destructiveText" size="sm" title="Move to trash">
          <TrashIcon class="w-4 h-4 cursor-pointer" />
        </Button>
      </div>
      <Card class="rounded-tl-none">
        <div class="flex flex-col gap-2">
          <p class="line-clamp-3" v-html="thread.snippet"></p>
        </div>
      </Card>
    </div>
  </div>
</template>
