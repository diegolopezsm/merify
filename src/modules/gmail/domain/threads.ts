export type GmailThread = {
  id: string;
  snippet: string;
  historyId: string;
};

export type ThreadsListParams = {
  maxResults?: number;
  pageToken?: string;
  q?: string;
  labelIds?: string[];
};

export type GmailThreadsResponse = {
  threads?: GmailThread[];
  nextPageToken?: string;
  resultSizeEstimate?: number;
};
