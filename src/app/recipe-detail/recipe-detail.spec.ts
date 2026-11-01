import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeDetail } from './recipe-detail';
import { CAPRESE_RECIPE, CARBONARA_RECIPE } from '../mock-recipes';

describe('RecipeDetail', () => {
  let fixture: ComponentFixture<RecipeDetail>;
  let page: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeDetail);
    fixture.componentRef.setInput('recipe', CARBONARA_RECIPE);
    await fixture.whenStable();
    page = fixture.nativeElement as HTMLElement;
  });

  it('recalculates ingredient quantities when portions change and keeps a minimum of one', async () => {
    const increase = page.querySelector<HTMLButtonElement>('button[aria-label="Aumentar porções"]')!;
    const decrease = page.querySelector<HTMLButtonElement>('button[aria-label="Diminuir porções"]')!;

    expect(decrease.disabled).toBe(true);
    expect(page.querySelector('.servings-value strong')?.textContent).toBe('1');
    expect(page.querySelector('.ingredient-quantity')?.textContent).toBe('100 g');

    increase.click();
    await fixture.whenStable();

    expect(page.querySelector('.servings-value strong')?.textContent).toBe('2');
    expect(page.querySelector('.ingredient-quantity')?.textContent).toBe('200 g');
    expect(decrease.disabled).toBe(false);

    decrease.click();
    await fixture.whenStable();
    decrease.click();
    await fixture.whenStable();

    expect(page.querySelector('.servings-value strong')?.textContent).toBe('1');
    expect(page.querySelector('.ingredient-quantity')?.textContent).toBe('100 g');
    expect(decrease.disabled).toBe(true);
  });

  it('recalculates a new recipe input using the current portions without changing the source data', async () => {
    const originalRecipes = structuredClone([CARBONARA_RECIPE, CAPRESE_RECIPE]);
    page.querySelector<HTMLButtonElement>('button[aria-label="Aumentar porções"]')!.click();
    await fixture.whenStable();

    fixture.componentRef.setInput('recipe', CAPRESE_RECIPE);
    await fixture.whenStable();

    expect(page.querySelector('#recipe-name')?.textContent).toBe('Salada Caprese');
    expect(page.querySelector('.servings-value strong')?.textContent).toBe('2');
    const ingredients = page.querySelectorAll('.ingredient-list li');
    expect(ingredients).toHaveLength(4);
    expect(ingredients[0].textContent).toContain('Tomate');
    expect(ingredients[0].querySelector('.ingredient-quantity')?.textContent).toBe('4 un.');
    expect(ingredients[1].querySelector('.ingredient-quantity')?.textContent).toBe('200 g');
    expect([CARBONARA_RECIPE, CAPRESE_RECIPE]).toEqual(originalRecipes);
  });

  it('shows an empty-state message when the recipe has no ingredients', async () => {
    fixture.componentRef.setInput('recipe', { ...CARBONARA_RECIPE, ingredients: [] });
    await fixture.whenStable();

    expect(page.querySelector('.ingredient-list')?.textContent).toContain('Esta receita ainda não tem ingredientes.');
    expect(page.querySelector('.ingredient-quantity')).toBeNull();
  });
});
