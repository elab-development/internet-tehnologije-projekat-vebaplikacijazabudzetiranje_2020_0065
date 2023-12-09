<!DOCTYPE html>
<html>
<head>
    <title>Gallery</title>
</head>
<body>
    <!-- Prikaz svih slika -->
    @foreach($files as $file)
        <img src="{{ asset('storage/'.$file->path) }}" alt="Uploaded image">
    @endforeach
</body>
</html>
