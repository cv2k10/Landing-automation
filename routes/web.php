<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\RegistrationController;
use Illuminate\Support\Facades\Route;

Route::get('/', [RegistrationController::class, 'show'])->name('home');
Route::post('/register', [RegistrationController::class, 'store'])->name('register');

Route::prefix('admin')->middleware('auth.basic')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('admin.index');
    Route::get('/export', [AdminController::class, 'export'])->name('admin.export');
});
