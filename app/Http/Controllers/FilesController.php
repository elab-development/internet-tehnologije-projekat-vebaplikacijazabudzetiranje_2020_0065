<?php

namespace App\Http\Controllers;

use App\Models\Files;
use App\Traits\Upload; 
use Illuminate\Http\Request;

class FilesController extends Controller
{
    use Upload;

    public function store(Request $request)
    {
        if ($request->hasFile('file')) {
            $path = $this->UploadFile($request->file('file'), 'Products');
            Files::create([
                'path' => $path
            ]);
            return redirect()->route('files.index')->with('success', 'File Uploaded Successfully');
        }
    }

    public function index()
{
    
    $files = Files::all();

    
    return view('files.index', compact('files'));
}

}