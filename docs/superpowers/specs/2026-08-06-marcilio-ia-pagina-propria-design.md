# Marcilio IA — de seção a destino próprio

Data: 2026-08-06
Branch: `feat/marcilio-ia-pagina-propria`

## O problema

A seção da IA foi descrita pelo autor como "linda, mas sem o molho do portfólio".
A auditoria do código confirma o diagnóstico e mostra que ele é estrutural, não de gosto:

- É a única seção que não usa nenhum dispositivo visual da casa. Não tem
  `.section-number` (embora `aiChat.number: '05'` esteja escrito em `content.ts` e
  nunca seja renderizado), não tem revelação `mask-text`, não usa `.gradient-text`
  no destaque do título, e usa `›` / `→` como glifos de texto onde o resto do site
  usa SVG `stroke-width: 1.5`.
- O painel é `border-radius: 20px` + `blur(12px)` sem sombra, enquanto o cartão de
  referência (`.process-card`) é `32px` + `blur(20px)` + `box-shadow` + glow radial.
- A causa raiz é a caixa: o painel tem `min-height: 520px` e `max-height: 360px` de
  stream porque a seção fica entre dois ScrollTriggers pinados. Uma conversa que não
  pode crescer é um widget, e widget é o que ela parece.

Além disso, o componente renderiza **um turno por vez** — a pergunta anterior some
quando chega a próxima —, embora envie 10 pares de histórico para a API. Isso é
consequência da altura travada, e lê como bug numa conversa.

## A decisão

A IA deixa de ser seção e vira **destino próprio em `/ia`**, alcançável por uma
navbar de duas portas. O fluxo alvo, nas palavras do autor: a pessoa chega, vê o
site rápido ou nem vê, e vai direto tirar dúvida em vez de ligar os pontos sozinha.

O risco dessa separação é o bot canibalizar o portfólio — alguém faz três perguntas
e sai sem ver nenhum case, que é onde está a prova. A mitigação é o gesto autoral
desta página: a procedência das respostas deixa de ser um rodapé cinza e vira
estrutura visível. As fontes do dossiê apontam para repositórios no GitHub, sistemas
no ar e o próprio domínio do portfólio — é prova externa, não âncora interna, e o
caminho de volta ao portfólio é a segunda porta da navegação, sempre presente.

## Arquitetura

### Roteamento — sem dependência

`src/hooks/useRota.ts`, ~50 linhas sobre a History API. Duas rotas (`/` e `/ia`),
`popstate` para o botão voltar, e interceptação de clique nos links internos.
`react-router` é grande demais para dois destinos e contraria a regra do projeto de
não criar estrutura para necessidade hipotética.

`main.tsx` passa a montar o roteador na raiz; `App.tsx` vira a página do portfólio.
Ambas as páginas entram por `React.lazy`, então quem cai direto em `/ia` não baixa
nem parseia GSAP, Lenis e as oito seções — é isso que preserva o argumento de
velocidade do fluxo.

`vercel.json` ganha um rewrite de `/ia` para `/index.html`, declarado de forma a não
capturar `/api/*`.

### Transição — dissolve com blur

View Transitions API same-document (`document.startViewTransition`), Baseline
"newly available" desde outubro de 2025: Chrome/Edge 111+, Safari 18+, Firefox 144+.
O navegador tira um retrato bitmap da tela que sai, o que elimina o problema de um
`transform` num ancestral quebrar `position: fixed` — relevante aqui porque o
portfólio tem cinco pins (`AboutMe`, `Trajectory`, `Avantis`, `DevProcess`,
`Contact`) e quatro camadas fixas.

```css
::view-transition-old(root) { animation: 500ms var(--ease-cinematic) both ia-sai }
::view-transition-new(root) { animation: 500ms var(--ease-cinematic) both ia-entra }
@keyframes ia-sai   { to   { opacity: 0; transform: scale(.98); filter: blur(8px) } }
@keyframes ia-entra { from { opacity: 0; transform: scale(1.02); filter: blur(8px) } }
```

O gesto é o da casa, não o padrão de framework: o logo da Avantis entra com
`blur(20px) + scale(.8)`, e as respostas da IA entram com `blur(6px) + y(8)`.
O slide de workspace foi descartado por ler como demo de Astro/Next.

Fallback: navegador sem suporte e `prefers-reduced-motion: reduce` trocam de rota
sem animação.

Ao voltar para `/`, restaurar o `scrollY` guardado e chamar `ScrollTrigger.refresh()`.

### Convites dentro do portfólio

Decisão do autor: **não** substituir a seção 05 por um teaser. A seção sai inteira.
O convite aparece em dois lugares:

- **Hero**, junto dos CTAs existentes — é o fluxo literal, antes de qualquer rolagem.
- **Contact**, acima dos links de contato — quem chegou ali está prestes a escrever e
  talvez prefira perguntar antes. Entra no timeline pinado do epílogo em `0.66`,
  entre as frases narrativas e os links, com cobertura em `prefers-reduced-motion` e
  no caminho mobile.

Consequência a observar: sem a seção 05, `DevProcess` (pinado) passa a ser vizinho
direto de `Contact` (pinado). Verificar no navegador se a emenda precisa de um
`.spacer-section`.

## A página `/ia`

Sem Lenis, sem pins, sem altura travada. É um quarto inteiro, e é onde a autoria mora.

**Vocabulário da casa importado:** `.section-number` fantasma com o `05` que já estava
escrito; revelação `mask-text` no rótulo e no título; `.gradient-text` no destaque;
ícones SVG `stroke-width: 1.5` no lugar de `›` e `→`.

**Gesto que só existe aqui — a procedência como estrutura.** As `sources` saem do
rodapé de `--text-xs` cinza e viram marginália: cada turno da conversa ganha uma
coluna estreita com os documentos que sustentam aquela resposta, ligada ao texto por
um fio de 1px. Onde a fonte tem `href`, ela leva de volta para dentro do portfólio.

**A conversa vira fio.** O estado deixa de ser um turno único e passa a ser uma lista
de turnos renderizada em sequência — alinhando a tela ao modelo que a API já recebe.
Era a caixa de 520px que impedia isso.

## Divisão dos arquivos

Novos:

- `src/hooks/useRota.ts` — roteador e transição
- `src/paginas/PaginaIA.tsx` — o quarto: layout, cabeçalho editorial, volta ao portfólio
- `src/hooks/useConversaIA.ts` — máquina de estados e chamada à API, extraída de `AiChat`
- `src/components/ia/Conversa.tsx` — fio de turnos e entrada
- `src/components/ia/Turno.tsx` — um par pergunta/resposta com a marginália de fontes

Modificados: `main.tsx`, `App.tsx`, `Navbar.tsx`, `Hero.tsx`, `Contact.tsx`,
`index.css`, `data/content.ts`, `vercel.json`.

Removido: `src/components/AiChat.tsx`.

## O que não muda

Turnstile, sessão em `localStorage`, janela de 20 mensagens, fallback curado e seus
rótulos, tratamento de erro por estado (`disabled`, `budget`, `rateLimit`, `timeout`),
`aria-live` na região de resposta e o foco que vai para a resposta ao concluir.
Nenhuma regra de `lib/ai/` é tocada.

`data-lenis-prevent` deixa de ser necessário no stream: não há Lenis em `/ia`.

## Verificação

- `pnpm lint` e `pnpm test` limpos. `tests/content.test.ts` compara a forma de
  `aiChat` entre pt e en, então toda chave nova entra nos dois idiomas.
- Conferir no navegador: transição nos dois sentidos, botão voltar, `/ia` digitado
  direto na barra, a emenda `DevProcess` → `Contact`, e a página em mobile.

## Fora de escopo

OG e JSON-LD próprios de `/ia` dependem de pré-render e ficam para depois. Enquanto
isso, título e descrição do documento são ajustados na troca de rota.
