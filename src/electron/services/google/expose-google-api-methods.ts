import { ipcMain } from 'electron';
import { getAuth } from './get-auth.js';
import { getThreads } from './get-threads.js';
import { handleGoogleAuth } from './google-auth.js';
import {
  GOOGLE_GET_AUTH,
  GOOGLE_INIT_AUTH,
  GOOGLE_GET_THREADS,
  GOOGLE_GET_THREAD_DETAILS,
} from '../../../shared/constants/electron-api-events.js';
import { getThreadDetails } from './get-thread-details.js';

export const exposeGoogleApiMethods = () => {
  ipcMain.handle(GOOGLE_INIT_AUTH, () => handleGoogleAuth());

  ipcMain.handle(GOOGLE_GET_AUTH, () => getAuth());

  ipcMain.handle(GOOGLE_GET_THREADS, async (_, args) => getThreads(args));

  ipcMain.handle(GOOGLE_GET_THREAD_DETAILS, async (_, threadId) =>
    getThreadDetails(threadId)
  );
};
