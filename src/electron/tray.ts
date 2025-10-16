import path from 'path';
import { app, BrowserWindow, Tray } from 'electron';
import { resolveAssetsPath } from './path-resolver.js';

export function createTray(mainWindow: BrowserWindow) {
  const tray = new Tray(
    path.join(resolveAssetsPath(), '/trayIconTemplate.png')
  );
  tray.on('click', () => {
    mainWindow.show();
  });

  let willClose = false;
  mainWindow.on('close', event => {
    if (willClose) {
      return;
    }
    event.preventDefault();
    mainWindow.hide();
    if (app.dock) {
      app.dock.hide();
    }
  });

  app.on('before-quit', () => {
    willClose = true;
  });

  mainWindow.on('show', () => {
    willClose = false;
    // if (app.dock) {
    //   app.dock.show();
    // }
  });
}
