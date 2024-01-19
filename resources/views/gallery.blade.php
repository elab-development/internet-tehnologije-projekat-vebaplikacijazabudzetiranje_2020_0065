<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Gallery</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 20px;
            text-align: center;
        }

        h1 {
            color: #333;
        }

        .gallery-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
        }

        .gallery-image {
            max-width: 100%;
            height: auto;
            margin: 10px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s;
            cursor: pointer;
        }

        .gallery-image:hover {
            transform: scale(1.05);
        }
    </style>
</head>
<body>
    <h1>Image Gallery</h1>

    <div class="gallery-container">
        @foreach($files as $file)
            <img class="gallery-image" src="{{ asset('storage/' . $file->path) }}" alt="Uploaded image">
        @endforeach
    </div>
</body>
</html>

