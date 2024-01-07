<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Spending>
 */
class SpendingFactory extends Factory
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
            'id' => $this->faker->unique()->randomNumber(),
            'description' => $this->faker->text(50),
            'transaction_date' => $this->faker->date(),
            'amount' => $this->faker->randomFloat(2, 10, 500),
            'refund' => $this->faker->randomFloat(2, 10, 500),
            'paidby' => $this->faker->name,
            'user_id' => \App\Models\User::factory(),
            //'category_id' => \App\Models\Category::factory()
            'category_id' => $category->id,
        ];
    }
}
