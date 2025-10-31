import path from 'path';
import { setupAutoUpdater } from './update-manager.js';
import { resolvePreloadPath } from './path-resolver.js';
import { exposeStore } from './services/db/expose-store.js';
import { animateWindowTransition, initEnv, isDev } from './util.js';
import { app, BrowserWindow, ipcMain, protocol, screen } from 'electron';
import { OPEN_MAIN_WINDOW } from '../shared/constants/electron-api-events.js';
import { exposeSlackApiMethods } from './services/slack/expose-slack-api-methods.js';
import { exposeGmailApiMethods } from './services/gmail/expose-gmail-api-methods.js';
import { exposeGoogleApiMethods } from './services/google/expose-google-api-methods.js';
import log from 'electron-log';

log.transports.file.level = isDev() ? 'debug' : 'info';
log.transports.console.level = isDev() ? 'debug' : 'warn';

initEnv();

const PROTOCOL = 'merify-app';

app.setAsDefaultProtocolClient(PROTOCOL);

protocol.registerSchemesAsPrivileged([
  { scheme: PROTOCOL, privileges: { standard: true, secure: true } },
]);

app.whenReady().then(() => {
  app.setAppUserModelId(isDev() ? 'com.merify.dev' : 'com.merify.app');
  const mainWindow = createWidgetWindow();
  exposeSlackApiMethods();
  exposeGoogleApiMethods();
  exposeGmailApiMethods(mainWindow);
  exposeStore();
  app.commandLine.appendSwitch('disable-background-timer-throttling');
  if (!isDev()) {
    app.dock?.hide();
    setOpenAtLogin();
    setupAutoUpdater(mainWindow);
  }
});

function createWidgetWindow() {
  const { width: screenWidth, height: screenHeight } =
    screen.getPrimaryDisplay().bounds;

  const initialWidgetWidth = isDev() ? 500 * 2.12 : 500;
  const initialWidgetHeight = 30;
  const activeWidgetHeight = screenHeight / 2 + 300;
  const marginRight = 10;
  const marginBottom = 5;
  const activeOpacity = 1;
  const opacity = 0.2;

  const mainWindow = new BrowserWindow({
    width: initialWidgetWidth,
    height: initialWidgetHeight,
    frame: false,
    alwaysOnTop: true,
    transparent: true,
    title: 'Merify',
    enableLargerThanScreen: true,
    opacity: opacity,
    movable: false,
    resizable: true,
    hasShadow: true,
    y: screenHeight - initialWidgetHeight - marginBottom,
    x: screenWidth - initialWidgetWidth - marginRight,
    minWidth: initialWidgetWidth,
    webPreferences: {
      preload: resolvePreloadPath(),
    },
  });
  if (isDev()) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), '/dist-ui/index.html'));
  }

  function openWindow() {
    animateWindowTransition(
      mainWindow,
      { width: initialWidgetWidth, height: activeWidgetHeight },
      {
        x: screenWidth - initialWidgetWidth - marginRight,
        y: screenHeight - activeWidgetHeight - marginBottom,
      },
      activeOpacity
    );
  }

  ipcMain.handle(OPEN_MAIN_WINDOW, () => {
    openWindow();
  });
  mainWindow.on('focus', () => {
    openWindow();
  });

  mainWindow.on('blur', () => {
    animateWindowTransition(
      mainWindow,
      { width: initialWidgetWidth, height: initialWidgetHeight },
      {
        x: screenWidth - initialWidgetWidth - marginRight,
        y: screenHeight - initialWidgetHeight - marginBottom,
      },
      opacity
    );
  });

  return mainWindow;
}

function setOpenAtLogin() {
  app.setLoginItemSettings({
    openAtLogin: true,
    path: app.getPath('exe'),
  });
}
