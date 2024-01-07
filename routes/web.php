<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
//
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FilesController;
use App\Http\Controllers\PrijateljController;
use App\Http\Controllers\SpendingController;



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




Route::get('/import', [ExpenseController::class, 'showImportForm'])->name('import.form');


Route::post('/import', [ExpenseController::class, 'import'])->name('import');


Route::get('/export', [ExpenseController::class, 'export'])->name('export');

Route::post('/upload-files', [FilesController::class, 'store']);

//Route::post('upload-files', [FileController::class,'store'])->middleware('optimizeImages'); 
Route::get('/upload', function () {
    return view('upload');
});

Route::get('/files', [FilesController::class, 'index'])->name('files.index');

Route::get('/latest_user', [UserController::class, 'showLatestUser']);

//Route::get('/prijatelji', [PrijateljController::class, 'index']);


//za spendings
Route::post('/import/spendings', [SpendingController::class, 'import'])->name('spendings.import');
Route::get('/spendings/export', [SpendingController::class, 'export'])->name('spendings.export');


require __DIR__.'/auth.php';


