<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="{{ asset('css/styles.css') }}">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formular</title>
</head>
<body>
    <div class="container">
        <form action="{{ url('/upload-files') }}" method="post" enctype="multipart/form-data" class="upload-form">
            @csrf
            <!-- Skriveni input za izbor fajla -->
            <input type="file" name="file" id="file" class="hidden-input" />

            <!-- Stilizovani div kao zamena za dugme "Choose File" -->
            <label for="file" class="custom-file-upload">
                <span>Izaberi fajl</span>
            </label>

            <!-- Dugme za slanje forme -->
            <button type="submit" class="upload-button">Upload</button>
        </form>
    </div>
</body>
</html>

