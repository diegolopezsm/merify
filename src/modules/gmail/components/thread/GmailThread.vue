l
<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import { Card } from '@/shared/components';
import type { GmailThread } from '@/modules/gmail/domain/threads';
import GmailLogo from '@/modules/gmail/components/GmailLogo.vue';
import { useAsyncState } from '@/shared/composables/use-async-state';
import MarkAsRead from '@/modules/gmail/components/thread/MarkAsRead.vue';
import DeleteThread from '@/modules/gmail/components/thread/DeleteThread.vue';
import { getThreadDetails } from '@/modules/gmail/services/get-thread-details';
import { useIntersectionObserver } from '@/shared/composables/use-intersection-observer';
import { askAgent } from '@/shared/services/ai-agent';

const props = defineProps<{
  thread: GmailThread;
}>();

const shouldHide = ref(false);
const threadSummary = ref<string>('');

const { state: threadDetails, execute: executeGetThreadDetails } =
  useAsyncState(
    () => getThreadDetails(props.thread.id, { format: 'full' }),
    null,
    {
      immediate: false,
      onSuccess(data) {
        console.log(data);
      },
    }
  );

const target = useTemplateRef('target');

const { stop } = useIntersectionObserver(target, async ([entry]) => {
  if (entry?.isIntersecting) {
    executeGetThreadDetails();
    stop();
  }
});

const getThreadSummary = async () => {
  const initPrompt = `Resumen del siguiente hilo lo mas corto posible. formato json sin markdown. con las siguientes propiedades: goal (objetivo del hilo como receptor del mensaje en una oracion), priority: ('low' | 'medium' | 'high' | 'critical'), urgency: ('low' | 'medium' | 'high' | 'critical'), deadline (en caso de que contenga una accion requerida o una fecha de vencimiento)`;
  try {
    const messages = threadDetails.value?.messages
      .map(message => message.body)
      .join('\n\n - ');
    const prompt = `${initPrompt}: ${messages}`;
    await askAgent(prompt, chunk => {
      threadSummary.value += chunk;
    });
    console.log(threadSummary.value);
    console.log(JSON.parse(threadSummary.value));
  } catch (error) {
    console.error(error);
  }
};

const hideThread = () => {
  shouldHide.value = true;
};
</script>

<template>
  <div
    v-if="!shouldHide"
    ref="target"
    class="flex flex-col relative [&_.t-button]:translate-y-11 hover:[&_.t-button]:translate-y-1"
  >
    <div class="flex justify-between gap-2 pr-2">
      <div class="flex items-center gap-2">
        <GmailLogo class="size-7 object-contain" />
        <span class="text-sm text-gray-500">
          {{ threadDetails?.lastMessageDate }}
        </span>
      </div>
      <div class="space-x-4">
        <MarkAsRead
          :thread="thread"
          class="t-button transition-all duration-500 ease-in-out rounded-b-none"
          @on-success="hideThread"
        />
        <DeleteThread
          :thread="thread"
          class="t-button transition-all duration-500 ease-in-out delay-200 rounded-b-none"
          @on-success="hideThread"
        />
      </div>
    </div>
    <Card
      class="rounded-t-none z-10 border-t border-2"
      @click="getThreadSummary"
    >
      <div class="flex flex-col gap-2">
        <p class="line-clamp-3" v-html="thread.snippet"></p>
      </div>
    </Card>
  </div>
</template>
