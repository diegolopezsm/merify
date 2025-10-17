import { getFromStore, setInStore } from '../db/store.js';
import {
  GOOGLE_TOKEN,
  GOOGLE_REFRESH_TOKEN,
} from '../../../shared/constants/store-keys.js';

// Declare fetch for Node.js 18+
declare const fetch: typeof globalThis.fetch;

interface RefreshTokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  token_type?: string;
  error?: string;
}

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const refreshToken = getFromStore(GOOGLE_REFRESH_TOKEN) as string;
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    throw new Error('API_URL environment variable is not set');
  }

  try {
    const response = await fetch(
      `${apiUrl}/google/refresh-token?refresh_token=${refreshToken}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: RefreshTokenResponse = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }
    setInStore(GOOGLE_TOKEN, data.access_token);
    return data;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};
