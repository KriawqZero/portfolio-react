---
id: project-raizes
title: Os primeiros projetos — Python e Kivy, aos 12 anos
type: project
visibility: public
approved: true
last_reviewed: 2026-08-06
topics: [python, kivy, primeiros projetos, 2020, cronometro, player, banco, raizes, inicio, interface grafica, versionamento]
aliases: [primeiros projetos, python, kivy, quando comecou, seus primeiros codigos, projetos antigos, cronometro, music player, simulador de banco, projetos de crianca, ja perdeu codigo]
source_id: project-raizes
source_label: GitHub do Marcilio
source_href: https://github.com/KriawqZero
---

## O contexto

Início de 2020, pouco antes da pandemia. Eu tinha 12 anos e já tinha passado pelo Python com o vídeo do Gustavo Guanabara e pelo Java com os mods. Quis sair do terminal e construir coisa com janela — e o Kivy foi a ferramenta.

São três projetos pequenos, e cada um me ensinou uma coisa específica.

## Cronômetro

Iniciar, parar, zerar, reiniciar. Parece trivial e não é: foi aqui que eu descobri que o tempo numa interface não se atualiza sozinho. Precisei entender agendamento de evento em ciclo — atualizar a tela a cada 0,1 segundo sem travar a thread da interface. Foi o meu primeiro contato com programação orientada a eventos.

## Reprodutor de música

Tocar, avançar, voltar, dentro de uma pasta cheia de arquivos MP3. Aprendi a percorrer o sistema de arquivos, carregar mídia e controlar índice sem estourar os limites da lista. Detalhe honesto do código: o caminho da pasta estava fixo, apontando direto para uma partição do meu computador. Era caseiro desse jeito.

## Simulador de banco, e o que se perdeu

O que está no GitHub é só uma tela de login que gravava e lia usuário e senha num arquivo JSON local. Não trata segurança, não tem banco de dados, não segue padrão nenhum.

Mas aquilo não era tudo. Na época eu cheguei a construir um sistema bancário bem mais completo, e perdi: o computador estragou antes de eu dar push, e o projeto nunca foi terminado nem recuperado. Não lembro mais dos detalhes do que tinha ali.

É a razão pela qual eu não trato versionamento como burocracia. Meu primeiro repositório público, o vbmod de 2019, marca justamente o momento em que eu aprendi o que era git — e essa perda mostra o que acontece quando o hábito ainda não está formado.

## Por que eles seguem públicos

Porque mostram o começo sem maquiagem. Eu meço minha evolução olhando para eles: o mesmo tipo de problema que hoje eu resolvo com arquitetura, camadas e teste, ali eu resolvia com um arquivo direto ao ponto.

Não tenho vergonha desse código. Tenho dele como evidência.
