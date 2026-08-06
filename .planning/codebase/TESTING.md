# Testing Patterns

**Analysis Date:** 2026-08-05
**Updated:** 2026-08-06 — a narrow test suite was introduced; the section below was rewritten.

## Current Testing Setup

**Vitest 4.1, scoped deliberately to the pure functions of `lib/ai/`.**

- `pnpm test` → `vitest run` | `pnpm test:watch` → `vitest`
- Location: `tests/` at the repo root — outside `tsconfig.app.json` (`src`) and
  `tsconfig.api.json` (`api`, `lib`), so test files are not part of either build.
- 46 tests across 3 files, all passing:
  - `tests/validate-request.test.ts` — origin allowlist (including forged Vercel-preview
    and localhost subdomains), body/session/history limits
  - `tests/validate-answer.test.ts` — URL and HTML stripping, rejection of source IDs that
    were never in context, label de-duplication, truncation, follow-up caps
  - `tests/retrieval.test.ts` — tokenizer, fixed documents, document and character caps,
    freelance boost, length normalisation
- Verified by mutation: deliberately breaking the URL-stripping and the character cap made
  exactly 4 tests fail, so these assertions have real detection power.

**What is deliberately NOT tested:** components, GSAP/ScrollTrigger animation, and E2E
flows. Animation is validated by eye — see the "Animations are part of the product" rule in
`CLAUDE.md`. This is a scoping decision, not an oversight: the tested surface is the code
where a silent regression costs money (OpenAI spend) or publishes a hallucination.

## Quality Assurance Strategy

Testing relies on three mechanisms:

### 1. TypeScript Type Checking

**Tool:** TypeScript 5.8.3

**Config:** `tsconfig.app.json` with strict mode enabled

**Run:**
```bash
pnpm build  # Runs `tsc -b && vite build`
```

**What it catches:**
- Type mismatches in function parameters and returns
- Unused variables and parameters (`noUnusedLocals`, `noUnusedParameters`)
- Unchecked side-effect imports (`noUncheckedSideEffectImports`)
- Missing required object properties
- Impossible branches (`noFallthroughCasesInSwitch`)
- Implicit `any` values (strict mode)

**Compiler settings that enforce quality:**
```json
{
  "strict": true,
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "erasableSyntaxOnly": true,
  "noFallthroughCasesInSwitch": true,
  "noUncheckedSideEffectImports": true
}
```

### 2. ESLint Static Analysis

**Tool:** ESLint 9.29.0 with TypeScript ESLint

**Config:** `eslint.config.js` (flat config format)

**Run:**
```bash
pnpm lint  # Runs `eslint .`
```

**Plugins active:**
- `@eslint/js` — recommended preset
- `typescript-eslint/recommended` — TypeScript-specific rules
- `eslint-plugin-react-hooks/recommended-latest` — React Hooks rules
  - Ensures dependency arrays are complete
  - Warns on missing Hook dependencies
- `eslint-plugin-react-refresh/vite` — React Fast Refresh rules
  - Enforces proper component export patterns for HMR

**What it catches:**
- Missing React Hook dependencies
- Incorrect Hook usage patterns
- Unused or unreachable code
- Unsafe type assertions
- React Fast Refresh violations

### 3. Manual Testing

**Launch dev server:**
```bash
pnpm dev  # Starts Vite dev server with HMR
```

**Test flow (human-driven):**
1. Browser navigation and page interactions
2. Scroll animations via GSAP + ScrollTrigger
3. Language switching and persistence
4. Platform detection from URL parameters
5. Form submissions and API calls
6. Responsive behavior at breakpoints (1024px, 768px)

**Critical interactions to test manually:**
- Hero section parallax on desktop/mobile
- ScrollTrigger scroll-to-section reveals
- Lenis smooth scroll with anchor links
- Language toggle persists to localStorage
- Platform URL param triggers correct view variation
- Contact section sticky scroll animation
- AI Chat message history management (max 20 items)
- Form validation and error states

## Gaps and Risks

**No test coverage for:**
- Component rendering and prop combinations
- Hook behavior in isolation
- Animation timing and visual regression
- Integration between GSAP and scroll events
- Edge cases in language/platform detection logic
- State machine transitions in `AiChat.tsx` (estado phases)
- Responsive breakpoint behavior (only visual testing)
- API error scenarios in `scripts/ai/` modules

**Risk areas:**
- GSAP animations may break when layout changes (ScrollTrigger requires manual refresh calls)
- Language/platform context assumes localStorage is available (no SSR support)
- No regression detection for visual changes
- Scroll animations are brittle to content height changes
- Form submissions have no automated validation testing

## Integration Testing (Manual)

**What should be tested before deploy:**

1. **Content changes in `src/data/content.ts`:**
   - Verify text renders in all components
   - Check layout doesn't break with long strings
   - Test language toggle between pt/en

2. **Animations after layout changes:**
   - Verify ScrollTrigger doesn't clip or misalign
   - Test parallax doesn't cause jank
   - Confirm mobile layout disables complex animations

3. **Platform detection:**
   - Visit with `?platform=upwork` → should be English
   - Visit with `?platform=workana` → should be Portuguese
   - Visit with no param → should default to Portuguese
   - Verify `FreelanceProjects` only shows when platform param present

4. **Responsiveness:**
   - Test at 1024px breakpoint (GSAP.matchMedia threshold)
   - Test at 768px breakpoint (Contact/navbar threshold)
   - Test mobile keyboard doesn't break forms

5. **Browser compatibility:**
   - Chrome/Edge (Chromium)
   - Firefox
   - Safari
   - Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Testing (Manual)

**Before deploy, check:**
```bash
pnpm preview  # Run production build locally
```

Observe in Chrome DevTools:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- No janky scrolling during GSAP animations
- AI Chat doesn't block main thread during message processing

**Known performance patterns:**
- Lenis smooth scroll synced with GSAP (see `useSmoothScroll.ts`)
- OpenAI API calls on `/api/ask` endpoint (no client-side blocking)
- Image optimization via `scripts/optimize-images.ts`
- Lazy loading not visible (small site footprint)

## Build Verification

**Commands that verify correctness:**

```bash
pnpm build      # Full TypeScript check + Vite bundle
pnpm lint       # ESLint static analysis
tsc -b          # Incremental TypeScript build (fast)
```

**All three must pass before deploy.** The CI/CD pipeline (if any) should run these.

## CV Generator Testing

**Special case: `scripts/generate-cv.ts`**

Uses Puppeteer to render and PDF a React component. Manual steps:
```bash
pnpm cv:gen estagio  # Generates cv-output/marcilio-ortiz-estagio.pdf
pnpm cv:gen ats      # Generates cv-output/marcilio-ortiz-ats.pdf
```

**Verify:**
- PDF opens without errors
- All text renders correctly
- Images/QR codes display
- Layout doesn't break on different screen sizes during PDF render

## Recommended Future Testing

**If test suite becomes necessary:**

1. **Unit Tests (Vitest + React Testing Library):**
   - Hook behavior: `useLanguage()`, `useSmoothScroll()`
   - Component snapshots for stable sections (Nav, Footer)
   - Content parsing: `frases()` function logic
   - State machine transitions in `AiChat.tsx`

2. **Integration Tests:**
   - Language toggle workflow (URL → context → rendered text)
   - Platform detection with URL params
   - Scroll trigger responsive breakpoints
   - Form submission happy path and error states

3. **Visual Regression:**
   - Percy or similar for animation frames
   - Component Chromatic setup for design consistency
   - Responsive snapshot at key breakpoints

4. **E2E Tests (Playwright or Cypress):**
   - Full user journey: Hero → Scroll → Contact → Submit
   - Cross-browser/device verification
   - Performance metrics collection

---

*Testing analysis: 2026-08-05*
