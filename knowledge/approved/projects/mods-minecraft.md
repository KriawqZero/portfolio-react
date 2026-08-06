---
id: project-mods-minecraft
title: Mods de Minecraft — do primeiro projeto aos estudos de arquitetura
type: project
visibility: public
approved: true
last_reviewed: 2026-08-06
topics: [minecraft, mod, mods, java, forge, neoforge, vbmod, crates, machines, arquitetura, primeiro projeto, gradle, capabilities]
aliases: [minecraft, mod de minecraft, java, forge, neoforge, vbmod, primeiro projeto, storage crates, simple machines, projeto antigo, como comecou a programar, projetos pessoais]
source_id: project-mods-minecraft
source_label: vbmod
source_href: https://github.com/KriawqZero/vbmod-minecraft
---

## O primeiro, de 2019

O vbmod é o meu primeiro projeto publicado no GitHub, de 19 de maio de 2019. Eu tinha 12 anos, jogava muito Minecraft e resolvi entender como aquilo funcionava por baixo. Não existia IA generativa no meu cotidiano: era Java, a documentação do Forge e tentativa e erro.

O mod introduzia vibranium no jogo — minério gerado no mundo, bloco, conjunto completo de ferramentas e armadura, uma fornalha customizada com interface própria, comidas e receitas. Eu não sabia nada de arquitetura de software; o código é um garoto juntando peças de tutorial até compilar.

Ele fica público de propósito. É cápsula do tempo, e mostra de onde eu saí.

## Os de agora

Voltei ao tema com o NeoForge, mas com outro objetivo: usar Minecraft como laboratório de arquitetura.

**Storage Crates** é um sistema de caixas de armazenamento em cinco níveis. O padrão comum em mods é criar uma classe de bloco, uma de entidade e uma de menu para cada variação. Eu fiz o contrário: todas as caixas compartilham a mesma classe, o mesmo tipo de entidade e o mesmo menu, e o comportamento é resolvido em tempo de execução a partir do nível guardado no estado do bloco. A interface calcula o grid dinamicamente pela quantidade de slots, e o registro dos blocos vira um laço sobre o enum de níveis. Ainda está em andamento — faltam receitas e algumas mecânicas.

**Simple Machines** é um laboratório de energia e processamento: um gerador que queima combustível e transfere energia, e um macerador que consome essa energia para transformar lingote em pó. Não tem interface gráfica de propósito: sem GUI, a única forma de validar era entender de verdade como o estado do bloco sobrevive aos ticks do servidor e como inspecionar isso por código.

## Por que isso importa

O primeiro mostra a origem: eu programo desde criança, por curiosidade, muito antes de virar profissão. Os atuais mostram o que mudou — hoje eu uso o mesmo jogo para estudar capabilities, ciclo de registro, persistência de estado e como evitar duplicação de classe. O tema é o mesmo; a pergunta que eu faço é outra.
