<!DOCTYPE html>
<html>
<head>
    <title>File Gallery</title>
    <style>
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 10px;
        }

        .gallery img {
            width: 100%;
            height: auto;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <h1>Gallery</h1>

    <div class="gallery">
        @foreach($files as $file)
            <img src="{{ Storage::url($file->path) }}" alt="Uploaded image">
        @endforeach
    </div>
</body>
</html>