<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\User;

class PasswordCreatedConfirmationMail extends Mailable
{
  use SerializesModels;

  public $user;

  public function __construct(User $user)
  {
    $this->user = $user;
  }

  public function build()
  {
    return $this->subject('Confirmación de creación de contraseña')
      ->view('emails.password_created_confirmation')
      ->with([
        'user' => $this->user,
      ]);
  }
}
