import { Component, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('My Recipe Box');

  protected showCarbonara(): void {
    console.log('Receita selecionada: Spaghetti Carbonara');
  }

  protected showCaprese(): void {
    console.log('Receita selecionada: Salada Caprese');
  }
}
