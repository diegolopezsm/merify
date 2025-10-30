import { getFromStore } from '../db/store.js';
import { GOOGLE_TOKEN } from '../../../shared/constants/store-keys.js';
import { refreshTokenWithRetryFetch } from './refresh-token-with-retry-fetch.js';

// Declare fetch for Node.js 18+
declare const fetch: typeof globalThis.fetch;

interface FetchWithTokenOptions {
  url: string;
  params?: Record<string, string | number | string[] | undefined>;
  operationName: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
}

/**
 * Generic fetch utility that handles token retrieval, validation, and API calls
 * with automatic retry and token refresh
 */
export const fetchWithToken = async <T>({
  url,
  params = {},
  operationName,
  method = 'GET',
  body,
  headers = {},
}: FetchWithTokenOptions): Promise<T> => {
  if (!getFromStore(GOOGLE_TOKEN)) {
    throw new Error('No Google access token available');
  }
  const fetchApiCall = async (): Promise<T> => {
    const token = getFromStore(GOOGLE_TOKEN) as string;

    if (!token) {
      throw new Error('No Google access token available');
    }
    // Build URL with query parameters
    // eslint-disable-next-line no-undef
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(key, item));
      } else {
        searchParams.append(key, value?.toString() ?? '');
      }
    });

    const finalUrl = searchParams.toString()
      ? `${url}?${searchParams.toString()}`
      : url;

    const response = await fetch(finalUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...headers,
      },
      method,
      body,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to ${operationName}: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  };

  return refreshTokenWithRetryFetch(fetchApiCall, operationName);
};
