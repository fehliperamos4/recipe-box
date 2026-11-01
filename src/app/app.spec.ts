import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('renders the page and initial recipe through the nested components', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const page = fixture.nativeElement as HTMLElement;

    expect(page.querySelector('main h1')?.textContent).toBe('My Recipe Box');
    expect(page.querySelector('app-recipe-detail h2')?.textContent).toBe('Spaghetti Carbonara');
    expect(page.querySelectorAll('.ingredient-list li')).toHaveLength(5);
  });
});
