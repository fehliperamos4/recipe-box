import { Component, signal } from '@angular/core';
import { CARBONARA_RECIPE, CAPRESE_RECIPE } from '../mock-recipes';
import { RecipeModel } from '../models';
import { RecipeDetail } from '../recipe-detail/recipe-detail';

@Component({
  imports: [RecipeDetail],
  selector: 'app-recipe-list',
  styleUrl: './recipe-list.css',
  templateUrl: './recipe-list.html',
})
export class RecipeList {
  protected readonly title = signal('My Recipe Box');
  protected readonly recipe = signal<RecipeModel>(CARBONARA_RECIPE);

  protected showCarbonara(): void {
    this.recipe.set(CARBONARA_RECIPE);
  }

  protected showCaprese(): void {
    this.recipe.set(CAPRESE_RECIPE);
  }
}
