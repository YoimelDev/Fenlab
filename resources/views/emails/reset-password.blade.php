<!doctype html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <style>
        body {
            font-family: 'Roboto', sans-serif;
            font-size: 14px;
            line-height: 1.5;
            color: #6b7280;
            background-color: #f3f4f6;
            margin: 0;
            padding: 20px;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .logo {
            display: block;
            margin: 0 auto 30px auto;
            max-width: 200px;
        }

        .subject {
            font-weight: bold;
            color: #374151;
            margin-bottom: 20px;
            text-decoration: underline;
        }

        p {
            margin-bottom: 15px;
            color: #6b7280;
        }

        .button {
            display: inline-block;
            background-color: #10b981;
            color: #ffffff !important;
            text-decoration: none;
            padding: 14px 28px;
            border-radius: 6px;
            font-weight: bold;
            margin: 20px 0;
            text-align: center;
        }

        .button:hover {
            background-color: #059669;
        }

        .button-container {
            text-align: center;
            margin: 25px 0;
        }

        .signature {
            margin-top: 30px;
        }

        .team-logo {
            display: block;
            margin: 20px auto 0 auto;
            max-width: 80px;
        }

        .note {
            font-size: 12px;
            color: #9ca3af;
            margin-top: 20px;
            padding: 15px;
            background-color: #f9fafb;
            border-radius: 6px;
            border-left: 4px solid #d1d5db;
        }
    </style>
</head>

<body>
    <div class="container">
        <img src="{{ $message->embed(public_path('images/logo.png')) }}" alt="FenLAB Logo" class="logo">

        <div class="subject">Asunto: Restablecimiento de Contraseña en FenLAB</div>

        <p>Hola,</p>

        <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en <u>FenLAB</u>. Si solicitaste
            este cambio, haz clic en el siguiente botón para crear una nueva contraseña:</p>

        <div class="button-container">
            <a href="{{ $actionUrl }}" class="button">Restablecer Contraseña</a>
        </div>

        <p>Este enlace de restablecimiento expirará en {{ $count }} minutos por motivos de seguridad.</p>

        <p>Si no solicitaste el restablecimiento de tu contraseña, puedes ignorar este correo de forma segura. Tu
            contraseña actual permanecerá sin cambios.</p>

        <p>Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en ponerte en contacto con nuestro
            equipo de soporte.</p>

        <div class="signature">
            <p>¡Saludos cordiales!</p>
            <p>Equipo <u>FenLAB</u></p>
        </div>

        <div class="note">
            <p><strong>Nota de seguridad:</strong> Si no puedes hacer clic en el botón, copia y pega el siguiente enlace
                en tu navegador:</p>
            <p style="word-break: break-all; color: #6b7280;">{{ $actionUrl }}</p>
        </div>

        <img src="{{ $message->embed(public_path('images/logo.png')) }}" alt="FenLAB Logo" class="team-logo">
    </div>
</body>

</html>
