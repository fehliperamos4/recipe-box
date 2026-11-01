import { RecipeModel } from './models';

export const CARBONARA_RECIPE: RecipeModel = {
  id: 1,
  name: 'Spaghetti Carbonara',
  description: 'Um clássico italiano: massa, queijo e um molho cremoso feito com gemas.',
  imgUrl: 'images/carbonara.svg',
  ingredients: [
    { name: 'Spaghetti', quantity: 100, unit: 'g' },
    { name: 'Guanciale', quantity: 50, unit: 'g' },
    { name: 'Gema de ovo', quantity: 2, unit: 'un.' },
    { name: 'Queijo pecorino', quantity: 25, unit: 'g' },
    { name: 'Pimenta-do-reino', quantity: 0.5, unit: 'colher de chá' },
  ],
};

export const CAPRESE_RECIPE: RecipeModel = {
  id: 2,
  name: 'Salada Caprese',
  description: 'Tomate, muçarela e manjericão. Poucos ingredientes, muito sabor.',
  imgUrl: 'images/caprese.svg',
  ingredients: [
    { name: 'Tomate', quantity: 2, unit: 'un.' },
    { name: 'Muçarela de búfala', quantity: 100, unit: 'g' },
    { name: 'Manjericão fresco', quantity: 4, unit: 'folhas' },
    { name: 'Azeite de oliva', quantity: 1, unit: 'colher de sopa' },
  ],
};

export const MOCK_RECIPES: RecipeModel[] = [CARBONARA_RECIPE, CAPRESE_RECIPE];
