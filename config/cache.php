
<?php


return [
    'default' => env('CACHE_DRIVER', 'file'),
    
    'stores' => [
        'redis' => [
            'driver' => 'redis',
            'connection' => 'default',
        ],
    ],
];

