import path from "path";
import { animateWindowTransition, isDev } from "./util.js";
import { app, BrowserWindow, ipcMain, screen } from "electron";
import { resolvePreloadPath } from "./path-resolver.js";
import { exposeSlackApiMethods } from "./services/slack/expose-slack-api-methods.js";
import dotenv from "dotenv";

dotenv.config();

app.whenReady().then(() => {
  // app.dock?.hide();
  createWidgetWindow();
  exposeSlackApiMethods();
});

function createWidgetWindow() {
  const { width: screenWidth, height: screenHeight } =
    screen.getPrimaryDisplay().bounds;

  const initialWidgetWidth = 400;
  const initialWidgetHeight = 30;
  const activeWidgetHeight = screenHeight / 2 + 300;
  const paddingRight = 10;
  const paddingBottom = 0;
  const activeOpacity = 1;
  const opacity = 0.2;

  const mainWindow = new BrowserWindow({
    width: initialWidgetWidth,
    height: initialWidgetHeight,
    frame: false,
    // alwaysOnTop: true,
    transparent: true,
    title: "Merify",
    enableLargerThanScreen: true,
    opacity: opacity,
    // movable: false,
    // resizable: false,
    y: screenHeight - initialWidgetHeight - paddingBottom,
    x: screenWidth - initialWidgetWidth - paddingRight,
    // kiosk: true,
    webPreferences: {
      preload: resolvePreloadPath(),
    },
  });
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5173");
    // mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-ui/index.html"));
  }

  mainWindow.on("focus", () => {
    animateWindowTransition(
      mainWindow,
      { width: initialWidgetWidth, height: activeWidgetHeight },
      {
        x: screenWidth - initialWidgetWidth - paddingRight,
        y: screenHeight - activeWidgetHeight - paddingBottom,
      },
      activeOpacity
    );
  });
  // mainWindow.on("blur", () => {
  //   animateWindowTransition(
  //     mainWindow,
  //     { width: initialWidgetWidth, height: initialWidgetHeight },
  //     {
  //       x: screenWidth - initialWidgetWidth - paddingRight,
  //       y: screenHeight - initialWidgetHeight - paddingBottom,
  //     },
  //     opacity
  //   );
  // });

  return mainWindow;
}
