import type { GmailMessage } from './thread.js';

export type GmailEventHistoryResponse = {
  history?: [
    {
      id: string;
      messages: Pick<GmailMessage, 'id' | 'threadId'>[];
      messagesAdded?: {
        message: Pick<GmailMessage, 'id' | 'threadId' | 'labelIds'>;
      }[];
    },
  ];
  historyId: string;
};
