<!DOCTYPE html>
<html>
<head>
    <title>Gallery</title>
</head>
<body>
    <h1>Image Gallery</h1>

    @foreach($files as $file)
        <img src="{{ asset('storage/' . $file->path) }}" alt="Uploaded image">
    @endforeach
</body>
</html>
