<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ReimbursementController;


Route::resource('/expenses', ExpenseController::class)->only(['index']);
Route::resource('/users', UserController::class)->only(['index']);
Route::delete('/expenses/{id}', [ExpenseController::class, 'destroy']);
Route::post('/expenses', [ExpenseController::class, 'store']);
Route::get('/users/{id}/reimbursements', [UserController::class, 'showReimbursements']);


Route::post('/upload', 'UploadController@upload');
Route::get('/export', 'ExportController@exportToCSV');






Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
