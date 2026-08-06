---
id: project-baixo-nivel
title: Voxel engines em C++ e OpenGL — o que deu certo e o que não
type: project
visibility: public
approved: true
last_reviewed: 2026-08-06
topics: [cpp, opengl, voxel, minecraft, computacao grafica, baixo nivel, shader, matematica, camera, projeto incompleto, glfw, glm, cmake]
aliases: [c++, cpp, opengl, voxel, engine, motor grafico, minecraft do zero, baixo nivel, computacao grafica, shader, projeto que nao terminou, ja abandonou projeto, matematica, jogo]
source_id: project-baixo-nivel
source_label: mine
source_href: https://github.com/KriawqZero/mine
---

## Por que eu fiz

Entre outubro e novembro de 2024, como desafio pessoal. O objetivo nunca foi criar um jogo comercial nem um clone perfeito de Minecraft: era entender na prática como computação gráfica 3D funciona por baixo, sem engine moderna resolvendo por mim.

## O primeiro: funcionou

C++ 20 com OpenGL, GLFW e GLAD para janela e extensões, GLM para matemática de vetor e matriz, Dear ImGui para depuração em tempo real, CMake para build.

A parte mais difícil e mais recompensadora foi a câmera 3D: calcular pitch, yaw, sensibilidade de mouse e matriz de projeção me obrigou a entender na marra matemática que eu ainda não tinha visto no ensino médio. Fazer a navegação parecer natural foi um quebra-cabeça inteiro.

O código separa o laço principal do jogo, os auxiliares de entrada e câmera, a geração do mundo em chunks e blocos, o carregamento de textura e a camada de depuração.

## O segundo: não funcionou

Depois tentei reescrever com OpenGL moderno — pipeline programável, shaders, VBO e VAO — porque a primeira versão usava modo imediato, que é defasado e pouco performático.

Esse projeto não atingiu o objetivo. A curva entre o OpenGL legado e o moderno era mais íngreme do que eu antecipava: abstrair classes de shader, montar e gerenciar buffers à mão e fazer a matemática de matriz chegar corretamente na GPU consumiu muito mais esforço do que eu tinha. Era fim de semestre letivo e o tempo livre acabou. Travou num estágio inicial, sem reproduzir o mundo que a versão anterior já gerava.

## Por que eu mantenho o segundo público

Porque é a prova de que reescrever do zero com tecnologia melhor não garante sucesso imediato. Escrevi ali meus primeiros vertex e fragment shaders, e a organização de classes ficou mais limpa que a da primeira versão. Chamo de cemitério de código produtivo: não virou motor completo, mas as lições ficaram.

## Onde a IA entra nessa história

Praticamente em lugar nenhum, e não por opção ideológica. Tentei usar e ela errava tudo — estragava o que já funcionava e devolvia algo pior, principalmente na matemática de matriz e na câmera. Parei. A única parte em que ajudou foi a integração do ImGui.

## O que isso diz sobre mim

Que eu não fujo de matemática nem de baixo nível, e que sei trabalhar sem rede de segurança. Também que eu deixo projeto pessoal pelo caminho quando o tempo aperta — e prefiro deixar isso visível a limpar o histórico.
