# Marcilio IA — operação

## A camada mais importante não está neste código

Antes de qualquer coisa, configure no painel da OpenAI, no projeto isolado do
portfólio: **um limite de gasto (spend limit) e um alerta por e-mail**.

Todas as proteções abaixo são código meu, e código falha. O limite de gasto da
OpenAI é a única camada que continua valendo se tudo aqui der errado ao mesmo
tempo. Com ele, o pior caso possível é o valor que você escolheu — nunca uma
surpresa na fatura.

## As cinco camadas antes de gastar um centavo

Nesta ordem, e nada chega na OpenAI sem passar por todas:

1. **Forma da requisição** — só POST, só JSON, só origem conhecida, corpo até
   32 KB, pergunta até 500 caracteres, histórico até 20 mensagens.
2. **Kill switch** — variável de ambiente ou chave no Redis.
3. **Turnstile** — token verificado com a Cloudflare a cada pergunta, e queimado
   no Redis antes disso: token repetido é recusado sem ida à rede.
4. **Rate limit** — 8 perguntas por 10 minutos, 15 por sessão/dia, 30 por
   IP/dia. IP nunca é gravado em claro: vira hash com segredo do servidor.
5. **Teto global** — 100 perguntas/dia e 1000/mês somando todos os visitantes.

Uma sexta camada não protege dinheiro, protege a conversa: o **cache** devolve
na hora a resposta já dada para a mesma primeira pergunta, sem chamar a OpenAI.

Os valores acima são os padrões de `lib/ai/config.ts`, que é quem manda — este
documento é leitura, não fonte.

Em produção, **falta de Redis ou de Turnstile bloqueia a IA**. Não existe modo
degradado que gaste dinheiro: sem contador confiável não há teto, e sem teto a
resposta correta é não chamar a OpenAI.

Conferir tudo isso, de graça, sem chamar a OpenAI:

```bash
pnpm ai:seguranca
```

## Como ligar e desligar

A IA é controlada por uma variável de ambiente na Vercel:

```
AI_CHAT_ENABLED=true    # liga
AI_CHAT_ENABLED=false   # desliga
```

Mudar a variável exige um redeploy para valer. Com a IA desligada, a página `/ia`
continua no ar: o visitante vê a apresentação e as perguntas sugeridas, e ao
perguntar recebe o aviso mais as respostas pré-escritas do fallback curado.

Para desligar de imediato, sem esperar deploy, o caminho é o Attack Challenge
Mode do firewall (afeta o site inteiro, use só em incidente):

```bash
vercel firewall attack-mode enable --duration 1h
vercel firewall attack-mode disable --yes
```

Desligamento **instantâneo**, sem esperar deploy:

```bash
# desliga
curl -X POST "$UPSTASH_REDIS_REST_URL/set/ai:kill/1" -H "Authorization: Bearer $UPSTASH_REDIS_REST_TOKEN"
# religa
curl -X POST "$UPSTASH_REDIS_REST_URL/del/ai:kill"   -H "Authorization: Bearer $UPSTASH_REDIS_REST_TOKEN"
```

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
pnpm ai:shot              # capturas da página /ia em desktop e mobile
```

A matriz confere o que dá para conferir por programa (status, ausência de link,
encaminhamento para contato humano). Tom e factualidade são julgamento seu.

## Custo

Cada resposta usa ~2.100 tokens de entrada e ~140 de saída, com latência
mediana de 2,1s. Confira o valor real no painel da OpenAI depois da primeira
semana — a estimativa em reais só vale depois disso.

### O que já foi otimizado

Medido com `pnpm ai:custo`, que mostra a composição real de uma resposta:

- **Raciocínio: zero tokens.** Com `AI_REASONING_EFFORT=low` o modelo não gasta
  tokens invisíveis de raciocínio, que seriam cobrados como saída. Subir esse
  valor é a forma mais rápida de dobrar a conta sem melhorar a resposta.
- **Entrada caiu de 2.162 para 1.420 tokens** por pergunta (−34%): o perfil e o
  índice de projetos saíram do bloco variável e foram para as instruções, e o
  limite passou de 6 para 4 documentos. A matriz continuou passando.
- **Prefixo em cache:** com `prompt_cache_key`, chamadas seguidas reaproveitam o
  prefixo — na medição, 1.417 dos 1.420 tokens vieram cacheados, com desconto.
  Só vale quando há chamadas próximas no tempo; o cache expira em minutos.
- **Cache de respostas no Redis:** pergunta repetida não chega na OpenAI. Como
  as seis sugestões da interface concentram a maior parte do volume, esse é o
  corte que mais pesa em produção.

Se precisar cortar mais, na ordem de melhor retorno: trocar `OPENAI_MODEL` para
`gpt-5.6-luna`, reduzir `AI_MAX_DOCUMENTS` para 3, e baixar
`AI_MAX_OUTPUT_TOKENS`. Rode `pnpm ai:matriz` depois de cada mudança — economia
que piora a resposta não é economia.

Quanto já foi consumido dos tetos:

```bash
pnpm ai:stats
```

Se o teto do dia estourar e você quiser reabrir antes da virada:

```bash
curl -X POST "$UPSTASH_REDIS_REST_URL/del/ai:orcamento:d:$(date -u +%F)" -H "Authorization: Bearer $UPSTASH_REDIS_REST_TOKEN"
```

## Antes de ligar no domínio público

Rode primeiro `pnpm ai:prontidao`, que confere a lista de variáveis e explica o
que cada ausência provoca. Para conferir produção, traga as variáveis antes com
`vercel env pull .env.local`; para conferir o que já está no ar,
`pnpm ai:prontidao https://www.marciliortiz.dev.br` — ele envia uma requisição
sem token do Turnstile, que morre antes da OpenAI e por isso não custa nada.

- [ ] limite de gasto e alerta configurados no projeto da OpenAI
- [ ] banco Upstash criado e as duas variáveis na Vercel
- [ ] widget Turnstile criado, domínio registrado, as duas chaves na Vercel
- [ ] `RATE_LIMIT_HASH_SECRET` gerado (`openssl rand -hex 32`)
- [ ] `pnpm ai:seguranca` passando
- [ ] `pnpm ai:matriz` revisado por você
- [ ] `AI_CHAT_ENABLED=true` — exatamente essa string; qualquer outro valor
      mantém a IA desligada, e é o erro de deploy mais silencioso da lista
- [ ] `VITE_TURNSTILE_SITE_KEY` presente **no build**, não só no runtime: ela
      entra no bundle do navegador, então adicioná-la depois exige um build
      novo, não apenas um redeploy

### O que barra sozinho em produção

Estas três não degradam, param a requisição — é decisão, não bug:

| Ausência | Resposta | Por quê |
|---|---|---|
| Redis | `503 sem_contadores` | sem contador não existe teto de gasto |
| `RATE_LIMIT_HASH_SECRET` | `503 sem_segredo_hash` | sem sal, `sha256(ip)` é reversível: o espaço de IPv4 inteiro são 4 bilhões de entradas, e o "anônimo" do rate limit deixa de existir |
| `TURNSTILE_SECRET_KEY` | `503 verificacao_indisponivel` | sem verificação, qualquer script bate no endpoint pago |

### Origens aceitas

Em produção, apenas `marciliortiz.dev.br` e `www.marciliortiz.dev.br`. Previews
da Vercel e `localhost` só passam fora de produção — criar um projeto em
`*.vercel.app` é gratuito, e aceitá-los no ambiente que gasta dinheiro seria
deixar qualquer pessoa embutir esta IA no próprio site com a conta correndo aqui.

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

## Ler as perguntas

Toda pergunta que passa das camadas de contenção é gravada num Postgres no
Railway, projeto `portfolio-marciliortiz`, tabela `perguntas`. Ligar e desligar
é a variável `DATABASE_URL` nas variáveis de produção da Vercel: sem ela o
registro vira no-op, sem deploy nenhum. Ela **não** pode levar `?sslmode=require`
— o porquê está comentado em `lib/ai/registro.ts`.

Só grava o que chegou a ser processado: sucesso, resposta vinda do cache e falha
da OpenAI. Recusa por origem, Turnstile ou rate limit não grava, de propósito —
essas portas existem para recusar barato.

As consultas que resolvem quase tudo:

```sql
-- O que andaram perguntando
select criado_em, idioma, contexto, pergunta, status, erro
from perguntas
order by criado_em desc
limit 50;

-- Uma conversa inteira, na ordem
select criado_em, pergunta, resposta, documentos
from perguntas
where sessao = '<cole o id da sessão>'
order by criado_em;

-- Quem mais perguntou (por origem, que é hash de IP — não identifica ninguém)
select origem, count(*) as perguntas, count(distinct sessao) as sessoes,
       min(criado_em) as primeira, max(criado_em) as ultima
from perguntas
group by origem
order by perguntas desc
limit 20;

-- O que a IA não conseguiu responder
select criado_em, pergunta, status, erro
from perguntas
where erro is not null or status <> 'answered'
order by criado_em desc;

-- Onde a busca pode ter errado: respondeu sem documento nenhum do dossiê
select criado_em, pergunta, status
from perguntas
where cache = false and coalesce(array_length(documentos, 1), 0) = 0
order by criado_em desc;

-- As continuações oferecidas, para julgar se estão boas
select criado_em, pergunta, continuacoes
from perguntas
where continuacoes is not null
order by criado_em desc
limit 30;

-- Quantas continuações vieram por resposta (o piso do servidor garante 3)
select coalesce(array_length(continuacoes, 1), 0) as quantas, count(*)
from perguntas
group by 1
order by 1;

-- Documentos mais usados: mostra o que sustenta as respostas na prática
select doc, count(*) as vezes
from perguntas, unnest(documentos) as doc
group by doc
order by vezes desc;
```

### Apagar

Não existe descarte automático — é decisão do autor, e a limpeza é manual.
A coluna `pergunta` guarda texto livre digitado por terceiros, então é onde
pode aparecer dado pessoal que ninguém pediu. Vale passar o olho de tempos em
tempos e apagar o que não serve:

```sql
delete from perguntas where criado_em < now() - interval '1 year';
delete from perguntas where sessao = '<id da sessão>';
```
