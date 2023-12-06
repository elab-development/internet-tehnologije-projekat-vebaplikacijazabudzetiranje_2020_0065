<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = $file->getClientOriginalName();
            $file->storeAs('uploads', $fileName);

            return 'Fajl je uspešno uploadovan!';
        }

        return 'Niste izabrali fajl za upload.';
    }
}
