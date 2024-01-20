<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Image>
 */
class ImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'image_name' => fake()->sentence(),
            'image_path' => fake()->sentence(),
            'image_description' => fake()->paragraph(2,true),
            'id_category' => $this->faker->word,
            'id_user' => $this->faker->word,
        ];
    }
}
