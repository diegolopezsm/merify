import type { Message } from "@/modules/slack/domain/message";
import { el_api_getSlackConversationHistory } from "@/shared/services/electron-api";
import type {
  ConversationsHistoryArguments,
  ConversationsHistoryResponse,
} from "@slack/web-api";

const getConversationHistoryApi = async (
  args: ConversationsHistoryArguments
): Promise<ConversationsHistoryResponse> => {
  return await el_api_getSlackConversationHistory(args);
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
      response.messages?.map((message) => ({
        user: message.user || "",
        text: message.text || "",
        timestamp: new Date(Number(message.ts) * 1000).toLocaleString() || "",
        type: message.type || "",
      })) || [],
  };
};
