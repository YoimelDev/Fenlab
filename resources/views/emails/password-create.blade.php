@component('mail::message')
# Restablecer Contraseña

Hola,

Hemos recibido una solicitud para crear tu cuenta en Fenlab. Para generar tu contraseña, haz clic en el botón de abajo:

@component('mail::button', ['url' => $url])
    Crear Nueva Contraseña
@endcomponent

Si no solicitaste este generación de contraseña, no es necesario que hagas nada.

Gracias,<br>
{{ config('app.name') }}
@endcomponent
