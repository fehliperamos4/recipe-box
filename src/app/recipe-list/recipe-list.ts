import { Component, signal } from '@angular/core';
import { CARBONARA_RECIPE, MOCK_RECIPES } from '../mock-recipes';
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
  protected readonly recipes = signal<RecipeModel[]>(MOCK_RECIPES);
  protected readonly recipe = signal<RecipeModel>(CARBONARA_RECIPE);

  protected selectRecipe(selected: RecipeModel): void {
    this.recipe.set(selected);
  }
}
