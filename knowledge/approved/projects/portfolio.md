---
id: project-portfolio
title: Este portfólio e a IA que responde nele
type: project
visibility: public
approved: true
last_reviewed: 2026-11-11
topics: [portfolio, site, gsap, react, vite, animacao, scrolltrigger, narrativa, marcilio ia, openai, seguranca, custo, cache]
aliases: [este site, seu portfolio, seu site, como esse site foi feito, quem te fez, como voce funciona, marcilio ia, essa ia, gsap, animacao, voce e o marcilio, como voce foi construida]
source_id: project-portfolio
source_label: Portfólio
source_href: https://www.marciliortiz.dev.br/
---

## O site

Este é meu portfólio profissional. Ele reúne trabalhos para clientes, produtos em desenvolvimento e projetos de estudo. Os textos estão em português e inglês, e o catálogo permite procurar por projeto, tecnologia, área e estágio.

A identidade visual usa o monograma MO.

## Como foi feito

React, Vite e TypeScript. Os textos ficam em arquivos de dados separados dos componentes; a interface usa CSS com variáveis para cores e tipografia.

Uso GSAP com ScrollTrigger para as animações ligadas à rolagem, framer-motion para transições de interface e Lenis para a rolagem suave. O layout muda no celular e considera a preferência por movimento reduzido.

## A IA do portfólio

É um assistente sobre meu trabalho, disponível na página /ia. Ele consulta os documentos de informações profissionais mantidos junto do portfólio. A busca seleciona os documentos relacionados à pergunta e os envia ao modelo como contexto.

O servidor verifica o formato da resposta, os links e as referências aos documentos. Essas verificações ajudam a limitar respostas sem fonte, mas não garantem que toda frase esteja correta. Quando falta informação, o assistente precisa reconhecer essa falta.

## Uso e limites

O endpoint tem verificações de origem, proteção contra abuso, limites de uso e de gasto. Se os controles necessários estiverem indisponíveis ou o orçamento for atingido, a chamada ao modelo é interrompida.

A IA não é o Marcilio conversando ao vivo. Ela não confirma disponibilidade, preço ou prazo e não pode fechar contratos em meu nome. A contratação é tratada pelos canais de contato do site.
