<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserRoleController extends Controller
{
    public function index(Request $request)
{
    $user = $request->user();

    if ($user->hasRole('admin')) {
        
        return view('admin.dashboard');

    } elseif ($user->hasRole('user')) {
        
        return view('user.dashboard');

    } elseif ($user->hasRole('guest')) {
        
        return view('guest.dashboard');

    } else {
        // Ako korisnik nema nijednu od navedenih uloga
        return abort(403, 'Unauthorized');
    }
}
}
