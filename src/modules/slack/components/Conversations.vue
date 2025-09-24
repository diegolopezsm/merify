<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/shared/components";
import { safeRequest } from "@/shared/utils/safe-request";
import type { Message } from "@/modules/slack/domain/message";
import { mapUserById } from "@/shared/services/map-user-by-id";
import { markdownToHtml } from "@/shared/utils/markdown-render";
import type { Conversation } from "@/modules/slack/domain/coversation";
import { askAgent, slackSummaryPrompt } from "@/shared/services/ai-agent";
import { useGetConversations } from "@/modules/slack/composables/use-conversations";
import { getConversationHistoryService } from "@/modules/slack/services/get-conversation-history-service";

const { conversations, loading } = useGetConversations();
const selectedConversationMessages = ref<Message[]>([]);
const chatSummary = ref<string>("");

async function getConversationHistory(conversation: Conversation) {
  if (!conversation) return;
  const [response, error] = await safeRequest(async () => {
    return await getConversationHistoryService({
      channel: conversation.id,
    });
  });

  if (error) {
    console.error(error);
    return;
  }
  const messagesWithUser = await addUserNameToMessages(
    response?.messages || []
  );
  selectedConversationMessages.value = messagesWithUser;
  chatSummary.value = "";
}

async function addUserNameToMessages(messages: Message[]) {
  const messagesWithUser = [];
  for (const message of messages || []) {
    const user = await mapUserById(message.user);
    messagesWithUser.push({
      ...message,
      user: user?.name || message.user,
    });
  }
  return messagesWithUser;
}

async function onConversationClick(conversation: Conversation) {
  await getConversationHistory(conversation);
  const initPrompt = slackSummaryPrompt;
  const chat = JSON.stringify(selectedConversationMessages.value);

  askAgent(`${initPrompt}:\n\n${chat}`, (chunk) => {
    chatSummary.value += chunk;
  });
}
</script>

<template>
  <div v-if="loading">Loading...</div>
  <template v-else>
    <div class="grid grid-cols-12 gap-4">
      <div class="divide-gray-300 divide-y-1 col-span-4">
        <div v-for="conversation in conversations" :key="conversation.id">
          <Button @click="onConversationClick(conversation)">
            {{ conversation.name }}
          </Button>
        </div>
      </div>
      <div class="col-span-8 divide-gray-300 divide-y-1 space-y-2">
        <div v-html="markdownToHtml(chatSummary)"></div>
        <!-- <div v-for="message in selectedConversationMessages" :key="message.ts">
          <div class="p-2">
            <span>{{ message.text }}</span>
          </div>
        </div>
        <div class="p-2">
        </div> -->
      </div>
    </div>
  </template>
</template>
