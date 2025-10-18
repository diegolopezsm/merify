<script setup lang="ts">
import { Button } from '@/shared/components';
import type { GmailThread } from '@/modules/gmail/domain/thread';
import { useAsyncState } from '@/shared/composables/use-async-state';
import MailOpenIcon from '@/shared/components/icons/MailOpenIcon.vue';
import { markThreadAsRead } from '@/modules/gmail/services/mark-thread-as-read';

const props = defineProps<{
  thread: GmailThread;
}>();

const emit = defineEmits(['onSuccess']);

const { isLoading, execute } = useAsyncState(
  () => markThreadAsRead(props.thread.id),
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
    variant="secondaryText"
    size="sm"
    title="Mark as read"
    class="border border-secondary"
    :disabled="isLoading"
    @click="execute()"
  >
    <MailOpenIcon class="w-4 h-4 cursor-pointer" />
  </Button>
</template>
