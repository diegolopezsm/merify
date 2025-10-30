import { ipcMain, type BrowserWindow } from 'electron';
import { getThreads } from './get-threads.js';
import { getThreadDetails } from './get-thread-details.js';
import { markThreadAsRead } from './mark-thread-as-read.js';
import { sendThreadToTrash } from './send-thread-to-trash.js';
import { initGmailEventsSubscription } from './init-gmail-subscription.js';
import {
  GOOGLE_GET_THREADS,
  GOOGLE_GET_THREAD_DETAILS,
  GOOGLE_SEND_THREAD_TO_TRASH,
  GOOGLE_MARK_THREAD_AS_READ,
  GOOGLE_INIT_GMAIL_EVENTS_SUBSCRIPTION,
} from '../../../shared/constants/electron-api-events.js';

export const exposeGmailApiMethods = (window: BrowserWindow) => {
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

  ipcMain.handle(GOOGLE_INIT_GMAIL_EVENTS_SUBSCRIPTION, async () =>
    initGmailEventsSubscription(window)
  );
};
