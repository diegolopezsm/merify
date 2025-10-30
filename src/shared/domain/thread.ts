type GmailMessagePayloadHeader = {
  name: string;
  value: string;
};
type GmailMessagePayloadPart = {
  partId: string;
  mimeType: string;
  filename: string;
  headers: GmailMessagePayloadHeader[];
  body: {
    data?: string;
    size: number;
  };
};

type GmailMessagePayload = {
  partId: string;
  mimeType: string;
  filename: string;
  headers: GmailMessagePayloadHeader[];
  body: {
    attachmentId?: string;
    size: number;
    data?: string;
  };
  parts: GmailMessagePayloadPart[];
};

export type GmailMessage = {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  historyId: string;
  internalDate: string;
  payload: GmailMessagePayload;
  sizeEstimate: number;
  raw: string;
};
