import { BrowserWindow, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';

export function setupAutoUpdater(win: BrowserWindow) {
  // No descargar automáticamente
  autoUpdater.autoDownload = false;

  // Mostrar logs en consola (opcional)
  //   import log from 'electron-log';
  //   autoUpdater.logger = log;
  //   (autoUpdater.logger as any).transports.file.level = 'info';

  autoUpdater.on('checking-for-update', () => {
    console.log('Buscando actualizaciones...');
  });

  autoUpdater.on('update-available', info => {
    console.log('Actualización disponible:', info.version);
    const choice = dialog.showMessageBoxSync(win, {
      type: 'info',
      buttons: ['Actualizar', 'Cancelar'],
      title: 'Nueva versión disponible',
      message: `Hay una nueva versión (${info.version}). ¿Deseas descargarla ahora?`,
    });
    if (choice === 0) {
      autoUpdater.downloadUpdate();
    }
  });

  autoUpdater.on('update-not-available', () => {
    console.log('No hay actualizaciones disponibles.');
  });

  autoUpdater.on('error', err => {
    console.error('Error en el autoUpdater:', err);
  });

  autoUpdater.on('download-progress', progressObj => {
    const percent = progressObj.percent.toFixed(1);
    win.setProgressBar(progressObj.percent / 100);
    console.log(`Descargando... ${percent}%`);
  });

  autoUpdater.on('update-downloaded', () => {
    const choice = dialog.showMessageBoxSync(win, {
      type: 'question',
      buttons: ['Instalar y reiniciar', 'Más tarde'],
      title: 'Actualizar Merify',
      message:
        'La actualización está lista. ¿Quieres reiniciar para instalarla?',
    });
    if (choice === 0) {
      autoUpdater.quitAndInstall();
    } else {
      win.setProgressBar(-1);
    }
  });

  // Buscar al iniciar (o podrías llamarlo desde un menú manual)
  setTimeout(() => {
    autoUpdater.checkForUpdates();
  }, 3000);
}
