<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    
 public function run()
    {
        $categories = [
            'Putovanje', 'Hrana', 'Prevoz', 'Odeća', 'Zabava',
            'Sport', 'Tehnika', 'Zdravlje', 'Kuća', 'Ostalo'
        ];

        foreach ($categories as $categoryName) {
            Category::create(['name' => $categoryName]);
        }
    }
    
}
