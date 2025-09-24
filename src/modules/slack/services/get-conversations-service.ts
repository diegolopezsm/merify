import { SLACK_GET_CONVERSATIONS } from "@/shared/contants";
import type { Conversation } from "@/modules/slack/domain/coversation";

type Response = {
  ok: boolean;
  channels: Conversation[];
};

const getConversationsApi = async (): Promise<Response> => {
  return await window.electron.invoke(SLACK_GET_CONVERSATIONS);
};

export const getConversationsService = async (): Promise<Conversation[] | null> => {
  const response = await getConversationsApi();
  return response.channels;
};
