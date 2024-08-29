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

        .text-blue {
            color: blue;
        }

        .text-5xl {
            font-size: 3rem;
        }
    </style>
</head>

<body>
    <section>
        <img src="{{ $message->embed(public_path('images/logo.png')) }}" alt="Fencia Logo" >

        <p>
            Te agradecemos tu interés en Fencia.
            <br>
            Estás recibiendo este correo porque iniciaste el proceso de creación de una cuenta en nuestra plataforma.
            <br>
            Serás contactado por uno de nuestros especialistas para dar inicio al proceso
            de gestión de tu cuenta.
            <br>
            Gracias por contactarnos.
        </p>
    </section>
</body>

</html>