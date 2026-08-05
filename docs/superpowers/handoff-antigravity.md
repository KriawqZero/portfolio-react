# Prompt de handoff — imagens e vídeos de cases no portfolio

Você está assumindo um trabalho em andamento no repositório `/mnt/Files/Projetos/portfolio-react` (branch `v3-i18n`), do dev Marcilio Ortiz. O planejamento está 100% concluído e commitado; **nenhuma linha de implementação foi escrita ainda**. Sua missão é executar o plano.

## A missão

O portfolio pessoal (SPA React 19 + Vite 7 + TS, animações GSAP/ScrollTrigger/Lenis) é hoje 100% tipografia — nenhum projeto tem screenshot. O objetivo é adicionar **prova visual real**: screenshots 1200×675 WebP e 2 vídeos WebM dos projetos do Marcilio, no padrão que já funcionou no repo de referência `~/Files/Projetos/avantis-porfolio` (ver `src/data/cases.ts` + `src/components/Prova.tsx` + `public/cases/*.webp` lá — imagem como prova clicável, ~40 KB cada, contrato editorial embutido).

## Leia antes de qualquer coisa (ordem)

1. `CLAUDE.md` do repo — regras invioláveis: **pnpm sempre**, zero bibliotecas de UI, acento único `#6D4AFF`, `src/data/content.ts` é a única fonte de copy (pt/en em paralelo), **animações são produto** (nunca simplificar/remover GSAP existente), propor mudança visual antes de implementar, avisar quando altura afetar ScrollTrigger pinado.
2. `docs/superpowers/specs/2026-07-30-imagens-cases-design.md` — a spec de design, **aprovada pelo Marcilio seção por seção**. Não rediscutir o que está nela.
3. `docs/superpowers/plans/2026-08-02-imagens-cases.md` — o plano de implementação com **9 tasks em ordem de dependência, com código pronto, comandos de verificação e commit por task**. É o seu roteiro de execução literal.

## Decisões já tomadas com o Marcilio (não re-perguntar)

- **Layout:** moldura de browser flutuante (CSS custom, sem cara de template) como coluna central dentro da cena pinada da Trajectory (desktop); crossfade sincronizado no timeline scrubado existente; imagem clicável com selo "Abrir ↗" quando o projeto está no ar. No mobile, print como bloco normal no card. Thumbnails 320×180 nas linhas expandidas do ArchiveOverlay.
- **Formato:** print para todos; vídeo mudo em loop APENAS em 2 fluxos: booking do VamoAgendar e gameplay do voxel engine (mine, C++).
- **Raízes (projetos de 2019-2020: bankkp, musicplayer, cronometer, vbmod):** SEM imagem — a moldura simplesmente não aparece, cena tipográfica preservada.
- **Captura de projetos locais:** o Marcilio sobe cada projeto (você prepara os blocos de comandos; ele roda), você só captura. Exceções que você faz sozinho: sites no ar e estáticos sem setup (jogo_matematica via `file://`).
- **Escopo desta fase:** Trajectory (5 projetos: VamoAgendar, Catálogo corretor, SISCO, KyteApp, mine) + Archive (5 thumbs: Sushi, jogo, 2 mods, avantis.dev). Milion Style, dashboard-pessoal, jarvis, rotina, gerador de propostas, chaveamento = **fase 2**: capturar oportunisticamente para `capturas/` (gitignored), NÃO integrar no site.
- **Regra editorial (dura):** só print/vídeo de UI real rodando; nenhum mockup fabricado; nenhum número no screenshot que pareça métrica real sem ser; selo "Abrir ↗" exclusivo de quem está no ar; sistema local não alega produção.

## Fatos técnicos que economizam seu tempo

- `useLanguage.tsx:11` tipa `t: typeof ptContent` — todo campo `media` precisa existir **nos dois idiomas no mesmo projeto** (alt localizado, paths iguais) ou o build quebra.
- `puppeteer` (v25, tem `page.screencast()` nativo → WebM) e `sharp` **já são devDependencies** — o pipeline de captura reusa isso; siga o idioma de `scripts/optimize-images.ts` e `scripts/generate-cv.ts` (nomes/comentários em PT).
- `ffmpeg 7.1.5` instalado na máquina; `grim`/`slurp` instalados; `wf-recorder` **NÃO** instalado (o Marcilio instala com `sudo dnf install wf-recorder` quando for gravar o voxel; Fedora + Sway/Wayland).
- ScrollTrigger `trajectory-pin` (`Trajectory.tsx` ~linha 63): `start: 'top top'`, `end: +=70%*(N-1)`, `pin: true`, `scrub: 1` — **intocável byte a byte**. A moldura entra como coluna nova no grid interno (100dvh fixo, zero altura nova) e crossfada com tweens adicionados na mesma position `i` dos panels.
- Os wrappers `.traj-shot` devem existir **para todo projeto, mesmo sem media** (vazios), para manter o índice alinhado com `.traj-panel` no timeline.
- Altura extra no mobile é esperada e coberta pelo `ScrollTrigger.refresh()` debounced do `App.tsx` — mas valide visualmente.
- `ArchiveOverlay` fecha com hard reload da página (fix pragmático existente, linha ~69) — não "conserte" isso.
- Repos do KyteApp (scrapper-frontend/api/scrapper) **não estão no disco**, só no GitHub (KriawqZero). Task 9 decide com o Marcilio se vale clonar; se não, o projeto fica sem moldura (o wrapper vazio cobre).
- Working tree tem modificações **pré-existentes e não relacionadas** em `scripts/cv.content.ts`, `scripts/generate-cv.ts`, `scripts/templates/*` e arquivos novos `scripts/cv.*.content.ts` — NÃO commitar junto, não tocar.

## Estado atual exato

- Commitados na `v3-i18n`: spec (`a73fe5a`… ver `git log`) e plano (`cecdd31`).
- Nada do plano executado: não existem `scripts/capture/`, `src/components/CaseFrame.tsx`, `public/cases/`, campo `media` no content.ts, nem mudanças em `Trajectory.tsx`/`ArchiveOverlay.tsx`.

## O que falta (as 9 tasks do plano, resumo)

1. **Pipeline** — `scripts/capture/manifesto.ts` + `capturar.ts` (Puppeteer→sharp, `pnpm capture <slug|all>`, saída em `capturas/` gitignored). Verificar capturando avantis.dev.
2. **Capturas autônomas** — vamoagendar.com.br, marciliobarbosacorretor.com.br, avantis.dev (thumb), jogo_matematica (file://); inspecionar e publicar em `public/cases/`.
3. **`media` no content.ts** — tipo + contrato + entradas pt/en dos assets existentes; `trajectory.openText` ('Abrir'/'Open').
4. **`CaseFrame.tsx`** — moldura de browser custom (barra com domínio, img ou `<video muted loop playsinline preload="none">`, selo Abrir ↗, `<a>` quando `url`).
5. **Trajectory desktop** — grid `'0.85fr 1fr 1.05fr'`, coluna central `.traj-shot`, estados iniciais + tweens na position `i`, pointerEvents e play/pause de vídeo no `onUpdate`, `useReducedMotion` (framer-motion, já é dep). Verificação visual obrigatória no `pnpm dev`.
6. **Trajectory mobile** — `<img>` com width/height explícitos no topo do card.
7. **ArchiveOverlay** — `media?` no `ProjectItem`, thumb 320×180 na linha expandida.
8. **Vídeo booking** — reconhecimento manual do fluxo público do VamoAgendar (mapear seletores; **não confirmar agendamento real em produção** — usar perfil de demonstração do Marcilio), `gravar-vamoagendar.ts` (screencast), ffmpeg VP9 ≤3 MB, `video`/`poster` no content.
9. **Sessões assistidas com o Marcilio** — SISCO (docker+seed), Sushi (api+front), KyteApp (decisão na hora), mods (screenshot in-game F2 → sharp 320×180), voxel (ele compila/grava com wf-recorder, você edita com ffmpeg → `mine.webm` ≤3 MB + poster). Um commit por projeto integrado.

O plano tem o código completo de cada arquivo, os comandos exatos, os textos de `alt` pt/en e os critérios de aceite — siga-o task a task, na ordem.

## Como trabalhar com o Marcilio

- Responder sempre em **PT-BR**; commits descritivos em português.
- Justificar decisões (porquê + trade-offs); discordar com fundamento quando ele estiver errado; zero floreio.
- Nunca afirmar que build/lint passou sem mostrar o output real.
- Mudança visual não prevista na spec → propor antes de implementar.
- Nas tasks assistidas, entregar o bloco de comandos pronto e esperar ele rodar (na sessão dele, comandos com prefixo `!` rodam direto no chat).
- Texto que humano vai ler (alt, copy): honesto e sem cara de IA; nunca inflar experiência.
- Verificação por task: `pnpm build` + `pnpm lint` + checagem visual no `pnpm dev` (o repo NÃO tem suite de testes).
