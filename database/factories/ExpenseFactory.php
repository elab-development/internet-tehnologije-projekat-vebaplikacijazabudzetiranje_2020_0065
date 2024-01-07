<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\Expense;
use App\Models\Category;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Expense>
 */
class ExpenseFactory extends Factory
{
       /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition(): array
    {
        $category = Category::inRandomOrder()->first();

        return [
            'user_id' => \App\Models\User::factory(), 
            //'category_id' => \App\Models\Category::factory(), 
            'category_id' => $category->id,
            'amount' => $this->faker->randomFloat(2, 1, 1000),
            'transaction_date' => $this->faker->dateTimeThisMonth,
            'description' => $this->faker->sentence,
        ];
    }

    public function newModel(array $attributes = []): Expense
    {
        return new Expense($attributes);
    }
}
