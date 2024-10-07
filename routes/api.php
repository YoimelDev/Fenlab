<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\CreatePasswordController;

Route::post('/send-create-password', [CreatePasswordController::class, 'sendCreatePasswordEmail']);
Route::post('/create-password', [CreatePasswordController::class, 'createPassword']);
