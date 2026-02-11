<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\GoogleAuthController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('auth/google', [GoogleAuthController::class, 'redirectToGoogle']);
Route::get('auth/google/callback', [GoogleAuthController::class, 'handleGoogleCallback']);


Route::get('/login', function () {
    return redirect('/auth/google');
})->name('login');

Route::get('/register', function () {
    return redirect('/auth/google');
})->name('register');

