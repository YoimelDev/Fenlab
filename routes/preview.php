<?php

use Illuminate\Support\Facades\Route;

// Ruta temporal para previsualizar emails
Route::get('/preview/email/password-create', function () {
    $user = [
        'name' => 'Juan Pérez'
    ];
    
    $resetUrl = 'https://ejemplo.com/reset-password?token=example-token';
    
    return view('emails.password-create', compact('user', 'resetUrl'));
});

Route::get('/preview/email/user-registered', function () {
    $userData = [
        'name' => 'María García'
    ];
    
    return view('emails.user-registered', compact('userData'));
});

Route::get('/preview/email/reset-password', function () {
    $user = [
        'name' => 'Carlos López'
    ];
    
    $actionUrl = 'https://ejemplo.com/reset-password?token=example-token';
    $count = 60; // minutos
    
    return view('emails.reset-password', compact('user', 'actionUrl', 'count'));
});