---
id: project-imobiliaria
title: Plataforma imobiliária — site, app e IA para um corretor
type: project
visibility: public
approved: true
last_reviewed: 2026-11-11
topics: [imobiliaria, corretor, imoveis, nextjs, ssr, seo, minio, openai, expo, react native, prisma, postgresql, pai, mobile, app]
aliases: [imobiliaria, corretor, imoveis, catalogo, seu pai, projeto do pai, app mobile, react native, expo, openai, ia em projeto, minio, usa ia em produto, aplicativo]
source_id: project-imobiliaria
source_label: marciliobarbosa-corretor
source_href: https://github.com/KriawqZero/marciliobarbosa-corretor
---

## O que é

Catálogo para consulta e compartilhamento de imóveis, com área administrativa e aplicativo de cadastro. Foi desenvolvido para a rotina de um corretor de imóveis em Corumbá e Ladário.

## Por que ela existe

Fotos e informações chegavam pelo WhatsApp e precisavam ser organizadas para o cadastro e a publicação dos anúncios. O projeto reuniu esse fluxo no site, no painel e no aplicativo.

## Como funciona

O corretor envia fotos e áudios pelo aplicativo durante as visitas. O backend usa a API da OpenAI para ajudar a organizar a descrição e os atributos do imóvel. O material fica disponível no fluxo de cadastro e publicação, e os anúncios podem ser consultados e compartilhados pelo catálogo público.

## As decisões técnicas

**Next.js com renderização no servidor**, e não aplicação de página única. Foi deliberado: o objetivo do site é rankear no Google local e gerar preview decente no WhatsApp, e servidor entrega metadado dinâmico sem ginástica.

**PostgreSQL com Prisma** para dados de negócio, e **MinIO** — compatível com S3 — para as fotos, mantendo o banco leve com apenas metadado e caminho. Processamento de imagem com sharp.

**Separação rígida de camadas**: interação com banco e storage fica restrita à camada de dados, e não vaza para componente. Isso permite que o painel administrativo e o site público consumam a mesma lógica sem duplicação.

**App em repositório separado**, com Expo e Expo Router, consumindo a API. A separação evita que ciclo de release do mobile afete o uptime do site.

## Por que o app existe

O app foi pensado para cadastrar imóveis durante as visitas, sem depender do painel web. Reúne agenda, notificações e cadastro em uma interface com poucas etapas.

Essa é a parte que eu considero o real desafio do projeto — não a stack, e sim projetar para alguém que vai abandonar a ferramenta se ela exigir esforço.

## O que ele me ensinou

Que a restrição mais importante nem sempre é técnica. A escolha de renderizar no servidor veio do SEO; a escolha de fazer app nativo veio do perfil do usuário; a escolha de usar IA veio de uma dificuldade concreta de escrever texto. Nenhuma das três começou pela tecnologia.

## Contexto do projeto

O corretor para quem o projeto foi desenvolvido é meu pai.
