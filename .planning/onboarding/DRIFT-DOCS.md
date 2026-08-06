# Auditoria de drift — documentação vs. código

**Data:** 2026-08-05
**Commit auditado:** `60dd85a` (branch `feat/marcilio-ia`)
**Motivo:** antes do `/gsd-ingest-docs`, verificar quais documentos ainda descrevem o código real. O projeto não usava sistema de planejamento: planejava-se, gerava-se um `.md`, implementava-se parte, mexia-se no código — e o `.md` não era atualizado.

**Regra de uso:** nenhum documento abaixo deve ser ingerido como decisão travada sem aplicar as correções listadas. Ingerir cru grava como "decidido" aquilo que já foi mudado.

## Duas categorias distintas — não confundir

Esta auditoria separa dois tipos de divergência, que exigem tratamentos opostos:

- **ERRO FACTUAL** — o documento afirma algo sobre o código que é falso hoje (ex.: "janela de 6 mensagens" quando são 20). Precisa ser corrigido no documento. Não é decisão, é descrição errada.
- **ESCOPO ABERTO** — o documento planeja algo que ainda não foi construído. Não é erro: é backlog válido, e o autor pode mudar de ideia. Deve ser preservado como intenção, nunca "corrigido" para fora do documento nem tratado como decisão fechada.

A distinção importa porque a spec da Marcilio IA é um **plano ainda em aberto**, não um registro do que foi entregue.

---

## Veredito por documento

| Documento | Veredito | Ação antes de ingerir |
|---|---|---|
| `docs/superpowers/specs/2026-08-05-marcilio-ia-design.md` | **PLANO ATIVO**, parcialmente implementado | Corrigir só os números e o status do cabeçalho; preservar o escopo não construído como backlog aberto |
| `docs/ai-operacao.md` | MUITO DEFASADO | Corrigir a lista das "cinco camadas" |
| `docs/PLANO-MOBILE-FIRST.md` | **ENCERRADO** — escopo restante descartado | Arquivar. Não gerar backlog a partir dele |
| `docs/ia-fluxo.md` | PARCIALMENTE DEFASADO | Corrigir 3 números; resolver inconsistência interna |
| `docs/superpowers/plans/2026-08-02-imagens-cases.md` | **ENCERRADO** — Task 9 descartada | Arquivar. Não gerar backlog a partir dele |
| `docs/superpowers/specs/2026-07-30-imagens-cases-design.md` | **ENCERRADO** | Arquivar |
| `docs/superpowers/handoff-antigravity.md` | OBSOLETO | Arquivar. A pendência que ele descrevia foi descartada junto |
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

## Spec da Marcilio IA — plano ativo, não finalizado

**Status confirmado pelo autor (2026-08-05): a feature não está finalizada. O escopo planejado continua valendo, e ainda pode mudar.**

Portanto este documento **não** deve ser tratado como registro do que foi entregue, nem ter seu escopo pendente removido. As três categorias abaixo são diferentes.

### ERRO FACTUAL — corrigir no documento

Só isto está errado: os números da tabela acima (janela de histórico, corpo da requisição, contexto, documentos, projetos indexados, origin allowlist) e o cabeçalho, que ainda diz *"Nenhuma linha de implementação escrita"* quando a feature está em produção na branch `feat/marcilio-ia`.

### ESCOPO ABERTO — preservar como backlog, sujeito a mudança

Planejado, ainda não construído. Não é falha do documento:

- **§16 Analytics/PostHog** — não há `lib/ai/analytics.ts` nem chamada PostHog em `api/ask.ts`.
- **§18 Fallback curado** (5 pares pt/en) — `aiChat` em `content.ts` só tem mensagens de erro genéricas.
- **§20 Testes** (`vitest`, `tests/`, `pnpm test`) — nenhum framework instalado. Os scripts `pnpm ai:matriz`, `ai:seguranca` e `ai:conversa` existem e cobrem parte da intenção, mas de forma avulsa; não está claro se substituem a suíte ou são um passo intermediário — **decisão em aberto do autor**.
- **Anti-replay do Turnstile** (`SETNX turnstile:<sha256(token)>`, TTL 300s) — ausente em `lib/ai/turnstile.ts`.
- **Dossiê** — planejado com 9 arquivos em `knowledge/approved/`, existem 5 (`core-profile`, `ai-workflow`, `career-goals`, `without-ai`, `projects/vamoagendar`). Faltam: `education`, `freelance-work`, `teamwork`, `availability`, `projects/avantis`.

### DIVERGÊNCIA DE IMPLEMENTAÇÃO — confirmar intenção antes de agir

O código resolveu de outro jeito e **já funciona**. Não sabemos se foi decisão consciente ou desvio; o documento não registra a troca. Não "consertar" nenhum destes sem confirmar com o autor:

- `lib/ai/sources.ts` (allowlist id→label/href) → label e href vivem por documento em `scripts/knowledge/build-index.ts`.
- `lib/ai/openai.ts` como módulo dedicado → a chamada ficou inline em `api/ask.ts`.
- Índice `knowledge-index.json` commitado → gerado como `.ts`.

### NÃO PREVISTO NO DOC — incorporar ao plano

O cache Redis (`lib/ai/cache.ts`, TTL 7 dias, acionado só na primeira pergunta da conversa) nasceu depois do documento e não aparece em lugar nenhum dele — inclusive o diagrama de fluxo de 11 passos o ignora. Como a feature segue em aberto, vale adicioná-lo ao plano em vez de deixá-lo como conhecimento tácito do código.

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

**Marcilio IA — ÚNICA FRENTE ABERTA.** O autor declarou explicitamente que ainda não finalizou. Ver a seção da spec acima: o escopo em aberto (analytics, fallback curado, testes, anti-replay, 4 documentos do dossiê) segue válido como plano e pode ser revisto.

As duas frentes abaixo foram **encerradas por decisão do autor (2026-08-05)**. O escopo remanescente descrito nos documentos foi descartado — não é pendência, não deve virar item de roadmap, e o código estar diferente do plano não é defeito. Registrado aqui apenas para que uma leitura futura do código não interprete a diferença como regressão.

**Imagens dos cases — ENCERRADO.** Entregue: pipeline de captura, `CaseFrame.tsx`, contrato `media` pt/en, coluna de shots no desktop, thumb no `ArchiveOverlay`, vídeo do VamoAgendar, e integração de 5 casos (`vamoagendar`, `catalogo-corretor`, `sisco`, thumbs de `avantis` e `jogo-matematica` — 10 ocorrências de `media:` em `content.ts`, 5 projetos × pt/en).

Descartado: campos `media` e assets para Sushi do Verão, KyteApp Scrapper, Storage Crates, Simple Machines e Voxel Engine ("mine"). Não há arquivos correspondentes em `public/cases/`, e isso é intencional.

**Mobile-first — ENCERRADO.** Entregue do P0: colisão navbar/hero (`Hero.tsx:157`), foto do hero como camada de fundo (`Hero.tsx:262-275`), alvos de toque ≥48px em `pointer: coarse` (`index.css:391-411`), envelope `prefers-reduced-motion` (`index.css:419-426` + `gsap.matchMedia` por componente), imagens responsivas `<picture>` AVIF/WebP com `preload`.

Descartado: todo o bloco P1 (barra de ação fixa, cartão compacto com "ler a história", chips de era roláveis, seletor de idioma visível, reordenação do caso freelance) e os itens P0 residuais. Consequências que permanecem no código **por decisão, não por esquecimento**: breakpoint inconsistente — `Contact.tsx:32,121,338` e `DevProcess.tsx:26` cortam em 767/768 enquanto o resto usa 1023/1024; `setLanguage` nunca é chamado por nenhum componente, logo não há troca de idioma na UI; `ArchiveOverlay.tsx:70` recarrega via `window.location.href`; `index.html:2` tem `lang="pt-BR"` fixo; `public/icone-avantis-2.png` (1,6 MB) segue órfão.

---

*Auditoria conduzida por cinco agentes em paralelo, com os achados numéricos e estruturais reconferidos diretamente no código.*
