import { useAsyncState } from '@/shared/composables/use-async-state';
import { getGoogleAuth as getGoogleAuthService } from '@/modules/gmail/services/get-google-auth';
import { initGoogleAuth as initGoogleAuthService } from '@/modules/gmail/services/init-google-auth';

type Options = {
  immediate?: boolean;
};

export const useGoogleAuth = (options?: Options) => {
  const {
    state: googleAuth,
    isLoading,
    execute: executeGetGoogleAuth,
  } = useAsyncState(() => getGoogleAuthService(), null, options);

  const initGoogleAuth = async () => {
    const auth = await initGoogleAuthService();
    executeGetGoogleAuth();
    return auth;
  };

  return {
    googleAuth,
    isLoading,
    executeGetGoogleAuth,
    initGoogleAuth,
  };
};
