<?php

namespace App\Http\Controllers;

use App\Models\Reimbursement;
use Illuminate\Http\Request;

class ReimbursementController extends Controller
{

    public function index($userId)
    {

        $user = User::findOrFail($userId);
        
       
        if ($user->reimbursements()->exists()) {
            $reimbursements = $user->reimbursements()->get();
            return response()->json($reimbursements);
        }
        
        return response()->json(['message' => 'Korisnik nema reimbursements.'], 404);
    }

    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Reimbursement $reimbursement)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reimbursement $reimbursement)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Reimbursement $reimbursement)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reimbursement $reimbursement)
    {
        //
    }

}
