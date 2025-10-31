import { google } from 'googleapis';
import { PubSub, type Subscription } from '@google-cloud/pubsub';
import { type BrowserWindow } from 'electron';
import { getFromStore } from '../db/store.js';
import { getGmailEventHistory } from './get-gmail-event-history.js';
import { GOOGLE_TOKEN } from '../../../shared/constants/store-keys.js';
import {
  GOOGLE_ON_GMAIL_EVENT,
  GOOGLE_ON_GMAIL_EVENT_ERROR,
} from '../../../shared/constants/electron-api-events.js';
import { setInboxWatch } from './set-inbox-watch.js';
import { logTransaction } from '../../log-transaction.js';

let subscription: Subscription | null = null;
let lastProcessedHistoryId: string | null = null;

export const initGmailEventsSubscription = async (window: BrowserWindow) => {
  try {
    await logTransaction(async () => {
      const response = await setInboxWatch({
        topicName:
          'projects/gen-lang-client-0671235788/topics/merify-gmail-updates',
        labelIds: ['INBOX'],
      });
      addGmailSubscription(window);
      const historyId = response.historyId ?? null;
      lastProcessedHistoryId = historyId;
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Error al iniciar la suscripción de Gmail: ${errorMessage}`,
      {
        cause: error,
      }
    );
  }
};

async function addGmailSubscription(window: BrowserWindow) {
  try {
    await logTransaction(async () => {
      if (subscription) {
        cleanupGmailSubscription();
      }
      const oauth2Client = new google.auth.OAuth2();
      const getGoogleToken = () => getFromStore(GOOGLE_TOKEN);
      oauth2Client.setCredentials({
        access_token: getGoogleToken() as string,
      });
      const pubsub = new PubSub({
        projectId: 'gen-lang-client-0671235788',
        authClient: oauth2Client,
      });

      subscription = pubsub.subscription('merify-gmail-updates-sub');

      subscription.on('message', async message => {
        console.log(`new message received: ${message.id}`);

        if (!window || window.isDestroyed()) {
          message.ack(); // Asegurar que se ack incluso si la ventana está cerrada
          return;
        }

        try {
          await logTransaction(async () => {
            const data = JSON.parse(
              Buffer.from(
                message.data as unknown as string,
                'base64'
              ).toString()
            );
            // Ignorar mensajes duplicados o muy antiguos
            const messageHistoryId = data.historyId;
            if (lastProcessedHistoryId === messageHistoryId) {
              message.ack();
              return;
            }

            const history = await getGmailEventHistory(
              lastProcessedHistoryId ?? ''
            );
            console.log(`history: ${JSON.stringify(history, null, 2)}`);
            // Solo procesar si hay cambios
            if (history.history && history.history.length > 0) {
              console.log(`new message processed: ${message.id}`);

              window.webContents.send(GOOGLE_ON_GMAIL_EVENT, history);
              lastProcessedHistoryId = messageHistoryId;
            }

            message.ack(); // Confirmar que el mensaje fue procesado
          });
        } catch (error) {
          console.error('Error processing Gmail message:', error);
          window.webContents.send(GOOGLE_ON_GMAIL_EVENT_ERROR, error);
          message.ack(); // Aún así confirmar para evitar loop infinito
        }
      });

      subscription.on('close', () => {
        console.warn('⚠️ Gmail Pub/Sub closed. Reconnecting...');
        initGmailEventsSubscription(window);
      });

      subscription.on('error', err => {
        console.error('Error in Gmail subscription:', err);

        window.webContents.send(GOOGLE_ON_GMAIL_EVENT_ERROR, err);
      });
    });
  } catch (error) {
    throw new Error('Error al agregar la suscripción de Gmail', {
      cause: error,
    });
  }
}

// Función para limpiar y permitir reinicio
function cleanupGmailSubscription() {
  if (subscription) {
    subscription.removeAllListeners();
    subscription = null;
    lastProcessedHistoryId = null;
  }
}
