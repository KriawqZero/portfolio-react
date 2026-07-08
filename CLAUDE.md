# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # start dev server
pnpm build        # tsc -b && vite build
pnpm lint         # eslint
pnpm preview      # preview production build
```

Use `pnpm` exclusively — never npm or yarn. There is no test suite.

## Architecture

**Single-page React + Vite + TypeScript portfolio.** No routing. `src/App.tsx` composes all sections in narrative order: Hero → FreelanceProjects (conditional) → AboutMe → Trajectory → Avantis → DevProcess → Contact.

### Content system

`src/data/content.ts` is the **only** source of truth for all copy. It exports `ptContent` and `enContent` as parallel typed objects with identical structure. No text is hardcoded in components — always use `const { t } = useLanguage()` and read from `t`.

The CV generator (`scripts/generate-cv.ts`) also imports from `content.ts` via `scripts/cv.content.ts`. Changing data in `content.ts` changes both the site and the generated PDF simultaneously — never duplicate content elsewhere.

### Language and platform context (`useLanguage`)

`src/hooks/useLanguage.tsx` provides:
- `t` — the full typed content object for the active language
- `language` / `setLanguage` — `'pt' | 'en'`, persisted to `localStorage`
- `platform` — detected from `?platform=` URL param (`workana | upwork | 99freelas | freelancer | null`)
- `isFreelanceView` — `true` when a platform param is present
- `personalizedMessage` — platform-specific intro string from `t.personalization`

Platform detection is read-once on mount (no reactivity to URL changes). Upwork and Freelancer.com default to English; the others default to Portuguese. When `isFreelanceView` is true, `FreelanceProjects` renders and the Contact section uses client-oriented copy.

### Animation architecture

GSAP + ScrollTrigger handle all scroll-driven and reveal animations. Lenis provides smooth scrolling and is integrated with GSAP via `useSmoothScroll` (ticker sync in `src/hooks/useSmoothScroll.ts`).

Rules that must be followed for every GSAP animation:
- Wrap in `gsap.context()` and call `ctx.revert()` on unmount
- Use `gsap.matchMedia()` for responsive behaviour (desktop breakpoint: `min-width: 1024px`)
- Mobile layouts disable scroll-pinning and complex ScrollTriggers, delivering a plain vertical scroll instead

`App.tsx` calls `ScrollTrigger.refresh()` (debounced 200 ms) whenever `language` or `isFreelanceView` changes, to fix layout offset bugs caused by section height shifts.

## Design rules

**Accent:** `#6D4AFF`. Do not introduce new colors without being asked.

**No UI libraries.** No shadcn, MUI, DaisyUI, or any component kit. Everything is custom CSS. If a visual solution looks like it came from a template or boilerplate, it is wrong.

**Propose visual changes before implementing them.**

**Animations are part of the product.** Do not simplify, remove, or "optimize" existing GSAP timelines or ScrollTrigger configs. When a layout change would affect an existing ScrollTrigger (e.g., adding height to a pinned section), say so explicitly before making the change.

**TypeScript throughout.** Domain names in Portuguese when natural (e.g., `Trajetória`, `conteudo`).

**Simplicity over abstraction.** Do not create structure for hypothetical future needs.

## CV generation

```bash
pnpm cv:gen estagio   # duas colunas, identidade visual, QR code
pnpm cv:gen ats       # coluna única, sem decoração, para parsers como Gupy
# output: ./cv-output/marcilio-ortiz-{variante}.pdf
```

**Architecture:** `scripts/cv.content.ts` imports from `src/data/content.ts` and adds only what the CV needs: bullets de impacto, formação, localização, habilidades categorizadas, resumo profissional. Zero duplicação de campos que já existem em `content.ts`.

`scripts/generate-cv.ts` — entry point: gera QR (variante estágio), chama o template, abre Puppeteer, aguarda `document.fonts.ready`, salva o PDF com `preferCSSPageSize: true` e `printBackground: true`.

`scripts/templates/estagio.ts` e `ats.ts` — funções que recebem `DadosCv` e retornam string HTML completa. O CSS é embutido no `<style>` de cada template. Toda a tipografia usa Inter via Google Fonts (carregada pelo Puppeteer antes do PDF).

**To add content to the CV that doesn't exist in `content.ts`** (e.g., a new bullet point or certification): edit only `scripts/cv.content.ts`. Do not add CV-specific fields to `content.ts`.
