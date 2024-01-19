<?php

namespace App\Http\Controllers;

use App\Models\Spending;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\SpendingResources;
use App\Http\Controllers\Controller;
use Khill\Lavacharts\Lavacharts;

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

            Spending::create([
                'description' => $data[0],
                'transaction_date' => $data[1],
                'amount' => $data[2],
                'refund' => $data[3],
                'paidby' => $data[4]
                
            ]);
        }

        return redirect()->back()->with('success', 'CSV file imported successfully.');
    }
    public function export()
    {
        $spendings = Spending::all();
    
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="spendings.csv"',
        ];
    
        $callback = function () use ($spendings) {
            $file = fopen('php://output', 'w');
    
            // Header red
            fputcsv($file, [
                'Description', 
                'Transaction Date', 
                'Amount', 
                'Refund', 
                'Paid By',
                
            ]);
    
            // Data rows
            foreach ($spendings as $spending) {
                fputcsv($file, [
                    $spending->description,
                    $spending->transaction_date,
                    $spending->amount,
                    $spending->refund,
                    $spending->paidby,
                    
                ]);
            }
    
            fclose($file);
        };
    
        return Response::stream($callback, 200, $headers);
    }

    //Vizuelizacija podataka

  
        public function pieChart()
        {
            $data = \DB::table('spendings')
                ->join('categories', 'spendings.category_id', '=', 'categories.id')
                ->select('categories.name as category', \DB::raw('COUNT(spendings.id) as count'))
                ->groupBy('categories.name')
                ->get();
        
            return response()->json($data);
        }
        
    
}