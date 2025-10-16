const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
  invoke: (channel: string, args: unknown) =>
    electron.ipcRenderer.invoke(channel, args),
});
