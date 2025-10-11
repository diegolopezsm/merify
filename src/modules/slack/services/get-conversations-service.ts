import { el_api_getSlackConversations } from "@/shared/services/electron-api";
import type { Conversation } from "@/modules/slack/domain/coversation";

type Response = {
  ok: boolean;
  channels: Conversation[];
};


export const getSlackConversations = async (): Promise<Response> => {
  const response = await el_api_getSlackConversations();
  return {
    ok: response.ok || false,
    channels: response.channels?.map((channel) => ({
      id: channel.id || "",
      name: channel.name || "",
    })) || [],
  };
};
