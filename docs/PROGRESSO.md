# Registro da Atividade 09

## Combinado confirmado

- Editor: VS Code.
- Experiência informada: 5/10.
- Caminho escolhido: geração com explicação, seguida de revisão pelo aluno (caminho 3).
- Escopo: fases 1–3, módulos 1–12. Encerramento antes de serviços, DI, rotas e formulários.
- O projeto foi criado nesta pasta de estudos, fora de qualquer repositório anterior.

## Conexão e currículo

O servidor MCP local `angular-cli-server`, versão **22.2.5**, respondeu a `tools/list` e `list_projects`. As ferramentas `get_best_practices` e `ai_tutor` foram chamadas de fato nesta sessão. O currículo oficial foi carregado do servidor, e cada módulo foi implementado e compilado com `run_target` antes de seu commit.

O cliente MCP desta conversa não carregava servidores novos automaticamente; as chamadas foram feitas por um cliente local via stdio. No VS Code, o mesmo servidor está configurado em `.vscode/mcp.json` e deve ser iniciado pelo aluno para a continuação no editor.

O tutor é o próprio agente seguindo as instruções fornecidas pela ferramenta; não é um serviço independente de correção. Uma chamada a `ai_tutor` não devolve um certificado nem registra que o aluno estudou.

## Implementação por módulo

| Fase | Módulo | Resultado implementado |
| --- | --- | --- |
| 1 | 1 | Template inicial e título próprio |
| 1 | 2 | Título vindo de signal por interpolação |
| 1 | 3 | Dois botões e handlers de clique, inicialmente com logs |
| 2 | 4 | Modelos, dados tipados e seleção com `set()` |
| 2 | 5 | Porções com `update()` e mínimo de uma |
| 2 | 6 | Ingredientes calculados com `computed()` |
| 3 | 7 | Imagens locais por property binding (`ngSrc`) |
| 3 | 8 | Extração do componente `RecipeList` |
| 3 | 9 | `RecipeDetail`, `input.required()` e estado local |
| 3 | 10 | Flexbox, hierarquia visual, espaçamento e responsividade |
| 3 | 11 | Listas com `@for`, `track` e estado vazio |
| 3 | 12 | Indicador de favorita com `@if` |

As refatorações movem os conceitos dos primeiros módulos para os componentes filhos. Por isso, o título e os handlers não ficam mais em `App`; os commits mostram as versões intermediárias reais.

## Validação

- Compilação de produção aprovada ao concluir cada um dos 12 módulos.
- Revisão de código por outro agente encontrou uma diferença na proporção da imagem, corrigida para respeitar as dimensões dos SVGs.
- Compilação final de produção aprovada.
- Vitest: **3 arquivos e 6 testes aprovados**, cobrindo seleção, favorita, porções, troca de input sem mutação dos mocks e lista vazia.
- Chrome: resposta HTTP 200, tela desktop de 1440 px e celular de 390 px sem transbordamento horizontal. Cliques para aumentar porções e selecionar Caprese aprovados, sem exceções de execução.
- Leitura e revisão pessoal do aluno: **pendente**.
- Confirmação da revisão do aluno e evidência do tutor no VS Code: **pendente**.
- NotebookLM, podcast, quiz/mapa mental e parágrafos pessoais: **pendentes**.

**Avaliação técnica do tutor nesta sessão:** a implementação da **fase 3 está concluída**, com os módulos 1–12 presentes e verificados. O agente fez essa avaliação após carregar o currículo da ferramenta oficial `ai_tutor` e ler/testar o projeto. O caminho 3 foi usado com autorização. A revisão e a compreensão pelo aluno continuam pendentes; não avançamos para as fases seguintes.

Repositório: https://github.com/fehliperamos4/recipe-box

As capturas [desktop](imagens/desktop.png) e [celular](imagens/mobile.png) foram geradas pelo agente durante a verificação técnica. Elas mostram a aplicação, sem representar a participação pessoal ou o material do NotebookLM.

## Roteiro de verificação no navegador

Abra com `npm.cmd start`. A seleção inicial deve ser Spaghetti Carbonara, com selo de favorita e cinco ingredientes. Uma porção usa 100 g de spaghetti. Ao aumentar para duas porções, devem aparecer 200 g. Ao voltar a uma, o botão de diminuir fica desativado.

Selecione Salada Caprese: título, imagem e lista mudam; ela tem quatro ingredientes e não tem o selo de favorita. A quantidade de porções escolhida é preservada ao trocar a receita. Ao recarregar a página, os valores iniciais voltam.

Leia as diferenças de cada commit e responda às perguntas de `EXERCICIOS.md`. No chat do VS Code, ative o tutor e peça `Where are we?`, lembrando o limite da fase 3. Guarde a resposta real e, se solicitado, um print. Não trate este arquivo como prova de que você já revisou ou aprendeu o conteúdo.
