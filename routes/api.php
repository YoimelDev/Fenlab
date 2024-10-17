<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\CreatePasswordController;
use App\Http\Middleware\ApiKeyMiddleware;

Route::middleware([ApiKeyMiddleware::class])->group(function () {
  Route::post('/send-create-password', [CreatePasswordController::class, 'sendCreatePasswordEmail']);
  Route::post('/create-password', [CreatePasswordController::class, 'createPassword']);
});
