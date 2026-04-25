<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InputController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    if(auth()->check()) {
        return redirect()->route('dashboard');
    }
    return redirect()->route('login');
});

// Authentication
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.post');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Authenticated Routes
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Inputs (Accessible by both Admin and User)
    Route::resource('inputs', InputController::class)->only(['index', 'store', 'destroy']);
    Route::post('/inputs/{input}/process', [InputController::class, 'process'])->name('inputs.process');
    
    // Manage Users (Admin Only - simplistic role check in controller, but route grouped anyway)
    Route::resource('users', UserController::class)->except(['show']);
});
