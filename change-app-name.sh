#!/bin/bash

# Script para cambiar APP_NAME en producción de forma segura
# Uso: ./change-app-name.sh "NuevoNombre"

if [ -z "$1" ]; then
    echo "Error: Debes proporcionar el nuevo nombre de la aplicación"
    echo "Uso: ./change-app-name.sh \"FenLAB\""
    exit 1
fi

NEW_APP_NAME="$1"

echo "🚀 Cambiando APP_NAME a: $NEW_APP_NAME"

# Paso 1: Limpiar todas las cachés
echo "📝 Limpiando cachés..."
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Paso 2: Hacer backup del .env actual
echo "💾 Creando backup del .env..."
cp .env .env.backup.$(date +%Y%m%d_%H%M%S)

# Paso 3: Cambiar APP_NAME en .env
echo "🔧 Cambiando APP_NAME en .env..."
sed -i.bak "s/^APP_NAME=.*/APP_NAME=\"$NEW_APP_NAME\"/" .env

# Paso 4: Verificar el cambio
echo "✅ Verificando el cambio..."
grep "APP_NAME=" .env

# Paso 5: Recargar configuración
echo "🔄 Recargando configuración..."
php artisan config:cache

# Paso 6: Verificar que la app sigue funcionando
echo "🧪 Probando que la aplicación funcione..."
php artisan tinker --execute="echo 'APP funcionando: ' . config('app.name');"

echo "✨ ¡Cambio completado!"
echo "📋 Si algo falla, puedes restaurar con: mv .env.backup.* .env"