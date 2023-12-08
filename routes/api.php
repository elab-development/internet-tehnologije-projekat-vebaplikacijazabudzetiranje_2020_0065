<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ReimbursementController;
use App\Http\Controllers\API\AuthController;


Route::resource('/expenses', ExpenseController::class)->only(['index']);
Route::resource('/users', UserController::class)->only(['index']);




    // Route::delete('/expenses/{id}', [ExpenseController::class, 'destroy']);
    // Route::post('/expenses', [ExpenseController::class, 'store']);


    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::get('/profile', function(Request $request) {
            return auth()->user();
        });
    
        // Prilagođene rute za koje zahtevaju autentikaciju
        Route::delete('/expenses/{id}', [ExpenseController::class, 'destroy']);//->middleware('auth:sanctum');
        Route::post('/expenses', [ExpenseController::class, 'store']);//->middleware('auth:sanctum');
    
        // API ruta za odjavu korisnika
        Route::post('/logout', [AuthController::class, 'logout']);
    });
    


Route::get('/users/{id}/reimbursements', [UserController::class, 'showReimbursements']);
Route::get('/export/expenses', [ExpenseController::class, 'exportCSV']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);










Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
