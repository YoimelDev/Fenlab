<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class PasswordCreatedConfirmationMail extends Mailable
{
  use SerializesModels;

  public $email;

  public function __construct(string $email)
  {
    $this->email = $email;
  }

  public function build()
  {
    return $this->subject('Confirmación de creación de contraseña')
      ->view('emails.password_created_confirmation')
      ->with([
        'email' => $this->email,
      ]);
  }
}
