# Auditoria de drift — documentação vs. código

**Data:** 2026-08-05
**Commit auditado:** `60dd85a` (branch `feat/marcilio-ia`)
**Motivo:** antes do `/gsd-ingest-docs`, verificar quais documentos ainda descrevem o código real. O projeto não usava sistema de planejamento: planejava-se, gerava-se um `.md`, implementava-se parte, mexia-se no código — e o `.md` não era atualizado.

**Regra de uso:** nenhum documento abaixo deve ser ingerido como decisão travada sem aplicar as correções listadas. Ingerir cru grava como "decidido" aquilo que já foi mudado.

---

## Veredito por documento

| Documento | Veredito | Ação antes de ingerir |
|---|---|---|
| `docs/superpowers/specs/2026-08-05-marcilio-ia-design.md` | MUITO DEFASADO | Corrigir números; marcar 3 seções como nunca construídas |
| `docs/ai-operacao.md` | MUITO DEFASADO | Corrigir a lista das "cinco camadas" |
| `docs/PLANO-MOBILE-FIRST.md` | PARCIALMENTE DEFASADO (~25–30% executado) | Marcar o que já foi feito antes de replanejar |
| `docs/ia-fluxo.md` | PARCIALMENTE DEFASADO | Corrigir 3 números; resolver inconsistência interna |
| `docs/superpowers/plans/2026-08-02-imagens-cases.md` | PARCIALMENTE DEFASADO | Tasks 1–8 feitas; só Task 9 é pendência real |
| `docs/superpowers/specs/2026-07-30-imagens-cases-design.md` | PARCIALMENTE DEFASADO | Anotar entrega parcial na tabela de escopo |
| `docs/superpowers/handoff-antigravity.md` | OBSOLETO | Arquivar o texto; preservar a pendência residual |
| `CLAUDE.md` | PARCIALMENTE DEFASADO | Corrigir com prioridade (ver abaixo) |
| `README.md` | PARCIALMENTE DEFASADO | Corrigir quando conveniente |

---

## Números divergentes (verificados no código)

| Parâmetro | Valor nos docs | Valor real | Evidência |
|---|---|---|---|
| `AI_MAX_HISTORY_MESSAGES` | 6 mensagens | **20** | `lib/ai/config.ts:37` |
| `AI_MAX_BODY_BYTES` | 8 KB | **32 KB** (32768) | `lib/ai/config.ts:70` |
| `AI_MAX_CONTEXT_CHARACTERS` | 9000 | **6000** | `lib/ai/config.ts:56` |
| `AI_MAX_DOCUMENTS` | "3 a 6" | **4** | `lib/ai/config.ts:59` |
| Projetos no índice de conhecimento | 20 | **15** | `lib/ai/generated/knowledge-index.ts:504-518` |
| Origin allowlist | só `www.` | **`www.` + ápice** | `lib/ai/config.ts:79` |

Esses valores mudaram nos commits `48b8ea9` ("corta 34% da entrada por pergunta") e `60dd85a` ("janela de conversa de 20 mensagens e cache só na primeira pergunta"), posteriores aos documentos.

**Inconsistência interna em `docs/ia-fluxo.md`:** a seção 2 (linha 76) diz corretamente 32 KB, mas a seção 3 / Porta 1 (linha 110) ainda diz 8 KB. A Porta 1 não foi atualizada quando o limite subiu.

---

## Spec da Marcilio IA — o que nunca foi construído

O documento descreve como decidido três blocos que não existem no código:

- **§16 Analytics/PostHog** — não há `lib/ai/analytics.ts` nem chamada PostHog em `api/ask.ts`.
- **§18 Fallback curado** (5 pares pt/en em `content.ts`) — `aiChat` só tem mensagens de erro genéricas.
- **§20 Testes** (`vitest`, `tests/`, `pnpm test`, `pnpm ai:eval`) — nenhum framework de teste instalado.

Substituído por outra solução (o doc não registra a troca):

- `lib/ai/sources.ts` (allowlist id→label/href) → label e href vivem por documento em `scripts/knowledge/build-index.ts`.
- `lib/ai/openai.ts` como módulo dedicado → a chamada ficou inline em `api/ask.ts`.
- `tests/adversarial.ts` + `pnpm ai:eval` → scripts avulsos `pnpm ai:matriz`, `ai:seguranca`, `ai:conversa`.
- Índice `knowledge-index.json` commitado → gerado como `.ts`.
- Anti-replay do Turnstile (`SETNX turnstile:<sha256>`) → não implementado.

Dossiê planejado com 9 arquivos em `knowledge/approved/`; existem 5 (`core-profile`, `ai-workflow`, `career-goals`, `without-ai`, `projects/vamoagendar`).

Uma camada inteira nasceu depois do doc e não aparece nele: o cache Redis (`lib/ai/cache.ts`, TTL 7 dias, só na primeira pergunta da conversa).

---

## CLAUDE.md — a correção mais urgente

É o documento que dita as regras para qualquer agente de IA que trabalhe neste repositório, então o drift aqui se propaga para todo trabalho futuro.

- Não menciona a feature de IA — `AiChat`, `api/ask.ts`, os 9 arquivos de `lib/ai/`, `knowledge/`, o rate limit Upstash.
- Descreve a stack de animação como GSAP + Lenis e **omite `framer-motion`**, que é dependência real usada em 6 arquivos (`src/main.tsx`, `Navbar.tsx`, `Hero.tsx`, `Trajectory.tsx`, `DevProcess.tsx`, `AiChat.tsx`).
- A ordem das seções omite `AiChat`. Real: Hero → FreelanceProjects (condicional) → AboutMe → Trajectory → Avantis → DevProcess → **AiChat** → Contact (`src/App.tsx:93-100`).
- Documenta 2 variantes de CV (`estagio`, `ats`); existem **8** (`scripts/generate-cv.ts:12-29`): `estagio`, `ats`, `estagio-en`, `ats-en`, `suporte-ti`, `suporte-ti-visual`, `software-jr`, `software-jr-visual`.
- Omite os scripts `prebuild`/`knowledge:build` (rodam antes de todo build), `img:gen`, `capture` e os sete `ai:*`.
- Segue **correto**: "no test suite", regra do `pnpm`, sistema de conteúdo em `content.ts`, `useLanguage`, regras de GSAP, accent `#6D4AFF`.

`README.md` tem o mesmo padrão: não cita a seção de IA e afirma que o projeto não usa bibliotecas pesadas de UI, sem mencionar `framer-motion`.

---

## Trabalho real ainda pendente (não é drift — é backlog)

**Imagens dos cases (Task 9 do plano de 2026-08-02).** Tasks 1–8 estão feitas: pipeline de captura, `CaseFrame.tsx`, contrato `media` pt/en, coluna de shots no desktop, thumb no `ArchiveOverlay`, vídeo do VamoAgendar. Da Task 9, só o SISCO foi integrado. Faltam campos `media` e assets para: Sushi do Verão, KyteApp Scrapper, Storage Crates, Simple Machines, Voxel Engine ("mine").

**Plano mobile-first.** Boa parte do P0 foi feita (colisão navbar/hero, foto do hero como camada de fundo, alvos de toque ≥48px, `prefers-reduced-motion`, imagens responsivas com `<picture>`). O núcleo P1 — o ritmo mobile — segue inteiro pendente: barra de ação fixa, cartão compacto com "ler a história", chips de era roláveis, seletor de idioma visível, reordenação do caso freelance. Persistem também o breakpoint inconsistente (`Contact.tsx` e `DevProcess.tsx` cortam em 767/768 enquanto o resto usa 1023/1024), `window.location.href` no reload do Arquivo, `lang="pt-BR"` fixo, e `public/icone-avantis-2.png` (1,6 MB) órfão.

---

*Auditoria conduzida por cinco agentes em paralelo, com os achados numéricos e estruturais reconferidos diretamente no código.*
