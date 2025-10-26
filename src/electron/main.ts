import path from 'path';
import { resolvePreloadPath } from './path-resolver.js';
import { setupAutoUpdater } from './update-manager.js';
import { exposeStore } from './services/db/expose-store.js';
import { app, BrowserWindow, protocol, screen } from 'electron';
import { animateWindowTransition, initEnv, isDev } from './util.js';
import { exposeSlackApiMethods } from './services/slack/expose-slack-api-methods.js';
import { exposeGoogleApiMethods } from './services/google/expose-google-api-methods.js';

initEnv();

const PROTOCOL = 'merify-app';

app.setAsDefaultProtocolClient(PROTOCOL);

protocol.registerSchemesAsPrivileged([
  { scheme: PROTOCOL, privileges: { standard: true, secure: true } },
]);

app.whenReady().then(() => {
  const mainWindow = createWidgetWindow();
  exposeSlackApiMethods();
  exposeGoogleApiMethods();
  exposeStore();
  if (!isDev()) {
    app.dock?.hide();
    setOpenAtLogin();
    setupAutoUpdater(mainWindow);
  }
});

function createWidgetWindow() {
  const { width: screenWidth, height: screenHeight } =
    screen.getPrimaryDisplay().bounds;

  const initialWidgetWidth = isDev() ? 500 * 2 : 500;
  const initialWidgetHeight = 30;
  const activeWidgetHeight = screenHeight / 2 + 300;
  const marginRight = 10;
  const marginBottom = isDev() ? 10 : 0;
  const activeOpacity = 1;
  const opacity = 0.3;

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
    y: screenHeight - initialWidgetHeight - marginBottom,
    x: screenWidth - initialWidgetWidth - marginRight,
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

  mainWindow.on('focus', () => {
    animateWindowTransition(
      mainWindow,
      { width: initialWidgetWidth, height: activeWidgetHeight },
      {
        x: screenWidth - initialWidgetWidth - marginRight,
        y: screenHeight - activeWidgetHeight - marginBottom,
      },
      activeOpacity
    );
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
