<script setup lang="ts">
import { Button } from '@/shared/components';
import TrashIcon from '@/shared/components/icons/TrashIcon.vue';
import type { GmailThread } from '@/modules/gmail/domain/threads';
import { useAsyncState } from '@/shared/composables/use-async-state';
import { sendThreadToTrash } from '@/modules/gmail/services/send-thread-to-trash';

const props = defineProps<{
  thread: GmailThread;
}>();

const emit = defineEmits(['onSuccess']);

const { isLoading, execute } = useAsyncState(
  () => sendThreadToTrash(props.thread.id),
  null,
  {
    immediate: false,
    onSuccess: () => {
      emit('onSuccess');
    },
  }
);
</script>

<template>
  <Button
    variant="destructiveText"
    size="sm"
    title="Move to trash"
    class="border border-destructive"
    :disabled="isLoading"
    @click="execute()"
  >
    <TrashIcon class="w-4 h-4 cursor-pointer" />
  </Button>
</template>
