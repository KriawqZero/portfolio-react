---
id: practice-engineering-philosophy
title: No que eu acredito quando construo software
type: practice
visibility: public
approved: true
last_reviewed: 2026-11-11
topics: [arquitetura, filosofia, overengineering, simplicidade, complexidade, qualidade, manutencao, decisao tecnica, microsservicos, kubernetes]
aliases: [sua filosofia, como voce pensa arquitetura, overengineering, microsservicos, kubernetes, complexidade, o que e codigo bom, boas praticas, opiniao tecnica, o que voce acha de arquitetura]
---

## Como escolho uma solução

Começo pelo que precisa funcionar, pelas restrições do projeto e por quem vai manter o código. Depois escolho a estrutura e as ferramentas.

## O tamanho da arquitetura

Evito acrescentar serviços e camadas sem uma necessidade concreta. Separar uma aplicação em várias partes pode ajudar, mas também acrescenta configuração, comunicação entre serviços e manutenção.

A decisão depende do prazo, do orçamento, da equipe e do uso esperado.

## Dependências

Uso uma biblioteca quando ela resolve um trabalho que eu precisaria manter por conta própria. Também considero a documentação, a manutenção e a dificuldade de trocar a dependência depois.

## Revisão e evolução

Gosto de testar os fluxos e entender o motivo das decisões. Não trato a primeira versão como definitiva: posso mudar a estrutura quando o uso mostra uma necessidade que não estava clara no começo.

Antes de reescrever, preciso entender o que está falhando e se uma mudança menor resolve.
