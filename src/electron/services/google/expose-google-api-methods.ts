import { ipcMain } from 'electron';
import { getGoogleAuth } from './get-google-auth.js';
import { initGoogleAuth } from './init-google-auth.js';
import {
  GOOGLE_GET_AUTH,
  GOOGLE_INIT_AUTH,
} from '../../../shared/constants/electron-api-events.js';

export const exposeGoogleApiMethods = () => {
  ipcMain.handle(GOOGLE_INIT_AUTH, () => initGoogleAuth());

  ipcMain.handle(GOOGLE_GET_AUTH, () => getGoogleAuth());
};
