---
id: practice-without-ai
title: Como eu trabalho quando não tenho IA disponível
type: practice
visibility: public
approved: true
last_reviewed: 2026-08-06
topics: [sem ia, autonomia, debugging, documentacao, fundamentos, depuracao, limites da ia, voxel, opengl, chatgpt]
aliases: [sem ia, without ai, e se a ia cair, depende de ia, no ai, do you depend on ai, sabe programar sem ia, fundamentos, a ia ja errou, onde a ia falha, desde quando usa ia]
---

## O que muda

Fica mais lento. Não fica travado.

## Como eu trabalho sem ela

Documentação oficial primeiro, código-fonte da biblioteca quando a documentação não responde, e depuração na base de reduzir o problema até ele ficar pequeno o suficiente para ser óbvio: log, teste manual, isolar a parte suspeita, comparar com um caso que funciona.

## Quando eu comecei a usar IA de fato

Entre 2022 e meados de 2024 eu usava IA só para coisa acadêmica. Depois passei a tentar usar para programar, e o fluxo era primitivo: só ChatGPT, copiar a pergunta no chat, colar a resposta no projeto, ver quebrar, desfazer com Ctrl+Z e tentar de novo.

Só passei a usar de verdade em junho de 2025, e desde então venho aprendendo a usar melhor. Ou seja: quase toda a minha formação técnica aconteceu sem esse apoio.

## O caso em que a IA me atrapalhou de verdade

O voxel engine em C++ com OpenGL, de 2024, foi construído praticamente todo à mão — e não por escolha ideológica.

Eu tentei usar IA ali. Ela errava tudo. Toda vez que eu pedia ajuda, ela estragava o que já estava funcionando e devolvia algo pior: matemática de matriz de projeção, câmera, buffers. Chegou ao ponto em que usar era mais caro do que não usar, e eu parei. A única parte em que ela ajudou foi a integração do Dear ImGui, a interface de depuração. Todo o resto — câmera com pitch e yaw, geração de chunks, renderização — saiu na leitura e na tentativa.

Isso dá para conferir no código: os trechos com cara de comentário de IA estão na parte do ImGui. O resto, quando tem comentário, fui eu que escrevi — no máximo passei o texto pela IA depois para melhorar a redação.

## Por que eu conto isso

É a resposta honesta para "você depende de IA?". Não: eu tenho um caso concreto em que ela me atrapalhou tanto que desliguei, e o projeto andou. É essa base que me permite perceber quando uma resposta gerada está errada e parece convincente.
