import { GOOGLE_GET_THREAD_DETAILS } from '@/shared/constants/electron-api-events';

interface ThreadDetailsParams {
  format?: 'minimal' | 'full' | 'raw' | 'metadata';
  metadataHeaders?: string[];
}

interface GmailMessage {
  body: string;
  date: string;
  from: string;
  id: string;
  snippet: string;
  subject: string;
}

interface GmailThreadDetailsResponse {
  historyId: string;
  id: string;
  subject: string;
  snippet: string;
  from: string;
  lastMessageDate: string;
  firstMessageDate: string;
  messages: GmailMessage[];
}

const getThreadDetailsService = async (
  threadId: string,
  params: ThreadDetailsParams = {}
): Promise<GmailThreadDetailsResponse> => {
  return await window.electron.invoke(
    GOOGLE_GET_THREAD_DETAILS,
    threadId,
    params
  );
};

export const getThreadDetails = async (
  threadId: string,
  params: ThreadDetailsParams = {}
): Promise<GmailThreadDetailsResponse> => {
  const response = await getThreadDetailsService(threadId, params);
  const firstMessage = response.messages.at(0);
  const lastMessage = response.messages.at(-1);
  return {
    ...response,
    from: firstMessage?.from || '',
    subject: firstMessage?.subject || '',
    snippet: firstMessage?.snippet || '',
    firstMessageDate: firstMessage?.date || '',
    lastMessageDate: lastMessage?.date || '',
  };
};
