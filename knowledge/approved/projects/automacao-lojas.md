---
id: project-automacao-lojas
title: Automação de faturamento para uma rede de lojas
type: project
visibility: public
approved: true
last_reviewed: 2026-08-06
topics: [automacao, scraping, playwright, worker, api, dashboard, prisma, docker, cliente fixo, sao paulo, faturamento, metas, comissionamento, integracao]
aliases: [automacao, robo, scraper, scrapper, rede de lojas, cliente de sao paulo, maior cliente, cliente mais antigo, playwright, faturamento, sistema sem api, integracao, worker]
source_id: project-automacao-lojas
source_label: Scrapper API
source_href: https://github.com/KriawqZero/scrapper-api
---

## O problema do cliente

Uma rede de lojas em São Paulo precisava consolidar o faturamento diário das filiais. O sistema de vendas que eles usam não oferece API pública — então a equipe extraía os dados à mão, todo dia, loja por loja.

## O que eu construí

Três serviços que funcionam juntos:

Um **worker** em Node.js com Playwright, que entra no painel de cada loja, extrai faturamento, vendas, ticket médio, lucro e taxa de venda, e devolve para a API. Roda periodicamente por cron, em background.

Uma **API** em Express com Prisma e PostgreSQL, que é a fonte da verdade do sistema: recebe os relatórios diários e serve os dados para o painel.

Um **dashboard** em Next.js, onde a operação vê as métricas consolidadas de todas as lojas, cadastra novas contas e monitora a saúde das integrações — último sync, falha de login.

## O que ficou difícil

Coletar dados de uma aplicação de página única traz dois problemas que moldaram a arquitetura.

O primeiro é isolamento: como o script processa dezenas de lojas em sequência, encerrar sessão do jeito comum é frágil, e uma falha vaza sessão de uma loja para a próxima — o que significa gravar o faturamento da loja errada. Resolvi com contexto novo do navegador por loja: um ambiente estéril, sem cookie, localStorage ou service worker anterior, destruído ao fim de cada sincronização.

O segundo é carregamento dinâmico. Verificar URL depois de uma transição de rota via JavaScript é enganoso, então o worker avalia estado na árvore do DOM e tem nova tentativa nas partes críticas da extração.

## Onde ele está hoje

É o meu cliente mais antigo e segue ativo. O sistema entrou no ar em abril de 2025 e é usado todos os dias nas três filiais, até hoje.

O escopo cresceu junto: a API deixou de ser só repositório de relatório e virou motor de regra de negócio, gerenciando metas semanais por loja, funcionários, comissionamento e aprovação de premiações.

## Por que esse caso importa

É a prova de que eu entrego integração onde não existe caminho oficial, e de que o resultado sobreviveu ao teste mais duro: continuar rodando todo dia, mais de um ano depois, para quem depende dele.
