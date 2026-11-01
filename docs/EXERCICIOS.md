# Exercícios — Smart Recipe Box

Guia das fases 1–3, módulos 1–12, do tutor oficial distribuído com o Angular CLI 22.2.5. O currículo foi consultado em `node_modules/@angular/cli/src/commands/mcp/resources/ai-tutor.md`; a documentação pública explica a [conexão do MCP](https://angular.dev/ai/mcp).

**Combinado:** experiência informada 5/10, VS Code e caminho 3: geração pelo agente com explicação e revisão. A geração foi autorizada pelo aluno. **A leitura, a revisão do código e as respostas do aluno continuam pendentes.** Este guia não registra aprendizado nem execução pessoal concluída.

Leia os módulos na ordem, compare as mudanças `.ts`, `.html` e `.css` de cada commit e responda à pergunta de revisão. Os exemplos abaixo usam biblioteca, agenda ou contador; são trechos isolados para explicar o conceito, sem substituir os arquivos da aplicação. As APIs mostradas precisam dos respectivos imports de `@angular/core`, quando aplicável.

No Angular 22, componentes já são standalone e a detecção usa OnPush por padrão. Não é necessário acrescentar esses flags aos decorators. O trabalho termina no módulo 12.

## 1. Começando — fase 1

**Conceito:** o componente reúne lógica TypeScript, template HTML e estilos CSS. O `src/main.ts` inicia a aplicação; o template de `App` define a primeira tela.

Exemplo genérico de template:

```html
<h1>Minha biblioteca</h1>
```

**Objetivo:** reconhecer a estrutura inicial e exibir um título próprio.

**O que fazer:** a tela inicial deve deixar de mostrar a apresentação do gerador e passar a exibir o título da Recipe Box em um `h1`.

**Revisão — pendente:** qual arquivo altera o texto visível e qual contém a classe do componente?

## 2. Texto dinâmico com interpolação — fase 1

**Conceito:** `{{ expressão }}` apresenta no HTML um valor do componente. Um signal é lido chamando sua função com `()`; `readonly` impede trocar a referência, sem impedir alterações por sua API.

Exemplo genérico:

```ts
protected readonly title = signal('Minha biblioteca');
```

```html
<h1>{{ title() }}</h1>
```

**Objetivo:** conectar um dado TypeScript ao texto da tela.

**O que fazer:** o título deve vir de um signal `protected readonly` do componente, apresentado por interpolação.

**Revisão — pendente:** por que o template usa `title()` e não somente `title`?

## 3. Eventos de clique — fase 1

**Conceito:** `(click)` associa um evento do navegador a uma ação do componente.

Exemplo genérico:

```ts
protected openBook(): void {
  console.log('Livro selecionado');
}
```

```html
<button type="button" (click)="openBook()">Abrir livro</button>
```

**Objetivo:** fazer a tela chamar métodos TypeScript.

**O que fazer:** devem existir dois botões com handlers protegidos que escrevem mensagens no console. Ao clicar, cada mensagem precisa corresponder à ação escolhida.

**Revisão — pendente:** em qual console aparecem as mensagens e o que dispara o método?

## 4. Estado com `signal` e `set` — fase 2

**Conceito:** uma interface descreve o formato dos dados; um signal armazena o estado atual. `.set(novoValor)` substitui o valor, atualizando os consumidores.

Exemplo genérico:

```ts
protected readonly currentShelf = signal('Ficção');

protected showHistory(): void {
  this.currentShelf.set('História');
}
```

**Objetivo:** selecionar a receita ativa usando estado tipado.

**O que fazer:** `models.ts` deve definir `Ingredient` e `RecipeModel`; `mock-recipes.ts` deve fornecer dados tipados. Um signal `recipe` recebe uma receita inicial, a tela mostra seus dados e os botões trocam a receita por `.set()`.

**Revisão — pendente:** qual a diferença entre o tipo `RecipeModel` e o valor guardado em `recipe()`?

## 5. Alterações com `update` — fase 2

**Conceito:** `.update(valorAtual => novoValor)` calcula o próximo estado a partir do anterior. É útil para aumentar ou diminuir um contador.

Exemplo genérico:

```ts
protected readonly copies = signal(1);

protected addCopy(): void {
  this.copies.update(value => value + 1);
}
```

**Objetivo:** controlar a quantidade de porções.

**O que fazer:** um signal numérico `servings` deve aparecer na tela; dois botões devem aumentar e diminuir seu valor por `.update()`. O botão de diminuir não deve produzir porções inválidas.

**Revisão — pendente:** quando `update()` expressa a intenção melhor que `set()`?

## 6. Estado derivado com `computed` — fase 2

**Conceito:** `computed()` calcula um valor a partir de outros signals. Suas dependências são as leituras feitas dentro do cálculo; não é necessário atualizar manualmente cada resultado.

Exemplo genérico:

```ts
protected readonly unitPrice = signal(12);
protected readonly copies = signal(2);
protected readonly total = computed(() => this.unitPrice() * this.copies());
```

**Objetivo:** recalcular as quantidades dos ingredientes quando mudam a receita ou as porções.

**O que fazer:** `adjustedIngredients` deve depender de `recipe()` e `servings()`, devolvendo as quantidades ajustadas sem modificar os dados originais. Neste módulo a saída é provisória: um `<pre>` com `JsonPipe` permite enxergar os objetos antes de aprender a renderizar listas.

Exemplo genérico da visualização provisória, com `JsonPipe` de `@angular/common` incluído nos `imports` do componente:

```html
<pre>{{ summary() | json }}</pre>
```

**Revisão — pendente:** quais leituras fazem o cálculo ser reavaliado? Por que não alterar diretamente as quantidades dos dados de exemplo?

## 7. Binding de propriedades e atributos — fase 3

**Conceito:** `[propriedade]` atualiza uma propriedade do elemento; `[attr.nome]` atua em um atributo, como os de acessibilidade.

Exemplo genérico:

```html
<button type="button" [disabled]="busy()" [attr.aria-label]="actionLabel()">
  Abrir livro
</button>
```

**Objetivo:** fazer a imagem acompanhar a receita selecionada.

**O que fazer:** `RecipeModel` e os dados devem ter `imgUrl`. A imagem exibida deve receber essa URL por binding e ter texto alternativo coerente. Ao trocar a receita, imagem e texto devem acompanhar a seleção.

**Revisão — pendente:** por que `disabled="false"` não equivale a `[disabled]="false"`?

## 8. Criar e aninhar componentes — fase 3

**Conceito:** componentes dividem a interface em partes com responsabilidades próprias. Para usar um filho standalone, o pai o inclui em seus `imports` e emprega o seletor no template.

Exemplo genérico de template pai:

```html
<app-library></app-library>
```

**Objetivo:** separar a Recipe Box do componente raiz.

**O que fazer:** `RecipeList` deve receber a lógica, os signals e o template das receitas. O template de `App` deve conter somente `<app-recipe-list>`, preservando o comportamento existente após a reorganização.

**Revisão — pendente:** qual responsabilidade fica em `App` e onde passa a morar o estado das receitas?

## 9. Dados de pai para filho com `input` — fase 3

**Conceito:** um signal input permite ao filho ler dados enviados pelo pai. `input.required<T>()` expressa que esse dado é obrigatório. O pai passa o valor lido do signal; o filho recebe e lê seu próprio input.

Exemplo genérico no filho:

```ts
readonly book = input.required<Book>();
```

```html
<app-book-detail [book]="selectedBook()"></app-book-detail>
```

**Objetivo:** separar a seleção da receita de sua apresentação detalhada.

**O que fazer:** `RecipeList` deve fornecer a receita selecionada a `RecipeDetail`. O filho deve exibir nome, descrição, imagem e ingredientes; manter `servings` local começando em 1; e calcular `adjustedIngredients` usando seu input e suas porções locais.

**Revisão — pendente:** quem escolhe a receita e quem controla as porções? Por que passar `selectedBook()` no exemplo?

## 10. Estilos de componentes — fase 3

**Conceito:** o CSS do componente organiza sua apresentação. Flexbox distribui elementos; tamanho, peso e espaçamento ajudam a entender a hierarquia visual.

Exemplo genérico:

```css
.book-card { display: flex; gap: 1rem; padding: 1.5rem; }
.book-title { font-size: 1.5rem; font-weight: 700; }
.book-description { font-size: 1rem; }
```

**Objetivo:** tornar o detalhe da receita legível e organizado.

**O que fazer:** `recipe-detail.css` deve usar Flexbox, diferenciar visualmente o nome da descrição e reservar espaço com `padding` ou `margin`. O conteúdo deve continuar utilizável em telas menores e com navegação por teclado.

**Revisão — pendente:** quais regras criam a hierarquia de texto e quais organizam o espaço?

## 11. Listas com `@for` — fase 3

**Conceito:** `@for` cria uma apresentação por item de uma coleção. `track` informa uma identidade estável para o Angular associar cada dado ao elemento correspondente.

Exemplo genérico:

```html
<ul>
  @for (book of books(); track book.id) {
    <li>{{ book.title }}</li>
  }
</ul>
```

**Objetivo:** apresentar ingredientes como uma lista HTML legível.

**O que fazer:** `RecipeDetail` deve iterar sobre `adjustedIngredients()` com `@for`, mostrando nome, quantidade e unidade. A chave de `track` precisa identificar o item. O `<pre>` e o `JsonPipe` usados provisoriamente desde o módulo 6 devem ser removidos.

**Revisão — pendente:** o que muda quando o JSON provisório vira uma lista? Por que a chave de `track` precisa ser estável e única na coleção?

## 12. Condições com `@if` — fase 3

**Conceito:** `@if` inclui um trecho na interface apenas quando sua condição é verdadeira. O conteúdo acompanha as mudanças dos dados usados na condição.

Exemplo genérico:

```html
@if (book().isAvailable) {
  <span>Disponível para empréstimo</span>
}
```

**Objetivo:** distinguir visualmente as receitas favoritas.

**O que fazer:** o modelo e os dados devem incluir `isFavorite: boolean`. O template de `RecipeList` deve mostrar um indicador de favorito por meio de `@if` somente quando a receita estiver marcada. A aplicação deve continuar listando receitas e exibindo detalhes em componentes aninhados.

**Revisão — pendente:** qual condição controla o indicador e o que acontece quando ela é falsa?

Após revisar os resultados, peça **“Where are we? Confirme se concluí a fase 3 e pare aqui, conforme o escopo.”** Guarde a resposta real do tutor. A conclusão técnica e a revisão pessoal precisam ser verificadas; este documento sozinho não confirma nenhuma delas.
