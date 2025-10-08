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
    </style>
</head>

<body>
    <div class="container">
        <img src="{{ isset($message) ? $message->embed(public_path('images/logo.png')) : asset('images/logo.png') }}"
            alt="FenLAB Logo" class="logo">

        <div class="subject">Asunto: Creación de Contraseña en FenLAB</div>

        <p>Hola {{ $user['name'] ?? '[Nombre]' }},</p>

        <p>Gracias por ponerte en contacto con nosotros. Hemos recibido tu solicitud para crear tu cuenta en
            <u>FenLAB</u> y nos alegra saber de tu interés en formar parte de nuestra comunidad.
        </p>

        <p>Para poder completar tu registro, necesitamos que establezcas tu contraseña. Haz clic en el siguiente botón
            para crear tu nueva contraseña:</p>

        <div class="button-container">
            <a href="{{ $resetUrl }}" class="button">Crear Nueva Contraseña</a>
        </div>

        <p>Una vez que hayas establecido tu contraseña, podrás acceder completamente a todos nuestros servicios.
            Apreciamos tu paciencia mientras completamos este proceso.</p>

        <p>Si tienes alguna pregunta o necesitas más información, no dudes en responder a este correo.</p>

        <div class="signature">
            <p>¡Saludos cordiales!</p>
            <p>Equipo <u>FenLAB</u></p>
        </div>

        <img src="{{ isset($message) ? $message->embed(public_path('images/logo.png')) : asset('images/logo.png') }}"
            alt="FenLAB Logo" class="team-logo">
    </div>
</body>

</html>
