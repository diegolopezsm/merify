import { BrowserWindow, dialog } from 'electron';
import pkg from 'electron-updater';
const { autoUpdater } = pkg;

export function setupAutoUpdater(win: BrowserWindow) {
  // No descargar automáticamente
  autoUpdater.autoDownload = false;

  // Mostrar logs en consola (opcional)
  //   import log from 'electron-log';
  //   autoUpdater.logger = log;
  //   (autoUpdater.logger as any).transports.file.level = 'info';

  autoUpdater.on('update-available', info => {
    const choice = dialog.showMessageBoxSync(win, {
      type: 'info',
      buttons: ['Update', 'Cancel'],
      title: 'New version available',
      message: `A new version (${info.version}) is available. Do you want to download it now?`,
    });
    if (choice === 0) {
      autoUpdater.downloadUpdate();
    }
  });

  autoUpdater.on('error', err => {
    console.error('Error en el autoUpdater:', err);
  });

  autoUpdater.on('download-progress', progressObj => {
    // const percent = progressObj.percent.toFixed(1);
    win.setProgressBar(progressObj.percent / 100);
    // console.log(`Descargando... ${percent}%`);
  });

  autoUpdater.on('update-downloaded', () => {
    const choice = dialog.showMessageBoxSync(win, {
      type: 'question',
      buttons: ['Install and restart', 'Later'],
      title: 'Update Merify',
      message: 'The update is ready. Do you want to restart to install it?',
    });
    if (choice === 0) {
      autoUpdater.quitAndInstall();
    } else {
      win.setProgressBar(-1);
    }
  });

  setTimeout(() => {
    autoUpdater.checkForUpdates();
  }, 3000);
}
