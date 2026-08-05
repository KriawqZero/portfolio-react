# Imagens e vídeos de cases no portfolio — design

**Data:** 2026-07-30 · **Branch:** v3-i18n · **Status:** aguardando revisão do Marcilio

## Contexto e objetivo

O portfolio pessoal é hoje 100% tipografia + fundos procedurais — as únicas imagens reais são a foto do hero e os logos Avantis. O avantis-porfolio prova que screenshot real de case funciona: 1200×675 WebP (~40 KB), dado tipado, imagem como link vivo, contrato editorial embutido. Objetivo: trazer prova visual real dos projetos para o portfolio pessoal, sem quebrar a arquitetura de animação (GSAP + ScrollTrigger + Lenis) nem a regra de honestidade de texto público.

## Decisões tomadas (com o Marcilio, 2026-07-30)

1. **Projetos:** quase todos — no ar + clientes locais + produtos próprios + diferenciais técnicos. O que exigir passo manual (apps desktop, credenciais), o Marcilio participa.
2. **Formato:** prints padronizados 1200×675 WebP para todos + vídeo mudo em loop só em 2 fluxos-chave: booking do VamoAgendar e gameplay do voxel engine.
3. **Slots no site:** Trajectory vira visual (variante "moldura flutuante") + thumbnails no ArchiveOverlay. FreelanceProjects e seção nova estilo avantis ficam fora desta fase.
4. **Raízes (2019-2020):** sem imagem — moldura ausente, cena tipográfica atual preservada.
5. **Captura de locais:** o Marcilio sobe cada projeto local (comandos preparados pelo Claude, rodados via `!` na sessão); o Claude só captura. Exceção: estáticos sem setup (ex.: jogo_matematica) e sites no ar, que o Claude captura sozinho.

## Escopo de mídia

### Trajectory (moldura flutuante — 5 projetos)

| Projeto (era) | Mídia | Origem | Quem sobe |
|---|---|---|---|
| VamoAgendar (Superfície) | print + **vídeo booking** | vamoagendar.com.br (prod) | ninguém — está no ar |
| Catálogo do corretor (Superfície) | print | marciliobarbosacorretor.com.br (prod) | ninguém |
| SISCO (Superfície) | print | local (Laravel + Docker) | Marcilio |
| KyteApp dashboard (Infraestrutura) | print | **repos só no GitHub** — clonar scrapper-frontend (+api se preciso) | Marcilio |
| mine / voxel engine (Baixo Nível) | **vídeo** + poster | app desktop C++ — compilar e gravar tela | Marcilio grava (wf-recorder/OBS), Claude edita |

Raízes: sem mídia (decisão 4). mine_glModerno: sem mídia (incompleto, nota de rodapé do mine).

### ArchiveOverlay (thumbnails 320×180 — 5 projetos)

| Projeto | Origem | Quem sobe |
|---|---|---|
| Sushi do Verão | local (3 apps: api NestJS + front + admin) | Marcilio |
| Labirinto Geométrico | estático — abrir index.html | Claude sozinho |
| Storage Crates | in-game (`./gradlew runClient`) | Marcilio |
| Simple Machines | in-game (`./gradlew runClient`) | Marcilio |
| Portfolio Avantis | avantis.dev (prod) | ninguém |

### Capturados e guardados para fase 2 (sem slot nesta fase)

Milion Style (no ar, mas não citada no site pessoal), dashboard-pessoal (O Conselho), rotina, jarvis-automacoes, gerador de propostas (PDFs), chaveamento, app Expo do corretor (print via emulador). Ficam em `capturas/` (gitignored — são regeneráveis pelo pipeline). Integrá-los ao site exige escrever copy pt/en nova (rule de texto público) — trabalho de conteúdo próprio, fora desta fase.

## Modelo de dados (`src/data/content.ts`)

Campo opcional nos projetos das eras e nas entradas de archive, em `ptContent` e `enContent` (paths compartilhados, `alt` localizado):

```ts
media?: {
  image: string;    // "/cases/vamoagendar.webp" (1200×675) ou thumb 320×180 no archive
  alt: string;      // obrigatório, localizado
  video?: string;   // "/cases/vamoagendar.webm" — só nos 2 fluxos-chave
  poster?: string;  // obrigatório quando video existe
}
```

Comentário-contrato no topo do bloco (estilo avantis): *só entra print de UI real rodando; selo de link só em projeto no ar; nenhum número não verificável*. O CV não é afetado — `scripts/cv.content.ts` não consome `media`.

## Componente: moldura flutuante (desktop ≥1024px)

- Novo layer **absoluto** dentro do pin da Trajectory, entre o fundo `.era-visual` e as colunas. Nenhuma altura adicionada → o ScrollTrigger do pin (`end = +=70%*(N-1)`) **não é tocado**.
- Moldura de browser **custom em CSS** (barra mínima, três pontos, domínio real quando no ar — nada com cara de template/UI kit). Acento `#6D4AFF` apenas onde já é usado.
- Crossfade da moldura entra **no timeline scrubado existente** que já troca o card do projeto — um tween a mais por transição, sem reestruturar nada. Dentro do `gsap.context()` existente, sob `gsap.matchMedia()` desktop.
- Projeto com URL: moldura inteira é `<a target="_blank" rel="noopener">` com selo "Abrir ↗".
- Projeto com vídeo: `<video muted loop playsinline preload="none" poster>` — reproduz apenas enquanto é o projeto ativo (play/pause dirigido pela mesma timeline); `prefers-reduced-motion` → só o poster.
- Projeto sem mídia (Raízes): moldura em fade-out, cena idêntica à atual.
- Scrim sutil atrás da moldura para garantir contraste contra os era-visuals (histórico de correções WCAG do projeto).
- `<img>` com `width`/`height` explícitos (zero CLS), `loading="lazy"`, `decoding="async"`.

## Mobile (<1024px)

Print entra como bloco normal no card do layout vertical próprio da Trajectory, com `width`/`height` explícitos e lazy. **Adiciona altura à seção no mobile** e desloca triggers seguintes — coberto pelo `ScrollTrigger.refresh()` debounced existente (aviso registrado conforme CLAUDE.md). Vídeo não reproduz no mobile: poster estático (economia de dados).

## ArchiveOverlay

Thumbnail 320×180 WebP (~10 KB) por linha que tiver `media`, lazy. Overlay está fora do fluxo de scroll — zero interação com ScrollTrigger.

## Pipeline de captura (`scripts/capture/`)

- `manifest.ts`: slug → `{ origem: 'url' | 'local', endereco, paginas, viewport: 1200×675, saida }`.
- `capturar.ts`: Puppeteer (mesma dependência do gerador de CV) — abre página, aguarda `document.fonts.ready` + rede ociosa, screenshot PNG → WebP via ffmpeg (q≈80) → `public/cases/<slug>.webp` (+ variante 320×180 para archive). Comando: `pnpm capture <slug>`. Refazível quando a UI mudar.
- **Vídeo VamoAgendar:** fluxo de booking roteirizado no Puppeteer (cliques scriptados), frames via CDP screencast, montagem ffmpeg → WebM VP9 mudo, 10-15 s, ≤3 MB, + poster WebP.
- **Vídeo voxel:** Marcilio compila/roda e grava a tela no Sway (`wf-recorder` — não instalado, `sudo dnf install wf-recorder` — ou OBS); Claude corta/comprime com ffmpeg (mesmo alvo: WebM ≤3 MB + poster).
- **Locais:** bloco de comandos pronto por projeto (docker compose, seed, porta), Marcilio roda via `!`, Claude captura, avisa para derrubar.
- Dados de seed visíveis nos prints: plausíveis e genéricos — **nunca números fake que pareçam métrica real de cliente**.

## Performance e acessibilidade

- Orçamento: ~10 prints (5×1200×675 ≈ 40-60 KB + 5 thumbs ≈ 10 KB) todos lazy ≈ **~350 KB no pior caso**, carregados só quando a seção se aproxima; 2 vídeos ≤3 MB com `preload="none"` — só baixam no desktop quando o projeto fica ativo.
- Zero CLS por construção (`width`/`height` explícitos em toda mídia).
- `alt` obrigatório em pt e en.
- `prefers-reduced-motion`: vídeo nunca autoreproduz; crossfades respeitam o interruptor já existente.

## Regra editorial (vale para toda mídia futura)

1. Só entra print/vídeo de UI real rodando — nada de mockup fabricado.
2. Selo "Abrir ↗" exclusivo de projeto no ar e acessível.
3. Sistema local não alega produção; o card narra o contexto real.
4. Nenhum número no screenshot que pareça métrica real sem ser.

## Fora de escopo (fase 2)

- Imagens na FreelanceProjects e seção nova estilo avantis.
- Novos projetos no conteúdo (dashboard-pessoal, jarvis, rotina, gerador, chaveamento, Milion) — exigem copy pt/en nova.
- Gravação do app Expo (emulador Android).

## Riscos e avisos

- **Altura no mobile** (Trajectory): deslocamento de triggers coberto pelo refresh debounced — validar manualmente após implementação.
- **KyteApp:** repos fora do disco; clone + env necessários — pode não valer o custo se o env for complexo; decisão na hora com o Marcilio.
- **Contraste** moldura × era-visual: scrim obrigatório, validar WCAG AA.
- **Peso dos vídeos:** teto duro de 3 MB cada; se a compressão não alcançar, corta duração antes de subir qualidade.
