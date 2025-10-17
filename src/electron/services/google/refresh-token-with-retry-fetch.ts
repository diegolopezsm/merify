import { safeRequest } from '../../../shared/utils/safe-request.js';
import { refreshToken } from './refresh-token.js';

/**
 * Generic retry mechanism with automatic token refresh for Google API calls
 * @param apiCall - The API function to call
 * @param operationName - Name of the operation for error messages
 * @returns Promise with the API response or throws an error
 */
export const refreshTokenWithRetryFetch = async <T>(
  apiCall: () => Promise<T>,
  operationName: string
): Promise<T> => {
  try {
    // Attempt the API call with current token
    const [data, error] = await safeRequest(apiCall);

    if (error) {
      console.log('Token expired, attempting refresh...');

      // Try to refresh the token
      const refreshResult = await refreshToken();
      if (refreshResult.error) {
        throw new Error(`Token refresh failed: ${refreshResult.error}`);
      }

      // Retry with refreshed token
      const [retryData, retryError] = await safeRequest(apiCall);

      if (retryError) {
        throw new Error(
          `Failed to ${operationName} after token refresh: ${retryError.message}`
        );
      }

      return retryData as T;
    }

    return data as T;
  } catch (error) {
    console.error(`Error ${operationName}:`, error);
    throw error;
  }
};
