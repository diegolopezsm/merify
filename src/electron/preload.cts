const electron = require('electron');

electron.contextBridge.exposeInMainWorld('electron', {
  invoke: (channel: string, args: unknown) =>
    electron.ipcRenderer.invoke(channel, args),
  on: (channel: string, callback: (...args: unknown[]) => void) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    electron.ipcRenderer.on(channel, (_event: any, ...args: unknown[]) =>
      callback(...args)
    );
  },
});
