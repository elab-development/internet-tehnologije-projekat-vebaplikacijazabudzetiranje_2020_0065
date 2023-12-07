<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Reimbursement;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
        $users = User::all();
        return UserResource::collection($users);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Došlo je do greške prilikom prikazivanja korisnika.', 'error' => $e->getMessage()], 500);
    }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        
    }
    public function showReimbursements($id)
 {
 

    try {
        $reimbursements = Reimbursement::where('user_id', $id)->get();
        
        if($reimbursements->isEmpty()) {
            return response()->json(['message' => 'Nema refundacija za traženog korisnika.'], 404);
        }

        return response()->json(['reimbursements' => $reimbursements], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Došlo je do greške.', 'error' => $e->getMessage()], 500);
    }
}
}