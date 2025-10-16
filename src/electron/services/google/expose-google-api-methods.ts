import { ipcMain } from 'electron';
import { google } from 'googleapis';
import { getFromStore } from '../db/store.js';
import { handleGoogleAuth } from './google-auth.js';
import { GOOGLE_TOKEN } from '../../../shared/constants/store-keys.js';
import {
  GOOGLE_INIT_AUTH,
  GOOGLE_GET_AUTH,
  GOOGLE_GET_PROFILE,
  GOOGLE_GET_EMAILS,
  GOOGLE_GET_EMAIL_DETAILS,
} from '../../../shared/constants/electron-api-events.js';

export const exposeGoogleApiMethods = () => {
  const oauth2Client = new google.auth.OAuth2();
  const getGoogleToken = () => getFromStore(GOOGLE_TOKEN) as string;
  oauth2Client.setCredentials({
    access_token: getGoogleToken(),
  });

  const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
  const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });

  ipcMain.handle(GOOGLE_INIT_AUTH, () => handleGoogleAuth());

  ipcMain.handle(GOOGLE_GET_AUTH, async () => {
    const response = await oauth2.userinfo.get({
      oauth_token: getGoogleToken(),
    });
    return response.data;
  });

  ipcMain.handle(GOOGLE_GET_PROFILE, async () => {
    const response = await oauth2.userinfo.get({
      oauth_token: getGoogleToken(),
    });
    return response.data;
  });

  ipcMain.handle(GOOGLE_GET_EMAILS, async (_, args) => {
    const response = await gmail.users.messages.list({
      userId: 'me',
      ...args,
      oauth_token: getGoogleToken(),
    });
    return response.data;
  });

  ipcMain.handle(GOOGLE_GET_EMAIL_DETAILS, async (_, messageId) => {
    const response = await gmail.users.messages.get({
      userId: 'me',
      id: messageId,
      oauth_token: getGoogleToken(),
    });
    return response.data;
  });
};
