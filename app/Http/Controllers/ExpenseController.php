<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use League\Csv\Writer;
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
        return response()->json(['message' => 'Error occured while trying to display expenses.', 'error' => $e->getMessage()], 500);
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
    
            return response()->json(['message' => 'Expense created succesfully', 'expense' => $expense], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['message' => 'Error occured while validating.', 'errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error occured while creating expense.', 'error' => $e->getMessage()], 500);
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
             return response()->json(['message' => 'Expense not found.'], 404);
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
            return response()->json(['message' => 'Expense deleted succesfully'], 200);
        } else {
            return response()->json(['message' => 'Error occured, impossible to delete expense'], 500);
        }
    }

    public function export()
    {
        $expenses = Expense::all();
        $csvFileName = 'expenses.csv';
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $csvFileName . '"',
        ];
    
        $handle = fopen('php://output', 'w');
        fputcsv($handle, ['ID', 'Amount', 'Description', 'Transaction Date']); 
    
        foreach ($expenses as $expense) {
            fputcsv($handle, [$expense->id, $expense->amount, $expense->description, $expense->transaction_date]); 
        }
    
        fclose($handle);
    
        return response()->make('', 200, $headers);
    }


    
    public function import(Request $request)
{
    $validator = Validator::make($request->all(), [
        'file' => 'required|mimes:csv,txt',
    ]);

    if ($validator->fails()) {
        return redirect()->back()->withErrors($validator);
    }

    $file = $request->file('file');
    $fileContents = file($file->getPathname());

    foreach ($fileContents as $line) {
        $data = str_getcsv($line);

        Expense::create([
            'name' => $data[0],
            'amount' => $data[1],
            'description' => $data[2],
            'transaction_date' => $data[3],
            
        ]);
    }

    return redirect()->back()->with('success', 'CSV file imported successfully.');
}

public function showImportForm()
{
    return view('import'); 
}

   
}
