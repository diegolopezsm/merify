import { app, BrowserWindow, protocol } from "electron";
import { setInStore, SLACK_TOKEN } from "../db/store.js";

const PROTOCOL = "merify-app";

const clientId = process.env.SLACK_CLIENT_ID || "";
const scope = [
  "im:history",
  "mpim:history",
  "channels:read",
  "groups:history",
  "channels:history",
  "users:read",
  "users:read.email",
];
const redirectUri = process.env.SLACK_REDIRECT_URI || "";

export const slackAuth = () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 1000,
  });
  mainWindow.loadURL(
    `https://slack.com/oauth/v2/authorize?client_id=${clientId}&scope=${scope.join(
      ","
    )}&redirect_uri=${redirectUri}`
  );
  mainWindow.webContents.on("will-redirect", (_, url) => {
    if (url.includes(redirectUri)) {
      setTimeout(() => {
        mainWindow.close();
      }, 3000);
    }
  });
};

app.setAsDefaultProtocolClient(PROTOCOL);
protocol.registerSchemesAsPrivileged([
  { scheme: PROTOCOL, privileges: { standard: true, secure: true } },
]);

app.on("open-url", (event, url) => {
  event.preventDefault();
  const params = new URL(url).searchParams;
  const slackAccessToken = params.get("slack_access_token");
  if (slackAccessToken) {
    setInStore(SLACK_TOKEN, slackAccessToken);
  }
});
