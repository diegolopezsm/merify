# Configuración de Variables de Entorno

Para configurar las variables de entorno en tu aplicación Merify, sigue estos pasos:

## 1. Crear archivo .env

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
# Slack Configuration
SLACK_CLIENT_ID=tu_client_id_de_slack_aqui
SLACK_CLIENT_SECRET=tu_client_secret_de_slack_aqui
SLACK_REDIRECT_URI=https://merify-be.vercel.app/api/v1/slack/callback

# App Configuration
NODE_ENV=development
```

## 2. Obtener credenciales de Slack

1. Ve a [api.slack.com/apps](https://api.slack.com/apps)
2. Crea una nueva aplicación o selecciona una existente
3. En la sección "OAuth & Permissions", copia:
   - **Client ID** → `SLACK_CLIENT_ID`
   - **Client Secret** → `SLACK_CLIENT_SECRET`

## 3. Configurar Redirect URI

Asegúrate de que el `SLACK_REDIRECT_URI` coincida con la URL configurada en tu aplicación de Slack.

## 4. Variables disponibles

- `SLACK_CLIENT_ID`: ID del cliente de Slack (requerido)
- `SLACK_CLIENT_SECRET`: Secreto del cliente de Slack (requerido)
- `SLACK_REDIRECT_URI`: URI de redirección para OAuth (opcional, tiene valor por defecto)
- `NODE_ENV`: Entorno de ejecución (development/production)

## 5. Seguridad

⚠️ **IMPORTANTE**: 
- Nunca commites el archivo `.env` al repositorio
- El archivo `.env` ya está incluido en `.gitignore`
- Para producción, configura las variables de entorno en tu plataforma de despliegue

## 6. Uso en el código

Las variables están disponibles a través de `process.env`:

```typescript
const clientId = process.env.SLACK_CLIENT_ID || "";
const redirectUri = process.env.SLACK_REDIRECT_URI || "default_value";
```
