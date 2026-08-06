# Marcilio Ortiz — Experiência Digital

O código-fonte da minha apresentação profissional. Uma exploração sobre como transformar um portfólio tradicional em uma experiência narrativa e cinematográfica.

## Sobre o Projeto

Quando decidi reescrever meu portfólio, cheguei a uma conclusão simples: listas de tecnologias e grades de cards não contam uma história. Elas apenas exibem dados. Eu não queria construir um currículo digital, queria criar um ambiente que refletisse meu nível de maturidade técnica, minha atenção aos detalhes e minha visão de design de software.

O resultado é este projeto. Um site onde a interação, o ritmo e o espaço em branco são tão importantes quanto os projetos listados.

## A Filosofia Narrativa

A arquitetura de todo o site foi pensada em torno de uma jornada narrativa contínua. Em vez de simplesmente jogar informações na tela, a interface guia o visitante através de respostas sequenciais a perguntas lógicas:

- **Abertura:** *Quem sou eu e como me posiciono?*
- **Profundidade:** *Do que sou capaz tecnicamente?*
- **Processo:** *Como eu penso e estruturo meu trabalho?*
- **Consistência:** *Esse nível de entrega se mantém em outros projetos?*
- **Mercado:** *Tenho experiência real solucionando problemas de clientes?*
- **Contexto Humano:** *Quem é a pessoa por trás do código?*
- **Conversa:** *E o que ficou de fora — o que você mesmo quer perguntar?*
- **Epílogo:** *Qual é o nosso próximo passo?*

Decisões difíceis foram tomadas durante o desenvolvimento para proteger essa narrativa. Seções clássicas, como "Minhas Habilidades" (aquelas listas intermináveis de logos) ou formulários de contato genéricos, foram completamente descartadas. A ideia é mostrar competência construindo algo maduro, e não apenas listando o que sei usar.

## A Estrutura da Experiência

A jornada é dividida em atos interconectados, muitas vezes utilizando ancoragem na tela (*sticky scroll*) para não quebrar a imersão do visitante:

* **Hero:** Uma introdução cinematográfica com uso profundo de *glassmorphism* e manipulação de paralaxe responsiva.
* **O Estudo de Caso:** Um mergulho focado em um sistema complexo, detalhando a arquitetura e as métricas em vez de apenas fornecer um link.
* **O Processo:** Uma linha do tempo horizontal que exige do usuário uma rolagem física controlada, cadenciando a leitura do meu método de trabalho.
* **O Catálogo:** Outros projetos apresentados através de um *scrubbing* contínuo, onde o tempo da transição é ditado diretamente pela velocidade do scroll do usuário.
* **A Vida Real (Avantis):** Um respiro visual focado no mercado e na entrega de valor via consultoria e negócios.
* **Marcilio IA:** Uma seção onde o visitante pergunta o que quiser e recebe resposta em primeira pessoa. A IA responde apenas a partir de um dossiê que eu revisei e aprovei, deixa claro o tempo inteiro que não é o Marcilio humano, e não tem acesso a nada além desse dossiê. Nenhuma pergunta é antecipada por mim — é a única parte do site que eu não roteirizei.
* **Epílogo:** O substituto do clássico "Contato". Uma seção travada na tela que evolui como os créditos de um filme, terminando com convites (e não botões) para iniciar uma conversa.

## Sob o Capô: Tecnologias e Arquitetura

O projeto não utiliza bibliotecas pesadas de UI. Tudo foi desenhado para manter controle total sobre a performance e a estética.

* **React + Vite:** A fundação. O Vite garante um ambiente de desenvolvimento instantâneo e um *build* final extremamente otimizado.
* **TypeScript:** Segurança e previsibilidade na base de código. Todo o conteúdo textual do site é isolado em um arquivo de dados (`content.ts`) fortemente tipado, separando estritamente a narrativa da camada de apresentação (componentes).
* **GSAP (GreenSock) + ScrollTrigger:** O coração das interações. Em vez de basear animações pesadas em estados do React (o que causaria gargalos de renderização), o GSAP manipula diretamente o DOM para manter os 60 FPS, gerenciando revelações por scroll e pinagem de seções.
* **Framer Motion:** Convive com o GSAP com uma fronteira clara: o GSAP cuida de tudo que é ditado pelo scroll (pinagem, timelines, revelações), o Framer Motion cuida do que é ditado por estado do React — as revelações da conversa com a IA, a navbar, transições de entrada. Cada um na parte em que é melhor.
* **CSS Puro (Variáveis CSS):** Todo o design system (tipografia, cores, responsividade) vive em CSS Vanilla. O layout mobile, inclusive, desativa as complexas ancoragens cinematográficas para entregar uma experiência vertical clássica, sólida e hiper-fluida em celulares.
* **Vercel Functions + OpenAI:** A seção de IA deixou de ser um site puramente estático. Há um endpoint serverless que monta o prompt a partir do dossiê aprovado, valida a resposta contra os documentos de origem antes de devolvê-la, e passa por camadas de verificação (Turnstile), limite de uso e orçamento — porque cada pergunta custa dinheiro de verdade e o site é público.

## Principais Aprendizados

O maior desafio técnico deste portfólio não foi arquitetar os componentes no React, mas sim dominar o **ritmo da interface**.

* **O Silêncio Visual:** Aprendi que o que você remove é tão importante quanto o que você adiciona. Eliminar as antigas seções redundantes aumentou drasticamente o peso e o impacto da mensagem que sobrou.
* **Direção de Scroll:** Integrar o GSAP me ensinou a pensar no *scroll* do usuário não como um simples movimento de página, mas como uma "linha do tempo" onde eu controlo exatamente o que acontece frame a frame.
* **Menos é Mais (na comunicação):** Substituir formulários frios e textos corporativos por pequenas frases narrativas em cascata foi uma lição valiosa sobre *microcopy* e empatia com o visitante.
* **Degradação Elegante:** Aceitar que a tela de um smartphone não deve simular um cinema, mas sim entregar a mesma qualidade através de uma abordagem mais simples e robusta.

## Executando o Projeto

Se você quiser explorar a estrutura, o CSS ou entender como as animações foram orquestradas na prática:

1. Clone o repositório
2. Instale as dependências:
   ```bash
   pnpm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```

O site sobe inteiro assim. A única parte que não funciona sem configuração é a seção de IA: ela depende de chaves próprias (OpenAI, Redis, Turnstile), listadas em `.env.example`. Sem elas o endpoint recusa a requisição em vez de responder qualquer coisa — o que é proposital, e não um erro de setup.
