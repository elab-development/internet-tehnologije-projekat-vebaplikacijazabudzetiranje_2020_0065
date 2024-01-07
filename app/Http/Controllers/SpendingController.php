<?php

namespace App\Http\Controllers;

use App\Models\Spending;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\SpendingResources;

class SpendingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $spendings = Spending::all();
            return SpendingResource::collection($spendings);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error occured while trying to display users.', 'error' => $e->getMessage()], 500);
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
        $spendings = new Spending();
        $spendings->id = $request->input('id');
        $spendings->description = $request->input('description');
        $spendings->transaction_date = $request->input('transaction_date');
        $spendings->amount = $request->input('amount');
        $spendings->refund = $request->input('refund');
        $spendings->paidby = $request->input('paidby');
        $spendings->user_id = $request->input('user_id');
        $spendings->category_id = $request->input('category_id');
        $spendings->save();

        

        return response()->json(['message' => 'Spending successfully created']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Spending $spending)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Spending $spending)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Spending $spending)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Spending $spending)
    {
        //
    }
}
