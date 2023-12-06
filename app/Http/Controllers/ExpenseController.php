<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $expenses = Expense::all();
        return response()->json($expenses, 200);
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
        $expense = Expense::create($request->all());
        return response()->json($expense, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Expense $expense)
    {
        $expense = Expense::find($id);
        return response()->json($expense, 200);
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
    public function destroy(Expense $expense)
    {
        $expense = Expense::find($id);
        if (!$expense) {
            return response()->json(['message' => 'Trošak nije pronađen.'], 404);
        }

        $expense->delete();
        return response()->json(['message' => 'Trošak uspešno obrisan.'], 200);
    }
}
