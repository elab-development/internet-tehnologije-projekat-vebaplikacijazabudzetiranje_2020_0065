<!DOCTYPE html>
<html lang="en">
<head>
    <title>Galerija</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #1e1e1e;
            color: #f8f8f8;
            margin: 0;
            padding: 20px;
            text-align: center;
        }

        h1 {
            color: #ffa500; 
        }

        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }

        .gallery img {
            width: 100%;
            height: auto;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            transition: transform 0.2s ease-in-out;
            cursor: pointer;
        }

        .gallery img:hover {
            transform: scale(1.05);
        }

       
        .gallery-info {
            margin-top: 10px;
        }

        .gallery-info a {
            color: #ffa500;
            text-decoration: none;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>Vaša Galerija</h1>

    <div class="gallery">
        @foreach($files as $file)
            <img src="{{ Storage::url($file->path) }}" alt="Uploaded image">
        @endforeach
    </div>

    <div class="gallery-info">
        <p>Pogledajte još slika <a href="#">ovde</a>.</p>
    </div>
</body>
</html>

