<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
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

    // Aquí puedes generar un token para el reset de contraseña (por ejemplo, usando un modelo o algo similar)
    $token = Str::random(60);

    // Enviar el correo
    Mail::to($email)->send(new \App\Mail\CreatePasswordMail($token));

    return response()->json([
      'message' => 'Correo enviado para restablecer contraseña',
    ]);
  }


  public function createPassword(Request $request)
  {
    // Validar la solicitud
    $request->validate([
      'token' => 'required',
      'email' => 'required|email',
      'password' => 'required|min:8|confirmed',
    ]);

    // Verificar si el token existe en la tabla de restablecimiento de contraseñas
    $reset = DB::table('password_resets')->where([
      'email' => $request->input('email'),
      'token' => $request->input('token')
    ])->first();

    if (!$reset) {
      return response()->json([
        'message' => 'Token o correo electrónico inválido'
      ], 400);
    }

    // Crear el usuario si no existe
    $user = User::firstOrCreate(
      ['email' => $request->input('email')],  // Condición para buscar al usuario
      ['password' => Hash::make($request->input('password'))]  // Crear el usuario con la nueva contraseña
    );

    // Eliminar el registro del token para evitar reutilizaciones
    DB::table('password_resets')->where([
      'email' => $request->input('email')
    ])->delete();

    return response()->json([
      'message' => 'Usuario creado y contraseña establecida correctamente',
      'user' => $user
    ], 201);  // HTTP 201 para indicar que se creó un recurso
  }
}
