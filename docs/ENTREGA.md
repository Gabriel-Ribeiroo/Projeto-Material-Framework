# Trilha — Refatoração de Interface com Material Design

**Tela escolhida:** Meu perfil (`/profile`). As melhorias de feedback, carregamento e confirmação também foram aplicadas às telas de Disciplinas e Matrícula, porque usam os mesmos componentes.

**Antes:** o EduConnect original, projeto separado em `../educonnect` (Vite + React). **Depois:** o Trilha, este projeto, que é a refatoração do EduConnect.

Prints: [`screenshots/antes/`](screenshots/antes/) (EduConnect) e [`screenshots/depois/`](screenshots/depois/) (Trilha), cada um em desktop 1366×768, tablet 768×1024 e smartphone 360×800, nos modos claro e escuro. Os estados de interação estão em `antes/estado-*.png` e `depois/estado-*.png`.

> Os prints "escuro" do EduConnect são iguais aos "claro". Isso não é um erro de captura: eles foram tirados com o sistema em modo escuro, e o EduConnect não tem tema escuro. A interface simplesmente ignora a preferência.

### Visão geral

| | Antes (EduConnect) | Depois (Trilha) |
|---|---|---|
| **Base** | Vite 5, React 18, Tailwind CSS 3 | Next.js 16, React 19, Tailwind CSS 4, next-themes |
| **Organização** | Um único `src/App.tsx` com 441 linhas: todas as telas, componentes, dados e lógica no mesmo arquivo | 108 arquivos: 25 componentes globais em `components/`, componentes e hooks por tela em `app/(portal)/<tela>/`, dados em `data/` |
| **Navegação** | A tela atual fica num `useState`. A URL é sempre `/` | Uma rota por tela (`/profile`, `/subjects`, `/enrollment`…) |
| **Cores** | Classes fixas (`indigo-600`, `slate-500`…) e valores avulsos no CSS | Tokens de tema em `styles/globals.css`, com modo claro e escuro |
| **Sessão** | "Sair do sistema" só mostra um aviso | Tela de login e saída de verdade |

---

## 1. Auditoria da interface (EduConnect)

Todos os problemas abaixo foram reproduzidos no EduConnect rodando no navegador.

| # | Problema encontrado | Por que é um problema? | Solução proposta |
|---|---|---|---|
| 1 | **"Salvar alterações" não tinha estado de carregamento.** O aviso "Perfil atualizado com sucesso!" aparecia na hora e o botão continuava clicável. | O usuário não percebe que algo está sendo processado e pode clicar várias vezes, enviando a mesma operação repetidamente. | Botão com indicador circular de progresso (*CircularProgress*), texto "Salvando…" e bloqueio durante a operação (2 s simulados). Os campos também ficam bloqueados. |
| 2 | **O formulário não tinha validação.** Nome vazio e telefone "abc" eram "atualizados com sucesso", e o nome sumia do card do perfil (`antes/estado-validacao-desktop-claro.png`). O e-mail tinha só o balão nativo do navegador, fora do visual da aplicação. | Dados errados entram no sistema e o usuário recebe uma confirmação falsa. O erro só aparece depois, quando um comunicado não chega. | *TextField* com estado de erro: borda vermelha, ícone e mensagem que explica como corrigir. Asterisco nos campos obrigatórios. Ao tentar salvar com erro, o foco vai para o primeiro campo inválido. Máscara no telefone. |
| 3 | **O feedback era sempre igual e ficava no lugar errado.** O aviso mostrava um ✓ verde até para alertas ("Selecione pelo menos uma disciplina"), não podia ser fechado e sumia sempre em 3 s. No celular, ficava fora do centro e cobria o menu inferior (`antes/estado-alerta-mobile-claro.png`). | Uma cor ou ícone errado comunica o oposto do que aconteceu. Um aviso sobre a navegação atrapalha o uso. | *Snackbar* com três tons (sucesso, erro, informação), botão de fechar, animação de entrada e saída, e posição acima do menu inferior no celular. |
| 4 | **Não havia tratamento de erro.** Nenhuma ação podia falhar e, se falhasse, o usuário não saberia. | Sem uma mensagem clara, o usuário acha que salvou ou perde as alterações. | *Alert* de erro dentro do card, que explica o problema, garante que os dados não foram perdidos e oferece "Tentar novamente". |
| 5 | **Botões que não faziam o que prometiam.** O "⋯" das disciplinas não tinha função nem nome para leitor de tela. "Restaurar" ficava sempre ativo e descartava a edição sem avisar. "Continuar matrícula" anunciava uma "próxima etapa" que não existia. "Sair do sistema" mostrava "Sessão encerrada" e o aluno continuava logado. | Um clique acidental apaga informação. Um botão que não responde, ou que diz algo que não aconteceu, passa a impressão de sistema quebrado. | *Dialog* de confirmação com a ação destrutiva em vermelho e o foco inicial em "Cancelar". O "⋯" abre um menu com "Trancar disciplina", que pede confirmação. "Restaurar" virou "Descartar alterações": só fica ativo quando há algo a descartar. A matrícula mostra o envio e o resultado. "Sair" encerra a sessão e volta para o login. |
| 6 | **Sem estado vazio.** Uma busca de disciplina sem resultado deixava a área em branco, sem nenhuma mensagem (`antes/estado-busca-vazia-desktop-claro.png`). | O usuário não sabe se a busca falhou, se a página ainda está carregando ou se não há nada para mostrar. | *Empty state* com ilustração (tela inteira sem dados) ou ícone (busca e filtro sem resultado), explicação e ação para sair dele ("Limpar busca", "Recarregar"). Prints: `depois/estado-vazio-*.png`. |
| 7 | **Problemas de navegação por teclado.** No celular, o primeiro TAB entrava no menu lateral fechado (invisível). Notificações e menu do perfil não fechavam com ESC nem com clique fora. Os itens do menu lateral e do menu inferior não tinham contorno de foco. O "✕" de fechar o menu aparecia também no desktop, onde não fazia nada. | Quem navega por teclado "entra" num menu invisível, não sabe onde está e não consegue fechar um painel aberto. | O menu fechado sai da ordem de foco e fecha com ESC. Menus fecham com ESC e clique fora. Todo controle tem contorno de foco visível. Link "Pular para o conteúdo". |
| 8 | **As telas não tinham endereço.** A tela atual ficava só na memória. Recarregar sempre voltava ao Dashboard, e o botão "voltar" do navegador saía do site. | O usuário perde o lugar ao recarregar e não consegue compartilhar nem favoritar uma tela. | Uma rota por tela, com o item ativo do menu vindo da URL. |
| 9 | **Cores fixas e nenhum modo escuro.** Cores escritas direto nas classes (`indigo-600`, `violet-500`, `slate-*`), fundo da página `#f32105` e barra de rolagem `#046ff1` fixos no CSS. Nenhum suporte a tema escuro. | Mudar uma cor exige caçar dezenas de classes. Quem usa o sistema no escuro recebe uma tela clara e ofuscante. | Tokens de tema (`--primary`, `--muted`, `--destructive`…) usados por todos os componentes, com valores para claro e escuro e alternância Claro / Escuro / Sistema. |
| 10 | **Animações longas e sem respeito a `prefers-reduced-motion`.** Entradas de 450 a 500 ms em todos os cards, mesmo com a redução de movimento ativa no sistema. | Animações lentas atrasam a leitura, e o movimento pode causar desconforto em pessoas sensíveis a ele. | Transições de 150 a 300 ms (`ease-out` na entrada, `ease-in` na saída), desligadas quando o sistema pede menos movimento. |

---

## 2. Requisitos implementados

| Requisito | Como foi atendido |
|---|---|
| **1. Material Components** | Componentes do design system em `components/`: `Button` (contained, outlined, text, destructive), `Spinner` (CircularProgress), `Alert`, `ConfirmDialog` (Dialog), `Toast` (Snackbar), `Field` (TextField), além de `Card`, `Header` (AppBar), `Avatar`, chips de status, `Popover` (Menu) e `Select`. |
| **2. Hierarquia visual** | Uma ação principal por seção (botão *contained*). As secundárias usam *text* ou *outlined*. Escala de títulos fixa (eyebrow → título → descrição), tons de cinza para informação secundária e espaçamento na escala do Tailwind. |
| **3. Feedback** | Toda ação importante responde: "Alterações salvas com sucesso!", "Alterações descartadas.", "Pré-matrícula enviada…", "Disciplina foi trancada.", erros de validação e falha de conexão. |
| **4. Loading** | Salvar perfil (2 s), enviar pré-matrícula (2 s) e trancar disciplina (1,5 s). O botão fica desabilitado, com spinner e texto de progresso. Skeletons aparecem durante o carregamento das telas. |
| **5. Responsividade** | Testado em 1366, 768 e 360 px: sem rolagem horizontal (medido automaticamente, 0 px). Botões em largura total no celular, ação principal mais perto do polegar e diálogo adaptado à tela. |
| **6. Dark Mode** | Alternância Claro / Escuro / Sistema no cabeçalho (ícone de sol/lua). Todas as cores vêm de tokens do tema (`styles/globals.css`). Nenhum componente usa cor fixa. |
| **Desafio A — Empty State** | Todas as telas: "Limpar dados" → estado vazio com ação "Recarregar". Busca sem resultado e disciplinas todas trancadas também mostram um estado vazio próprio. |
| **Desafio B — Tratamento de erro** | Perfil: salvar sem internet mostra um *Alert* com "Tentar novamente". |
| **Desafio C — Confirmação de exclusão** | Disciplinas: "⋯" → "Trancar disciplina" → *Dialog*. Também em "Limpar dados", em todas as telas. |

### Melhorias adicionais (complementos liberados pelo professor)

| Melhoria | O que faz | Por que melhora a experiência |
|---|---|---|
| **"Desfazer" no Snackbar** | Depois de trancar uma disciplina, o Snackbar oferece **Desfazer** por 7 s. A disciplina volta para a grade, na mesma posição. | Dois níveis de proteção: o *Dialog* evita o erro antes da ação, e o *Desfazer* permite corrigir logo depois, sem precisar de um novo fluxo. O aviso fica mais tempo na tela porque tem uma ação para alcançar. |
| **Aviso de alterações não salvas** | Com o perfil editado e não salvo, clicar em outro item do menu abre o *Dialog* "Sair sem salvar?" ("Continuar editando" / "Sair sem salvar"). Fechar ou recarregar a aba mostra o aviso do próprio navegador. Sem alterações, a navegação é direta. | Prevenção de erro: o usuário não perde o que digitou por um clique distraído. O aviso só aparece quando há algo a perder, sem interromper à toa. |
| **Máscara de telefone** | Formata enquanto a pessoa digita: `(11) 99999-8888` (celular) ou `(11) 3333-4444` (fixo). Ignora letras e limita a 11 dígitos. | Mostra o formato esperado sem exigir que o usuário pense nele, e reduz erros de validação. |
| **"Pular para o conteúdo"** | Primeiro item do TAB em todas as telas. Fica escondido e aparece no topo ao receber foco. ENTER leva o foco direto ao conteúdo da página. | Quem navega por teclado ou leitor de tela não precisa passar pelos itens do menu lateral e do cabeçalho em toda página. |

### Sobre a biblioteca

O exemplo da atividade usa MUI. O EduConnect já usava Tailwind CSS, mas com as cores escritas direto em cada classe. Na refatoração, o Trilha ganhou um design system próprio, com tokens de tema sobre o Tailwind. Os componentes Material (Button, Dialog, Snackbar, Alert, CircularProgress, TextField) foram implementados sobre esses tokens, sem misturar duas bibliotecas de estilo. O princípio cobrado na atividade é o mesmo: nenhuma cor fixa espalhada pelo código, e todas as telas usam os mesmos componentes.

---

## 3. Por que esses componentes resolvem o problema? (pergunta obrigatória)

- **Botão com CircularProgress (problema 1).** O usuário precisa saber que o clique foi recebido. O spinner dentro do próprio botão mostra o progresso exatamente onde ele está olhando. O bloqueio impede o envio duplicado sem nenhuma mensagem extra.
- **TextField com erro (problema 2).** A mensagem aparece colada ao campo errado e diz como corrigir ("como nome@email.com"). O usuário não precisa adivinhar qual dos quatro campos está errado. Ela só aparece depois que ele sai do campo, para não acusar erro enquanto ainda está digitando.
- **Snackbar (problema 3).** Confirmações rápidas não devem interromper a tarefa. O Snackbar aparece, confirma e some sozinho. O tom (✓ verde, ✕ vermelho, ⓘ neutro) faz o usuário entender o resultado antes mesmo de ler.
- **Alert (problema 4).** Um erro que exige ação não pode sumir sozinho como um Snackbar. O Alert fica dentro do card até o problema ser resolvido, explica o que houve e já oferece a solução ("Tentar novamente").
- **Dialog (problema 5).** Uma ação irreversível exige uma pausa consciente. O Dialog bloqueia o resto da tela, diz a consequência ("não poderá ser desfeita") e começa com o foco em "Cancelar". Assim, um Enter dado por reflexo não apaga nada.

---

## 4. Como testar

1. `yarn dev` e abra `http://localhost:3000/profile`.
2. **Validação:** apague o nome ou digite um e-mail sem domínio e saia do campo.
3. **Loading e feedback:** altere a cidade → "Salvar alterações" → spinner por 2 s → Snackbar de sucesso.
4. **Erro (Desafio B):** DevTools → aba *Network* → *Offline*. Altere um campo e salve. Aparece o Alert com "Tentar novamente". Volte para *No throttling* e clique nele.
5. **Confirmação (Desafio C):** em `/subjects`, clique em "⋯" num card → "Trancar disciplina" → confirme. No Snackbar, clique em **Desfazer**.
   - **Sair sem salvar:** em `/profile`, altere um campo e clique em "Notas" no menu.
   - **Máscara:** digite só números no telefone.
   - **Pular para o conteúdo:** recarregue a página e aperte TAB uma vez.
6. **Empty state (Desafio A):** "Limpar dados" em qualquer tela → confirmar.
7. **Dark mode:** ícone de sol/lua no cabeçalho.
8. **Teclado:** TAB / SHIFT+TAB percorrem todos os controles com contorno de foco visível. ESC fecha menus, diálogo e menu lateral. ENTER/SPACE acionam botões e SPACE marca as disciplinas na matrícula.
9. **Responsividade:** DevTools → modo dispositivo → 360×800, 768×1024 e 1366×768.
