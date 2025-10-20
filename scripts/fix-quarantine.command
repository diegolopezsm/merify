#!/bin/bash
APP_PATH="/Applications/Merify.app"

echo "🔧 Quitando restricciones de seguridad..."
xattr -r -d com.apple.quarantine "$APP_PATH"
echo "✅ Listo. Abriendo Merify..."
open "$APP_PATH"
