<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;


Route::apiResource('expenses', 'ExpenseController')->except(['create', 'edit']);
Route::get('users', 'UserController@index');
Route::post('add-expense', 'ExpenseController@store');
Route::get('user-reimbursements/{userId}', 'ReimbursementController@showUserReimbursements');
Route::delete('delete-expense/{id}', 'ExpenseController@destroy');

Route::post('/upload', 'UploadController@upload');





Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
