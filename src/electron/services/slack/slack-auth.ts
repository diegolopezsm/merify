import { app, BrowserWindow, protocol } from "electron";
import { initEnv } from "../../util.js";
import { setInStore } from "../db/store.js";
import { SLACK_TOKEN } from "../../../shared/constants/store-keys.js";

initEnv();

const clientId = process.env.SLACK_CLIENT_ID || "";
const scope = [
  "im:history",
  "users:read",
  "mpim:history",
  "channels:read",
  "groups:history",
  "users:read.email",
  "channels:history",
];
const redirectUri = process.env.SLACK_REDIRECT_URI || "";

export const handleSlackAuth = (): Promise<{ success: boolean }> => {
  return new Promise((resolve, reject) => {
    const slackAuthWindow = new BrowserWindow({
      width: 1200,
      height: 1000,
    });
    slackAuthWindow.loadURL(
      `https://slack.com/oauth/v2/authorize?client_id=${clientId}&scope=${scope.join(
        ","
      )}&redirect_uri=${redirectUri}`
    );
    handleSlackAuthRedirect(slackAuthWindow, resolve, reject);
  });
};

function handleSlackAuthRedirect(
  slackAuthWindow: BrowserWindow,
  resolve: (value: any) => void,
  reject: (reason?: any) => void
) {
  let hasToken = false;
  slackAuthWindow.webContents.on("will-redirect", (_, url) => {
    if (url.includes(redirectUri)) {
      setTimeout(() => {
        slackAuthWindow.close();
      }, 3000);
    }
  });
  app.once("open-url", (event, url) => {
    event.preventDefault();
    const params = new URL(url).searchParams;
    const slackAccessToken = params.get("slack_access_token");
    hasToken = !!slackAccessToken;
    if (slackAccessToken) {
      setInStore(SLACK_TOKEN, slackAccessToken);
    }
  });
  slackAuthWindow.on("closed", () => {
    resolve({ success: hasToken });
  });
  // slackAuthWindow.webContents.on("did-fail-load", (event, errorCode, errorDescription) => {
  //   reject(new Error(`Failed to load: ${errorDescription}`));
  // });
}
