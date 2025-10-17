import { app, shell } from 'electron';
import { initEnv } from '../../util.js';
import { setInStore } from '../db/store.js';
import {
  GOOGLE_TOKEN,
  GOOGLE_REFRESH_TOKEN,
} from '../../../shared/constants/store-keys.js';

initEnv();

export const handleGoogleAuth = () => {
  shell.openExternal(`${process.env.API_URL}/google/auth/start`);

  return new Promise(resolve => {
    handleGoogleAuthRedirect(resolve);
  });
};

function handleGoogleAuthRedirect(
  // eslint-disable-next-line no-unused-vars
  resolve: ({ success }: { success: boolean }) => void
) {
  let hasToken = false;
  app.on('open-url', handleGoogleAuthRedirect);
  function handleGoogleAuthRedirect(event: any, url: any) {
    event.preventDefault();
    const params = new URL(url).searchParams;
    const googleAccessToken = params.get('google_access_token');
    const googleRefreshToken = params.get('google_refresh_token');
    hasToken = !!googleAccessToken;

    if (googleAccessToken) {
      setInStore(GOOGLE_TOKEN, googleAccessToken);
      setInStore(GOOGLE_REFRESH_TOKEN, googleRefreshToken);
    }
    resolve({ success: hasToken });
    app.off('open-url', handleGoogleAuthRedirect);
  }
}
