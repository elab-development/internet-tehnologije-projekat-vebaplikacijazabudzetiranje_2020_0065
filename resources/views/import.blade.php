<!-- <form action="{{ route('import') }}" method="POST" enctype="multipart/form-data">
    @csrf
    <input type="file" name="file" accept=".csv">
    <button type="submit">Import CSV</button>
</form> -->

<a href="{{ route('spendings.export') }}">Export data in .csv format</a>

