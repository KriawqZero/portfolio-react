# Imagens e vídeos de cases — Plano de Implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar prova visual real (screenshots 1200×675 WebP + 2 vídeos WebM) aos projetos da Trajectory (moldura flutuante no pin desktop, bloco de imagem no mobile) e thumbnails ao ArchiveOverlay, com pipeline de captura reproduzível.

**Architecture:** Pipeline `scripts/capture/` (Puppeteer + sharp, mesmas deps do CV/hero) gera WebP em `capturas/` (staging gitignored); o que integra no site é copiado para `public/cases/`. `content.ts` ganha campo `media` por projeto (pt/en em paridade). `Trajectory.tsx` ganha uma coluna central de molduras que crossfadam no timeline scrubado existente — **o ScrollTrigger do pin não é alterado**. Spec aprovada: `docs/superpowers/specs/2026-07-30-imagens-cases-design.md`.

**Tech Stack:** React 19 + Vite 7 + TS, GSAP/ScrollTrigger (timeline existente), Puppeteer 25 (`page.screencast()` para vídeo), sharp (WebP), ffmpeg 7 (compressão VP9).

## Global Constraints

- `pnpm` SEMPRE — nunca npm/yarn.
- Acento único `#6D4AFF` (`var(--accent)`); nenhuma cor nova.
- Zero bibliotecas de UI; CSS custom inline (idioma do codebase: estilos inline nos componentes).
- GSAP: tudo dentro do `gsap.matchMedia()`/cleanup existentes; **não** simplificar/remover animações existentes; **não** tocar em `start`/`end`/`pin` do trigger `trajectory-pin`.
- `src/data/content.ts` é a única fonte de copy; `ptContent` e `enContent` em paridade estrutural (`t: typeof ptContent` em `useLanguage.tsx:11` quebra o build se divergirem).
- Prints: 1200×675 WebP q82 (~40-60 KB). Thumbs: 320×180. Vídeos: WebM VP9 mudos ≤3 MB.
- `alt` obrigatório e localizado (pt/en) em toda mídia.
- Regra editorial: só UI real rodando; sem números fake que pareçam métrica; selo "Abrir ↗" só em projeto no ar.
- Repo **não tem suite de testes** (CLAUDE.md). Verificação por task = `pnpm build` + `pnpm lint` + asserções de arquivo por script + checagem visual no `pnpm dev`.
- Commits descritivos em português.

## File Structure

| Arquivo | Responsabilidade |
|---|---|
| Create `scripts/capture/manifesto.ts` | Lista tipada de capturas (slug → origem → atraso) |
| Create `scripts/capture/capturar.ts` | CLI `pnpm capture <slug\|all>`: Puppeteer → sharp → `capturas/<slug>.webp` + `<slug>-thumb.webp` |
| Create `scripts/capture/gravar-vamoagendar.ts` | Screencast roteirizado do fluxo de booking |
| Modify `package.json` | script `"capture"` |
| Modify `.gitignore` | `capturas/` |
| Modify `src/data/content.ts` | Campo `media` (+`openText` na trajectory) pt+en, comentário-contrato |
| Create `src/components/CaseFrame.tsx` | Moldura de browser custom (img ou vídeo, selo Abrir ↗) |
| Modify `src/components/Trajectory.tsx` | Coluna central de molduras, tweens, play/pause de vídeo, img no mobile |
| Modify `src/components/ArchiveOverlay.tsx` | Thumb 320×180 na linha expandida |

---

### Task 1: Pipeline de captura

**Files:**
- Create: `scripts/capture/manifesto.ts`
- Create: `scripts/capture/capturar.ts`
- Modify: `package.json` (bloco `scripts`)
- Modify: `.gitignore`

**Interfaces:**
- Produces: tipo `Captura { slug: string; origem: string; atrasoMs?: number }`, array `CAPTURAS`, CLI `pnpm capture <slug|all>` que grava `capturas/<slug>.webp` (1200×675) e `capturas/<slug>-thumb.webp` (320×180).

- [ ] **Step 1: Escrever `scripts/capture/manifesto.ts`**

```ts
/**
 * Manifesto de capturas de tela dos cases.
 *
 * Contrato editorial (mesmo do avantis-porfolio): só entra print de UI real
 * rodando — produção quando existe, localhost quando não. Nenhum mockup
 * fabricado. A captura grava em ./capturas/ (staging, fora do git); o que
 * integra o site é copiado manualmente para public/cases/.
 *
 * Origens localhost exigem o projeto de pé antes de rodar (ver bloco de
 * comandos por projeto no plano). atrasoMs cobre animações de entrada.
 */
export interface Captura {
  slug: string
  origem: string
  /** Espera extra após networkidle para animações de entrada. Default 2500. */
  atrasoMs?: number
}

export const CAPTURAS: Captura[] = [
  // ── No ar (captura autônoma) ─────────────────────────────────────────
  { slug: 'vamoagendar', origem: 'https://vamoagendar.com.br/' },
  { slug: 'catalogo-corretor', origem: 'https://marciliobarbosacorretor.com.br/' },
  { slug: 'avantis', origem: 'https://avantis.dev' },
  // ── Estático em disco (captura autônoma) ─────────────────────────────
  { slug: 'jogo-matematica', origem: 'file:///home/marcilio/Files/Projetos/jogo_matematica/index.html' },
  // ── Locais (subir com o Marcilio antes de capturar) ──────────────────
  { slug: 'sisco', origem: 'http://localhost:8000' },
  { slug: 'kyteapp', origem: 'http://localhost:3000' },
  { slug: 'sushi-verao', origem: 'http://localhost:3001' },
  // ── Fase 2 (captura oportunista, fica em capturas/) ──────────────────
  { slug: 'milion', origem: 'https://milion.marciliortiz.dev.br' },
]
```

- [ ] **Step 2: Escrever `scripts/capture/capturar.ts`**

```ts
import puppeteer from 'puppeteer'
import sharp from 'sharp'
import { mkdirSync } from 'fs'
import { resolve } from 'path'
import { CAPTURAS, type Captura } from './manifesto'

/**
 * Captura screenshots padronizados dos cases: 1200×675 (moldura da Trajectory)
 * e 320×180 (thumb do Archive), ambos WebP. Reproduzível: quando a UI de um
 * projeto mudar, rode de novo e o print se atualiza.
 *
 * Uso: pnpm capture <slug|all>
 */

const SAIDA = resolve(process.cwd(), 'capturas')
const LARGURA = 1200
const ALTURA = 675
const QUALIDADE = 82

async function capturar(item: Captura) {
  const browser = await puppeteer.launch({ headless: true })
  try {
    const page = await browser.newPage()
    await page.setViewport({ width: LARGURA, height: ALTURA, deviceScaleFactor: 1 })
    await page.goto(item.origem, { waitUntil: 'networkidle0', timeout: 60_000 })
    await page.evaluate(() => document.fonts.ready)
    await new Promise(r => setTimeout(r, item.atrasoMs ?? 2500))

    const png = await page.screenshot({ type: 'png' })

    const cheio = resolve(SAIDA, `${item.slug}.webp`)
    const thumb = resolve(SAIDA, `${item.slug}-thumb.webp`)
    await sharp(png).webp({ quality: QUALIDADE, effort: 6 }).toFile(cheio)
    await sharp(png).resize(320, 180).webp({ quality: QUALIDADE, effort: 6 }).toFile(thumb)

    const meta = await sharp(cheio).metadata()
    console.log(`✓ ${item.slug}: ${meta.width}x${meta.height} → ${cheio}`)
    if (meta.width !== LARGURA || meta.height !== ALTURA) {
      throw new Error(`Dimensões inesperadas em ${item.slug}: ${meta.width}x${meta.height}`)
    }
  } finally {
    await browser.close()
  }
}

async function main() {
  const alvo = process.argv[2]
  if (!alvo) {
    console.error(`Uso: pnpm capture <slug|all>\nSlugs: ${CAPTURAS.map(c => c.slug).join(', ')}`)
    process.exit(1)
  }
  mkdirSync(SAIDA, { recursive: true })
  const fila = alvo === 'all' ? CAPTURAS : CAPTURAS.filter(c => c.slug === alvo)
  if (fila.length === 0) {
    console.error(`Slug desconhecido: ${alvo}`)
    process.exit(1)
  }
  for (const item of fila) await capturar(item)
}

main().catch(err => { console.error(err); process.exit(1) })
```

- [ ] **Step 3: Registrar o script e o gitignore**

Em `package.json`, dentro de `"scripts"`, após `"img:gen"`:

```json
"capture": "tsx scripts/capture/capturar.ts"
```

Em `.gitignore`, adicionar linha:

```
capturas/
```

- [ ] **Step 4: Verificar com uma captura real**

Run: `pnpm capture avantis`
Expected: `✓ avantis: 1200x675 → .../capturas/avantis.webp` e os dois arquivos existem:
`ls -la capturas/avantis.webp capturas/avantis-thumb.webp` → tamanhos ~30-80 KB e ~5-15 KB.

- [ ] **Step 5: Lint e commit**

Run: `pnpm lint` — Expected: sem erros novos (scripts/ segue o padrão do eslint.config.js existente; se `scripts/` estiver fora do escopo do lint, apenas confirmar que não passou a ser incluído).

```bash
git add scripts/capture/manifesto.ts scripts/capture/capturar.ts package.json .gitignore
git commit -m "feat: pipeline de captura de screenshots dos cases (puppeteer + sharp)"
```

---

### Task 2: Capturas autônomas e publicação em public/cases/

**Files:**
- Create (gerados): `public/cases/vamoagendar.webp`, `public/cases/catalogo-corretor.webp`, `public/cases/thumbs/avantis.webp`, `public/cases/thumbs/jogo-matematica.webp`

**Interfaces:**
- Consumes: CLI da Task 1.
- Produces: os 4 arquivos acima, nos caminhos exatos que a Task 3 grava no `content.ts`.

- [ ] **Step 1: Capturar os alvos autônomos**

Run: `pnpm capture vamoagendar && pnpm capture catalogo-corretor && pnpm capture avantis && pnpm capture jogo-matematica`
Expected: 4 linhas `✓ ... 1200x675`. Se algum site no ar renderizar cookie-banner/estado vazio, ajustar `atrasoMs` ou navegar para uma rota mais representativa no `manifesto.ts` (ex.: página de agenda pública no VamoAgendar) e recapturar.

- [ ] **Step 2: Inspecionar visualmente**

Abrir cada `capturas/*.webp` (Read tool/visualizador). Critério: UI legível, sem estado de loading, sem dados que pareçam métrica fake. Se ruim, ajustar manifesto e repetir Step 1.

- [ ] **Step 3: Publicar os aprovados**

```bash
mkdir -p public/cases/thumbs
cp capturas/vamoagendar.webp public/cases/vamoagendar.webp
cp capturas/catalogo-corretor.webp public/cases/catalogo-corretor.webp
cp capturas/avantis-thumb.webp public/cases/thumbs/avantis.webp
cp capturas/jogo-matematica-thumb.webp public/cases/thumbs/jogo-matematica.webp
```

- [ ] **Step 4: Verificar pesos**

Run: `du -h public/cases/*.webp public/cases/thumbs/*.webp`
Expected: cheios ≤ 80 KB cada, thumbs ≤ 15 KB cada. Acima disso: reduzir `QUALIDADE` para 75 no `capturar.ts` e recapturar.

- [ ] **Step 5: Commit**

```bash
git add public/cases
git commit -m "feat: screenshots reais dos cases no ar (vamoagendar, corretor, avantis, jogo)"
```

---

### Task 3: Campo `media` no content.ts (pt + en)

**Files:**
- Modify: `src/data/content.ts` (trajectory pt ~linhas 36-174, archive pt ~176-230, espelhos en a partir da ~439)

**Interfaces:**
- Produces: shape `media: { image: string; alt: string; url?: string; video?: string; poster?: string }` nos projetos de era; `media: { image: string; alt: string }` nas entradas de archive; campo `trajectory.openText: string`. Tasks 4-7 consomem exatamente esses nomes.

- [ ] **Step 1: Comentário-contrato + `openText` (pt e en)**

Em `ptContent.trajectory`, após `scrollText: 'role para avançar',` (linha ~41), adicionar:

```ts
    openText: 'Abrir',
    /**
     * media por projeto — contrato editorial:
     * só entra print/vídeo de UI real rodando (produção ou localhost).
     * `url` só quando o projeto está no ar e abre para qualquer visitante.
     * `alt` obrigatório e localizado. Paths compartilhados entre pt/en.
     */
```

No espelho `enContent.trajectory` (mesma posição relativa): `openText: 'Open',` (sem repetir o comentário).

- [ ] **Step 2: `media` nos dois projetos com asset (pt)**

No projeto `VamoAgendar` (ptContent, após `stat`, linha ~78):

```ts
            media: {
              image: '/cases/vamoagendar.webp',
              alt: 'Tela do VamoAgendar em produção: seleção de serviço e horários livres calculados pelo motor temporal',
              url: 'https://vamoagendar.com.br/',
            },
```

No projeto `Catálogo & App Imobiliário` (ptContent, após `stat`, linha ~60):

```ts
            media: {
              image: '/cases/catalogo-corretor.webp',
              alt: 'Site do catálogo imobiliário em produção, com imóveis anunciados a partir de fotos e áudios enviados pelo app',
              url: 'https://marciliobarbosacorretor.com.br/',
            },
```

- [ ] **Step 3: `media` nas entradas de archive com thumb (pt)**

Em `archive[4]` (Portfolio Avantis), após `links`:

```ts
      media: { image: '/cases/thumbs/avantis.webp', alt: 'Landing page da Avantis no ar' },
```

Em `archive[1]` (Labirinto Geométrico), após `links`:

```ts
      media: { image: '/cases/thumbs/jogo-matematica.webp', alt: 'Labirinto Geométrico rodando no navegador, com fog of war em Canvas' },
```

- [ ] **Step 4: Espelhar tudo em `enContent`**

Mesmos objetos `media` nos mesmos projetos/entradas do `enContent`, com `alt` traduzido:
- VamoAgendar: `'VamoAgendar in production: service selection and free slots computed by the temporal engine'`
- Catálogo: `'Real-estate catalog site in production, with listings generated from photos and voice notes sent via the app'`
- Portfolio Avantis: `'Avantis landing page, live'`
- Labirinto: `'Geometric Maze running in the browser, with Canvas fog of war'`

- [ ] **Step 5: Verificar build (paridade de tipos)**

Run: `pnpm build`
Expected: sucesso. Se `useLanguage.tsx:53` acusar incompatibilidade `enContent` vs `typeof ptContent`, a causa é assimetria — conferir que cada `media` existe nos DOIS idiomas no MESMO projeto, com as mesmas chaves.

- [ ] **Step 6: Commit**

```bash
git add src/data/content.ts
git commit -m "feat: campo media nos cases da trajetória e do arquivo (pt/en)"
```

---

### Task 4: Componente CaseFrame

**Files:**
- Create: `src/components/CaseFrame.tsx`

**Interfaces:**
- Consumes: shape `media` da Task 3.
- Produces: `CaseFrame({ media, openLabel, projectIndex, allowVideo })` — moldura completa; `<video>` (quando houver) com `data-project-index={projectIndex}` e classe implícita via DOM (`.traj-shot video`) usados pela Task 5 para play/pause.

- [ ] **Step 1: Escrever o componente**

```tsx
interface CaseMedia {
  image: string
  alt: string
  url?: string
  video?: string
  poster?: string
}

interface CaseFrameProps {
  media: CaseMedia
  openLabel: string
  /** Índice do projeto no flatten da Trajectory — usado para play/pause do vídeo via timeline. */
  projectIndex: number
  /** false quando prefers-reduced-motion: renderiza poster estático no lugar do vídeo. */
  allowVideo: boolean
}

/**
 * Moldura de browser minimalista para o screenshot/vídeo do projeto ativo.
 * CSS custom inline (idioma do projeto). A moldura inteira vira link quando o
 * projeto está no ar — selo "Abrir ↗" reforça que é prova viva, não decoração.
 */
export default function CaseFrame({ media, openLabel, projectIndex, allowVideo }: CaseFrameProps) {
  const dominio = media.url ? new URL(media.url).hostname : null
  const mostraVideo = Boolean(media.video && allowVideo)

  const conteudo = (
    <div
      style={{
        width: '100%',
        borderRadius: '14px',
        overflow: 'hidden',
        border: '1px solid var(--glass-border)',
        background: 'rgba(10, 10, 14, 0.85)',
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.55)',
        position: 'relative',
      }}
    >
      {/* Barra do browser */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.6rem 0.9rem',
          borderBottom: '1px solid var(--glass-border)',
          background: 'rgba(255, 255, 255, 0.02)',
        }}
      >
        {[0, 1, 2].map(i => (
          <span key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
        ))}
        {dominio && (
          <span
            style={{
              marginLeft: '0.75rem',
              fontFamily: 'monospace',
              fontSize: '11px',
              color: 'var(--text-body)',
              letterSpacing: '0.02em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {dominio}
          </span>
        )}
      </div>

      {mostraVideo ? (
        <video
          src={media.video}
          poster={media.poster ?? media.image}
          muted
          loop
          playsInline
          preload="none"
          width={1200}
          height={675}
          data-project-index={projectIndex}
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
      ) : (
        <img
          src={media.image}
          alt={media.alt}
          width={1200}
          height={675}
          loading="lazy"
          decoding="async"
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
      )}

      {media.url && (
        <span
          style={{
            position: 'absolute',
            right: '0.75rem',
            bottom: '0.75rem',
            padding: '0.35rem 0.75rem',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-primary)',
            background: 'rgba(2, 2, 3, 0.7)',
            border: '1px solid var(--glass-border)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {openLabel} ↗
        </span>
      )}
    </div>
  )

  if (media.url) {
    return (
      <a
        href={media.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${openLabel}: ${media.alt}`}
        style={{ display: 'block', width: '100%', textDecoration: 'none' }}
      >
        {conteudo}
      </a>
    )
  }
  return conteudo
}
```

- [ ] **Step 2: Verificar build e lint**

Run: `pnpm build && pnpm lint`
Expected: sucesso (componente ainda não é usado — apenas compila).

- [ ] **Step 3: Commit**

```bash
git add src/components/CaseFrame.tsx
git commit -m "feat: componente CaseFrame (moldura de browser para prova visual)"
```

---

### Task 5: Trajectory desktop — coluna de molduras no pin

**Files:**
- Modify: `src/components/Trajectory.tsx` (grid linha ~431, timeline linhas ~41-171, onUpdate linhas ~71-115, JSX colunas linhas ~430-651)

**Interfaces:**
- Consumes: `CaseFrame` (Task 4), `media`/`openText` (Task 3).
- Produces: classe `.traj-shot` (um wrapper absoluto por projeto, mesmo sem media, para manter o índice alinhado com `.traj-panel`).

**Restrição dura:** o objeto `scrollTrigger` (id `trajectory-pin`, `start`, `end`, `pin`, `scrub`) permanece byte a byte como está.

- [ ] **Step 1: Imports e reduced motion**

No topo do arquivo: trocar `import { motion } from 'framer-motion'` por `import { motion, useReducedMotion } from 'framer-motion'` e adicionar `import CaseFrame from './CaseFrame'`. Dentro do componente, após `const activeEraIdRef = useRef('surface')`:

```ts
  const lastActiveIndexRef = useRef(0)
  const reducedMotion = useReducedMotion()
```

- [ ] **Step 2: Grid de 2 → 3 colunas**

Linha ~431, trocar:

```ts
gridTemplateColumns: '1fr 1.2fr', gap: '8rem'
```

por:

```ts
gridTemplateColumns: '0.85fr 1fr 1.05fr', gap: '3.5rem'
```

Isso muda proporções DENTRO do viewport pinado (100dvh) — nenhuma altura nova, pin intacto. (Aviso da spec já aprovado pelo Marcilio.)

- [ ] **Step 3: Inserir a coluna central (entre a coluna esquerda e a `parallax-fg`)**

Após o `</div>` que fecha a coluna esquerda (linha ~571) e antes de `{/* Coluna Direita: Painéis de Projeto */}`:

```tsx
            {/* Coluna Central: Prova visual (moldura por projeto, crossfade no timeline) */}
            <div style={{ position: 'relative', height: '60vh', width: '100%' }}>
              {allProjects.map((project, i) => (
                <div
                  key={project.name}
                  className="traj-shot"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    willChange: 'transform, opacity',
                  }}
                >
                  {'media' in project && project.media && (
                    <CaseFrame
                      media={project.media}
                      openLabel={data.openText}
                      projectIndex={i}
                      allowVideo={isDesktop && !reducedMotion}
                    />
                  )}
                </div>
              ))}
            </div>
```

Wrapper vazio para projeto sem `media` (Raízes) é intencional: mantém `shots[i]` alinhado com `panels[i]` no timeline.

- [ ] **Step 4: Estados iniciais dos shots**

No callback de `mm.add('(min-width: 1024px)', ...)`, junto aos outros `gsap.utils.toArray` (linha ~44):

```ts
      const shots = gsap.utils.toArray('.traj-shot') as HTMLElement[]
```

Após o bloco de estados iniciais dos `panels` (linha ~53):

```ts
      shots.forEach((shot, i) => {
        if (i > 0) {
          gsap.set(shot, { y: 60, opacity: 0, scale: 0.97, pointerEvents: 'none' })
        } else {
          gsap.set(shot, { pointerEvents: 'auto' })
        }
      })
```

- [ ] **Step 5: Tweens de crossfade dos shots**

Dentro do `panels.forEach((panel, i) => { if (i < panels.length - 1) { ... } })` existente (linhas ~119-171), após o tween "Enter next" (linha ~135), adicionar no MESMO position `i`:

```ts
          // Crossfade da prova visual, sincronizado com o painel
          tl.to(shots[i], {
            y: -40,
            opacity: 0,
            scale: 0.97,
            ease: 'power2.inOut'
          }, i)
          tl.to(shots[i + 1], {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: 'power2.inOut'
          }, i)
```

- [ ] **Step 6: pointerEvents + play/pause de vídeo no onUpdate**

Dentro do `onUpdate` existente, após o bloco `panels.forEach(...)` (linha ~114):

```ts
            shots.forEach((shot, i) => {
              shot.style.pointerEvents = i === activeIndex ? 'auto' : 'none'
            })

            if (lastActiveIndexRef.current !== activeIndex) {
              lastActiveIndexRef.current = activeIndex
              document
                .querySelectorAll<HTMLVideoElement>('.traj-shot video')
                .forEach(v => {
                  if (Number(v.dataset.projectIndex) === activeIndex) {
                    v.play().catch(() => {})
                  } else {
                    v.pause()
                  }
                })
            }
```

(`shots` está no escopo do closure — declarado no Step 4. Vídeo do projeto 0 não toca até o primeiro scroll: aceitável, o poster cobre; se incomodar na verificação visual, disparar `play()` do índice 0 uma vez após montar o timeline.)

- [ ] **Step 7: Build, lint e verificação visual**

Run: `pnpm build && pnpm lint` — Expected: sucesso.
Run: `pnpm dev` e verificar no browser (desktop ≥1024px):
1. VamoAgendar e Catálogo mostram moldura com screenshot nítido, domínio na barra e selo "Abrir ↗" clicável (abre em nova aba).
2. Crossfade da moldura acompanha a troca de painel; Raízes ficam sem moldura (cena igual à de antes).
3. Fast travel, mini-steppers, contador, era-visuals e glow continuam funcionando.
4. Nada de overflow horizontal; se a moldura brigar com texto em 1024-1280px, ajustar proporções do grid para `'0.9fr 0.95fr 1.05fr'` e reavaliar.

- [ ] **Step 8: Commit**

```bash
git add src/components/Trajectory.tsx
git commit -m "feat: moldura de prova visual na cena pinada da Trajectory (desktop)"
```

---

### Task 6: Trajectory mobile — imagem no card

**Files:**
- Modify: `src/components/Trajectory.tsx` (render mobile, dentro do `era.projects.map`, linha ~242-307)

- [ ] **Step 1: Bloco de imagem no topo do card**

Dentro do `<motion.div>` do projeto mobile, ANTES do span de `project.type` (linha ~250):

```tsx
                    {'media' in project && project.media && (
                      <img
                        src={project.media.image}
                        alt={project.media.alt}
                        width={1200}
                        height={675}
                        loading="lazy"
                        decoding="async"
                        style={{
                          display: 'block',
                          width: '100%',
                          height: 'auto',
                          borderRadius: '12px',
                          border: '1px solid var(--glass-border)',
                          marginBottom: '1.25rem',
                        }}
                      />
                    )}
```

Sem vídeo no mobile (decisão da spec: poster/print estático, economia de dados) — `media.image` já é o print. Isso **adiciona altura** à seção mobile; o `ScrollTrigger.refresh()` debounced do App.tsx cobre o deslocamento dos triggers seguintes (aviso da spec, já aprovado).

- [ ] **Step 2: Build + verificação visual mobile**

Run: `pnpm build` — Expected: sucesso.
No `pnpm dev` com viewport <1024px (devtools): cards de VamoAgendar e Catálogo mostram a imagem acima do título, sem layout shift no carregamento (width/height explícitos), scroll até o fim da página sem seções desalinhadas.

- [ ] **Step 3: Commit**

```bash
git add src/components/Trajectory.tsx
git commit -m "feat: print do projeto nos cards mobile da Trajectory"
```

---

### Task 7: ArchiveOverlay — thumb na linha expandida

**Files:**
- Modify: `src/components/ArchiveOverlay.tsx` (interface linha ~10-19, bloco expandido linhas ~268-305)

- [ ] **Step 1: Tipo**

Em `ProjectItem` (linha ~10), adicionar:

```ts
  media?: { image: string; alt: string }
```

- [ ] **Step 2: Thumb no conteúdo expandido**

No bloco expandido (linha ~269), trocar o container `<div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px' }}>` por um layout que abre com a thumb quando existir:

```tsx
          <div style={{ display: 'flex', gap: '1.5rem', maxWidth: '800px', flexWrap: 'wrap' }}>
            {project.media && (
              <img
                src={project.media.image}
                alt={project.media.alt}
                width={320}
                height={180}
                loading="lazy"
                decoding="async"
                style={{
                  display: 'block',
                  borderRadius: '8px',
                  border: '1px solid var(--glass-border)',
                  flexShrink: 0,
                }}
              />
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1, minWidth: '260px' }}>
              {/* conteúdo existente: <p narrative> e o <div> dos links, sem alterações internas */}
            </div>
          </div>
```

(O `<p>` da narrative e o `<div>` de links existentes apenas mudam de pai — nenhuma outra alteração neles.)

- [ ] **Step 3: Build + verificação visual**

Run: `pnpm build` — Expected: sucesso.
No `pnpm dev`: abrir o Arquivo, expandir "Portfolio Avantis" e "Labirinto Geométrico" → thumb 320×180 ao lado da narrative; expandir uma linha sem media (Sushi, mods) → layout idêntico ao atual; animação de expandir/recolher (gsap height) sem pulos.

- [ ] **Step 4: Commit**

```bash
git add src/components/ArchiveOverlay.tsx
git commit -m "feat: thumbnails nas linhas expandidas do arquivo de projetos"
```

---

### Task 8: Vídeo do booking VamoAgendar

**Files:**
- Create: `scripts/capture/gravar-vamoagendar.ts`
- Create (gerados): `public/cases/vamoagendar.webm`
- Modify: `src/data/content.ts` (media do VamoAgendar, pt e en)

- [ ] **Step 1: Reconhecimento do fluxo (manual, uma vez)**

Abrir `https://vamoagendar.com.br/` no Chrome, navegar o fluxo público de booking de ponta a ponta e anotar: URL de entrada do fluxo (página de um profissional/serviço público de demonstração), seletores CSS estáveis dos 4-6 cliques principais (serviço → data → horário → confirmação). Se não existir perfil público de demonstração, o Marcilio cria um antes de gravar. Registrar os seletores como constantes no topo do script do Step 2.

- [ ] **Step 2: Escrever `scripts/capture/gravar-vamoagendar.ts`**

Harness completo (os `PASSOS` são preenchidos com os seletores reais do Step 1 — estrutura e tipos fechados aqui):

```ts
import puppeteer, { type Page } from 'puppeteer'
import { mkdirSync } from 'fs'
import { resolve } from 'path'

/**
 * Grava o fluxo de booking do VamoAgendar em WebM via page.screencast().
 * Saída bruta em capturas/vamoagendar-bruto.webm; compressão final é um
 * passo ffmpeg documentado no plano (VP9, ≤3 MB, mudo).
 */

const SAIDA = resolve(process.cwd(), 'capturas')

// Preenchido no reconhecimento (Task 8 / Step 1):
const URL_FLUXO = 'https://vamoagendar.com.br/' // trocar pela página pública do profissional
interface Passo {
  descricao: string
  seletor: string
  esperaMs: number
}
const PASSOS: Passo[] = [
  // { descricao: 'escolher serviço', seletor: '[data-servico-id="..."]', esperaMs: 1200 },
  // { descricao: 'escolher dia', seletor: '...', esperaMs: 1200 },
  // { descricao: 'escolher horário', seletor: '...', esperaMs: 1200 },
  // { descricao: 'confirmar', seletor: '...', esperaMs: 2000 },
]

async function clicar(page: Page, passo: Passo) {
  await page.waitForSelector(passo.seletor, { visible: true, timeout: 15_000 })
  await page.click(passo.seletor)
  await new Promise(r => setTimeout(r, passo.esperaMs))
  console.log(`  · ${passo.descricao}`)
}

async function main() {
  if (PASSOS.length === 0) {
    console.error('PASSOS vazio — preencher com os seletores do reconhecimento antes de gravar.')
    process.exit(1)
  }
  mkdirSync(SAIDA, { recursive: true })
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewport({ width: 1200, height: 675, deviceScaleFactor: 1 })
  await page.goto(URL_FLUXO, { waitUntil: 'networkidle0', timeout: 60_000 })
  await page.evaluate(() => document.fonts.ready)
  await new Promise(r => setTimeout(r, 2000))

  const recorder = await page.screencast({ path: resolve(SAIDA, 'vamoagendar-bruto.webm') as `${string}.webm` })
  for (const passo of PASSOS) await clicar(page, passo)
  await recorder.stop()
  await browser.close()
  console.log('✓ gravação bruta em capturas/vamoagendar-bruto.webm')
}

main().catch(err => { console.error(err); process.exit(1) })
```

- [ ] **Step 3: Gravar**

Preencher `URL_FLUXO` e `PASSOS` com os dados do reconhecimento.
Run: `pnpm tsx scripts/capture/gravar-vamoagendar.ts`
Expected: log de cada passo + `✓ gravação bruta`. **Não confirmar um agendamento real em produção** — parar o fluxo na tela de confirmação, ou usar profissional de demonstração do Marcilio.

- [ ] **Step 4: Comprimir com ffmpeg**

```bash
ffmpeg -y -i capturas/vamoagendar-bruto.webm -an -vf "fps=30,scale=1200:-2" \
  -c:v libvpx-vp9 -crf 40 -b:v 0 public/cases/vamoagendar.webm
du -h public/cases/vamoagendar.webm
```

Expected: ≤3 MB. Acima disso: subir `-crf` para 44; ainda acima: cortar duração (`-t 12`). Regra da spec: cortar duração antes de degradar além disso.

- [ ] **Step 5: Ligar o vídeo no content.ts**

No `media` do VamoAgendar (pt E en), adicionar:

```ts
              video: '/cases/vamoagendar.webm',
              poster: '/cases/vamoagendar.webp',
```

- [ ] **Step 6: Build + verificação visual**

Run: `pnpm build` — Expected: sucesso.
No `pnpm dev` desktop: painel do VamoAgendar reproduz o vídeo em loop mudo quando ativo, pausa ao sair; com `prefers-reduced-motion: reduce` (emular nas devtools), mostra só o print. Network tab: o `.webm` só baixa quando o painel fica ativo (`preload="none"`).

- [ ] **Step 7: Commit**

```bash
git add scripts/capture/gravar-vamoagendar.ts public/cases/vamoagendar.webm src/data/content.ts
git commit -m "feat: vídeo do fluxo de booking do VamoAgendar na Trajectory"
```

---

### Task 9: Capturas assistidas (com o Marcilio) — SISCO, Sushi, KyteApp, mods, voxel

Cada subitem segue o MESMO ciclo: Marcilio sobe → `pnpm capture <slug>` → inspecionar → `cp` para `public/cases/` → `media` no `content.ts` (pt+en, sem `url` — não estão no ar) → `pnpm build` → commit `feat: prova visual do <projeto>`. Checkpoint com o Marcilio antes de cada um; pular qualquer um que não valer o custo na hora (registrar no commit da spec, não bloquear os demais).

- [ ] **Step 1: SISCO** — Marcilio roda (via `!`): `cd ~/Files/Projetos/SISCO-Ifms && docker compose up -d && pnpm dev` (conferir Makefile/README na hora; porta esperada 8000 — ajustar `manifesto.ts` se divergir). Capturar tela logada com dados de seed plausíveis. Publicar `public/cases/sisco.webp`; `media` no projeto SISCO (alt pt: `'Painel do SISCO com o controle de horas complementares dos alunos'`; en: `'SISCO dashboard tracking students\' complementary hours'`).
- [ ] **Step 2: Sushi do Verão** — Marcilio sobe api + frontend (`~/Files/Projetos/rodrigo_verao`, PostgreSQL + migrações + 2 apps; comandos conferidos no README na hora). Capturar o cardápio público. Publicar só a thumb `public/cases/thumbs/sushi-verao.webp`; `media` na entrada `archive[0]` (alt pt: `'Cardápio digital do Sushi do Verão em esteira contínua'`; en: `'Sushi do Verão digital menu with continuous conveyor scroll'`).
- [ ] **Step 3: KyteApp dashboard** — decisão na hora (risco registrado na spec): Marcilio clona `scrapper-frontend`/`scrapper-api` e avalia o custo do env. Se subir: capturar, publicar `public/cases/kyteapp.webp`, `media` no projeto KyteApp Scrapper (alt pt: `'Dashboard de faturamento consolidado das lojas extraído pelo worker'`; en: `'Consolidated revenue dashboard fed by the scraping worker'`). Se não: projeto fica sem moldura (wrapper vazio já cobre).
- [ ] **Step 4: Mods NeoForge** — Marcilio roda `./gradlew runClient` em cada mod e tira screenshot in-game (F2) mostrando os blocos/crates. Claude converte: `pnpm tsx -e` não é necessário — usar sharp via script rápido ou ajustar `capturar.ts`? Não: converter manualmente com sharp em um one-liner Node documentado:
  ```bash
  node -e "require('sharp')(process.argv[1]).resize(320,180,{fit:'cover'}).webp({quality:82}).toFile('public/cases/thumbs/'+process.argv[2]+'.webp')" -- <screenshot.png> storage-crates
  node -e "require('sharp')(process.argv[1]).resize(320,180,{fit:'cover'}).webp({quality:82}).toFile('public/cases/thumbs/'+process.argv[2]+'.webp')" -- <screenshot.png> simple-machines
  ```
  `media` em `archive[2]` e `archive[3]` (alt pt: `'Crates de armazenamento do mod no Minecraft'` / `'Máquinas do mod em funcionamento no Minecraft'`; en equivalentes).
- [ ] **Step 5: Voxel engine (vídeo)** — Marcilio compila (`cd ~/Files/Projetos/mine && cmake -B build && cmake --build build`) e grava ~15 s de gameplay com `wf-recorder -g "$(slurp)" -f capturas/mine-bruto.mp4` (instalar antes: `sudo dnf install wf-recorder`; alternativa OBS). Claude comprime:
  ```bash
  ffmpeg -y -i capturas/mine-bruto.mp4 -an -vf "fps=30,scale=1200:-2,crop=1200:675" \
    -c:v libvpx-vp9 -crf 40 -b:v 0 public/cases/mine.webm
  ffmpeg -y -i public/cases/mine.webm -frames:v 1 capturas/mine-poster.png
  node -e "require('sharp')('capturas/mine-poster.png').resize(1200,675,{fit:'cover'}).webp({quality:82}).toFile('public/cases/mine.webp')"
  ```
  Expected: `mine.webm` ≤3 MB. `media` no projeto Voxel Engine (OpenGL Clássico): `image: '/cases/mine.webp'`, `video: '/cases/mine.webm'`, `poster: '/cases/mine.webp'`, sem `url`; alt pt: `'Voxel engine em C++ renderizando terreno em blocos com câmera livre'`; en: `'C++ voxel engine rendering block terrain with a free camera'`.
- [ ] **Step 6: Fase 2 oportunista** — se sobrar fôlego na mesma sessão: `pnpm capture milion` (fica só em `capturas/`, sem integração).
- [ ] **Step 7: Verificação final da rodada** — `pnpm build && pnpm lint`; passada visual completa (desktop + mobile) da Trajectory e do Archive; `du -h public/cases -s` (alvo: ≤8 MB somando vídeos). Commit final por projeto integrado (mensagens no ciclo acima).

---

## Self-review (executada na escrita do plano)

- **Cobertura da spec:** moldura desktop (T5), mobile (T6), Archive (T7), modelo de dados + contrato (T3), pipeline (T1-T2), vídeo booking (T8), voxel + assistidas (T9), fase 2 staging (T1/T9.6), performance (lazy/preload/width-height em T4-T7), reduced motion (T4/T5/T8), regra editorial (manifesto + steps de inspeção). Gap deliberado: nada além disso — YAGNI.
- **Placeholders:** os `PASSOS` comentados na T8 não são placeholder de plano e sim dado que só existe após o reconhecimento (Step 1 produz, Step 3 valida com guarda `PASSOS.length === 0`).
- **Consistência de tipos:** `media` idêntico em T3/T4/T5/T6/T7 (`image/alt/url?/video?/poster?`; archive usa subconjunto `image/alt`); `.traj-shot` definido em T5 e usado no onUpdate de T5; `data-project-index` definido em T4 e lido em T5; `openText` definido em T3 e consumido em T5.
