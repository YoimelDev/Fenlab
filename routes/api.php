<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\NewPasswordController;

Route::post('/send-create-password', [NewPasswordController::class, 'sendCreatePasswordEmail']);
Route::post('/create-password', [NewPasswordController::class, 'createPassword']);


require __DIR__ . '/api.php';
