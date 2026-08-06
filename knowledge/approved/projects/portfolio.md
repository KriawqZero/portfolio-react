---
id: project-portfolio
title: Este portfólio e a IA que responde nele
type: project
visibility: public
approved: true
last_reviewed: 2026-08-06
topics: [portfolio, site, gsap, react, vite, animacao, scrolltrigger, narrativa, marcilio ia, openai, seguranca, custo, cache]
aliases: [este site, seu portfolio, seu site, como esse site foi feito, quem te fez, como voce funciona, marcilio ia, essa ia, gsap, animacao, voce e o marcilio, como voce foi construida]
source_id: project-portfolio
source_label: Portfólio
source_href: https://www.marciliortiz.dev.br/
---

## O site

Quando decidi reescrever meu portfólio, parti de uma conclusão: lista de tecnologia e grade de card não contam história, só exibem dado. Eu não queria currículo digital, queria um ambiente que mostrasse maturidade técnica em vez de afirmá-la.

A estrutura responde a perguntas em sequência — quem sou, do que sou capaz, como penso, isso se repete em outros projetos, tenho experiência real com cliente, e o que fazemos agora. Seções clássicas como "minhas habilidades" com barra de progresso foram descartadas de propósito: barra de progresso de habilidade é autoavaliação disfarçada de dado.

## Como ele é feito

React com Vite e TypeScript, sem biblioteca de componentes. Todo o texto vive num único arquivo de conteúdo tipado, em português e inglês, separado da camada de apresentação — o mesmo arquivo alimenta o gerador de currículo em PDF.

A animação usa GSAP com ScrollTrigger para tudo que é dirigido por scroll, e framer-motion para o que é dirigido por estado do React. O scroll suave vem do Lenis, sincronizado com o ticker do GSAP. No celular, as ancoragens cinematográficas são desativadas: telefone não deve simular cinema, deve entregar leitura sólida.

## A seção de IA

É esta com que você está falando. Não é chatbot genérico plugado num modelo.

O visitante pergunta, e um endpoint no servidor executa uma sequência antes de gastar qualquer coisa: valida origem e formato, verifica se os contadores estão de pé, checa se a IA está ligada, confirma que é uma pessoa e não um robô, aplica limite por sessão e por IP, consulta cache, e só então checa o teto de gasto do dia e do mês.

Passando por tudo isso, a pergunta é comparada com um dossiê de documentos que o Marcilio revisou, os mais relevantes entram no contexto, e a resposta volta num formato estruturado. Antes de chegar na tela, ela é validada contra esses documentos: endereço inventado é removido, e citação de documento que não estava no contexto é descartada.

Se o Redis cai, ela não responde. Se o orçamento do mês estoura, ela não responde. Não existe modo degradado que gaste dinheiro em silêncio.

## Por que isso foi construído assim

Porque uma IA que fala em nome de alguém pode inventar com fluência, e o custo disso recai sobre a reputação de quem ela representa. As travas não são exibicionismo técnico: são a diferença entre uma demonstração e algo que pode ficar no ar sem vigilância.

É também o argumento prático do que eu defendo sobre IA: a parte de inteligência artificial é a menor parte do trabalho.
