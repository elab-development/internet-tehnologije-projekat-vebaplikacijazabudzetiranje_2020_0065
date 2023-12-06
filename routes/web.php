<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ReimbursementController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\CategoryController;

Route::resource('users',UserController::class);
Route::resource('expenses',ExpenseController::class);
Route::resource('reimbursements',ReimbursementsController::class);
Route::resource('groups',GroupController::class);
Route::resource('categories',CategoryController::class);





Route::get('/', function () {
    return view('welcome');
});
