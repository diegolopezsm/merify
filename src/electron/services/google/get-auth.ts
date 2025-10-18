import { fetchWithToken } from './fetch-with-token.js';

const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

/**
 * Gets authenticated user information from Google
 * Automatically handles token refresh if the current token is expired
 * @returns The response from the API
 */
export const getAuth = async () => {
  return fetchWithToken({
    url: GOOGLE_USERINFO_URL,
    operationName: 'get user info',
  });
};
