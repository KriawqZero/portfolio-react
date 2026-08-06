<!-- refreshed: 2026-08-05 -->
# Architecture

**Analysis Date:** 2026-08-05

## System Overview

```text
┌─────────────────────────────────────────────────────────────────┐
│              React SPA (Frontend) + Vercel Functions (API)       │
├─────────────────────────────────────────────────┬────────────────┤
│  React Components (Narrative Sections)          │  Vercel API    │
│  ┌─ Hero, AboutMe, Trajectory, etc.             │  ┌─ /api/ask  │
│  ├─ useLanguage Context (pt/en + platform)      │  │ (OpenAI)   │
│  ├─ GSAP + ScrollTrigger (Animations)           │  └─ Websocket │
│  └─ useLanguage.tsx @ src/hooks/               │               │
│  `src/App.tsx`                                  │  `api/ask.ts` │
└─────────────────────────────────────────────────┴────────────────┘
         ▼
┌─────────────────────────────────────────────────────────────────┐
│           Shared Content & AI Support Libraries                  │
│  ┌─ src/data/content.ts (Single Source of Truth)               │
│  ├─ lib/ai/ (Config, Validation, Retrieval, Caching)           │
│  └─ lib/ai/generated/knowledge-index.ts (Built at Build Time)  │
└─────────────────────────────────────────────────────────────────┘
         ▼
┌─────────────────────────────────────────────────────────────────┐
│           External Services & Runtime                            │
│  ┌─ OpenAI API (gpt-5.6-terra)                                  │
│  ├─ Upstash Redis (Rate Limiting, Budget, Caching)              │
│  ├─ Cloudflare Turnstile (CAPTCHA)                              │
│  └─ Google Fonts, images (Static Assets)                        │
└─────────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| **App** | Main orchestrator; composes all sections; manages GSAP context and ScrollTrigger refresh | `src/App.tsx` |
| **Hero** | Entry section; displays name, role, subtitle, tech stack, CTA buttons | `src/components/Hero.tsx` |
| **Trajectory** | Projects timeline with scroll-triggered animations; platform-aware card reveals | `src/components/Trajectory.tsx` |
| **FreelanceProjects** | Conditional section (only in `isFreelanceView`); freelance-specific projects and CTAs | `src/components/FreelanceProjects.tsx` |
| **AboutMe** | Professional background and skills section | `src/components/AboutMe.tsx` |
| **Avantis** | Studio/agency collaboration section | `src/components/Avantis.tsx` |
| **DevProcess** | Development methodology and workflow | `src/components/DevProcess.tsx` |
| **AiChat** | Conversational AI interface with 20-message sliding history | `src/components/AiChat.tsx` |
| **Contact** | CTA and footer contact information | `src/components/Contact.tsx` |
| **LanguageProvider** | Context wrapper; detects language and platform from URL; manages localStorage | `src/hooks/useLanguage.tsx` |
| **useSmoothScroll** | Lenis integration with GSAP ticker for smooth scrolling | `src/hooks/useSmoothScroll.ts` |
| **useTurnstile** | Cloudflare Turnstile widget lifecycle management | `src/hooks/useTurnstile.ts` |

## Pattern Overview

**Overall:** Single-page React application with client-server AI chat augmentation. Content-driven architecture with all marketing copy sourced from a single TypeScript object (`src/data/content.ts`), ensuring consistency between the site, PDF exports, and AI knowledge base.

**Key Characteristics:**
- **No routing** — all sections compose narratively in `App.tsx`; no client-side router needed
- **Content-first** — `src/data/content.ts` is the authoritative source for all copy (Portuguese and English)
- **Animation-centric** — GSAP + ScrollTrigger drive all scroll-triggered reveals and background shifts; Lenis provides smooth scrolling integrated via ticker
- **Layered validation** — API request flows through schema, size, Turnstile, rate limit, and budget checks before reaching OpenAI
- **Knowledge-as-data** — AI context built at build-time from `knowledge/` and `src/data/content.ts`, never scraped or dynamic

## Layers

**Presentation (React Components):**
- Purpose: Render narrative sections, handle user interaction, drive animations
- Location: `src/components/`
- Contains: `.tsx` components for each section
- Depends on: `useLanguage` hook, GSAP/Lenis for animation, `src/data/content.ts` for copy
- Used by: App.tsx orchestrator

**Context & Hooks (React Runtime):**
- Purpose: Provide language selection, platform detection, animation utilities
- Location: `src/hooks/`
- Contains: `useLanguage.tsx`, `useSmoothScroll.ts`, `useTurnstile.ts`
- Depends on: React context API, `src/data/content.ts`
- Used by: All components via React hooks

**Content Management:**
- Purpose: Single source of truth for all user-facing copy
- Location: `src/data/content.ts`
- Contains: `ptContent` and `enContent` objects with identical structure
- Depends on: None (data only)
- Used by: All components via `useLanguage().t`, CV generation, AI knowledge builder

**API Handler (Vercel Function):**
- Purpose: Orchestrate AI request flow from validation through OpenAI
- Location: `api/ask.ts`
- Contains: Request validation, Turnstile verification, rate limiting, budget checks, OpenAI call
- Depends on: `lib/ai/*` modules, OpenAI SDK
- Used by: Frontend via fetch(`/api/ask`)

**AI Support Libraries:**
- Purpose: Reusable validation, configuration, retrieval logic shared between API and scripts
- Location: `lib/ai/`
- Contains: 
  - `config.ts` — environment variable parsing with conservative defaults
  - `types.ts` — shared TypeScript types (`KnowledgeDoc`, `AskRequest`, `AskResponse`, `PortfolioAnswer`)
  - `validate-request.ts` — schema and size validation for request body
  - `validate-answer.ts` — JSON schema validation + fact-checking of OpenAI output
  - `limits.ts` — rate limiting (sliding window + daily per-session/IP), budget tracking, kill switch
  - `retrieval.ts` — deterministic document selection using custom scoring algorithm
  - `prompt.ts` — system prompt construction with dynamic document blocks
  - `cache.ts` — Redis-backed response caching keyed by normalized question
  - `turnstile.ts` — Cloudflare Turnstile verification
- Depends on: Upstash Redis, OpenAI types, crypto (Node.js)
- Used by: `api/ask.ts`, build scripts

**Knowledge Base (Build-Time):**
- Purpose: Compile approved documents and derived content into searchable index
- Location: `scripts/knowledge/build-index.ts` (builder), `lib/ai/generated/knowledge-index.ts` (output)
- Sources:
  - Hand-written: `knowledge/approved/` (Markdown files with frontmatter)
  - Auto-derived: `src/data/content.ts` (project descriptions, trajectory)
  - Policies: `knowledge/policies/` (system-level constraints, included in all prompts)
- Contains: `KNOWLEDGE` array of `KnowledgeDoc`, `KNOWLEDGE_VERSION` hash, `POLICIES` string
- Used by: `api/ask.ts` for retrieval and prompt building

**Build & Scripts:**
- Purpose: Generate CVs, optimize images, build knowledge index, test AI
- Location: `scripts/`
- Contains:
  - `generate-cv.ts` — main entry point; orchestrates variant selection, data prep, rendering, PDF export
  - `templates/estagio.ts`, `templates/ats.ts` — HTML templates with embedded CSS
  - `cv.content.ts`, `cv.software-jr.content.ts`, `cv.support.content.ts` — data objects for each CV variant
  - `knowledge/build-index.ts` — frontmatter parser and knowledge indexer
  - `ai/*.ts` — testing and diagnostics (cost measurement, security validation, conversation replay)
  - `capture/*.ts` — screenshot and data capture utilities
  - `optimize-images.ts` — WebP/AVIF generation
- Used by: `pnpm build`, `pnpm cv:gen`, `pnpm knowledge:build`, etc.

## Data Flow

### Primary Request Path (Page Load)

1. User visits `https://marciliortiz.dev.br` or with `?platform=workana` param (`src/main.tsx`)
2. React mounts `LanguageProvider` context, reads localStorage and URL params (`src/hooks/useLanguage.tsx` lines 19–46)
3. `App` renders in narrative order: Hero → AboutMe → Trajectory → Avantis → DevProcess → AiChat → Contact (`src/App.tsx` lines 92–101)
4. `useLanguage()` hook provides `t` (content object), `language`, `platform`, `isFreelanceView` to all components
5. Each component reads `t.[section]` from `src/data/content.ts` and renders
6. GSAP context initialized, ScrollTrigger created for background shifts and storytelling line (`src/App.tsx` lines 35–69)

### AI Chat Request Path (User Asks Question)

1. User types question in `AiChat` component, clicks send (`src/components/AiChat.tsx` lines 50+)
2. Component obtains Turnstile token via `useTurnstile` hook, when it becomes visible (`src/components/AiChat.tsx` lines 67–79)
3. Request body assembled: `{ question, history, sessionId, lang, context, turnstileToken }` (`src/components/AiChat.tsx`)
4. Fetch POST `/api/ask` with `application/json` (`src/components/AiChat.tsx`)

**Server-side (`api/ask.ts`):**

5. Check origin whitelist (`lib/ai/config.ts` + `lib/ai/validate-request.ts` lines 22–33)
6. Validate Content-Type, method, body size (`api/ask.ts` lines 54–60)
7. Parse and validate request body against schema (`lib/ai/validate-request.ts` lines 35–88)
8. Check dependencies (Redis required in production): `dependenciasOk()` (`lib/ai/limits.ts` lines 60–63)
9. Check Redis kill switch: `desligadaNoRedis()` (`lib/ai/limits.ts` lines 71–80)
10. Extract IP and verify Turnstile token: `verificarTurnstile()` (`lib/ai/turnstile.ts`)
11. Check rate limits (sliding window 600s, per-session daily 15, per-IP daily 30): `dentroDoRateLimit()` (`lib/ai/limits.ts` lines 117–143)
12. **Cache check** (first question only): Check Redis for cached response keyed by normalized question (`lib/ai/cache.ts` lines 62–75)
    - If cache hit: return immediately with `ask_cache` log
13. Check global daily/monthly budget: `dentroDoOrcamento()` (`lib/ai/limits.ts` lines 159–182)
14. Select documents by scoring against question terms: `selecionarDocumentos()` (`lib/ai/retrieval.ts` lines 70–99)
15. Build system prompt with policies and fixed documents: `montarInstrucoes()` (`lib/ai/prompt.ts` lines 8–72)
16. Build document block for this question: `montarBlocoDocumentos()` (`lib/ai/prompt.ts` lines 74–80)
17. Call OpenAI `client.responses.create()` with structured output schema (`api/ask.ts` lines 120–149)
    - Uses prompt caching key `marcilio-ia-{lang}-{KNOWLEDGE_VERSION}` for prefix discount
    - Includes conversation history (if any) to maintain context
18. Parse JSON response; validate fact-checking constraints: `validarResposta()` (`lib/ai/validate-answer.ts`)
19. **Cache store** (first question only): Save validated response to Redis with 7-day TTL
20. Log event to stdout (JSON): `{ evento: 'ask', status, docs, tokens, latency, ... }`
21. Return HTTP 200 with `AskResponse` JSON

**Client-side continuation:**

22. Frontend receives response; reveals answer text sentence-by-sentence (`src/components/AiChat.tsx`)
23. Sources array resolved to links via allowlist (internal lookup)
24. Follow-up suggestions rendered as quick-select buttons
25. Message added to history state (sliding window of max 20 messages)

### State Management

- **Client-side**: React hooks (`useState`), localStorage (language preference, session ID), URL params (platform detection)
- **Server-side**: Upstash Redis (rate limiting counters, budget counters, cache, kill switch)
- **Shared**: `AskRequest` / `AskResponse` types in `lib/ai/types.ts`; no GraphQL or real-time subscriptions; REST-only

## Key Abstractions

**LanguageContext:**
- Purpose: Provide language/platform selection to all components without prop drilling
- Examples: `src/hooks/useLanguage.tsx`, used by all components via `const { t, language, platform } = useLanguage()`
- Pattern: React Context API with provider at root (`src/main.tsx`), custom hook to access

**Content System (Single Source of Truth):**
- Purpose: Ensure consistency across site, PDFs, and AI knowledge
- Location: `src/data/content.ts` exports `ptContent` and `enContent`
- Structure: Hierarchical object with sections (nav, hero, trajectory, contact, etc.) and parallel Portuguese/English
- Used by: React components (`t.[section]`), CV generation (`cv.content.ts` imports selectively), knowledge indexer (`build-index.ts` derives documents)
- Pattern: No duplication; all component copy reads from single object

**Knowledge Document (KnowledgeDoc):**
- Purpose: Standardized unit for AI retrieval and scoring
- Fields: `id`, `title`, `type` (profile/project/practice/index), `topics`, `aliases`, `text`, optional `sourceLabel`/`sourceHref`
- Scoring: Tokenization + stopword filtering + weighted field matching (title 5pts, aliases 4pts, topics 3pts, body 1pt), normalized by document length
- Examples: `profile-core`, `project-vamoagendar`, `practice-server-actions`, etc.

**Validation Pipeline:**
- Purpose: Ensure safety before expensive operations (Turnstile, rate limit, OpenAI)
- Layers (in order):
  1. Origin check (`origemPermitida()` — whitelist + Vercel preview + localhost)
  2. Content-Type and method (`application/json` and `POST`)
  3. Body size limit (`32 KiB` by default)
  4. Request schema (`validarCorpo()` — type-safe parsing)
  5. Turnstile verification (Cloudflare, blocks bots)
  6. Rate limiting (3 buckets: sliding window, per-session daily, per-IP daily)
  7. Budget check (daily and monthly counters)
  8. Answer validation (`validarResposta()` — JSON schema + character limits + fact-checking)

**Rate Limiting Strategy:**
- Sliding window: 8 requests per 600 seconds (10 minutes) per session → prevents rapid-fire spam
- Per-session daily: 15 questions per day → blocks automated abuse per user
- Per-IP daily: 30 questions per day → blocks abuse from single IP (e.g., shared WiFi)
- All use hashed, anonymized keys (SHA256) to protect user privacy

**Caching Strategy:**
- Key: SHA256 hash of `normalized_question|lang|context|knowledge_version` (first 32 chars)
- Indexed by: Normalized question (accents stripped, lowercased, punctuation removed)
- Stored in: Upstash Redis with 7-day TTL
- Invalidation: Knowledge version bump invalidates all cached answers at once
- Cache only: First question in a conversation (no history) and only if `status === 'answered'`
- Hit rate: High (common questions repeat; interface provides 6 pre-filled suggestions)

## Entry Points

**Browser:**
- Location: `src/main.tsx`
- Triggers: User navigates to `https://marciliortiz.dev.br` or `?platform=workana`
- Responsibilities: Render React root, mount `LanguageProvider`, render `App`

**API Handler:**
- Location: `api/ask.ts`
- Triggers: Fetch POST `/api/ask` from `AiChat` component
- Responsibilities: Validate request, check rate limits and budget, call OpenAI, validate response, cache if first question, return result

**Build Process:**
- `pnpm build`: Runs `pnpm knowledge:build` (pre-hook), then `tsc -b && vite build`
- `pnpm knowledge:build`: Executes `scripts/knowledge/build-index.ts` → generates `lib/ai/generated/knowledge-index.ts`
- `pnpm cv:gen [variant]`: Executes `scripts/generate-cv.ts` → renders HTML template → Puppeteer PDF export

**Development Server:**
- `pnpm dev`: Vite dev server with custom middleware plugin (`vite.config.ts` lines 11–59)
  - Mounts the `api/ask` handler locally at `/api/ask` so frontend can call it during development
  - No actual Vercel function running locally; middleware simulates the interface

## Architectural Constraints

- **Threading:** Single-threaded JavaScript event loop (browser and Node.js). Redis operations are async, never block.
- **Global state:** Minimal — only `redis` singleton in `lib/ai/limits.ts` and `lib/ai/cache.ts` (lazy-initialized)
- **Circular imports:** None detected. Libraries in `lib/ai/` are dependency-tree leaves (no lib → lib imports)
- **Synchronous operations only:** All I/O is async/await; no blocking calls
- **Vercel function limits:** 60-second timeout on production functions; AI request timeout is 20 seconds by default (`config.limites.timeoutMs`)
- **No real-time subscriptions:** REST-only; no WebSocket, GraphQL subscriptions, or Server-Sent Events
- **No authentication:** Public portfolio; IP-based rate limiting and Turnstile as abuse prevention (not user auth)

## Anti-Patterns

### Hard-coded Copy in Components

**What happens:** Text values appear in component JSX instead of `src/data/content.ts`
**Why it's wrong:** Breaks the single-source-of-truth contract; copy gets missed during language updates; CV generator can't auto-derive content
**Do this instead:** Add field to `src/data/content.ts` as `ptContent.section.field` and `enContent.section.field`, then access via `const { t } = useLanguage()` and `t.section.field` in the component

### Dynamic Knowledge (Scraping or API-driven)

**What happens:** Fetching project data or user info from external APIs at runtime
**Why it's wrong:** Knowledge must be deterministic and cacheable; external APIs introduce latency and versioning complexity; defeats prefix caching in OpenAI
**Do this instead:** Add facts to `knowledge/approved/*.md` or derive from `src/data/content.ts` at build-time. Run `pnpm knowledge:build` to regenerate index. Knowledge is static, compiled into the function.

### Validation After OpenAI

**What happens:** Calling OpenAI and only then checking if the response is valid (e.g., answerable, in-scope)
**Why it's wrong:** Wasted tokens and latency; bloats budget; poor user experience
**Do this instead:** Validate all request inputs before calling OpenAI (`api/ask.ts` lines 42–109), and validate response after (`validarResposta()` line 158) to catch model failures early

### localStorage for Auth or Secrets

**What happens:** Storing API keys, session tokens, or sensitive data in client-side localStorage
**Why it's wrong:** Data is readable by any script on the page; exposed in browser DevTools
**Do this instead:** Session ID is generated fresh per visitor (not auth), cached in localStorage only for rate-limit grouping. All secrets (OpenAI key, Redis token) stay server-side in `api/ask.ts` and environment variables.

### Mixing Animations and Business Logic

**What happens:** GSAP timelines triggering API calls, state changes, or data fetches
**Why it's wrong:** Animation timing becomes coupled to business logic; hard to test; animations block if logic is slow
**Do this instead:** Animations are pure side effects. `ScrollTrigger` and `gsap.context()` animate DOM only. `AiChat` state changes independently and trigger their own animations (framer-motion or CSS).

## Error Handling

**Strategy:** Fail-closed in production; layered validation before expensive operations.

**Patterns:**
- Request validation errors return `40x` (client's fault): 400 invalid schema, 403 origin not allowed, 413 body too large, 415 wrong Content-Type
- Server-side errors return `50x` (server's fault): 503 service unavailable (OpenAI down, Redis down, disabled), 504 timeout
- All error responses are JSON: `{ error: "codigo_erro", state?: "upstream|disabled|budget|..." }`
- No stack traces or sensitive details in error messages; logging to stdout (structured JSON) instead
- Redis and Turnstile failures are graceful (unless production mode, which fails-closed): operation is barred, not silently retried

**Observable Events (stdout logs):**
- `ask_cache`: Returned cached answer
- `ask`: Successful question answered (with token counts, latency, selected docs)
- `ask_erro`: Request failed (error type, latency)

## Cross-Cutting Concerns

**Logging:** Console (stdout/stderr). Production logs parsed by Vercel; dev logs human-readable. All events are structured JSON for machine parsing.

**Validation:** Three-phase approach:
1. Shape validation (`validarCorpo()`) — is the JSON structure correct?
2. State validation (`dentroDoRateLimit()`, `dentroDoOrcamento()`) — are we allowed to proceed?
3. Output validation (`validarResposta()`) — is the model's answer acceptable?

**Caching:**
- OpenAI prompt caching (prefix-based, handled by SDK)
- Redis response caching (normalized question keys, 7-day TTL)
- Browser localStorage (language preference, session ID)
- Static file caching (Vite + Vercel CDN for `public/` assets)

**Language/Internationalization:**
- Content object with `pt` and `en` keys (parallel structure, no key duplication)
- URL param `?platform=` auto-detects language: Upwork/Freelancer default to English; others default to Portuguese
- localStorage `portfolio-lang` persists user's choice
- Components read from `t = useLanguage().t` and never hardcode strings

---

*Architecture analysis: 2026-08-05*
