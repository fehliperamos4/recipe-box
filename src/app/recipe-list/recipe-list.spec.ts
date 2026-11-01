import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeList } from './recipe-list';

describe('RecipeList', () => {
  let fixture: ComponentFixture<RecipeList>;
  let page: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeList],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeList);
    await fixture.whenStable();
    page = fixture.nativeElement as HTMLElement;
  });

  it('changes the active recipe and its pressed state when a recipe is selected', async () => {
    const options = page.querySelectorAll<HTMLButtonElement>('.recipe-option');
    expect(options).toHaveLength(2);
    expect(options[0].getAttribute('aria-pressed')).toBe('true');
    expect(options[1].getAttribute('aria-pressed')).toBe('false');

    options[1].click();
    await fixture.whenStable();

    expect(page.querySelector('#recipe-name')?.textContent).toBe('Salada Caprese');
    expect(options[0].getAttribute('aria-pressed')).toBe('false');
    expect(options[1].getAttribute('aria-pressed')).toBe('true');
    expect(page.querySelectorAll('.ingredient-list li')).toHaveLength(4);
    expect(page.querySelector<HTMLImageElement>('.recipe-image')?.getAttribute('src')).toContain('caprese.svg');

    options[0].click();
    await fixture.whenStable();

    expect(page.querySelector('#recipe-name')?.textContent).toBe('Spaghetti Carbonara');
    expect(options[0].getAttribute('aria-pressed')).toBe('true');
    expect(options[1].getAttribute('aria-pressed')).toBe('false');
  });

  it('shows a favorite indicator only on the recipe marked as a favorite', () => {
    const options = page.querySelectorAll<HTMLButtonElement>('.recipe-option');

    expect(page.querySelectorAll('.favorite-label')).toHaveLength(1);
    expect(options[0].querySelector('.favorite-label')?.textContent).toContain('Favorita');
    expect(options[1].querySelector('.favorite-label')).toBeNull();
  });
});
