<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LoginApiController;
use App\Http\Controllers\Api\TaskApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Route::controller(LoginApiController::class)->group(function () {
//     Route::get('/login', 'index');
// });

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/tasks', [TaskApiController::class, 'tasks']);
Route::post('/tasks', [TaskApiController::class, 'store']);
Route::put('/tasks/{id}', [TaskApiController::class, 'update']); // <- Tambahkan ini
Route::delete('/tasks/{id}', [TaskApiController::class, 'destroy']);

