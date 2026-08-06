# External Integrations

**Analysis Date:** 2026-08-05

## APIs & External Services

**LLM - OpenAI:**
- OpenAI API (gpt-5.6-terra) - Primary service for "Marcilio IA" chat responses
  - SDK: openai (v7.4.0)
  - Auth: `OPENAI_API_KEY` (server env var)
  - Endpoint: `api/ask.ts` POST handler
  - Features used:
    - Structured JSON responses via JSON Schema strict mode
    - Prompt caching (prefix cache key includes language and knowledge version)
    - Reasoning tokens (configurable effort: none|low|medium|high)
    - Safety identifier (hashed, anonymous session tracking)
  - Limits: Configurable max output tokens (350 default), timeout (20s default)
  - Production fallback: Spending limit configured in OpenAI project dashboard

**Bot Detection - Cloudflare Turnstile:**
- Cloudflare Turnstile - Invisible CAPTCHA verification before API calls
  - SDK: JavaScript SDK (loaded on-demand from `https://challenges.cloudflare.com/turnstile/v0/api.js`)
  - Site key: `VITE_TURNSTILE_SITE_KEY` (public, embedded in bundle)
  - Secret: `TURNSTILE_SECRET_KEY` (server-side only in `lib/ai/turnstile.ts`)
  - Implementation:
    - Frontend: `src/hooks/useTurnstile.ts` renders invisible widget on section visibility
    - Backend: `lib/ai/turnstile.ts` verifies token with Cloudflare endpoint
  - Behavior:
    - Lazy-loads script when AI section scrolls into view (400px margin)
    - Generates new token per question (1-time use)
    - Fails closed in production (refuses requests without valid token)
    - Skippable in development (controlled by `AI_SKIP_TURNSTILE`)

## Data Storage

**Databases:**
- No traditional database (PostgreSQL, MongoDB, etc.)
- All state is ephemeral (no user accounts or persistent data)

**Redis - Upstash:**
- Upstash Redis (REST-based, serverless)
  - Connection: REST URL (`UPSTASH_REDIS_REST_URL`) + Bearer token (`UPSTASH_REDIS_REST_TOKEN`)
  - Client: @upstash/redis (v1.38.2)
  - Purpose:
    - **Response cache**: Stores validated AI answers, keyed by (question + language + context + knowledge_version)
      - TTL: 7 days default (`AI_ANSWER_CACHE_TTL_SECONDS`)
      - Normalization: Accent-insensitive, case-insensitive, punctuation-stripped for matching
      - Only caches successful answers (status='answered'), not refusals
    - **Rate limiting**: Three-tier sliding/fixed window limiters
      - Sliding: 8 requests per 600 seconds per session
      - Fixed daily: 15 requests per session ID, 30 per IP address
    - **Budget tracking**: Daily and monthly counters
      - Daily: Incremented and checked before OpenAI call
      - Monthly: Separate counter with automatic TTL cleanup
      - Kill switch: `ai:kill` key can disable all requests without redeployment
  - Hashing: SHA-256 hash of (session ID or IP) + `RATE_LIMIT_HASH_SECRET` for anonymous tracking
  - Usage: `lib/ai/cache.ts`, `lib/ai/limits.ts`

**File Storage:**
- Local filesystem only
  - Generated PDFs: `./cv-output/` (via `scripts/generate-cv.ts`)
  - Optimized images: `./public/generated/` (via `scripts/optimize-images.ts`)
  - Knowledge index: `./lib/ai/generated/knowledge-index.ts` (via `scripts/knowledge/build-index.ts`)

**Caching:**
- Redis (Upstash) for response cache and rate limit state
- In-memory: GSAP ScrollTrigger instances, Lenis scroll context
- Browser localStorage: Session ID persistence (`portfolio-ai-session` key)

## Authentication & Identity

**Auth Provider:**
- None - Single-page public portfolio, no user accounts
- Session tracking: Anonymous, browser-side session ID (UUID)
  - Stored in: `localStorage` under `portfolio-ai-session`
  - Purpose: Rate limit per visitor, tied to daily question limit
- IP tracking: Request IP extracted from `x-forwarded-for` / `x-real-ip` headers
  - Hashed with server secret before rate limiting

## Monitoring & Observability

**Error Tracking:**
- None - No Sentry, Rollbar, or similar

**Logs:**
- Server-side JSON console logs (stdout)
  - `api/ask.ts` emits structured logs: `{ evento, status, modelo, docs[], tokensEntrada, ... }`
  - Used for: Cost tracking, latency monitoring, error diagnosis
  - Sensitive data excluded: No question text, answer text, or IP addresses logged

**Analytics:**
- Not detected in primary codebase
- Note: React-icons loaded but no analytics SDK

## CI/CD & Deployment

**Hosting:**
- Vercel (serverless platform)
  - Frontend: Static site (React SPA built by Vite, deployed to Vercel CDN)
  - API: Functions (Vercel Serverless Functions in Node.js runtime)
  - Timeout: 30 seconds for `/api/ask` (configured in `vercel.json`)

**CI Pipeline:**
- Not detected - Vercel uses git-based deployment
  - On push to main: Automatic build via `pnpm build` (tsc -b && vite build)
  - Build script runs `pnpm knowledge:build` before Vite compilation

**Build Process:**
```bash
pnpm build
  → pnpm knowledge:build (runs scripts/knowledge/build-index.ts)
  → tsc -b (TypeScript compilation)
  → vite build (frontend bundling)
```

## Environment Configuration

**Required env vars (production):**
- `OPENAI_API_KEY` - Critical
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` - Critical (fails closed without them)
- `TURNSTILE_SECRET_KEY` - Critical (bot verification, required in production)
- `VITE_TURNSTILE_SITE_KEY` - Critical (public key, embedded in bundle)
- `RATE_LIMIT_HASH_SECRET` - Recommended (randomness for session hashing)

**Optional env vars (with defaults):**
- `OPENAI_MODEL` - Defaults to `gpt-5.6-terra`
- `AI_REASONING_EFFORT` - Defaults to `low`
- `AI_CHAT_ENABLED` - Defaults to `false` (feature flag)
- `AI_SKIP_TURNSTILE` - Defaults to `false` (ignored in production)
- Various limit variables with conservative defaults (see `.env.example`)

**Secrets location:**
- `.env.local` (development only, not committed)
- Vercel project environment variables (production)
- No secrets committed to git

## Webhooks & Callbacks

**Incoming:**
- None configured

**Outgoing:**
- Cloudflare Turnstile verification: POST to `https://challenges.cloudflare.com/turnstile/v0/siteverify`
- OpenAI API: Streaming/non-streaming calls to OpenAI endpoints

## Knowledge Base & Context

**Knowledge Retrieval System:**
- Static, built-time indexed knowledge base (not a vector DB)
- Sources:
  - `knowledge/approved/` - Hand-written markdown documents
  - `src/data/content.ts` - Portfolio content (auto-indexed)
- Built by: `scripts/knowledge/build-index.ts`
- Output: `lib/ai/generated/knowledge-index.ts` (static TypeScript file with KNOWLEDGE export)
- Retrieval: Simple string matching on question vs document titles/content
- Limit: Max 4 documents per query, 6000 characters of context
- Used in: `lib/ai/retrieval.ts` for selecting relevant docs before OpenAI call

**Policies:**
- Stored in `knowledge/policies/` as markdown
- Baked into system instructions (not retrieved, every prompt includes them)
- Purpose: Scope, refusal policy, and behavioral guidelines

---

*Integration audit: 2026-08-05*
