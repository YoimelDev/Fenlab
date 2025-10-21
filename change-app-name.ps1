# Script PowerShell para cambiar APP_NAME en producción de forma segura
# Uso: .\change-app-name.ps1 "FenLAB"

param(
    [Parameter(Mandatory=$true)]
    [string]$NewAppName
)

Write-Host "🚀 Cambiando APP_NAME a: $NewAppName" -ForegroundColor Green

# Paso 1: Limpiar todas las cachés
Write-Host "📝 Limpiando cachés..." -ForegroundColor Yellow
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear

# Paso 2: Hacer backup del .env actual
Write-Host "💾 Creando backup del .env..." -ForegroundColor Yellow
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
Copy-Item ".env" ".env.backup.$timestamp"

# Paso 3: Cambiar APP_NAME en .env
Write-Host "🔧 Cambiando APP_NAME en .env..." -ForegroundColor Yellow
$envContent = Get-Content ".env"
$envContent = $envContent -replace '^APP_NAME=.*', "APP_NAME=`"$NewAppName`""
$envContent | Set-Content ".env"

# Paso 4: Verificar el cambio
Write-Host "✅ Verificando el cambio..." -ForegroundColor Yellow
Select-String "APP_NAME=" ".env"

# Paso 5: Recargar configuración
Write-Host "🔄 Recargando configuración..." -ForegroundColor Yellow
php artisan config:cache

# Paso 6: Verificar que la app sigue funcionando
Write-Host "🧪 Probando que la aplicación funcione..." -ForegroundColor Yellow
php artisan tinker --execute="echo 'APP funcionando: ' . config('app.name');"

Write-Host "✨ ¡Cambio completado!" -ForegroundColor Green
Write-Host "📋 Si algo falla, puedes restaurar con: Copy-Item .env.backup.* .env" -ForegroundColor Cyan