# Marcilio IA — operação

Estado atual: **fatia vertical**. Funciona de ponta a ponta, mas ainda **não tem
Turnstile, Redis nem teto global de gasto**. Por isso ela só deve rodar em
preview. Não ligue no domínio público antes da próxima fase.

## Como ligar e desligar

A IA é controlada por uma variável de ambiente na Vercel:

```
AI_CHAT_ENABLED=true    # liga
AI_CHAT_ENABLED=false   # desliga
```

Mudar a variável exige um redeploy para valer. Com a IA desligada, a seção
continua na página: o visitante vê a apresentação e as perguntas sugeridas, e
recebe um aviso discreto se tentar perguntar.

Para desligar de imediato, sem esperar deploy, o caminho é o Attack Challenge
Mode do firewall (afeta o site inteiro, use só em incidente):

```bash
vercel firewall attack-mode enable --duration 1h
vercel firewall attack-mode disable --yes
```

O desligamento instantâneo por chave no Redis entra junto com o Redis, na
próxima fase.

## Rodar local

A chave fica em `.env.local` (ignorado pelo Git). O dev server do Vite monta o
mesmo handler de `/api/ask`, então o front usa o mesmo caminho de produção:

```bash
AI_CHAT_ENABLED=true node --env-file=.env.local node_modules/vite/bin/vite.js
```

Conversar pelo terminal, sem navegador:

```bash
AI_CHAT_ENABLED=true npx tsx --env-file=.env.local scripts/ai/perguntar.ts "como você usa IA?"
```

## Mexer no que a IA sabe

O dossiê fica em `knowledge/approved/`. Cada arquivo é um Markdown com
frontmatter; `approved: true` e `visibility: public` são obrigatórios, senão o
build falha.

Os projetos **não** são escritos à mão: saem de `src/data/content.ts`, o mesmo
arquivo que alimenta o site. Mudou o site, mudou a IA.

Depois de editar qualquer um dos dois:

```bash
pnpm knowledge:build
```

Isso regenera `lib/ai/generated/knowledge-index.ts`, que é commitado. O
`pnpm build` roda isso sozinho antes de compilar.

`knowledge/inbox/` é para rascunho não revisado. Está fora do Git e nada de lá
chega ao modelo.

## Conferir comportamento

```bash
pnpm ai:matriz            # 30+ perguntas adversariais, custa dinheiro
pnpm ai:matriz injecao    # só um grupo
pnpm ai:shot              # capturas da seção em desktop e mobile
```

A matriz confere o que dá para conferir por programa (status, ausência de link,
encaminhamento para contato humano). Tom e factualidade são julgamento seu.

## Custo

Cada resposta usa ~2.100 tokens de entrada e ~140 de saída, com latência
mediana de 2,1s. Confira o valor real no painel da OpenAI depois da primeira
semana — a estimativa em reais só vale depois disso.

## O que este sistema não é

Não é à prova de jailbreak. Alguém, em algum momento, vai conseguir fazer a IA
quebrar o personagem. Isso é aceitável porque o pior caso é constrangimento:

- não existe informação sensível no contexto dela;
- ela não tem ferramenta, credencial nem acesso a sistema nenhum;
- não há qualquer conexão com o Jarvis ou o OpenClaw;
- a resposta é validada no servidor antes de chegar à tela, e nenhuma URL
  inventada pelo modelo passa.

Se aparecer um print de resposta estranha, a correção é no dossiê ou no prompt,
não em pânico.
