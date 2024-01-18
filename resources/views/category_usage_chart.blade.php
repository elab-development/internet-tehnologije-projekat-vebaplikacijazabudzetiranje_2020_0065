<!DOCTYPE html>
<html>
<head>
    <title>Category Usage Chart</title>
    <!-- Dodajte skriptu za Google Charts ovdje -->
    {!! $lava->render('PieChart', 'CategoryUsage', 'category-usage-chart') !!}
</head>
<body>
    <div id="category-usage-chart" style="width: 100%; height: 400px;"></div>
</body>
</html>
