<?php

namespace App\Http\Controllers;

use App\Models\Files;
use App\Traits\Upload; //import the trait
use Illuminate\Http\Request;

class FilesController extends Controller
{
    use Upload;//add this trait

    public function store(Request $request)
    {
        if ($request->hasFile('file')) {
            $path = $this->UploadFile($request->file('file'), 'Products');//use the method in the trait
            Files::create([
                'path' => $path
            ]);
            return redirect()->route('files.index')->with('success', 'File Uploaded Successfully');
        }
    }

    public function index()
{
    // Ovde možeš da dohvatiš fajlove iz baze ili bilo koji drugi odgovarajući sadržaj
    $files = Files::all();

    // Vrati view koji prikazuje listu fajlova
    return view('files.index', compact('files'));
}

}