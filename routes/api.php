<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\FriendController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\SpendingController;

// REACT RUTE
Route::resource('/friends', FriendController::class)->only(['index']);
Route::resource('/categories', CategoryController::class)->only(['index']);

Route::post('/friends', [FriendController::class, 'store']);
Route::post('/spendings', [SpendingController::class, 'store']);

Route::put('/friends/{id}/{dug}', [FriendController::class, 'update']);

Route::delete('/friends/{id}', [FriendController::class, 'destroy']);



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
    

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



    // Route::delete('/expenses/{id}', [ExpenseController::class, 'destroy']);
    // Route::post('/expenses', [ExpenseController::class, 'store']);

    // Route::resource('/expenses', ExpenseController::class)->only(['index']);
    Route::resource('/users', UserController::class)->only(['index']);

    //Route::get('/users/{id}/reimbursements', [UserController::class, 'showReimbursements']);
    //Route::get('/export/expenses', [ExpenseController::class, 'exportCSV']);