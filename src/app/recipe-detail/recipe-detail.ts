import { JsonPipe, NgOptimizedImage } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';
import { RecipeModel } from '../models';

@Component({
  imports: [JsonPipe, NgOptimizedImage],
  selector: 'app-recipe-detail',
  styleUrl: './recipe-detail.css',
  templateUrl: './recipe-detail.html',
})
export class RecipeDetail {
  readonly recipe = input.required<RecipeModel>();
  protected readonly servings = signal<number>(1);
  protected readonly adjustedIngredients = computed(() =>
    this.recipe().ingredients.map(ingredient => ({
      ...ingredient,
      quantity: ingredient.quantity * this.servings(),
    })),
  );

  protected increaseServings(): void {
    this.servings.update(value => value + 1);
  }

  protected decreaseServings(): void {
    this.servings.update(value => Math.max(1, value - 1));
  }
}
