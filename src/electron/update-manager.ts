// import fs from 'fs';
// import path from 'path';
import log from 'electron-log';
import pkg from 'electron-updater';
import { app, BrowserWindow, dialog } from 'electron';

const { autoUpdater } = pkg;
let updateInterval: ReturnType<typeof setInterval> | null = null;
// Configurar electron-log

// Los logs se guardan en:
// macOS: ~/Library/Logs/Merify/main.log
// Windows: %USERPROFILE%\AppData\Roaming\Merify\logs\main.log
// Linux: ~/.config/Merify/logs/main.log

// Función helper para logging que escribe tanto a consola como a archivo
const updaterLog = {
  info: (message: string) => {
    const logMessage = `[Updater Info] ${message}`;
    console.log(logMessage);
    log.info(logMessage);
  },
  warn: (message: string) => {
    const logMessage = `[Updater Warn] ${message}`;
    console.warn(logMessage);
    log.warn(logMessage);
  },
  error: (message: string, err?: Error) => {
    const logMessage = `[Updater Error] ${message}`;
    console.error(logMessage, err);
    if (err) {
      log.error(logMessage, err);
    } else {
      log.error(logMessage);
    }
  },
  debug: (message: string) => {
    const logMessage = `[Updater Debug] ${message}`;
    console.log(logMessage);
    log.debug(logMessage);
  },
};

export function setupAutoUpdater(win: BrowserWindow) {
  // Configurar logger de autoUpdater usando electron-log
  autoUpdater.logger = log;

  // Descargar automáticamente cuando se encuentre una actualización
  autoUpdater.autoDownload = true;
  // Instalar automáticamente después de descargar (sin preguntar)
  autoUpdater.autoInstallOnAppQuit = true;
  autoUpdater.autoRunAppAfterInstall = true;
  // autoUpdater.forceDevUpdateConfig = true;

  // En modo dev, configurar updates para poder probar
  // electron-updater requiere un archivo dev-app-update.yml en la raíz para funcionar en dev
  // if (isDev() && !app.isPackaged) {
  //   // Verificar que el archivo dev-app-update.yml existe
  //   const devUpdateConfigPath = path.join(process.cwd(), 'dev-app-update.yml');
  //   const devUpdateConfigExists = fs.existsSync(devUpdateConfigPath);

  //   updaterLog.info(`Buscando dev-app-update.yml en: ${devUpdateConfigPath}`);
  //   updaterLog.info(`dev-app-update.yml existe: ${devUpdateConfigExists}`);

  //   if (devUpdateConfigExists) {
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     (autoUpdater as any).forceDevUpdateConfig = true;
  //     updaterLog.info('Modo desarrollo: forceDevUpdateConfig habilitado');
  //   } else {
  //     updaterLog.warn(
  //       `dev-app-update.yml no encontrado en ${devUpdateConfigPath}. Actualizaciones en dev no funcionarán.`
  //     );
  //   }
  // }

  // Configurar el feed URL explícitamente para GitHub
  // electron-updater debería detectar esto automáticamente desde los metadatos
  // del build si se usó --publish, pero lo configuramos explícitamente como fallback
  try {
    // En electron-updater v6.x, usamos setFeedURL con la configuración de GitHub
    autoUpdater.setFeedURL({
      provider: 'github',
      owner: 'diegolopezsm',
      repo: 'merify',
    });
    updaterLog.info('Feed URL configurado explícitamente para GitHub');
  } catch (err) {
    updaterLog.warn(
      `No se pudo configurar setFeedURL, usando configuración por defecto: ${err}`
    );
    // Si setFeedURL falla, electron-updater debería usar la configuración del build
  }

  updaterLog.info('AutoUpdater configurado');
  updaterLog.info(`Versión actual: ${app.getVersion()}`);
  updaterLog.info(`Logs guardados en: ${log.transports.file.getFile().path}`);

  // Evento: Iniciando búsqueda de actualizaciones
  autoUpdater.on('checking-for-update', () => {
    updaterLog.info('Verificando actualizaciones...');
  });

  // Evento: Actualización disponible
  autoUpdater.on('update-available', info => {
    updaterLog.info(`Actualización disponible: ${info.version}`);
    updaterLog.debug(`Detalles: ${JSON.stringify(info, null, 2)}`);

    // La descarga comenzará automáticamente gracias a autoDownload = true
    // Mostrar notificación opcional (no bloqueante) al usuario
    dialog
      .showMessageBox(win, {
        type: 'info',
        buttons: ['OK'],
        title: 'Actualización disponible',
        message: `Nueva versión disponible (${info.version})`,
        detail:
          'La actualización se descargará en segundo plano. Te notificaremos cuando esté lista.',
        defaultId: 0,
      })
      .catch(() => {
        // Ignorar errores si la ventana ya está cerrada
      });

    updaterLog.info('Descarga automática iniciada');
  });

  // Evento: No hay actualizaciones disponibles
  autoUpdater.on('update-not-available', info => {
    updaterLog.info('No hay actualizaciones disponibles');
    updaterLog.debug(`Info: ${JSON.stringify(info, null, 2)}`);
  });

  // Evento: Error
  autoUpdater.on('error', err => {
    updaterLog.error('Error en el autoUpdater', err);

    // Mostrar diálogo de error al usuario solo en producción
    // if (!isDev()) {
    //   dialog.showMessageBoxSync(win, {
    //     type: 'error',
    //     title: 'Update Error',
    //     message: 'Failed to check for updates',
    //     detail: err.message,
    //   });
    // }
  });

  // Evento: Progreso de descarga
  autoUpdater.on('download-progress', progressObj => {
    const percent = progressObj.percent.toFixed(1);
    updaterLog.info(`Descargando... ${percent}%`);
    win.setProgressBar(progressObj.percent / 100);
  });

  // Evento: Actualización descargada
  autoUpdater.on('update-downloaded', info => {
    updaterLog.info(
      `Actualización descargada: ${JSON.stringify(info, null, 2)}`
    );

    // Mostrar diálogo con opción de instalar ahora o más tarde
    // Si el usuario elige "Más tarde", se instalará automáticamente al cerrar la app
    const choice = dialog.showMessageBoxSync(win, {
      type: 'info',
      buttons: ['Instalar y reiniciar ahora'],
      title: 'Actualización lista',
      message: 'La actualización está lista para instalar',
      detail: `Versión ${info.version} descargada. Puedes instalar ahora.`,
      defaultId: 0, // "Install now" por defecto
    });

    if (choice === 0) {
      updaterLog.info('Usuario eligió instalar ahora - Reiniciando...');
      // Instalar inmediatamente
      autoUpdater.quitAndInstall(false, true);
    } else {
      updaterLog.info(
        'Usuario eligió instalar al cerrar - Se instalará automáticamente al salir'
      );
      // Se instalará automáticamente gracias a autoInstallOnAppQuit = true
      win.setProgressBar(-1);
    }
  });

  // Iniciar verificación de actualizaciones
  function checkForUpdates() {
    updaterLog.info('Iniciando verificación de actualizaciones...');
    autoUpdater.checkForUpdates().catch(err => {
      updaterLog.error('Error al verificar actualizaciones', err);
    });
  }
  setTimeout(checkForUpdates, 1000 * 5); // 5 segundos
  if (updateInterval) {
    // eslint-disable-next-line no-undef
    clearInterval(updateInterval);
    updateInterval = null;
  }
  updateInterval = setInterval(checkForUpdates, 1000 * 60 * 30); // 30 minutos
}
