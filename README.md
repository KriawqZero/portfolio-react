# Marcilio Ortiz — Portfólio

Meu site profissional, com trabalhos para clientes, produtos em desenvolvimento e projetos de estudo. O conteúdo está em português e inglês.

A identidade usa meu nome, sem acento em Marcilio, e o monograma MO. Avantis aparece como registro da marca anterior.

## O que tem no site

- Apresentação, projetos para clientes e contato.
- Trajetória com projetos pessoais e acadêmicos.
- Catálogo com busca, filtros por área e estágio, detalhes e links.
- Marcilio IA, na página `/ia`, para perguntas sobre meu trabalho.

Cada projeto tem um estágio próprio. Um site publicado, uma implementação ainda em teste e um experimento incompleto não contam como a mesma coisa.

## Estrutura

A interface usa React, Vite, TypeScript e CSS. Os textos ficam em `src/data/content.ts`; o catálogo fica em `src/data/projectCatalog.ts`.

GSAP e ScrollTrigger cuidam das animações ligadas à rolagem. Framer Motion cuida de transições de interface, e Lenis da rolagem suave. O layout se adapta ao celular e à preferência por movimento reduzido.

## IA do portfólio

O assistente consulta os documentos de `knowledge/approved`. O índice é gerado antes do build. O endpoint usa OpenAI, verifica links e referências, e aplica controles de uso e de custo.

A interface informa que a conversa é com uma IA. Ela pode explicar o trabalho, mas não confirmar agenda, preço ou prazo, nem fechar propostas. Quando não há informação suficiente, deve dizer isso.

As variáveis necessárias estão em `.env.example`. O endpoint não atende sem os serviços e controles exigidos configurados.

## Desenvolvimento

```bash
pnpm install
pnpm dev
```

O servidor local abre a interface. A página de IA também depende da configuração do backend.

## Verificações

```bash
pnpm lint
pnpm test
pnpm build
```

O build gera o índice do dossiê, verifica TypeScript, compila o site e executa a verificação do bundle. Publicação e conferência no navegador são etapas separadas.
