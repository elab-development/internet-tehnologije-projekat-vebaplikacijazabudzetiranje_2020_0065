<!DOCTYPE html>
<html>
<head>
    <title>Images</title>
</head>
<body>
    <!-- Prikaz pojedinačne slike -->
    <img src="{{ asset('storage/'.$file->path) }}" alt="Uploaded image">
</body>
</html>
