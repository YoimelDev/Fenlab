@component('mail::message')
    # Restablecer Contraseña

    Hola,

    Hemos recibido una solicitud para restablecer tu contraseña. Haz clic en el botón de abajo para crear una nueva
    contraseña:

    @component('mail::button', ['url' => $url])
        Crear Nueva Contraseña
    @endcomponent

    Si no solicitaste este cambio, no es necesario que hagas nada.

    Gracias,<br>
    {{ config('app.name') }}
@endcomponent
