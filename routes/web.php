<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\MyAnalysisController;
use App\Http\Controllers\MyPublicationsController;
use App\Http\Controllers\DashboardController;
use App\Mail\ContactEmail;
use App\Models\Contact;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('my-analysis')->group(function () {
        Route::get('/', [MyAnalysisController::class, 'index'])->name('analysis');
        Route::get('/{id}', [MyAnalysisController::class, 'showInternalView'])->name('analysis.show');
    });

    Route::controller(MyPublicationsController::class)->prefix('my-publications')->group(function () {
        Route::get('/pending', 'pending')->name('my-publications.pending');
        Route::get('/published', 'published')->name('my-publications.published');
        Route::get('/pending-approval', 'pendingApproval')->name('my-publications.pending-approval');
        Route::get('/pending-pbc', 'pendingPBC')->name('my-publications.pending-pbc');
        Route::get('/pending-notary', 'pendingNotary')->name('my-publications.pending-notary');
        Route::get('/closed-auctions', 'closedAuctions')->name('my-publications.closed-auctions');
    });

    Route::prefix('user-data')->group(function () {
        Route::get('/', function () {
            return Inertia::render('UserData/UserData');
        })->name('user-data');
    });

    Route::get('/how-it-works', function () {
        return Inertia::render('HowItWorks/HowItWorks');
    })->name('how-it-works');
});

Route::get('/terms', function () {
    return Inertia::render('Terms');
})->name('terms');

Route::resource('Contact', ContactController::class)->names([
    'store' => 'contact.store',
]);

Route::get('/mail', function () {
    $contact = Contact::find(1);

    return new ContactEmail($contact);
})->name('mail');

require __DIR__ . '/auth.php';
