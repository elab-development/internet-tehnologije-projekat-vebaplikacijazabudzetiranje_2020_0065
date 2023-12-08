<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserRoleController;
use App\Http\Controllers\ExpenseController;


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

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});



// Ruta za prikaz forme za uvoz podataka
Route::get('/import', [ExpenseController::class, 'showImportForm'])->name('import.form');

// Ruta za obradu podataka iz forme za uvoz
Route::post('/import', [ExpenseController::class, 'import'])->name('import');

// Ruta za izvoz podataka u CSV formatu
Route::get('/export', [ExpenseController::class, 'export'])->name('export');

require __DIR__.'/auth.php';


