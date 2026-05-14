<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthApiController;
use App\Http\Controllers\Api\InputApiController;
use App\Http\Controllers\Api\UserApiController;
use App\Http\Controllers\Api\DashboardApiController;

/*
|--------------------------------------------------------------------------
| API Routes — chikal-skripsi
|--------------------------------------------------------------------------
*/

// Auth (public)
Route::post('/login', [AuthApiController::class, 'login']);
Route::post('/logout', [AuthApiController::class, 'logout'])->middleware('auth:sanctum');

// Protected Routes (session based via Sanctum stateful)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthApiController::class, 'user']);
    Route::get('/dashboard', [DashboardApiController::class, 'index']);

    // Inputs
    Route::get('/inputs', [InputApiController::class, 'index']);
    Route::post('/inputs', [InputApiController::class, 'store']);
    Route::delete('/inputs/{input}', [InputApiController::class, 'destroy']);
    Route::post('/inputs/{input}/process', [InputApiController::class, 'process']);

    // Users (Admin only - dicek di controller)
    Route::get('/users', [UserApiController::class, 'index']);
    Route::post('/users', [UserApiController::class, 'store']);
    Route::put('/users/{user}', [UserApiController::class, 'update']);
    Route::delete('/users/{user}', [UserApiController::class, 'destroy']);
});
