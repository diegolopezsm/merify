const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  invoke: (channel: string, args: any) =>
    electron.ipcRenderer.invoke(channel, args),
});
