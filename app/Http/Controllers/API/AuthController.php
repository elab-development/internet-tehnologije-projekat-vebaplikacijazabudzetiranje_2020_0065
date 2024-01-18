<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:admin,user,guest', // Dodato polje za ulogu
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);
    
        $token = $user->createToken('auth_token', [$request->role])->plainTextToken;
    
        return response()->json([
            'data' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
            'role' => $request->role,
        ]);
    }
    
    
    
    public function login(Request $request) {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['success' => false, 'message' => 'Unauthorised'], 401);
        }
    
        $user = User::where('email', $request['email'])->firstOrFail();
        $token = $user->createToken('auth_token', [$user->role])->plainTextToken;
    
        return response()->json([
            'success' => true,
            'message' => 'Hi, '.$user->name.', welcome to home',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'role' => $user->role,  // Dodatni podatak o ulozi korisnika
        ]);
    }
    
    

public function logout(){

    auth()->user()->tokens()->delete();
    return[
        'message'=>'You have succesfully logged out and the token was succesfully deleted'
    ];

}


}
