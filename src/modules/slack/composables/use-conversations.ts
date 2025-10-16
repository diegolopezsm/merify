import { onMounted, ref } from 'vue';
import { safeRequest } from '@/shared/utils/safe-request';
import type { Conversation } from '@/modules/slack/domain/coversation';
import { getSlackConversations } from '@/modules/slack/services/get-conversations-service';

export const useGetConversations = () => {
  const conversations = ref<Conversation[]>([]);
  const loading = ref(true);
  const error = ref<Error | null>(null);
  onMounted(async () => {
    loading.value = true;
    const [conversationsResponse, errorResponse] = await safeRequest(
      async () => {
        return await getSlackConversations();
      }
    );
    if (errorResponse) {
      error.value = errorResponse;
    }
    conversations.value = conversationsResponse?.channels || [];
    loading.value = false;
  });

  return { conversations, loading, error };
};
