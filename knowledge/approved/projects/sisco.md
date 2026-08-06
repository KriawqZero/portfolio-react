---
id: project-sisco-sistema
title: SISCO — sistema de horas complementares do IFMS
type: project
visibility: public
approved: true
last_reviewed: 2026-08-06
topics: [sisco, tcc, ifms, laravel, livewire, php, producao, certificados, horas, vps, linux, docker, autenticacao, escola]
aliases: [sisco, tcc, seu tcc, trabalho de conclusao, ifms, sistema da escola, horas complementares, certificados, laravel, maior projeto, projeto em producao, sabe linux, ja mexeu com servidor, deploy]
source_id: project-sisco-sistema
source_label: SISCO
source_href: https://github.com/KriawqZero/SISCO-IFMS
---

## O que é

Sistema que gerencia as horas complementares dos alunos do IFMS, campus Corumbá. Nasceu como TCC do ensino médio técnico integrado e entrou em uso real no campus.

## O problema que existia

Horas complementares são obrigatórias para se formar, e a comprovação era uma colcha de retalhos: planilha, formulário do Google, grupo de WhatsApp.

Do lado do aluno, enviar um certificado começava com uma caçada — qual era o link, com qual professor. Eu passei por isso e a parte difícil não era conseguir o certificado, era descobrir onde entregar.

Do lado do professor era pior, porque a conta sobrava para ele: não existia "situação do aluno" em lugar nenhum. Para saber quem estava perto de fechar as horas, alguém abria a planilha, cruzava com os formulários e somava à mão. Isso consumia horas por semana, e sempre tinha aluno que só descobria o problema perto da formatura.

## O que mudou

O aluno abre o link e envia. O professor abre o painel e vê todos os alunos, todos os certificados, quantas horas cada um tem, quanto falta e quem já pode parar de enviar.

## Linha do tempo

Ficou pronto no fim de dezembro de 2024 e já estava funcionando em janeiro de 2025. Foram dois meses de desenvolvimento praticamente ininterrupto. A apresentação só aconteceu em julho porque faltava a outra metade de um TCC — texto, defesa, papelada. O código ficou de pé seis meses esperando a burocracia.

Recebeu nota máxima da banca. Depois da defesa entrou em uso com os alunos dos últimos semestres de Informática, somando mais de 200 alunos, além dos professores e do coordenador responsável pela validação.

## O que eu não sei sobre ele hoje

Passou mais de um ano e eu perdi o acompanhamento de perto. Não sei dizer se foi estendido para Metalurgia ou para o curso de Administração que abriu depois. Prefiro não chutar número que não posso verificar.

## Como foi feito

Laravel 11 com PHP 8.2, Livewire 3 e Alpine.js, Tailwind, MariaDB. Regra de negócio isolada em services, rotinas pesadas em jobs e filas para não travar a requisição, exportação de planilha com PhpSpreadsheet.

## A decisão de autenticação

Professor e coordenador se autenticam contra o banco do próprio SISCO. Aluno, não: a validação vai contra a API institucional do campus, e o sistema só espelha o cadastro devolvido por ela.

O motivo é prático e veio como orientação do professor: todo aluno já tem login — CPF e senha — para usar os computadores da escola. Aceitar essa mesma credencial significa que ninguém decora mais nada, e a instituição não passa a ter uma segunda base de senhas de estudante para proteger.

O custo dessa escolha é real: amarra o sistema a um serviço que só existe na rede do IFMS. Por isso o repositório traz uma implementação equivalente em C#, sem a qual não dá para logar como aluno fora de lá.

## O quanto de IA teve

O código foi escrito à mão. No fim de 2024 as ferramentas ainda eram fracas para esse tipo de trabalho, e havia o desconforto de usá-las num TCC — meu orientador liberava, mas eu recorri a elas em pontos isolados de front-end, algo entre 3% e 5% do projeto.

## O que eu aprendi fora do código

Aluguei uma VPS do próprio bolso só para manter uma demonstração no ar, e ela rodou por um ano com manutenção minha. Foi ali que Linux deixou de ser matéria e virou ferramenta: linha de comando, permissão, serviço que não sobe, log para ler. Docker veio junto, e como a mesma VPS acabou hospedando outros projetos, precisei aprender proxy reverso — comecei com Nginx e migrei para Traefik quando manter configuração à mão começou a pesar.

Foi esse projeto que me mostrou que eu conseguia entregar software de verdade, e não só exercício. A conclusão prática veio logo depois: comecei a trabalhar como freelancer.

## Autoria

Trabalho em dupla, com divisão explícita: eu na arquitetura, banco e todo o código; um colega de curso na documentação acadêmica e no design.
