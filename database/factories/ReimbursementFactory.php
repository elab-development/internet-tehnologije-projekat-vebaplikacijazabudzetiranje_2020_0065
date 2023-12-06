<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\Reimbursement;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reimbursement>
 */
class ReimbursementFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */


    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(), 
            'amount' => $this->faker->randomFloat(2, 1, 1000),
            'description' => $this->faker->sentence,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }

    public function newModel(array $attributes = []): Reimbursement
    {
        return new Reimbursement($attributes);
    }
}
