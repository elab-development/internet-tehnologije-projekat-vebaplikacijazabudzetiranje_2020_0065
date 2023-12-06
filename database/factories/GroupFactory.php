<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\Group;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Group>
 */
class GroupFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */


    public function definition(): array
    {
        return [
            'group_name' => $this->faker->name,
           // 'created_at' => now(),
            'updated_at' => now(),
        
        ];
    }

    public function newModel(array $attributes = []): Group
    {
        return new Group($attributes);
    }
    
}
