<?php

namespace Database\Factories;

use App\Models\Friend;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Friend>
 */
class FriendFactory extends Factory
{
    protected $model = Friend::class;

    public function definition()
    {
        return [
            'id' => $this->faker->unique()->randomNumber(),
            'name' => $this->faker->name,
            'image' => $this->faker->imageUrl(),
            'balance' => $this->faker->randomFloat(2, 0, 1000),
            'email' => $this->faker->unique()->safeEmail,
            'user_id' => \App\Models\User::factory()
        ];
    }
}
