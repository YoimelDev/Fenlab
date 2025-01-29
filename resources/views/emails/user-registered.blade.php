<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <style>
        body {
            font-family: 'Roboto', sans-serif;
            font-size: 1rem;
            line-height: 1.5;
            color: #333;
            background-color: #f7fafc;
        }
    </style>
</head>
<body>
    <img src="{{ $message->embed(public_path('images/logo.png')) }}" alt="Fencia Logo" >

    <h1>¡Bienvenido a Fencia!</h1>
    
    <p>Hola {{ $userData['name'] }},</p>
    
    <p>Gracias por registrarte en nuestra plataforma. Tu cuenta ha sido creada exitosamente.</p>
    
    <p>Datos de tu cuenta:</p>
    <ul>
        <li>Email: {{ $userData['email'] }}</li>
    </ul>
    
    <p>Ya puedes comenzar a utilizar nuestros servicios.</p>
    
    <p>Saludos,<br>
    El equipo de Fencia</p>
</body>
</html>
