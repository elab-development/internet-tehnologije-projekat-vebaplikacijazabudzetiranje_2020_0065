<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Expense;

class ExportController extends Controller
{
    public function exportToCSV()
    {
        $data = Expense::all(); 

        $fileName = 'exported_data.csv';
        $headers = array(
            "Content-type" => "text/csv",
            "Content-Disposition" => "attachment; filename=$fileName",
            "Pragma" => "no-cache",
            "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
            "Expires" => "0"
        );

        $callback = function () use ($data) {
            $file = fopen('php://output', 'w');
            // Header red
            fputcsv($file, array_keys($data->first()->toArray()));

            // Podaci
            foreach ($data as $row) {
                fputcsv($file, $row->toArray());
            }
            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
