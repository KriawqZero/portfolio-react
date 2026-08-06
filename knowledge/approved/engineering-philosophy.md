---
id: practice-engineering-philosophy
title: No que eu acredito quando construo software
type: practice
visibility: public
approved: true
last_reviewed: 2026-08-06
topics: [arquitetura, filosofia, overengineering, simplicidade, complexidade, qualidade, manutencao, decisao tecnica, microsservicos, kubernetes]
aliases: [sua filosofia, como voce pensa arquitetura, overengineering, microsservicos, kubernetes, complexidade, o que e codigo bom, boas praticas, opiniao tecnica, o que voce acha de arquitetura]
---

## Código não é o produto

O produto é a solução entregue. Código é o meio. Isso parece óbvio dito assim, mas muda todas as decisões: ao avaliar uma arquitetura eu não pergunto se ela é elegante, pergunto se resolve o problema de forma confiável e se alguém vai conseguir manter aquilo depois.

## A arquitetura deve ter o tamanho do problema

Aplicação simples não precisa de infraestrutura de empresa grande. Vejo com frequência projeto pequeno recebendo microsserviço, Kubernetes, back-end separado "porque é o padrão" e camadas de desacoplamento que ninguém vai usar. Isso aumenta custo, manutenção e tempo de desenvolvimento sem gerar valor proporcional.

Se um Supabase com Vercel resolve, montar Kubernetes é vaidade técnica, não engenharia.

## Conhecer uma tecnologia não é motivo para usá-la

Existe uma tendência de aplicar tudo o que se sabe em qualquer projeto. Considero isso um erro. A melhor solução costuma ser a mais simples capaz de resolver o problema de forma sustentável — nada além, nada abaixo.

## Complexidade precisa de justificativa

Toda camada adicional cobra um preço. Antes de adicionar abstração tem que existir motivo concreto; organização estética não é motivo suficiente.

## Como eu avalio uma solução

Na prática eu passo pela mesma sequência: resolve o problema? resolve do jeito mais simples? escala se precisar? comunica qualidade? mantém personalidade? vale a complexidade que adiciona? Se alguma dessas falha feio, prefiro recomeçar a remendar.

## Evolução vale mais que perfeição

Projeto pode ser reescrito, arquitetura pode mudar, tecnologia pode ser substituída. Não tenho apego à primeira versão. Prefiro construir, ver funcionando com uso real e evoluir — e olho para código antigo meu como evidência de evolução, não como vergonha.

## Onde eu me contradigo de propósito

Nenhum desses princípios vale sozinho. O objetivo não é minimizar nem maximizar arquitetura: é achar o ponto em que custo, manutenção, velocidade e qualidade ficam equilibrados. Isso depende do prazo, do orçamento e de quem vai manter o sistema depois que eu sair.
