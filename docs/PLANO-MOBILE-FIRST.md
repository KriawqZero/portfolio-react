# Plano Mobile-First — Portfólio Marcilio Ortiz

> Documento de planejamento. Nenhuma alteração de código foi feita nesta sessão.
> Auditoria executada em 27/07/2026 sobre a branch `v3-i18n`, com build de produção
> (`pnpm build` + `pnpm preview`) e Chromium headless emulando iPhone (UA do navegador
> embutido do Instagram, `hasTouch: true`, `isMobile: true`).
> Marcações: **[Observado]** = medido/reproduzido na auditoria. **[Opinião]** = juízo de
> direção, discutível.

---

## 1. Resumo executivo

O site funciona no celular — não quebra, não gera scroll horizontal, não tem CLS, carrega
em ~1,6 s de LCP em 4G lento. O problema não é técnico, é de **densidade narrativa por
tela**. A experiência mobile hoje é o desktop desempilhado: os mesmos textos longos, na
mesma ordem, sem o suporte visual que no desktop justifica esse ritmo (coluna dupla, pin,
crossfade, foto integrada). O resultado é uma leitura de **18,7 telas** em que a primeira
prova concreta de trabalho aparece na **tela 4** e o contato na **tela 17,6**.

Para o público real — alguém que abriu o link da bio do Instagram, dentro do navegador
embutido, provavelmente entre outras coisas — isso significa que a maioria vai formar sua
opinião com base no hero e em, talvez, duas telas de texto corrido cinza-escuro.

O objetivo deste plano é reescrever o **ritmo** da versão mobile mantendo intacto o
conteúdo, a identidade visual e a experiência desktop.

### Objetivo mensurável

| Métrica | Hoje (medido) | Alvo |
|---|---|---|
| Telas até o primeiro projeto real (390×844) | 4,1 telas (y=3492 px) | ≤ 1,3 tela |
| Telas até o contato | 17,6 telas (y=14838 px) | ≤ 8 telas de scroll **ou** 1 toque, sempre |
| Altura total da página (390×844) | 15.745 px / 18,7 telas | 8–10 telas na rota padrão |
| Altura total com `?platform=` | 20.747 px / 24,6 telas | ≤ 12 telas |
| Peso transferido até o fim do hero | 1.011 KB (14 req.) | ≤ 400 KB |
| Maior imagem | `marcilio-pose.png` 698 KB | ≤ 120 KB (AVIF/WebP responsivo) |
| Contraste do texto de corpo | 2,97:1 (`#5A5A70`) | ≥ 4,5:1 |
| Alvos de toque < 44 px | 5 no mobile padrão | 0 |
| LCP em 4G lento + CPU 4× | 1.640 ms | manter < 2.000 ms **após** trocar o LCP para conteúdo real |

As duas primeiras linhas são o coração do plano; o resto é consequência ou higiene.

**Instrumentação:** as métricas de comportamento (tempo até o primeiro toque, taxa de
sessões que chegam ao contato) não são mensuráveis hoje — o site não tem analytics. Ver
Pergunta 8 na seção 12.

---

## 2. Jornada atual no celular e atritos

Medições em 390×844 (iPhone 14/15), build de produção, salvo indicação contrária.

### 2.1 Mapa de scroll (rota padrão, sem `?platform=`)

| Posição | Seção | Altura | Em telas |
|---|---|---|---|
| 0 | `#inicio` (Hero) | 1.279 px | 1,52 |
| 1.279 | `#sobre` (AboutMe) | 2.213 px | 2,62 |
| 3.492 | `#projetos` (Trajectory) | 8.968 px | **10,63** |
| 12.460 | `#avantis` | 1.293 px | 1,53 |
| 13.753 | `#processo` (DevProcess) | 1.085 px | 1,29 |
| 14.838 | `#contato` (Contact) | 907 px | 1,07 |
| **15.745** | **total** | | **18,66** |

Em 360×800 (Android popular, faixa mais estreita): **16.565 px = 20,7 telas**, contato na
tela 19,4. Em 430×932: 15,9 telas.

Com `?platform=workana`: **20.747 px = 24,6 telas**; `#freelance-portfolio` ocupa 5.003 px
(5,9 telas) e empurra os projetos próprios para a tela 10.

### 2.2 Atritos — cada um com evidência

**A1. O logo fixo colide com o texto do hero. [Observado]**
Retângulo do logo: top 24 → bottom 56. Retângulo de "OLÁ, EU SOU": top 37 → bottom 57.
Sobreposição confirmada por `getBoundingClientRect`, visível no screenshot da primeira
dobra em 360 e 390 px. Ao rolar, o logo (opacidade 0.4) continua passando por cima de
títulos e parágrafos, porque não há fundo nem `padding-top` compensatório.
→ `src/components/Navbar.tsx` (nav fixa sem altura reservada) + `src/components/Hero.tsx:150`
(`paddingTop: calc(var(--section-spacing) / 2)`, que em mobile vira ~2–3 rem, insuficiente).

**A2. O hero não cabe em uma tela e o que sobra fica órfão. [Observado]**
Hero = 1.279 px contra viewport de 844 px. Na dobra entram: nome, H1, parágrafo de 234
caracteres e os dois CTAs (bottom 707). Os ícones de tecnologia ficam cortados ao meio
(top 813, bottom 845) e a foto — o elemento mais humano da página — fica em 909–1247,
**inteiramente fora da dobra**, sozinha numa tela quase vazia (ver `360x800-0001vh.png`).
→ `src/components/Hero.tsx:284-300` (bloco `@media (max-width: 1023px)`).

**A3. A prova de trabalho começa na tela 4. [Observado]**
Entre o hero e o primeiro projeto existem 2,6 telas de "Sobre mim": um parágrafo de 376
caracteres em `--text-muted` e três estatísticas, das quais duas são `∞` ("∞ bugs
resolvidos com muita paciência", "∞ vontade de aprender e evoluir").
→ `src/components/AboutMe.tsx` + `src/data/content.ts:232`.
**[Opinião]** No desktop essas métricas funcionam como respiro visual dentro de um pin de
200 dvh. No celular elas são o conteúdo principal de duas telas, e duas delas não afirmam
nada verificável.

**A4. Os cards de projeto no mobile são paredes de texto. [Observado]**
As narrativas têm 356, 404 e 414 caracteres, renderizadas em 18 px / line-height 30,6 px.
Um único projeto (SISCO) ocupa uma tela inteira só de parágrafo. A seção `#projetos`
soma 10,6 telas para 10 projetos.
→ `src/components/Trajectory.tsx:274` (branch mobile).

**A5. Todos os links de projeto têm o mesmo peso visual. [Observado]**
KyteApp renderiza "Repo Worker", "Repo API", "Repo Dashboard" como três `.btn-secondary`
empilhados em largura total, idênticos (`390x844-0008vh.png`). O projeto imobiliário
mostra "Visitar Site", "Repo Portal", "Repo App" na mesma hierarquia. Para um visitante
vindo do Instagram, três repositórios em fila não comunicam nada; o link que importa
(produto no ar) não se distingue.
→ `src/components/Trajectory.tsx:293-305`.

**A6. Nenhuma navegação persistente em 18 telas. [Observado]**
A `Navbar` renderiza apenas o logo (`src/components/Navbar.tsx:28-53`). `content.ts`
define `nav.links` (Início/Sobre/Projetos/Contato) que **nenhum componente consome**.
Não há menu, âncoras, botão de topo, indicador de progresso ou atalho para contato. Uma
vez na tela 12, a única saída é rolar.

**A7. Fechar o "Arquivo Completo" recarrega o site inteiro. [Observado]**
`src/components/ArchiveOverlay.tsx:68-69` — `window.location.href = pathname + search`,
comentado como "Pragmatic fix" para resetar o GSAP. Reproduzido: após fechar,
`window.scrollY === 0` e a página recarrega. No celular, em 4G, isso descarta ~10 telas
de progresso de leitura e recompra 1 MB de rede.

**A8. O overlay do Arquivo está com o layout quebrado. [Observado]**
`ArchiveOverlay` usa as classes `archive-grid`, `archive-year`, `archive-type`,
`archive-stack`, `archive-links`, `text-xl`, `text-sm`, `text-primary`,
`text-secondary` — **nenhuma existe em `src/index.css`**. Computado no browser:
`.archive-grid { display: block; grid-template-columns: none }`. Resultado visível em
`390-archive-overlay.png`: o cabeçalho da tabela vira uma lista vertical
"ANO / PROJETO / TIPO / STACK" e o "LINKS" fica solto. Além disso, o corpo rolável tem
416 px úteis dentro de um viewport de 844 px (scroll aninhado dentro do Lenis) e o botão
de fechar mede 34×40 px.

**A9. As tecnologias do hero são invisíveis no toque. [Observado]**
Os seis ícones usam `--text-muted` sobre fundo quase preto e o nome só existe no atributo
`title` (`src/components/Hero.tsx:228`), que no touch nunca aparece. O hover (`whileHover`
do framer-motion) também não existe. São seis glifos cinzas sem legenda.

**A10. Contraste abaixo do mínimo no texto que mais aparece. [Observado]**
Cálculo WCAG sobre as cores computadas:
- `--text-muted` `#5A5A70` sobre `#09090B` → **2,97:1** (mínimo 4,5:1). Atinge o subtítulo
  do hero (20 px), o texto do "Sobre" (20 px sobre `#030407` → 3,06:1), todas as linhas de
  stack (12 px), sublabels das estatísticas.
- `.section-label` com `--accent` `#3F18AB` em 12 px → **1,83:1**. É o rótulo de todas as
  seções ("TRAJETÓRIA", "SOBRE MIM", "TRABALHOS PARA CLIENTES").
Em tela de celular sob luz ambiente, isso é pior do que o número sugere.
Nota lateral: `CLAUDE.md` define o accent como `#6D4AFF`, mas `--accent` em
`src/index.css:19` é `#3F18AB`; `#6D4AFF` só aparece em sombras. A inconsistência é real e
vale uma decisão consciente.

**A11. `prefers-reduced-motion` não é respeitado em lugar nenhum. [Observado]**
Zero ocorrências em todo o CSS (verificado via `document.styleSheets` no browser, não só
por grep). Três animações infinitas ativas (`dotPulse`, `epilogueBreathe`, glow do
epílogo) e todas as timelines GSAP rodam idênticas com a preferência ligada — a página
com `prefers-reduced-motion: reduce` é byte a byte a mesma.

**A12. Alvos de toque menores que 44 px. [Observado]**
Logo da nav 56×32; "Conhecer minha jornada ↓" 233×27; "avantis.dev" 95×24;
"instagram.com/avantis.dev" 199×24; "ACESSAR PROJETO" (modo freelance) 144×24; ✕ do
overlay 34×40.

**A13. No modo freelance você lê o caso antes de saber qual é. [Observado]**
No mobile a ordem do DOM entrega `problema → solução → depoimento` e só então
`número/tipo/nome/stack/link` (`FreelanceProjects.tsx:207-270`). Como não há separador
forte entre casos, o bloco de metadados do caso 1 aparece colado ao "PROBLEMA DO CLIENTE"
do caso 2 — o leitor associa o título errado ao texto seguinte. Reproduzido em
`390x844-platform-workana-0002vh.png` e `-0003vh.png`.

**A14. A mensagem personalizada por plataforma nunca é exibida. [Observado]**
`personalizedMessage` é calculado em `src/hooks/useLanguage.tsx:56-61` e o conteúdo existe
em `content.ts:341` e `:744`, mas `grep -rn "personalizedMessage" src/` não encontra
nenhum consumidor. O mesmo vale para `setLanguage`: **não há seletor de idioma na
interface** — quem cai no site em PT não tem como mudar para EN.

**A15. Faixa de tablet com dois comportamentos conflitantes. [Observado]**
`Contact` e `DevProcess` cortam em 768 px; `Hero`, `AboutMe`, `Avantis`, `Trajectory` e
`FreelanceProjects` cortam em 1024 px. Em 768×1024 (iPad retrato) o resultado medido é:
`#contato` com **5.120 px** (pin de 400% ativo) e `#processo` em scroll horizontal
pinado, enquanto o resto da página está em layout mobile empilhado. É a pior combinação
possível: o custo do cinema sem o layout que o justifica.

**A16. Peso e prioridade de imagens. [Observado]**
`marcilio-pose.png` = 698 KB, natural 472×1390, exibida a 115×338 CSS px no mobile.
`avantis-logo.png` = 200 KB, natural 1667×1667, exibida a 210×210. Nenhuma `<img>` do site
tem `width`/`height`, `loading="lazy"`, `decoding` ou `fetchpriority`. Em 4G lento a
página transfere 1.011 KB em 14 requisições — 89% disso são duas imagens que ninguém
precisa ver no primeiro segundo. (`public/icone-avantis-2.png`, 1,6 MB, não é referenciado
por nenhum componente.)

**A17. Fontes em cadeia de três saltos. [Observado]**
`src/index.css:7` usa `@import url('https://fonts.googleapis.com/...')` dentro do CSS:
HTML → CSS do bundle → CSS do Google → WOFF2 do gstatic. Sem `preconnect`, sem `preload`.
Inter é pedida com **sete pesos** (300–900, 47 KB) e Space Grotesk com quatro (22 KB).

**A18. LCP é um parágrafo, não a mensagem. [Observado]**
Elemento de LCP medido em mobile: `P.hero-fade` (o subtítulo). Ou seja, o maior elemento
pintado é justamente o texto de menor contraste da tela. O H1 aparece antes, mas a
percepção de "carregou" está amarrada ao parágrafo cinza.

**A19. JS em chunk único. [Observado]**
`dist/assets/index-*.js` = 578,58 KB bruto / 189,48 KB gzip, sem code splitting.
O projeto carrega **duas** bibliotecas de animação: GSAP + ScrollTrigger (usado em tudo) e
framer-motion (usado em `Navbar`, `Hero`, e nos branches **mobile** de `Trajectory` e
`DevProcess`, apenas para `whileInView` e um `whileHover`). No dev server, o módulo
framer-motion transferido é de 453 KB não-minificado; não medi a fatia exata dentro do
chunk de produção.

**A20. Metadados fixos em PT. [Observado]**
`<html lang="pt-BR">` e todo o `<head>` são estáticos; com o conteúdo em inglês, o `lang`
continua `pt-BR`. Sem `<footer>`, sem skip link. `site.webmanifest` tem `name` e
`short_name` vazios e `theme_color: #ffffff` num site preto.

### 2.3 O que **não** é problema

Registrado para não virar trabalho desnecessário:
- **CLS = 0,0000** em todos os viewports testados.
- **Zero overflow horizontal** em 360/390/430/768/1440.
- **LCP de 1.640 ms** em 4G lento + CPU 4× (produção) — bom, e melhora sozinho quando as
  imagens forem tratadas.
- Nenhum erro de console ou exceção em nenhum viewport.
- `CursorGlow` já se desativa em `pointer: coarse` (`CursorGlow.tsx:14,65`).
- Lenis não intercepta o toque (sem `syncTouch`), então o scroll no iOS continua nativo —
  não reproduzi travamento de scroll no mobile.

---

## 3. O que preservar da experiência desktop

Nada desta proposta toca o desktop. Explicitamente **intocáveis**:

1. **Hero cinematográfico** — parallax de mouse 2.5D (foto/glow/logo em camadas), reveals
   com máscara, foto sangrando para fora do viewport. É a assinatura visual do site.
2. **Trajectory pinada** — o pin de `+=70% × (N-1)`, o crossfade com blur entre painéis, o
   fast-travel por era, o contador, os steppers, os fundos por era (grid, logs, wireframe,
   terminal). É o trecho tecnicamente mais ambicioso do projeto.
3. **DevProcess horizontal** — o scroll horizontal pinado com a linha de progresso.
4. **Contact como epílogo** — pin de 400% com os cinco atos, ocultação da navbar, as
   frases em cascata e o "sobe como créditos de filme".
5. **AboutMe/Avantis com coluna pinada** e `min-height: 200dvh`.
6. **FreelanceProjects sticky** com watermark editorial e parallax de mouse.
7. **O modelo conceitual PT/EN + `?platform=`**, com `content.ts` como fonte única. Todas
   as propostas abaixo assumem que qualquer texto novo nasce em `content.ts`, nos dois
   idiomas, e que a personalização por plataforma continua sendo uma variação da mesma
   narrativa — não uma segunda narrativa.

**Regra de fronteira:** o mobile ganha direção própria dentro de `@media`/`matchMedia`
e de branches já existentes. Nenhuma timeline desktop é simplificada, removida ou
"otimizada" para facilitar o mobile.

---

## 4. Proposta de experiência mobile

### 4.1 Premissa

A sessão típica vem do Instagram: curta, com uma mão, possivelmente em conexão ruim,
dentro de uma WebView com barra de UI comendo altura. A pergunta que o mobile precisa
responder em **8 segundos** é: *quem é, o que faz, isso presta, como falo com ele.*
A narrativa longa continua disponível — mas por escolha do visitante, não por pedágio.

### 4.2 Ordem e função das seções (mobile)

| # | Seção | Função | Custo alvo |
|---|---|---|---|
| 1 | **Hero compacto** | Identidade + posicionamento + 1 ação | 1 tela exata (`100dvh`) |
| 2 | **Prova imediata** (novo arranjo de `Trajectory`) | 3 projetos em destaque, escaneáveis | 1,5–2 telas |
| 3 | **Sobre**, encurtado | Contexto humano, 1 parágrafo + 1 número real | 1 tela |
| 4 | **Trajetória completa** | Os 10 projetos, colapsáveis por era | 3–4 telas fechada |
| 5 | **Avantis** | Contexto de mercado | 0,8 tela |
| 6 | **Processo** | Como trabalha — 4 passos compactos | 1 tela |
| 7 | **Contato** | Fechamento + ações diretas | 1 tela |

Total alvo: 8–10 telas na rota padrão, contra 18,7 hoje. No modo `?platform=`, os casos de
cliente entram como seção 2 (assumindo o lugar da "prova imediata"), e a trajetória
pessoal desce — o cliente da Workana quer ver trabalho de cliente primeiro. Isso já é a
intenção do código atual; a diferença é que hoje custa 5,9 telas e deveria custar 2,5.

### 4.3 Acima da dobra

Em 360×800 (o mais apertado), dentro de `100dvh`, nesta ordem:

1. `MARCILIO ORTIZ` (nome, sem o "OLÁ, EU SOU" — redundante quando o espaço é caro)
2. H1 "Desenvolvedor Full Stack" — mantém o gradiente na segunda linha
3. **Uma linha** de posicionamento, não o parágrafo de 234 caracteres.
   Ex.: *"Sistemas em produção — do banco de dados à interface."* **[Opinião]** — texto
   novo, precisa da sua aprovação e do par em EN.
4. Uma linha de prova concreta, tipográfica, não card: *"200+ usuários no SISCO · SaaS
   próprio no ar · clientes desde 2024"*
5. **Um** CTA primário: `Ver projetos ↓`. O "Sobre mim" vira link de texto discreto.
6. A foto como **fundo integrado**, não como bloco separado (ver 5.1).

O parágrafo longo atual não some: desce para a seção "Sobre".

### 4.4 Hierarquia e ritmo

- **Uma ideia por tela.** Hoje uma tela de projeto carrega tipo + nome + ano + narrativa de
  400 caracteres + stack + estatística + até 3 botões. A proposta: cartão com nome, ano,
  uma frase de resultado (≤120 caracteres) e **um** link primário; a narrativa completa
  fica atrás de "ler a história" (`<details>` nativo ou toggle animado, altura auto).
- **Ritmo alternado.** Sequência de blocos idênticos cansa. Alternar: cartão compacto →
  respiro tipográfico (uma citação/estatística grande) → cartão → respiro.
- **Espaçamento menor.** `--section-spacing` em mobile é `clamp(4rem, 10vw, 6rem)` aplicado
  em cima e embaixo de cada seção; com seções curtas isso vira vazio grande. Sugestão:
  reduzir para `clamp(3rem, 8vw, 4.5rem)` e compensar com separadores visuais.

### 4.5 CTAs

- **Primário único no hero:** "Ver projetos".
- **Por projeto:** um botão preenchido para o produto no ar (`Ver ao vivo`) e os
  repositórios como links de texto secundários com ícone — não como três botões iguais.
- **Barra de ação fixa no rodapé** (aparece após sair do hero, some no epílogo):
  `[Projetos] [WhatsApp/E-mail]`. Altura 56 px + `env(safe-area-inset-bottom)`. Isso
  resolve sozinho o "17,6 telas até o contato" sem tocar em nada da narrativa.
  **[Opinião]** É o item de maior impacto por menor custo do plano inteiro.
- **No epílogo:** os links de contato como blocos de 48 px de altura, com rótulo visível
  (hoje são texto + ícone com 24 px de altura).

### 4.6 Navegação

- Barra de ação fixa (acima) + indicador de progresso de leitura de 2 px no topo,
  alimentado pelo scroll do `body` (reaproveita a `lineRef` que já existe em
  `App.tsx:52-64`, hoje quase invisível).
- Dentro da trajetória: chips de era ("Superfície · Infra · Baixo nível · Raízes") em uma
  linha rolável horizontal, que colapsam/expandem os grupos. O `handleFastTravel` do
  desktop não serve aqui (depende do ScrollTrigger pinado) — no mobile é filtro/acordeão.
- **Seletor de idioma PT/EN** visível no topo — hoje não existe em nenhum viewport (A14).

### 4.7 Tratamento das animações

Direção própria, não imitação do desktop. Três regras:

1. **Só transformações baratas:** `opacity` e `translateY` de no máximo 16–24 px, duração
   0,4–0,6 s. Nada de `filter: blur()` animado, nada de `scale` em imagens grandes, nada de
   pin, nada de scrub.
2. **Uma revelação por bloco, `once: true`.** O `scrub` faz sentido quando o usuário
   controla um sistema de camadas; num acordeão de cartões ele só atrasa a leitura.
3. **Nada preso a hover.** Estado ativo por toque ou permanente.

Além disso: envelope global de `prefers-reduced-motion` que, quando ativo, entrega tudo
opaco e estático (inclusive `dotPulse` e `epilogueBreathe`) — mas **sem** mudar o layout,
para não criar uma terceira variante para manter.

---

## 5. Sugestões visuais concretas

**5.1 Foto do hero como camada de fundo, não como bloco.**
Hoje: coluna de 40 vh depois do texto, isolada. Proposta: foto ancorada à direita/base,
altura ~62 vh, largura ~68 vw, com máscara `linear-gradient(to left, black 35%,
transparent 85%)` e um `radial-gradient` roxo por trás — o texto ocupa a metade esquerda,
a foto sangra na direita e o logo `MO` blur permanece atrás. É o mesmo conceito do desktop
com proporção de retrato, e devolve identidade à dobra sem custar tela.

**5.2 Cartão de projeto compacto.**
```
┌─────────────────────────────────────┐
│ SISCO                        2025 · │   nome 24px/600, ano mono 11px
│ TCC · em produção                   │   tag mono 10px, 0.15em
│                                     │
│ Tirou a gestão de horas do WhatsApp │   1 frase, 16px, #C9C9D6
│ e colocou 200+ alunos num sistema.  │
│                                     │
│ 200+ usuários ativos                │   número em gradient, 18px
│ Laravel · Livewire · MariaDB        │   mono 11px, #8A8AA0
│                                     │
│ [ Ver ao vivo ]   Repositório ↗     │   1 botão 48px + link texto
│ ▸ ler a história                    │   toggle para a narrativa
└─────────────────────────────────────┘
```
Sem borda de card por padrão — separador de 1 px e ritmo tipográfico, coerente com o
"editorial" do desktop e sem cheiro de template.

**5.3 Chips de era roláveis.**
Linha horizontal `overflow-x: auto` com `scroll-snap-type: x mandatory`, chips de 32 px,
o ativo com fundo `rgba(109,74,255,.12)` e borda `rgba(109,74,255,.35)`. Substitui a
lista vertical de eras que no mobile hoje simplesmente não existe.

**5.4 Correção de contraste com escala real.**
Introduzir um degrau intermediário em vez de clarear tudo:
`--text-muted: #5A5A70` continua **apenas** para elementos decorativos não textuais;
texto de corpo passa a `--text-body: #9A9AB0` (≈ 6,2:1 sobre `#09090B`);
`.section-label` passa de `#3F18AB` para `#8B6BFF` (≈ 5,4:1) mantendo a família roxa.
Os números exatos precisam ser validados no device — a escala é a proposta, não os hex.

**5.5 Barra de ação inferior.**
Altura 56 px + safe area, fundo `rgba(9,9,11,.72)` com `backdrop-filter: blur(16px)` e
borda superior de 1 px. Dois alvos de 48 px. Entra com `translateY` quando o hero sai da
tela; sai quando o epílogo entra (mesma lógica de "esconder a navbar" que o `Contact` já
faz em `Contact.tsx:104-110`).

**5.6 Respiro tipográfico entre grupos de projeto.**
Uma tela ocupada só por uma frase grande (28–32 px, `Space Grotesk`, peso 300) sobre
fundo levemente diferente — por exemplo o `subtitle` de cada era. Recria o efeito de
"capítulo" que no desktop vem da mudança de fundo/glow, sem animação cara.

**5.7 Ícones de tecnologia com rótulo.**
Grade de 3 colunas, ícone 20 px + nome em 11 px mono, cor `--text-body`. Resolve A9 e
transforma um enfeite invisível em informação.

---

## 6. Estratégia responsiva por faixas e capacidades

### 6.1 Faixas

| Faixa | Largura | Comportamento |
|---|---|---|
| Compacta | < 480 px | Layout mobile completo; tipografia e espaçamentos mínimos |
| Larga | 480–767 px | Mesmo layout; margens e tipografia um degrau acima |
| Tablet | 768–1023 px | **Layout mobile**, tipografia maior, largura de leitura limitada a ~640 px |
| Desktop | ≥ 1024 px | Experiência cinematográfica atual, intocada |

**Decisão central: unificar o corte em 1024 px.** Hoje `Contact` e `DevProcess` cortam em
768 e os demais em 1024 (A15). Alinhar todos em 1024 elimina o iPad retrato com pin de
400% e scroll horizontal dentro de uma página empilhada. **[Opinião]** Se você quiser
manter o epílogo cinematográfico no tablet, o caminho honesto é subir *tudo* para 768 —
mas aí o hero e a trajetória precisam de layout de tablet de verdade, o que é um projeto
maior. Recomendo 1024 para todos.

### 6.2 Capacidades, não só larguras

- `@media (hover: hover) and (pointer: fine)` para **todo** efeito de hover — o padrão já
  usado em `Avantis.tsx:218` e `Contact.tsx:319`, hoje ausente em `.btn-primary`,
  `.btn-secondary`, `.tech-tag`, `.link-underline` e nos `onMouseEnter` inline de
  `Navbar`, `Trajectory` e `ArchiveOverlay`.
- `@media (pointer: coarse)` para altura mínima de alvo (48 px) em botões e links de ação.
- `@media (prefers-reduced-motion: reduce)`: `animation: none`, `transition-duration:
  .01ms`, e um flag equivalente no JS (`gsap.matchMedia('(prefers-reduced-motion: reduce)')`)
  para não registrar as timelines de revelação.
- **`dvh` em vez de `vh` em qualquer altura de viewport.** `Hero` e `Contact` já usam
  `100dvh`, mas `Trajectory.tsx:209` (`window.innerHeight * 0.8`), `DevProcess.tsx:37`
  (`window.innerWidth`) e `FreelanceProjects` (`height: 100vh`, `250vh`) usam medidas
  fixas. São caminhos desktop, mas o `.epilogue-glow` com `90vw/90vh` e o watermark com
  `25vw` afetam o mobile.

### 6.3 Navegador embutido do Instagram / iOS Safari

Restrições reais dessa WebView, e o que fazer:

- **Barra de UI dinâmica:** usar `100dvh` (já é o caso no hero) e nunca `100vh` para
  conteúdo que precisa caber. Barra de ação inferior precisa de
  `padding-bottom: env(safe-area-inset-bottom)`.
- **Storage volátil:** o in-app não compartilha `localStorage` com o Safari e pode limpá-lo
  entre sessões. A preferência de idioma (`portfolio-lang`) não é confiável ali — o
  seletor visível resolve isso melhor do que qualquer heurística.
- **`backdrop-filter`:** custa caro em WebView antiga. Hoje aparece em `.glass-card`,
  `.tech-tag`, nos cards do `DevProcess` (desktop) e no `ArchiveOverlay` (`blur(30px)`,
  em tela cheia — o pior caso). Sugestão: no mobile, trocar por fundo sólido com
  transparência.
- **Recarregar é caro:** o reload do `ArchiveOverlay` (A7) é especialmente ruim aqui,
  porque a WebView não tem botão de voltar previsível.
- **Sem instalação/PWA:** o `site.webmanifest` vazio não atrapalha, mas o `theme_color`
  branco pinta a barra do Chrome Android de branco num site preto.
- **Limitação de teste:** não foi possível validar em device real dentro do app do
  Instagram nesta sessão — a emulação cobre viewport, touch e UA, não o motor da WebView.
  Ver matriz de testes (seção 10), linha "device real".

---

## 7. Performance

Prioridade por impacto medido:

1. **`marcilio-pose.png` — 698 KB.** Gerar AVIF + WebP em três larguras (400/800/1200) e
   servir via `<picture>` com `sizes`. Alvo ≤ 120 KB no mobile. **[Observado]** É 69% de
   todo o peso da página.
2. **`avantis-logo.png` — 200 KB para exibir 210×210.** Redimensionar para 420 px e
   converter. Alvo ≤ 25 KB. Adicionar `loading="lazy"` (está na tela 12).
3. **Dimensões e prioridade em todas as `<img>`.** `width`/`height` (previne shift futuro),
   `loading="lazy"` em tudo que não está no hero, `fetchpriority="high"` na imagem do hero
   se ela virar o LCP.
4. **Fontes.** Trocar o `@import` do CSS por `<link rel="preconnect">` +
   `<link rel="preload" as="style">` no `index.html` (remove um salto da cadeia). Reduzir
   Inter de 7 pesos para 3 (400/600/800) e Space Grotesk de 4 para 2 (500/700) — o site usa
   `font-weight` 300–900 de forma bem espalhada, então vale auditar antes. Manter
   `display=swap` e declarar `size-adjust` no fallback para reduzir o salto visual.
   **[Opinião]** Considerar self-host das duas famílias: elimina a dependência de dois
   domínios externos, que é justamente o que quebra primeiro em rede ruim.
5. **Code splitting.** `React.lazy` para `ArchiveOverlay` (só abre sob clique) e para
   `FreelanceProjects` (só existe com `?platform=`). Isso tira do caminho crítico o que a
   maioria nunca vê.
6. **Uma biblioteca de animação.** Framer-motion faz, hoje, `whileInView` e um `whileHover`
   — coisas que o GSAP já faz no mesmo arquivo. Remover a dependência reduz bundle e
   elimina duas engines de animação concorrendo pelo mesmo frame no mobile.
   **[Opinião]** Não medi a fatia exata no chunk de produção; medir antes de decidir.
7. **`public/icone-avantis-2.png` (1,6 MB) não é referenciado por nenhum componente.**
   Confirmar e remover do `public/`.

Nada disso toca a direção de arte: são os mesmos pixels, com menos bytes e melhor ordem
de chegada.

---

## 8. Acessibilidade e ergonomia mobile

| Item | Estado | Ação |
|---|---|---|
| Contraste do texto de corpo | 2,97:1 **[Observado]** | Escala nova (5.4) |
| Contraste dos rótulos de seção | 1,83:1 **[Observado]** | Accent mais claro para texto |
| Alvos de toque | 5 abaixo de 44 px **[Observado]** | Mínimo 48 px em `pointer: coarse` |
| `prefers-reduced-motion` | Sem nenhuma regra **[Observado]** | Envelope global CSS + JS |
| `lang` dinâmico | Fixo `pt-BR` **[Observado]** | `document.documentElement.lang` no provider |
| Foco visível | Não há `:focus-visible` em nenhum lugar **[Observado]** | Anel de 2 px no accent |
| Landmarks | `nav` + `main`, sem `footer` **[Observado]** | `<footer>` no epílogo |
| Skip link | Ausente **[Observado]** | "Pular para o conteúdo" |
| Rótulo de ícones | Só `title` **[Observado]** | Texto visível + `aria-label` |
| Zona do polegar | CTAs no topo/meio | Barra de ação inferior |
| Botão fechar do overlay | 34×40 px **[Observado]** | 48×48, com `aria-label` |
| Scroll aninhado no overlay | 416 px úteis **[Observado]** | Overlay em tela cheia no mobile |

---

## 9. Três direções possíveis

### Direção A — "Corte editorial do mesmo filme" *(recomendada)*

O mobile mantém a mesma narrativa, o mesmo conteúdo e a mesma identidade, mas com ritmo,
densidade e navegação redesenhados para sessão curta. Mudanças ficam contidas nos branches
mobile já existentes e em `@media`.

- **Prós:** preserva a filosofia do projeto e a fonte única de conteúdo; nenhuma linha do
  desktop é tocada; entregável em fatias pequenas e verificáveis; nada vira template.
- **Contras:** os branches mobile de `Trajectory`/`DevProcess` crescem (arquivos que já têm
  657 e 281 linhas); exige decisões de conteúdo suas (frases curtas de resultado por
  projeto); não reduz o total de seções, só o custo de cada uma.
- **Esforço:** médio.

### Direção B — "Rota curta + rota longa"

O mobile entrega uma versão condensada de 5–6 telas (hero, 3 projetos, contato) com um
"ver a jornada completa" que revela o resto. Duas rotas na mesma página.

- **Prós:** menor tempo até entender e agir; muito bom para o tráfego de Instagram.
- **Contras:** cria duas experiências para manter e duas hierarquias de conteúdo; o risco
  de a rota curta virar exatamente a landing page genérica que o projeto rejeita; a
  narrativa — que é o argumento central do portfólio — passa a ser opcional por padrão.
- **Esforço:** alto.

### Direção C — "Higiene, sem mudar a estrutura"

Corrigir só os defeitos: colisão do logo, contraste, alvos de toque, reload do arquivo,
breakpoint do tablet, peso das imagens, `prefers-reduced-motion`.

- **Prós:** barato, rápido, zero risco para a identidade; melhora medível imediata.
- **Contras:** não resolve o problema central — continuam 18,7 telas até o contato e 4
  telas até a primeira prova. O visitante do Instagram sai igual.
- **Esforço:** baixo.

### Recomendação

**Direção A, com a Direção C como primeira onda (P0).**

O raciocínio: os itens da C são defeitos objetivos, medidos, e alguns deles (contraste,
reload, tablet) prejudicam também quem vê no desktop ou no tablet — então valem por si,
independente do plano maior. Entregá-los primeiro dá ganho imediato e cria a base
(sistema de cor, envelope de motion, breakpoint unificado) sobre a qual o redesenho de
ritmo da A se apoia.

Descarto a B porque o valor do portfólio está na narrativa; transformá-la em conteúdo
opcional é abrir mão do argumento principal para ganhar segundos. A A alcança o mesmo
resultado prático — chegar rápido a projetos e contato — via **navegação persistente**,
não via amputação da história.

---

## 10. Backlog priorizado

Cada item é uma entrega pequena, independente e verificável.

### P0 — Defeitos e fundação (higiene)

| # | Entrega | Arquivos | Verificação |
|---|---|---|---|
| P0.1 | Reservar altura da navbar; hero sem colisão | `Navbar.tsx`, `Hero.tsx` | `getBoundingClientRect` do logo e do label não se intersectam em 360/390/430 |
| P0.2 | Unificar breakpoint em 1024 px | `Contact.tsx:32,114`, `DevProcess.tsx:26` | Em 768×1024, `#contato` < 1.500 px e `#processo` sem scroll horizontal |
| P0.3 | Escala de cor de texto acessível | `index.css` (tokens) | Todo texto ≥ 4,5:1 (≥ 3:1 se ≥ 24 px) no script de contraste |
| P0.4 | Alvos de toque ≥ 48 px em `pointer: coarse` | `index.css`, `Avantis.tsx`, `Trajectory.tsx`, `ArchiveOverlay.tsx` | Zero elementos `a/button` com lado < 44 px |
| P0.5 | Envelope `prefers-reduced-motion` (CSS + `gsap.matchMedia`) | `index.css`, hooks/componentes | Com a flag ligada: sem `animation`, sem transform residual, layout idêntico |
| P0.6 | Fechar o Arquivo sem recarregar | `ArchiveOverlay.tsx:67-70`, `Trajectory.tsx` | `scrollY` preservado após fechar; nenhuma requisição nova |
| P0.7 | Corrigir/remover as classes fantasma do Arquivo | `ArchiveOverlay.tsx` + CSS | `.archive-grid` com `display` intencional; overlay full-screen no mobile |
| P0.8 | Imagens: formatos, tamanhos, `width/height`, `lazy` | `public/`, `Hero.tsx`, `Avantis.tsx`, `AboutMe.tsx` | Peso total até o fim do hero ≤ 400 KB; CLS mantém 0 |
| P0.9 | Fontes: `preconnect`/`preload`, cortar pesos | `index.html`, `index.css` | Cadeia de fontes com 2 saltos; ≤ 40 KB de webfont |
| P0.10 | `lang` dinâmico + `<footer>` + skip link + `:focus-visible` | `useLanguage.tsx`, `Contact.tsx`, `index.css` | `document.documentElement.lang === 'en'` ao trocar idioma |

### P1 — Ritmo mobile (o coração da Direção A)

| # | Entrega | Verificação |
|---|---|---|
| P1.1 | Hero mobile em 1 `dvh` com foto integrada e CTA único | `#inicio` ≤ 1,05 × `innerHeight` em 360/390/430; foto visível na dobra |
| P1.2 | Barra de ação fixa (Projetos / Contato) com safe-area | Contato alcançável em 1 toque de qualquer posição após o hero |
| P1.3 | Cartão de projeto compacto + "ler a história" colapsável | `#projetos` ≤ 4 telas fechado; narrativa completa acessível |
| P1.4 | Hierarquia de links por projeto (1 primário + secundários) | No máximo 1 botão preenchido por projeto |
| P1.5 | Bloco "prova imediata" com 3 projetos logo após o hero | Primeiro projeto visível antes de 1,3 tela |
| P1.6 | Seletor de idioma PT/EN visível | Alternância funciona em todos os viewports |
| P1.7 | Reordenar o caso freelance no mobile (metadados antes da narrativa) | Nome do projeto aparece antes do "PROBLEMA" correspondente |
| P1.8 | Chips de era roláveis com colapso por grupo | Trajetória navegável sem rolar 10 telas |

### P2 — Refino e ganho marginal

| # | Entrega | Verificação |
|---|---|---|
| P2.1 | Respiros tipográficos entre grupos de projeto | Ritmo alternado; sem tela repetida 3× seguidas |
| P2.2 | Code splitting de `ArchiveOverlay` e `FreelanceProjects` | Chunk inicial reduzido; comportamento idêntico |
| P2.3 | Avaliar remoção do framer-motion | Bundle menor; animações mobile idênticas |
| P2.4 | Ícones de tecnologia com rótulo | Nome legível sem hover |
| P2.5 | Substituir `backdrop-filter` por sólido translúcido no mobile | Scroll sem queda de FPS em device real |
| P2.6 | `personalizedMessage` exibido (ou removido de `content.ts`) | Ou aparece, ou não existe código morto |
| P2.7 | `site.webmanifest` preenchido, `theme_color` escuro | Barra do navegador coerente |
| P2.8 | Limpar assets órfãos (`icone-avantis-2.png`, 1,6 MB) | `public/` sem arquivo não referenciado |
| P2.9 | Resolver a divergência `--accent` `#3F18AB` × `#6D4AFF` | Um único accent documentado |

---

## 11. Critérios de aceite e matriz de testes

### 11.1 Critérios de aceite (globais)

1. Em 360×800, 390×844 e 430×932: nenhum overflow horizontal; CLS ≤ 0,02; nenhum elemento
   `a`/`button` com lado < 44 px.
2. Todo texto atinge WCAG AA (4,5:1, ou 3:1 quando ≥ 24 px ou ≥ 18,66 px em peso ≥ 700).
3. O primeiro projeto real fica visível antes de 1,3 tela de scroll.
4. Contato acessível em ≤ 1 toque a partir de qualquer ponto após o hero.
5. Página total ≤ 10 telas na rota padrão; ≤ 12 com `?platform=`.
6. Em 4G lento + CPU 4×: LCP < 2,0 s, peso até o fim do hero ≤ 400 KB.
7. Com `prefers-reduced-motion: reduce`: nenhuma animação ativa, layout e conteúdo iguais.
8. Em ≥ 1024 px: **screenshots idênticos aos de hoje** em 8 posições de scroll (hero,
   sobre, trajetória ×3, avantis, processo, epílogo) — regressão zero no desktop.
9. `pnpm build` e `pnpm lint` sem erro novo.

### 11.2 Matriz de testes

| Cenário | 360×800 | 390×844 | 430×932 | 768×1024 | ≥1024 |
|---|---|---|---|---|---|
| Rota padrão, PT | ✓ | ✓ | ✓ | ✓ | ✓ |
| Rota padrão, EN | ✓ | — | — | — | ✓ |
| `?platform=workana` (PT) | ✓ | ✓ | — | ✓ | ✓ |
| `?platform=upwork` (EN por padrão) | — | ✓ | — | — | ✓ |
| `prefers-reduced-motion: reduce` | ✓ | ✓ | — | — | ✓ |
| `pointer: coarse` (sem hover) | ✓ | ✓ | ✓ | ✓ | — |
| Abrir/fechar o Arquivo Completo | ✓ | ✓ | — | ✓ | ✓ |
| 4G lento + CPU 4× | — | ✓ | — | — | — |
| Rotação retrato→paisagem | — | ✓ | — | ✓ | — |
| Troca de idioma com scroll no meio | — | ✓ | — | — | ✓ |
| **Device real no in-app do Instagram (iOS + Android)** | ✓ | ✓ | — | — | — |

Checagens técnicas por cenário: altura do documento, offsets de seção, overflow
horizontal, LCP/CLS, alvos de toque, contraste, erros de console, e screenshot comparativo.

> O script de auditoria usado nesta sessão (Puppeteer, três arquivos no scratchpad) cobre
> tudo acima exceto device real e rotação. Vale versioná-lo como
> `scripts/audit-mobile.ts` para virar checagem repetível — decisão sua, ver Pergunta 7.

---

## 12. Dúvidas que só você pode responder

1. **Frases de resultado por projeto.** O cartão compacto precisa de uma linha de ≤120
   caracteres por projeto, em PT e EN. Você escreve, ou prefere que eu proponha a partir
   das narrativas existentes para você editar?
2. **Objetivo primário da página.** Estágio/CLT, freelance, ou os dois com peso igual? Isso
   define o CTA do hero e o texto da barra de ação. Hoje o conteúdo oscila entre "estudante
   buscando estágio" e "freelancer com clientes".
3. **Canal de contato no mobile.** WhatsApp direto (maior conversão vindo do Instagram, mas
   expõe seu número), e-mail, ou LinkedIn? A barra fixa comporta um só.
4. **As estatísticas com `∞`** ("∞ bugs", "∞ vontade") — mantenho como voz autoral ou
   troco por números verificáveis? No mobile elas custam meia tela.
5. **Tablet.** Aceita que 768–1023 px receba o layout mobile com tipografia maior (minha
   recomendação), ou quer investir num layout de tablet próprio mais adiante?
6. **Accent.** `--accent` é `#3F18AB` no CSS, `CLAUDE.md` diz `#6D4AFF`. Qual é o oficial?
   O `#3F18AB` é o que causa o rótulo de seção com 1,83:1 de contraste.
7. **Auditoria versionada.** Quer o script de auditoria como `scripts/audit-mobile.ts` no
   repositório (roda contra o `preview` e cospe a matriz), ou prefere manter fora?
8. **Medição de comportamento.** As metas de "tempo até o primeiro toque" e "% que chega ao
   contato" exigem analytics. Aceita instrumentação leve (PostHog, que você já usa em outro
   projeto), ou prefere ficar só com as métricas estruturais (telas, peso, LCP)?
