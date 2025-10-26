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
  messages: GmailMessage[];
  lastMessageDate: string;
  firstMessageDate: string;
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
  return {
    ...response,
    lastMessageDate: response.messages.at(-1)?.date || '',
    firstMessageDate: response.messages.at(0)?.date || '',
  };
};
