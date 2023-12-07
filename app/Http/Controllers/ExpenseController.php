<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;
use App\Http\Resources\ExpenseResource;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    try {
        $expenses = Expense::all();
        return ExpenseResource::collection($expenses);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Došlo je do greške prilikom prikazivanja troškova.', 'error' => $e->getMessage()], 500);
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
        try {
            $validatedData = $request->validate([
                'amount' => 'required|numeric',
                'description' => 'required|string',
                'user_id' => 'required|exists:users,id', 
                'category_id' => 'required|exists:categories,id', 
                'transaction_date' => 'required|date',
            ]);
    
            $expense = Expense::create($validatedData);
    
            return response()->json(['message' => 'Trošak je uspešno kreiran', 'expense' => $expense], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Došlo je do greške prilikom validacije.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Došlo je do greške prilikom kreiranja troška.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Expense $expense)
    {
       return new ExpenseResource($expenses);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Expense $expense)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Expense $expense)
    {
         $expense = Expense::find($id);
          if (!$expense) {
             return response()->json(['message' => 'Trošak nije pronađen.'], 404);
    }

         $expense->update($request->all());
         return response()->json($expense, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $expense = Expense::findOrFail($id);

        if ($expense->delete()) {
            return response()->json(['message' => 'Trošak je uspešno obrisan'], 200);
        } else {
            return response()->json(['message' => 'Nije moguće obrisati trošak'], 500);
        }
    }
}
