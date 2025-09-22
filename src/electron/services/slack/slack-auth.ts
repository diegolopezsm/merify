import { saveToken } from "./token.js";
import { app, BrowserWindow, protocol } from "electron";

const PROTOCOL = "merify-app";

const clientId = "9582091730912.9554595689170";
const scope = [
  //   "chat:write",
  //   "chat:write.public",
  //   "channels:history",
  //   "channels:join",
  //   "read",
  //   "im:read",
  //   "mpim:read",
  //   "groups:read",
  "channels:read",
];
const redirectUri = "https://merify-be.vercel.app/api/v1/slack/callback";

export const slackAuth = () => {
  console.log("slackAuth");
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
  const token = params.get("access_token");
  if (token) {
    saveToken(token);
  }
});
