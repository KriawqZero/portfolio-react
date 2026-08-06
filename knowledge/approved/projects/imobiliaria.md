---
id: project-imobiliaria
title: Plataforma imobiliária — site, app e IA para um corretor
type: project
visibility: public
approved: true
last_reviewed: 2026-08-06
topics: [imobiliaria, corretor, imoveis, nextjs, ssr, seo, minio, openai, expo, react native, prisma, postgresql, pai, mobile, app]
aliases: [imobiliaria, corretor, imoveis, catalogo, seu pai, projeto do pai, app mobile, react native, expo, openai, ia em projeto, minio, usa ia em produto, aplicativo]
source_id: project-imobiliaria
source_label: marciliobarbosa-corretor
source_href: https://github.com/KriawqZero/marciliobarbosa-corretor
---

## O que é

Plataforma imobiliária completa — site público, área administrativa e aplicativo mobile — feita sob medida para o meu pai, que é corretor de imóveis em Corumbá e Ladário.

## Por que ela existe

Ele perdia horas por mês recebendo foto desorganizada no WhatsApp e tentando redigir anúncio. O processo inteiro era manual e lento. Não foi um pedido: eu vi o problema acontecendo e resolvi construir.

## Como funciona

Ele grava áudio e tira foto em campo, pelo celular, no aplicativo. O backend recebe esse material bruto e usa a API da OpenAI para analisar imagem e áudio, estruturando descrição e atributos técnicos prontos para publicação. Ele nunca precisa escrever texto comercial.

## As decisões técnicas

**Next.js com renderização no servidor**, e não aplicação de página única. Foi deliberado: o objetivo do site é rankear no Google local e gerar preview decente no WhatsApp, e servidor entrega metadado dinâmico sem ginástica.

**PostgreSQL com Prisma** para dados de negócio, e **MinIO** — compatível com S3 — para as fotos, mantendo o banco leve com apenas metadado e caminho. Processamento de imagem com sharp.

**Separação rígida de camadas**: interação com banco e storage fica restrita à camada de dados, e não vaza para componente. Isso permite que o painel administrativo e o site público consumam a mesma lógica sem duplicação.

**App em repositório separado**, com Expo e Expo Router, consumindo a API. A separação evita que ciclo de release do mobile afete o uptime do site.

## Por que o app existe

Ele não é usuário avançado de tecnologia, e área administrativa de sistema web é barreira no dia a dia dele. O app tem interface mínima: poucos toques para ver agenda, notificação e cadastrar imóvel de onde estiver.

Essa é a parte que eu considero o real desafio do projeto — não a stack, e sim projetar para alguém que vai abandonar a ferramenta se ela exigir esforço.

## O que ele me ensinou

Que a restrição mais importante nem sempre é técnica. A escolha de renderizar no servidor veio do SEO; a escolha de fazer app nativo veio do perfil do usuário; a escolha de usar IA veio de uma dificuldade concreta de escrever texto. Nenhuma das três começou pela tecnologia.
