# Coding Conventions

**Analysis Date:** 2026-08-05

## Naming Patterns

**Files:**
- React components: `PascalCase.tsx` (e.g., `Hero.tsx`, `Contact.tsx`, `AiChat.tsx`)
- Custom hooks: `camelCase.ts` or `camelCase.tsx` (e.g., `useLanguage.tsx`, `useSmoothScroll.ts`, `useTurnstile.ts`)
- Data/config files: `camelCase.ts` (e.g., `content.ts`)
- Type/interface files: colocated with usage, no separate `*.types.ts`

**Functions and Variables:**
- Functions: `camelCase` (e.g., `idDeSessao()`, `frases()`, `handleAnchorClick()`)
- Constants: `UPPERCASE_SNAKE_CASE` when module-level or semantic constants (e.g., `MAX_CARACTERES`, `MAX_HISTORICO`, `CHAVE_SESSAO`)
- DOM element refs: `camelCase` ending in `Ref` (e.g., `contentRef`, `photoRef`, `logoRef`, `pinRef`, `glowRef`)
- Event handlers: `camelCase` starting with `on` or `handle` (e.g., `onMouseMove`, `handleAnchorClick`)
- State updater functions: `set` + `PascalCase` (e.g., `setLanguage`, `setScrolled`)

**Types:**
- Interfaces and types: `PascalCase` (e.g., `LanguageContextType`, `Platform`, `Language`)
- Union types: `PascalCase` (e.g., `Estado = { fase: 'ocioso' } | { fase: 'perguntando' }`)
- Imported types: use `type` keyword explicitly (e.g., `import type { AskResponse } from '...'`)

**Component and Context:**
- Components (React functions): `PascalCase` (e.g., `export default function Hero()`)
- Context providers: `PascalCase` + `Provider` suffix (e.g., `LanguageProvider`)
- Context hook: `use` + `PascalCase` (e.g., `useLanguage()`)
- CSS class names: `lowercase` with hyphens (e.g., `.container`, `.font-display`, `.text-display`, `.ep-label`, `.ep-link-0`)

## Code Style

**Formatting:**
- No Prettier config — ESLint enforces style via recommended presets
- 2-space indentation (inferred from codebase)
- Trailing commas in multiline objects/arrays (ESLint recommended)
- Semicolons required (TypeScript strict setting enforces this implicitly)

**Linting:**
- ESLint config: `eslint.config.js` using flat config format
- Active extends:
  - `@eslint/js` recommended
  - `typescript-eslint` recommended
  - `eslint-plugin-react-hooks` recommended-latest
  - `eslint-plugin-react-refresh` vite config
- Language options: ES2022, browser globals
- No unused locals or parameters allowed (`noUnusedLocals`, `noUnusedParameters` in tsconfig)

**TypeScript:**
- Target: ES2022
- Mode: strict (`strict: true`)
- Module resolution: bundler
- Allow importing TS extensions explicitly
- No unused locals, parameters, or unchecked side effect imports
- All components use explicit return types

**Styling:**
- CSS custom properties exclusively (defined in `:root` in `src/index.css`)
- Accent color: `#3F18AB` (purple, accessible contrast checked)
- Secondary accent: `#6A3CE8` for highlights and glows
- No UI component libraries (no shadcn, MUI, DaisyUI, or Tailwind)
- Custom CSS only in `src/index.css`
- Inline styles with React JSX objects for dynamic/reactive values
- Class names for layout utilities (`.container`, `.font-display`, `.text-display`, etc.)
- All typography uses CSS custom properties (e.g., `--text-display`, `--text-hero`, `--text-base`)

**Comments:**
- JSDoc comments for functions and complex logic, written in Portuguese
- Line comments explain *why*, not *what*
- Example from `AiChat.tsx`:
  ```typescript
  /**
   * Janela de conversa: 10 perguntas e 10 respostas.
   *
   * Funciona como fila — quando a 11ª pergunta chega, o par mais antigo sai e
   * todo o resto permanece.
   */
  ```

## Import Organization

**Order (strict):**
1. React and React hooks (`react`, `react-dom`)
2. Third-party UI libraries (Framer Motion, GSAP, Lenis, react-icons)
3. Internal custom hooks (`../hooks/useLanguage`, `../hooks/useSmoothScroll`)
4. Internal components (`../components/Hero`)
5. Internal data/utilities (`../data/content`, `../../lib/ai/types`)
6. Inline constant definitions (e.g., `techIcons: Record<string, React.ReactNode> = { ... }`)

**Type imports:**
- Always use explicit `type` keyword for type-only imports
- Example: `import type { AskResponse } from '../../lib/ai/types'`

**Path Aliases:**
- None configured (uses relative paths only)
- All imports use relative paths: `../hooks/`, `../../lib/`

**Inline Icon Objects:**
- Component-scoped icon lookup tables as `Record<string, React.ReactNode>` objects defined before the component function
- Example from `Hero.tsx`:
  ```typescript
  const techIcons: Record<string, React.ReactNode> = {
    react: <SiReact size={24} />,
    typescript: <SiTypescript size={24} />,
  }
  ```

## Error Handling

**Custom Hooks:**
- Throw descriptive errors when context is missing
- Example from `useLanguage()`:
  ```typescript
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  ```

**State-based Error Handling:**
- Error states modeled as discriminated unions in component state
- Example from `AiChat.tsx`:
  ```typescript
  type Estado = 
    | { fase: 'ocioso' }
    | { fase: 'respondido'; pergunta: string; resposta: AskResponse }
    | { fase: 'erro'; pergunta: string; mensagem: string }
  ```
- Render conditionally based on state phase

**API/Async Errors:**
- Try-catch blocks in async functions (see `scripts/ai/` for API call patterns)
- Errors surface as `{ fase: 'erro'; mensagem: string }` state updates
- User-facing error messages in Portuguese

## Animation Architecture

**GSAP Context Rules (mandatory):**
- Every GSAP animation must be wrapped in `gsap.context()` for cleanup
- Call `ctx.revert()` on component unmount to remove all listeners and animations
- Example pattern:
  ```typescript
  useEffect(() => {
    const ctx = gsap.context(() => {
      // All GSAP code here
    })
    return () => ctx.revert()
  }, [])
  ```

**Responsive Animations:**
- Use `gsap.matchMedia()` for all responsive behavior
- Desktop breakpoint: `'(min-width: 1024px)'` or `'(min-width: 768px) and (prefers-reduced-motion: no-preference)'`
- Mobile layouts: disable scroll pinning, complex ScrollTriggers; deliver plain vertical scroll
- Example from `Hero.tsx`:
  ```typescript
  const mm = gsap.matchMedia(sectionRef)
  mm.add('(min-width: 1024px)', () => {
    // Desktop animations only
  })
  ```

**ScrollTrigger Refresh:**
- Call `ScrollTrigger.refresh()` (debounced 200ms) whenever `language` or `isFreelanceView` changes
- Fixes layout offset bugs caused by section height shifts
- Implemented in `App.tsx` useEffect

**Smooth Scrolling:**
- Lenis for smooth scroll, synced with GSAP via `useSmoothScroll()` hook
- Handles anchor link navigation with `lenis.scrollTo()`
- Prevents default browser scroll behavior

## Module and Component Design

**Component Structure:**
- Functional components using React hooks only
- Refs for DOM access with explicit type annotations (e.g., `useRef<HTMLDivElement>(null)`)
- Props typed explicitly (no implicit `any`)
- Default exports for components

**Content Management:**
- All text strings live exclusively in `src/data/content.ts`
- Two parallel objects: `ptContent` and `enContent` with identical structure
- No hardcoded text anywhere in components
- Access via `const { t } = useLanguage()` in every component
- Example:
  ```typescript
  const { hero } = t
  const sectionRef = useRef<HTMLElement>(null)
  ```

**Barrel Files:**
- Not used; components exported individually

**Exports:**
- Components: default export (`export default function ComponentName`)
- Hooks: named export (`export function useHookName()`)
- Utilities: named export

## Type Safety

**Strict Mode Enforced:**
- TypeScript `strict: true` prevents implicit `any`
- All function parameters and return types explicit
- No optional chaining abuse; use null checks and guards
- Example from `useLanguage.tsx`:
  ```typescript
  interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    platform: Platform;
    t: typeof ptContent;
    personalizedMessage: string | null;
    isFreelanceView: boolean;
  }
  ```

**No Unused Code:**
- `noUnusedLocals` and `noUnusedParameters` enforced
- Removed dead code automatically by ESLint

## Platform Detection and Localization

**Language Context:**
- Single global context via `useLanguage()` hook
- Language stored in `localStorage` as `'portfolio-lang'`
- Platform detected from URL `?platform=` parameter (read once on mount)
- Platform detection governs:
  - Default language (en for Upwork/Freelancer, pt for others)
  - Conditional rendering of `FreelanceProjects` component
  - Contact section copy variation

**Content Patterns:**
- All platform-specific text in `t.personalization` object
- Conditional content branching in components based on `isFreelanceView` flag
- Example from `Contact.tsx`:
  ```typescript
  const phrases = isFreelanceView && data.narrativePhrasesClient 
    ? data.narrativePhrasesClient 
    : data.narrativePhrases
  ```

---

*Convention analysis: 2026-08-05*
