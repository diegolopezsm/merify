import path from 'path';
import { app } from 'electron';
import { isDev } from './util.js';

export const resolvePreloadPath = () => {
  return path.join(
    app.getAppPath(),
    isDev() ? '.' : '.',
    '/dist/electron/preload.cjs'
  );
};

export const resolveAssetsPath = () => {
  return path.join(app.getAppPath(), isDev() ? '.' : '.', '/src/assets');
};
