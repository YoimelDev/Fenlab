<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\CreatePasswordController;
use App\Http\Controllers\FenlabApiController;
use App\Http\Controllers\SalesforceController;
use App\Http\Middleware\ApiKeyMiddleware;

Route::middleware([ApiKeyMiddleware::class])->group(function () {
    Route::post('/send-create-password', [CreatePasswordController::class, 'sendCreatePasswordEmail']);
    Route::post('/create-password', [CreatePasswordController::class, 'createPassword'])->name('create-password');
    
    // New Salesforce routes
    Route::get('/salesforce/token', [SalesforceController::class, 'getSfToken']);
    Route::post('/salesforce/fenlab-user', [SalesforceController::class, 'getFenlabUser']);
    
    // Pending Approval routes
    Route::get('/salesforce/pending-approval', [SalesforceController::class, 'getPendingApproval']);
    Route::post('/salesforce/approve-auction', [SalesforceController::class, 'approveAuction']);
    
    // PBC routes
    Route::get('/salesforce/pending-pbc', [SalesforceController::class, 'getPendingPBC']);
    Route::post('/salesforce/approve-pbc', [SalesforceController::class, 'approvePBC']);
    
    // Notary routes
    Route::get('/salesforce/pending-notary', [SalesforceController::class, 'getPendingNotary']);
    Route::post('/salesforce/accept-notary', [SalesforceController::class, 'acceptNotary']);
    
    // Closed Auctions routes
    Route::get('/salesforce/closed-auctions', [SalesforceController::class, 'getClosedAuctions']);
});

Route::middleware([ApiKeyMiddleware::class, 'web'])->group(function () {
    Route::post('/', [FenlabApiController::class, 'store'])->name('api');
});

