import path from "path";
import { isDev } from "./util.js";
import { app, BrowserWindow } from "electron";
import { resolvePath } from "./path-resolver.js";
import { exposeSlackApiMethods } from "./services/slack/expose-slack-api-methods.js";
// import { Notification } from 'electron'

// const NOTIFICATION_TITLE = 'Basic Notification'
// const NOTIFICATION_BODY = 'Notification from the Main process'

// function showNotification () {
//   new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
// }

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 1000,
    webPreferences: {
      preload: resolvePath(),
    },
  });
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-ui/index.html"));
  }

  exposeSlackApiMethods();
});
