<?php

use App\Http\Controllers\ContactController;
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
    
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard/Dashboard');
    })->name('dashboard');

    Route::prefix('my-analysis')->group(function () {
        Route::get('/', function () {
            return Inertia::render('MyAnalysis/Analysis');
        })->name('analysis');

        Route::get('/1', function () {
            return Inertia::render('MyAnalysis/InternalView');
        })->name('analysis1');
    });

    Route::prefix('my-publications')->group(function () {
        Route::get('/', function () {
            return Inertia::render('MyPublications/Publications');
        })->name('publications');
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


Route::resource('Contact', ContactController::class)->names([
    'store' => 'contact.store',
]);

Route::get('/mail', function () {
    $contact = Contact::find(1);

    return new ContactEmail($contact);
})->name('mail');

require __DIR__.'/auth.php';
