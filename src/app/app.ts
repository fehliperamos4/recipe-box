import { Component, signal } from '@angular/core';
import { CARBONARA_RECIPE, CAPRESE_RECIPE } from './mock-recipes';
import { RecipeModel } from './models';

@Component({
  imports: [],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('My Recipe Box');
  protected readonly recipe = signal<RecipeModel>(CARBONARA_RECIPE);

  protected showCarbonara(): void {
    this.recipe.set(CARBONARA_RECIPE);
  }

  protected showCaprese(): void {
    this.recipe.set(CAPRESE_RECIPE);
  }
}
