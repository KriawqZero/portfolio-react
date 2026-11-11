---
id: project-vamoagendar-produto
title: VamoAgendar — SaaS de agendamento em desenvolvimento
type: project
visibility: public
approved: true
last_reviewed: 2026-11-11
topics: [vamoagendar, saas, agendamento, socio, produto, equipe, decisoes, nextjs, prisma, assinatura, beta, planos]
aliases: [vamo agendar, vamoagendar, sistema de agendamento, scheduling saas, booking, seu saas, produto proprio, socio, tem empresa, projeto atual]
source_id: project-vamoagendar-produto
source_label: VamoAgendar
source_href: https://vamoagendar.com.br/
---

## O que é

SaaS de agendamento online para profissionais autônomos, em desenvolvimento, com o beta como próximo marco. O fluxo permite que o profissional configure serviços e horários, compartilhe um link e receba agendamentos sem combinar cada horário por mensagem no WhatsApp.

É um produto em construção, não uma entrega comercial concluída. A cobrança de assinaturas ainda está incompleta.

É o projeto onde eu não sou só quem executa: sou responsável pelo produto junto com um sócio investidor.

## Meu papel

Cuido de toda a parte técnica e participo das decisões de produto: o que entra no beta, o que fica para depois, como cobrar. O sócio entra com investimento e visão comercial.

## Recursos implementados

Autenticação e perfis, o motor de agendamento, painel do profissional com visão do dia, fluxo público de agendamento pensado para celular, e controle de planos com limites por nível (gratuito, Plus, Pro).

## A parte difícil

O motor que gera os horários livres. Calcular tempo livre não é pegar início e fim do expediente: é cruzar a duração variável de cada serviço, subtrair o que já está agendado, respeitar intervalo, e aplicar exceções pontuais — feriado, folga, dia bloqueado. Isolar isso em serviços dedicados foi o que impediu a regra de vazar para o resto do sistema.

## A stack

Next.js 16 com App Router e React 19, TypeScript, Tailwind 4, PostgreSQL com Prisma 7, autenticação com better-auth e integração de cobrança com Mercado Pago ainda em desenvolvimento. Server Actions para as mutações, o que eliminou boa parte das rotas de API que existiriam só para receber formulário.

## O que ainda não está pronto

O faturamento. A estrutura existe — o banco suporta assinatura e o fluxo de cobrança está desenhado — mas ainda faltam travas antes de processar transação real, e por isso ele não está cobrando ninguém. É o que separa o produto do beta.

## Trabalhar com sócio

Mudou a forma como eu decido. Sozinho, eu escolhia o que era tecnicamente mais interessante. Com sócio, toda escolha técnica precisa de justificativa em prazo e custo — e algumas coisas que eu queria construir ficaram de fora do beta por isso.

Também mudou como eu informo: existe um gerador diário que envia a ele o que andou no projeto, sem depender de eu lembrar de contar.

## Status

Em desenvolvimento, com o beta como próximo marco. Ter recursos implementados e um endereço público não significa que o faturamento esteja pronto ou que haja clientes pagantes.
