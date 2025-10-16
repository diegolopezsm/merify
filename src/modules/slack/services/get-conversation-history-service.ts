import type { Message } from '@/modules/slack/domain/message';
import { SLACK_GET_CONVERSATION_HISTORY } from '@/shared/constants/electron-api-events';
import type {
  ConversationsHistoryArguments,
  ConversationsHistoryResponse,
} from '@slack/web-api';

const getConversationHistoryApi = async (
  args: ConversationsHistoryArguments
): Promise<ConversationsHistoryResponse> => {
  return window.electron.invoke(SLACK_GET_CONVERSATION_HISTORY, args);
};

type Response = {
  ok: boolean;
  messages: Message[];
};

export const getConversationHistoryService = async (
  args: ConversationsHistoryArguments
): Promise<Response> => {
  const response = await getConversationHistoryApi(args);
  return {
    ok: response.ok,
    messages:
      response.messages?.map(message => ({
        user: message.user || '',
        text: message.text || '',
        timestamp: new Date(Number(message.ts) * 1000).toLocaleString() || '',
        type: message.type || '',
      })) || [],
  };
};
