import { ipcMain } from 'electron';
import { getAuth } from './get-auth.js';
import { getThreads } from './get-threads.js';
import { initGoogleAuth } from './init-google-auth.js';
import { getThreadDetails } from './get-thread-details.js';
import { markThreadAsRead } from './mark-thread-as-read.js';
import { sendThreadToTrash } from './send-thread-to-trash.js';
import {
  GOOGLE_GET_AUTH,
  GOOGLE_INIT_AUTH,
  GOOGLE_GET_THREADS,
  GOOGLE_GET_THREAD_DETAILS,
  GOOGLE_SEND_THREAD_TO_TRASH,
  GOOGLE_MARK_THREAD_AS_READ,
} from '../../../shared/constants/electron-api-events.js';

export const exposeGoogleApiMethods = () => {
  ipcMain.handle(GOOGLE_INIT_AUTH, () => initGoogleAuth());

  ipcMain.handle(GOOGLE_GET_AUTH, () => getAuth());

  ipcMain.handle(GOOGLE_GET_THREADS, async (_, args) => getThreads(args));

  ipcMain.handle(GOOGLE_GET_THREAD_DETAILS, async (_, threadId) =>
    getThreadDetails(threadId)
  );

  ipcMain.handle(GOOGLE_MARK_THREAD_AS_READ, async (_, threadId) =>
    markThreadAsRead(threadId)
  );

  ipcMain.handle(GOOGLE_SEND_THREAD_TO_TRASH, async (_, threadId) =>
    sendThreadToTrash(threadId)
  );
};
