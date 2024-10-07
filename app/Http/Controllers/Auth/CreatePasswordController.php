<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class CreatePasswordController extends Controller
{
  public function sendCreatePasswordEmail(Request $request)
  {
    // Validar que el campo 'email' está presente y tiene un formato válido
    $request->validate([
      'email' => 'required|email',
    ]);

    // Obtener el correo electrónico del request
    $email = $request->email;

    // Generar un token para la tabla reset_password_token
    $resetToken = Str::random(60);

    // Guardar el token en la base de datos
    DB::table('password_reset_tokens')->updateOrInsert(
      ['email' => $email],
      [
        'token' => hash('sha256', $resetToken),
        'created_at' => now()
      ]
    );

    // Crear un segundo token que cifre el correo electrónico
    $encryptedEmail = Crypt::encryptString($email);

    // Crear la URL con el email cifrado y el token
    $resetUrl = url('/create-password') . '?token=' . $resetToken . '&email=' . urlencode($encryptedEmail);

    // Enviar el correo con la URL generada
    Mail::to($email)->send(new \App\Mail\CreatePasswordMail($resetUrl));

    return response()->json([
      'message' => 'Correo enviado para restablecer contraseña',
      'url' => $resetUrl
    ]);
  }


  public function createPassword(Request $request)
  {
    $email = "";
    // Desencriptar el email
    try {
      $email = Crypt::decryptString($request->query('email'));
    } catch (\Exception $e) {
      return response()->json(['message' => 'El correo electrónico es inválido o ha expirado.'], 400);
    }


    // Verificar si el token existe en la tabla de restablecimiento de contraseñas
    $reset = DB::table('password_reset_tokens')->where([
      'email' => $email,
      'token' => hash('sha256', $request->query('token'))
    ])->first();

    if (!$reset) {
      return response()->json([
        'message' => 'Token o correo electrónico inválido'
      ], 400);
    }

    // Crear el usuario si no existe
    $user = User::firstOrCreate(
      ['email' => $email],  // Condición para buscar al usuario
      ['password' => Hash::make($request->input('password'))]  // Crear el usuario con la nueva contraseña
    );

    // Eliminar el registro del token para evitar reutilizaciones
    DB::table('password_reset_tokens')->where([
      'email' => $email
    ])->delete();

    return response()->json([
      'message' => 'Usuario creado y contraseña establecida correctamente',
      'user' => $user
    ], 201);  // HTTP 201 para indicar que se creó un recurso
  }
}
