<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BaseController;
use App\Http\Controllers\FrontController;
use App\Http\Controllers\Admin\TaskController;
use App\Http\Controllers\Admin\UserController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::controller(BaseController::class)->group(function () {
        Route::get('/home', 'index')->name('index.home');
        Route::get('/', 'index')->name('front.index');
});

Route::controller(TaskController::class)->group(function () {
        Route::get('/task', 'index')->name('index.task');
        Route::get('/form/task', 'formTask')->name('form.task');
        Route::post('/tambah/task', 'tambahTask')->name('tambah.task');
        Route::get('/edit/task/{id}', 'editTask')->name('edit.task');
        Route::put('/update/task/{id}', 'updateTask')->name('update.task');
        Route::delete('/delete/task/{id}', 'deleteTask')->name('delete.task');
});

Route::controller(UserController::class)->group(function() {
    Route::get('/user', 'index')->name('index.user');
    Route::get('/form/user', 'formUser')->name('form.user');
    Route::post('/tambah/user', 'tambahUser')->name('tambah.user');
    Route::get('/edit/user/{id}', 'editUser')->name('edit.user');
    Route::put('/update/user/{id}', 'updateUser')->name('update.user');
    Route::delete('/delete/user/{id}', 'deleteUser')->name('delete.user');
});

Route::controller(FrontController::class)->group(function () {
        Route::get('/', 'index')->name('front.index');
});

Auth::routes();

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
