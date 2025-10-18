import { fetchWithToken } from './fetch-with-token.js';

const GMAIL_THREAD_DETAILS_URL =
  'https://gmail.googleapis.com/gmail/v1/users/me/threads';

interface ThreadDetailsParams {
  format?: 'minimal' | 'full' | 'raw' | 'metadata';
  metadataHeaders?: string[];
}

interface GmailMessagePayloadHeader {
  name: string;
  value: string;
}
interface GmailMessagePayloadPart {
  partId: string;
  mimeType: string;
  filename: string;
  headers: GmailMessagePayloadHeader[];
  body: {
    data?: string;
    size: number;
  };
}

interface GmailMessagePayload {
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
}
interface GmailMessage {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  historyId: string;
  internalDate: string;
  payload: GmailMessagePayload;
  sizeEstimate: number;
  raw: string;
}

interface GmailThreadDetailsResponse {
  id: string;
  snippet: string;
  historyId: string;
  messages: GmailMessage[];
}

/**
 * Gets detailed information for a specific Gmail thread
 * Automatically handles token refresh if the current token is expired
 * @param threadId - The ID of the thread to get details for
 * @param params - The parameters for the request
 * @returns The response from the API
 */
export const getThreadDetails = async (
  threadId: string,
  params: ThreadDetailsParams = {}
) => {
  const url = `${GMAIL_THREAD_DETAILS_URL}/${threadId}`;

  const response = await fetchWithToken<GmailThreadDetailsResponse>({
    url,
    params: params as Record<string, string | number | string[] | undefined>,
    operationName: 'get thread details',
  });
  return {
    ...response,
    messages: formatMessages(response.messages),
  };
};

function formatMessages(threadMessages: GmailMessage[]) {
  const messages = threadMessages.map(msg => {
    const headers = msg.payload?.headers || [];
    const subject = headers.find(h => h.name === 'Subject')?.value || '';
    const from = headers.find(h => h.name === 'From')?.value || '';
    const date = new Date(
      headers.find(h => h.name === 'Date')?.value || ''
    ).toLocaleString();
    const body = extractPlainText(msg.payload);

    return {
      id: msg.id,
      subject,
      from,
      date,
      snippet: msg.snippet,
      body,
    };
  });

  return messages;
}

function extractPlainText(payload: any): string {
  if (!payload) return '';

  if (payload.parts) {
    for (const part of payload.parts) {
      if (part.mimeType === 'text/plain' && part.body?.data) {
        return decodeBase64(part.body.data);
      }
      if (part.mimeType === 'text/html' && part.body?.data) {
        return stripHtml(decodeBase64(part.body.data));
      }
      const sub = extractPlainText(part);
      if (sub) return sub;
    }
  }

  if (payload.body?.data) {
    const text = decodeBase64(payload.body.data);
    return payload.mimeType === 'text/html' ? stripHtml(text) : text;
  }

  return '';
}

function decodeBase64(data: string) {
  return Buffer.from(
    data.replace(/-/g, '+').replace(/_/g, '/'),
    'base64'
  ).toString('utf8');
}

function stripHtml(html: string) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
