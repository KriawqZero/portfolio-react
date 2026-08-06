# Technology Stack

**Analysis Date:** 2026-08-05

## Languages

**Primary:**
- TypeScript 5.8.3 - Full codebase (frontend, API, scripts)

**Secondary:**
- JSON - Configuration (vite.config.ts, vercel.json, tsconfig.*.json)
- Markdown - Knowledge base documents in `knowledge/`

## Runtime

**Environment:**
- Node.js ES2023+ (Vercel Functions serverless runtime)
- Web Browser (Chromium ES2023+)

**Package Manager:**
- pnpm 10.32.0
- Lockfile: pnpm-lock.yaml (committed)

## Frameworks

**Core:**
- React 19.1.0 - SPA, frontend rendering
- React DOM 19.1.0 - DOM mounting

**Build & Development:**
- Vite 7.0.0 - Frontend bundler, dev server with custom API middleware
- TypeScript 5.8.3 - Type checking (tsc -b)
- @vitejs/plugin-react-swc 3.10.2 - SWC transpilation for Vite

**Animation & Interaction:**
- GSAP 3.15.0 - Scroll-driven animations via ScrollTrigger
- Lenis 1.3.25 - Smooth scrolling (synced with GSAP via custom ticker)
- Framer Motion 12.35.2 - Staggered reveal animations (responses, sources)

**Code Quality:**
- ESLint 9.29.0 - Linting
- @eslint/js 9.29.0 - ESLint rules
- eslint-plugin-react-hooks 5.2.0 - React best practices
- eslint-plugin-react-refresh 0.4.20 - Vite refresh validation
- typescript-eslint 8.34.1 - TypeScript linting
- globals 16.2.0 - Global variable definitions

## Key Dependencies

**Critical - LLM & AI:**
- openai 7.4.0 - OpenAI API client, structured JSON responses via JSON Schema
  - Used in: `api/ask.ts` for gpt-5.6-terra model
  - Features: Prompt caching (prefix cache), reasoning tokens, safety identifier hashing

**Critical - Infrastructure & Rate Limiting:**
- @upstash/redis 1.38.2 - Redis client (REST-based)
  - Used in: `lib/ai/cache.ts`, `lib/ai/limits.ts`
  - Purpose: Response cache, rate limit counters, daily/monthly budget tracking, kill switch
- @upstash/ratelimit 2.0.8 - Rate limiter with Upstash Redis backend
  - Implements: Sliding window (8 requests/600s), fixed window per session (15/day), per IP (30/day)

**Build & Generation:**
- puppeteer 25.3.0 - Headless Chrome for PDF generation
  - Used in: `scripts/generate-cv.ts` for CV PDF variants
  - Purpose: HTML-to-PDF with Google Fonts, QR code embedding, page preference CSS
- qrcode 1.5.4 - QR code generation
  - Used in: `scripts/generate-cv.ts` for estagio CV variant
- sharp 0.35.3 - Image processing
  - Used in: `scripts/optimize-images.ts` for hero photo AVIF/WebP variants

**Server Runtime:**
- @vercel/node 5.9.5 - Vercel Functions type definitions and utilities
  - Used in: `api/ask.ts` (VercelRequest, VercelResponse types)

**Icons:**
- react-icons 5.7.0 - Icon library (various packs)

**Development Utilities:**
- tsx 4.23.0 - TypeScript executor for scripts
  - Used for: CV generation, image optimization, AI testing scripts
- @types/node 26.1.2 - Node.js type definitions
- @types/react 19.1.8 - React type definitions
- @types/react-dom 19.1.6 - React DOM type definitions
- @types/qrcode 1.5.6 - QRCode type definitions

## Configuration

**Environment:**
- Development: `.env.local` (not committed, via .gitignore)
- Example: `.env.example` with all required variable names and defaults
- Secret handling: Explicit via `process.env` with fallbacks; no dotenv file read in production
- Key vars:
  - `OPENAI_API_KEY` - OpenAI project key
  - `OPENAI_MODEL` - Model selector (gpt-5.6-terra default)
  - `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` - Redis access
  - `TURNSTILE_SECRET_KEY` - Cloudflare verification secret (server-side only)
  - `VITE_TURNSTILE_SITE_KEY` - Cloudflare public key (embedded in bundle)
  - AI limits: `AI_MAX_MESSAGE_CHARACTERS`, `AI_MAX_HISTORY_MESSAGES`, etc.
  - Rate limits: `AI_RATE_LIMIT_REQUESTS`, `AI_SESSION_DAILY_LIMIT`, etc.
  - `VERCEL_ENV` - Deployment environment (production/preview/development)

**Build:**
- `tsconfig.json` - References child configs
- `tsconfig.app.json` - React/Vite frontend (ES2023, strict)
- `tsconfig.node.json` - Node tooling scripts
- `tsconfig.api.json` - Vercel Functions (ES2023, bundler mode, strict)
- `vite.config.ts` - Vite + custom API dev middleware plugin
- `eslint.config.js` - ESLint flat config
- `vercel.json` - Vercel Functions config (30s timeout for /api/ask)

## Platform Requirements

**Development:**
- Node.js 18+ (pnpm requires it)
- pnpm 10.32.0+
- Modern browser (ES2023 support)
- Puppeteer dependency: Chromium (downloaded automatically)

**Production:**
- Vercel platform for serverless Functions
- Vercel builds via TypeScript compilation (tsc -b) + Vite bundle
- Deployment target: Vercel serverless infrastructure
- Edge: Functions run in Vercel's Node.js runtime (30s timeout)

---

*Stack analysis: 2026-08-05*
