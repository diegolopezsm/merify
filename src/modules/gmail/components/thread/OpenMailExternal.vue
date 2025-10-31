<script setup lang="ts">
import { Button } from '@/shared/components';
import type { GmailThread } from '@/modules/gmail/domain/threads';
import ExternalLink from '@/shared/components/icons/ExternalLink.vue';
import { openExternalLink } from '@/shared/services/open-external-link';

const props = defineProps<{
  thread: GmailThread;
}>();

function openMailExternal() {
  openExternalLink(
    `https://mail.google.com/mail/u/0/#inbox/${props.thread.id}`
  );
}
</script>

<template>
  <Button
    variant="primaryText"
    size="sm"
    title="Open in Gmail"
    class="border border-primary"
    @click="openMailExternal()"
  >
    <ExternalLink class="w-4 h-4 cursor-pointer" />
  </Button>
</template>
