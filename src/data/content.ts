export const ptContent = {
  nav: {
    links: [
      { href: '#inicio', label: 'Início' },
      { href: '#sobre', label: 'Sobre' },
      { href: '#projetos', label: 'Projetos' },
      { href: '#contato', label: 'Contato' },
    ],
  },

  hero: {
    greeting: 'OLÁ, EU SOU',
    name: 'Marcilio Ortiz',
    role: ['Fullstack', 'AI Developer'],
    subtitle:
      'Estudante Técnico em Informática com experiência real em projetos freelancer. Atuo de ponta a ponta: banco de dados, API, interface e o que mais o projeto pedir — inclusive testes e infraestrutura.',
    availability: {
      defaultStatus: 'Disponível para oportunidades',
      defaultTypes: ['Estágio', 'Emprego', 'Projetos'],
      freelanceStatus: 'Disponível para projetos',
      freelanceTypes: ['Sistemas', 'Websites', 'APIs'],
      cta: 'Vamos construir algo incrível juntos?',
    },
    techs: [
      { name: 'NestJS', icon: 'nestjs' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'Docker', icon: 'docker' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'React', icon: 'react' },
    ],
    ctaPrimary: 'Ver Projetos',
    ctaSecondary: 'Sobre mim',
  },

  trajectory: {
    label: 'TRAJETÓRIA',
    title: 'O que eu construí',
    titleHighlight: 'até aqui.',
    archiveText: 'Explorar Arquivo Completo',
    scrollText: 'role para avançar',
    openText: 'Abrir',
    /**
     * media por projeto — contrato editorial:
     * só entra print/vídeo de UI real rodando (produção ou localhost).
     * `url` só quando o projeto está no ar e abre para qualquer visitante.
     * `alt` obrigatório e localizado. Paths compartilhados entre pt/en.
     */
    eras: [
      {
        id: 'surface',
        name: 'A Superfície',
        subtitle: 'Produtos em produção. Engenharia com foco em negócios.',
        glowColor: 'rgba(63, 24, 171, 0.12)',
        projects: [
          {
            name: 'Catálogo & App Imobiliário',
            type: 'Solução sob Medida',
            year: '2026',
            narrative: 'Um site catálogo de imóveis para o meu pai e um app simples para ele enviar fotos da rua. A interface é super direta, mas o verdadeiro brilho é a tecnologia invisível: ele manda os dados todos crus e bagunçados pelo celular, e a OpenAI formata tudo em uma descrição comercial perfeita para o site. É engenharia tirando o atrito da vida de um usuário leigo.',
            stack: 'Next.js SSR · Expo/React Native · Prisma · MinIO · OpenAI API',
            links: [
              { label: 'Visitar Site', href: 'https://marciliobarbosacorretor.com.br/' },
              { label: 'Repo Portal', href: 'https://github.com/KriawqZero/marciliobarbosa-corretor' },
              { label: 'Repo App', href: 'https://github.com/KriawqZero/app-marciliobarbosa-corretor' }
            ],
            stat: { value: 'Full Stack', label: 'produção + ia' },
            media: {
              image: '/cases/catalogo-corretor.webp',
              alt: 'Home do catálogo do corretor em produção, com busca por cidade e tipo e a contagem de imóveis publicados',
              url: 'https://marciliobarbosacorretor.com.br/',
            },
          },
          {
            name: 'SISCO',
            type: 'Acadêmico (Em Produção)',
            year: '2025',
            narrative: 'Meu TCC do ensino médio. O impacto real desse sistema não está na arquitetura do código, mas na organização. Antes dele, a gestão de horas complementares era um caos de planilhas desorganizadas jogadas em grupos de WhatsApp. O SISCO pegou essa bagunça e transformou num sistema de verdade, centralizado, que hoje mais de 200 alunos e coordenadores usam. Eu substituí o caos do Excel por um software real.',
            stack: 'Laravel 11 · Livewire 3 · Alpine.js · MariaDB',
            links: [{ label: 'Repositório', href: 'https://github.com/KriawqZero/SISCO-IFMS' }],
            stat: { value: '200+', label: 'usuários ativos' },
            media: {
              image: '/cases/sisco.webp',
              alt: 'Painel do SISCO: certificados pendentes de validação e turmas designadas ao professor',
            },
          },
          {
            name: 'VamoAgendar',
            type: 'SaaS Autoral',
            year: '2026',
            narrative: 'Um software como serviço (SaaS) completo de agendamento online focado em profissionais autônomos. Toda a complexidade da aplicação está concentrada no backend: desenvolvi um motor temporal complexo que calcula slots de horários livres cruzando fusos horários, durações de serviços, feriados locais e agendamentos existentes. Usei este projeto para dominar Server Actions e criptografia de assinaturas via webhooks.',
            stack: 'Next.js 16 · Prisma 7 · PostgreSQL · Mercado Pago · better-auth',
            links: [{ label: 'Repositório', href: 'https://github.com/KriawqZero/vamoagendar' }, { label: 'Visitar', href: 'https://vamoagendar.com.br/' }],
            stat: { value: 'SaaS', label: 'infraestrutura temporal' },
            media: {
              image: '/cases/vamoagendar.webp',
              alt: 'Home do VamoAgendar em produção, com o simulador de agendamento na etapa de escolha do serviço',
              url: 'https://vamoagendar.com.br/',
              video: '/cases/vamoagendar.webm',
              poster: '/cases/vamoagendar-poster.webp',
            },
          },
        ],
      },
      {
        id: 'infra',
        name: 'A Infraestrutura',
        subtitle: 'Workers, fluxos de dados e a engenharia dos bastidores.',
        glowColor: 'rgba(16, 185, 129, 0.10)',
        projects: [
          {
            name: 'KyteApp Scrapper',
            type: 'Solução sob Medida / B2B',
            year: '2025',
            narrative: 'Desenvolvi um ecossistema distribuído para um cliente corporativo de grande porte em São Paulo que precisava centralizar dados financeiros de dezenas de lojas no KyteApp, plataforma que não possui uma API oficial. A solução foi criar um worker autônomo em Playwright que navega em lote através de instâncias de navegadores estéreis, isolando cookies e sessões para extrair as métricas de faturamento direto do DOM e centralizá-las em uma API própria.',
            stack: 'Node.js · Playwright · Express · Prisma · Docker',
            links: [
              { label: 'Repo Worker', href: 'https://github.com/KriawqZero/scrapper-scrapper' },
              { label: 'Repo API', href: 'https://github.com/KriawqZero/scrapper-api' },
              { label: 'Repo Dashboard', href: 'https://github.com/KriawqZero/scrapper-frontend' }
            ],
            stat: { value: '3 Serviços', label: 'arquitetura distribuída' },
          },
        ],
      },
      {
        id: 'lowlevel',
        name: 'O Baixo Nível',
        subtitle: 'C++, OpenGL e o atrito direto com a renderização.',
        glowColor: 'rgba(239, 68, 68, 0.08)',
        projects: [
          {
            name: 'Voxel Engine (OpenGL Clássico)',
            type: 'Laboratório Pessoal',
            year: '2024',
            narrative: 'Sim, o nome original era só uma abreviação preguiçosa para Minecraft. Minha intenção aqui era tentar recriar um clone básico do jogo do zero para entender matemática 3D e renderização gráfica sem engines prontas. Quebrei muito a cabeça no ensino médio com matrizes de projeção e vetores só para fazer uma câmera em primeira pessoa funcionar em C++.',
            stack: 'C++20 · OpenGL · GLFW · GLM · Dear ImGui',
            links: [{ label: 'Repositório', href: 'https://github.com/KriawqZero/mine' }],
            stat: { value: '3D Math', label: 'pipeline clássica' },
          },
          {
            name: 'Voxel Engine (Shader Pipeline)',
            type: 'Experimento Incompleto',
            year: '2024',
            narrative: 'Minha tentativa de pegar o clone de Minecraft e reescrevê-lo para a pipeline moderna da GPU (com Shaders e VBOs). O semestre letivo acabou e o projeto virou um cemitério de código incompleto, mas me ensinou na força bruta como alocar memória na mão e compilar shaders. Um atrito direto e muito divertido com a máquina.',
            stack: 'C++20 · OpenGL Core Profile · GLEW · CMake',
            links: [{ label: 'Repositório', href: 'https://github.com/KriawqZero/mine_glModerno' }],
            stat: { value: 'GPU Pipeline', label: 'projeto incompleto' },
          },
        ],
      },
      {
        id: 'roots',
        name: 'As Raízes',
        subtitle: '12 anos. O começo de tudo, antes da pandemia.',
        glowColor: 'rgba(245, 158, 11, 0.08)',
        projects: [
          {
            name: 'Simulador Bancário',
            type: 'Curiosidade de Infância',
            year: 'Março de 2020',
            narrative: 'Desenvolvido aos 12 anos de idade, exatamente na semana em que a pandemia estourou. Eu queria entender como os programas mantinham dados salvos após fechar a janela. Sem saber o que era um banco de dados relacional, criei uma mecânica rudimentar em Python para coletar inputs de texto, serializá-los e gravá-los de forma permanente no disco do meu computador de infância em arquivos JSON.',
            stack: 'Python · Kivy Framework · JSON Local',
            links: [{ label: 'Repositório', href: 'https://github.com/KriawqZero/bankkp' }],
            stat: { value: '12 anos', label: 'persistência crua' },
          },
          {
            name: 'Player Desktop',
            type: 'Curiosidade de Infância',
            year: 'Março de 2020',
            narrative: 'Meu segundo experimento visual com Python na infância. Construí um player de áudio completo capaz de ler um diretório do Windows, filtrar arquivos com extensão .mp3 e gerenciar o estado das faixas (play, stop, avançar e retroceder). O código original possui caminhos engessados diretamente para a partição do meu computador de infância (F:/marcilinho/...), expondo a natureza pura e caseira do meu início na programação.',
            stack: 'Python · Kivy Core Audio',
            links: [{ label: 'Repositório', href: 'https://github.com/KriawqZero/musicplayer' }],
            stat: { value: '12 anos', label: 'gerenciamento de arquivos' },
          },
          {
            name: 'Event Loop',
            type: 'Curiosidade de Infância',
            year: 'Início de 2020',
            narrative: 'Criado um pouco antes da pandemia, este projeto nasceu da curiosidade de tirar o Python do terminal e colocá-lo em uma interface interativa. Me forçou a entender, pela primeira vez, o paradigma de desenvolvimento orientado a eventos. Descobrir que o tempo em uma tela não se atualiza sozinho e que era necessário criar um loop de agendamento em ciclos de 0.1 segundos sem travar a thread da UI foi minha primeira grande lição de arquitetura.',
            stack: 'Python · Kivy KV Language',
            links: [{ label: 'Repositório', href: 'https://github.com/KriawqZero/cronometer' }],
            stat: { value: '12 anos', label: 'event loop' },
          },
          {
            name: 'Mod para Minecraft (1.12.2)',
            type: 'O Marco Zero',
            year: 'Maio de 2019',
            narrative: 'O marco zero da minha jornada. O meu primeiro repositório publicado no GitHub, criado aos 12 anos de idade. Como jogador assíduo de Minecraft, eu queria mudar as regras do jogo. Me aventurei no Java para compilar meu próprio mod usando a API do Forge, adicionando novos blocos, minérios e uma fornalha funcional com interface gráfica própria. Uma colcha de retalhos feita na tentativa e erro que prova que programo desde criança por puro prazer.',
            stack: 'Java · Forge API 1.12.2 · Gradle',
            links: [{ label: 'Repositório', href: 'https://github.com/KriawqZero/vbmod-minecraft' }],
            stat: { value: '12 anos', label: 'primeiro commit' },
          },
        ],
      },
    ],
  },

  archive: [
    {
      year: '2026',
      name: 'Sushi do Verão (Ecossistema)',
      type: 'Sistema Comercial',
      stack: ['NestJS', 'Next.js', 'Expo', 'PostgreSQL'],
      narrative: 'Projetado para dar autonomia à operação do restaurante: a API e o painel foram modelados para que a equipe alterasse preços e pratos no horário de pico sem intervenção técnica. A base foi construída, mas o sistema não chegou a ser aprovado para produção — do escopo original, o que está no ar é o site institucional.',
      links: [
        { label: 'API', href: 'https://github.com/KriawqZero/rv-api' },
        { label: 'Admin', href: 'https://github.com/KriawqZero/rv-admin' },
        { label: 'App', href: 'https://github.com/KriawqZero/rv-frontend' }
      ]
    },
    {
      year: '2024',
      name: 'Labirinto Geométrico',
      type: 'Web Game',
      stack: ['HTML5 Canvas', 'TypeScript', 'Vite'],
      narrative: 'Um experimento escolar de renderização e gamificação. O foco técnico foi abandonar engines prontas e gerenciar o game loop, colisões e renderização gráfica diretamente no HTML5 Canvas com TypeScript puro.',
      links: [
        { label: 'Repositório', href: 'https://github.com/KriawqZero/jogo_matematica' }
      ],
      media: { image: '/cases/thumbs/jogo-matematica.webp', alt: 'Labirinto Geométrico rodando no navegador, com fog of war em Canvas' }
    },
    {
      year: '2024',
      name: 'Storage Crates',
      type: 'NeoForge Mod',
      stack: ['Java', 'NeoForge', 'Minecraft API'],
      narrative: 'Construído em Java sobre o ecossistema NeoForge para resolver o problema de armazenamento em grande escala no jogo. O maior aprendizado foi lidar com a complexidade e as restrições da API interna do Minecraft.',
      links: [
        { label: 'Repositório', href: 'https://github.com/KriawqZero/kriawqsstoragecrates' }
      ]
    },
    {
      year: '2024',
      name: 'Simple Machines',
      type: 'NeoForge Mod',
      stack: ['Java', 'NeoForge', 'Gradle'],
      narrative: 'Focado em adicionar componentes mecânicos ao jogo. A arquitetura exigiu manipulação profunda dos estados de blocos e da física nativa do motor do Minecraft, além da configuração minuciosa de builds no Gradle.',
      links: [
        { label: 'Repositório', href: 'https://github.com/KriawqZero/kriawqssimplemachines-26.1.2' }
      ]
    },
    {
      year: '2023',
      name: 'Portfolio Avantis',
      type: 'Landing Page',
      stack: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
      narrative: 'Site institucional desenvolvido para minha marca como freelancer. O objetivo foi criar uma página de alta conversão para atrair pequenas empresas e microempreendedores, utilizando Framer Motion para micro-interações que transmitem profissionalismo.',
      links: [
        { label: 'Acessar Site', href: 'https://avantis.dev' },
        { label: 'Repositório', href: 'https://github.com/KriawqZero/avantis-porfolio' }
      ],
      media: { image: '/cases/thumbs/avantis.webp', alt: 'Landing page da Avantis no ar' }
    }
  ],

  about: {
    number: '03',
    label: 'SOBRE MIM',
    title: 'Mais que código,',
    titleHighlight: 'propósito.',
    text: 'Ainda no Ensino Técnico, atuo como freelancer desde março de 2025 entregando soluções reais. Como desenvolvedor independente, domino o ciclo completo do produto e não me prendo a uma camada: pego backend, frontend, testes ou infraestrutura conforme o projeto precisa. Busco minha primeira oportunidade corporativa para transformar essa vivência em valor real para uma equipe.',
    cta: 'Conhecer minha jornada',
    stats: [
      { value: '+1', label: 'ano', sublabel: 'De imersão diária em programação' },
      { value: '+50', label: 'projetos', sublabel: 'Aplicações web e desafios práticos' },
      { value: '+10', label: 'clientes', sublabel: 'Atendidos com soluções em produção' },
      { value: '+1200', label: 'commits', sublabel: 'Registrados no GitHub no último ano' },
      { value: '+5', label: 'tecnologias', sublabel: 'Dominadas na stack principal' },
      { value: '100%', label: 'foco', sublabel: 'Em construir sistemas robustos e escaláveis' },
      { value: '+1000', label: 'horas', sublabel: 'Lendo documentação oficial' },
      { value: '+200k', label: 'linhas', sublabel: 'De código escritas ou refatoradas' },
      { value: '∞', label: 'bugs', sublabel: 'Resolvidos com muita paciência' },
      { value: '∞', label: 'vontade', sublabel: 'Vontade de aprender e evoluir' },
    ],
  },

  avantis: {
    number: '02',
    label: 'A INICIATIVA',
    title: 'Do estudo à',
    titleHighlight: 'prática real.',
    description: 'Marca utilizada nos meus projetos freelance e trabalhos para clientes.',
    text: 'Quando comecei a desenvolver trabalhos para clientes, percebi que a apresentação importava tanto quanto o código. Foi assim que criei a Avantis: uma marca para estruturar meu portfólio, padronizar entregas e consolidar minha identidade profissional. Ela marca a fase em que assumi a responsabilidade de transformar estudo em soluções reais.',
    links: [
      { label: 'avantis.dev', href: 'https://avantis.dev' },
      { label: 'instagram.com/avantis.dev', href: 'https://instagram.com/avantis.dev' }
    ]
  },

  process: {
    number: '04',
    label: 'PROCESSO',
    title: 'Como eu desenvolvo',
    description: 'Cada projeto segue um processo pensado para entregar qualidade em cada etapa, do planejamento ao deploy.',
    scrollText: 'role para avançar',
    steps: [
      {
        number: '01',
        title: 'Ideia',
        description:
          'Entendo o problema, pesquiso referências e defino o escopo do projeto com clareza.',
      },
      {
        number: '02',
        title: 'Arquitetura',
        description:
          'Planejo a estrutura, escolho as tecnologias certas e desenho a solução antes de codar.',
      },
      {
        number: '03',
        title: 'Código',
        description:
          'Implemento com qualidade, testes e atenção aos detalhes. Cada linha tem propósito.',
      },
      {
        number: '04',
        title: 'Deploy',
        description:
          'Entrego em produção com CI/CD, monitoramento e documentação. Pronto para escalar.',
      },
    ],
  },

  aiChat: {
    number: '05',
    label: 'MARCILIO IA',
    title: 'Pergunte',
    titleHighlight: 'à minha IA.',
    description: 'Uma representação treinada com informações profissionais que eu mesmo revisei. Ela responde sobre projetos, stack e forma de trabalhar.',
    disclaimer: 'Você está falando com uma IA, não comigo. Ela explica meu trabalho, mas não decide nem assume compromissos por mim.',
    placeholder: 'pergunte sobre projetos, stack, forma de trabalhar…',
    sendLabel: 'Enviar pergunta',
    inputLabel: 'Sua pergunta para a IA do Marcilio',
    clear: 'limpar conversa',
    thinking: 'consultando o que eu já contei',
    sourcesLabel: 'fontes',
    followUpsLabel: 'continue por aqui',
    contactCta: 'falar com o Marcilio',
    emptyState: 'Escolha uma pergunta ao lado ou escreva a sua.',
    errors: {
      generic: 'Deu problema aqui do meu lado. Tenta de novo em instantes.',
      timeout: 'Demorei demais para responder. Tenta perguntar de novo.',
      disabled: 'A IA está desligada no momento. As respostas abaixo são do próprio Marcilio.',
      rateLimit: 'Você fez muitas perguntas seguidas. Espere um pouco antes da próxima.',
      budget: 'A IA atingiu o limite de uso de hoje. Volte amanhã ou fale direto com o Marcilio.',
    },
    suggestions: [
      'O que você já construiu em produção?',
      'Como você usa IA sem depender dela?',
      'Como você trabalha em equipe?',
      'Por que você seria uma boa contratação para estágio?',
      'Quais projetos mostram melhor seu nível técnico?',
      'O que você ainda está aprendendo?',
    ],
    suggestionsFreelance: [
      'Você já entregou sistemas para clientes reais?',
      'Como funciona um projeto com você?',
      'Você cuida do frontend e do backend?',
      'Como você comunica prazo e andamento?',
      'Quais trabalhos são parecidos com o meu?',
      'Como você usa IA nos projetos de clientes?',
    ],
    // Quando a IA está fora, é isto que o visitante lê. Escrito à mão, sem
    // modelo nenhum no meio — por isso o rótulo diz exatamente o que é.
    fallback: {
      intro: 'Enquanto a IA não responde, ficam aqui algumas respostas que eu já tinha escrito.',
      label: 'resposta pré-escrita — a IA está indisponível agora',
      items: [
        {
          question: 'O que você já construiu em produção?',
          answer: 'Sistemas com usuário real usando. O SISCO, que organiza as horas complementares de mais de 200 alunos e coordenadores no IFMS — era planilha em grupo de WhatsApp antes. Uma automação que consolida o faturamento diário de uma rede de lojas em São Paulo, cujo sistema de vendas não tem API pública: entrou no ar em abril de 2025 e roda todos os dias nas três filiais até hoje. Uma plataforma imobiliária com app próprio, onde a IA transforma foto e áudio gravados em campo em anúncio pronto. E o VamoAgendar, um SaaS de agendamento que desenvolvo com um sócio investidor.',
        },
        {
          question: 'Como você usa IA sem depender dela?',
          answer: 'Uso todos os dias para acelerar a parte mecânica: esqueleto de módulo, achar onde algo acontece num repositório grande, revisar o que escrevi. O que continua meu é arquitetura, decisão e revisão — leio tudo antes de aceitar, confiro assinatura de biblioteca na documentação oficial, e o que eu não consigo explicar não entra. A prova de que isso não é discurso é um projeto onde ela me atrapalhou: no voxel engine em C++ que fiz em 2024, cada tentativa de usar IA quebrava o que já funcionava, principalmente na matemática de matriz. Parei de usar e terminei à mão. Só passei a usar IA de verdade em junho de 2025 — antes disso eu já programava havia seis anos.',
        },
        {
          question: 'Você está disponível para estágio?',
          answer: 'Estou. E tem um motivo a mais do que carreira: já cumpri todas as disciplinas do técnico em Informática no IFMS, e o estágio obrigatório é o que falta para eu concluir o curso — a previsão é fechar isso ainda em 2026. É também a experiência que me falta, porque nunca trabalhei dentro de um time de engenharia: minha experiência toda veio de cliente direto. Agenda, prazo e valor eu não trato por aqui — para isso, o contato direto está logo abaixo, no e-mail ou no LinkedIn.',
        },
        {
          question: 'Como funciona um projeto com você?',
          answer: 'Começa por entender o problema, não por escolher tecnologia: a primeira conversa é sobre o que está doendo hoje e quanto isso custa. Depois vem escopo por escrito, arquitetura, implementação e entrega em produção. Já aconteceu de o pedido inicial não ser o que resolvia o problema, e nesses casos eu digo — a decisão continua sendo do cliente, mas não entrego calado uma coisa que eu acho errada. Sobre acompanhamento: eu aprendi do jeito caro que entregar bem não substitui manter quem contratou informado, então hoje eu gero briefing automático de andamento em vez de depender da minha memória.',
        },
        {
          question: 'O que você ainda está aprendendo?',
          answer: 'Trabalhar dentro de um time de engenharia, que é o que eu nunca fiz: revisar código com gente mais experiente, mexer em base grande com decisões tomadas antes de eu chegar, e lidar com consequência real quando algo quebra. No lado técnico, o que tenho estudado vem do VamoAgendar — o motor que calcula horários livres e a parte de cobrança e assinatura, que é onde estão as decisões que eu ainda não tinha enfrentado. E aprender a usar IA melhor, que é trabalho contínuo: comecei a usar a sério faz pouco mais de um ano.',
        },
      ],
    },
  },

  contact: {
    number: '06',
    label: 'PRÓXIMO CAPÍTULO',
    title: 'Vamos construir',
    titleHighlight: 'juntos.',
    titleHighlightClient: 'sobre seu projeto.',
    text: 'Se você chegou até aqui, já conhece meu trabalho, meu processo e minha forma de pensar. Agora só falta a conversa.',
    narrativePhrases: [
      'Uma vaga.',
      'Um novo projeto.',
      'Uma parceria técnica.',
      'Um desafio de arquitetura.',
      'Sua próxima contratação.',
    ],
    narrativePhrasesClient: [
      'Um novo projeto.',
      'Um sistema sob medida.',
      'Uma integração de API.',
      'Um robô de automação.',
      'Seu próximo freelancer.',
    ],
    links: {
      email: {
        label: 'E-mail',
        value: 'marciliortizz@gmail.com',
        href: 'mailto:marciliortizz@gmail.com',
      },
      linkedin: {
        label: 'LinkedIn',
        value: '/in/marcilio-ortiz-barbosa',
        href: 'https://www.linkedin.com/in/marc%C3%ADlio-ortiz-barbosa-7b5a35165/',
      },
      github: {
        label: 'GitHub',
        value: '@KriawqZero',
        href: 'https://github.com/KriawqZero',
      },
    },
    copyright: '© 2026 Marcilio Ortiz. Todos os direitos reservados.',
  },

  personalization: {
    workana: 'Se você chegou até aqui pela Workana, preparei algumas informações adicionais sobre os projetos que desenvolvi para clientes.',
    upwork: 'Se você veio da Upwork, abaixo você encontrará alguns projetos selecionados desenvolvidos para clientes.',
    '99freelas': 'Se você chegou até aqui pela 99Freelas, preparei algumas informações adicionais sobre os projetos que desenvolvi para clientes.',
    freelancer: 'Se você veio da Freelancer.com, abaixo você encontrará alguns projetos selecionados desenvolvidos para clientes.',
  },

  freelance: {
    label: 'TRABALHOS PARA CLIENTES',
    title: 'Selected Client',
    titleHighlight: 'Projects.',
    freelanceProjectsTitle: 'Projetos para',
    freelanceProjectsTitleHighlight: 'Clientes.',
    problemLabel: 'Problema do Cliente',
    solutionLabel: 'Solução Desenvolvida',
    techsLabel: 'Tecnologias Utilizadas',
    epilogue: 'Uma fração da minha experiência. Além dos cases selecionados, dezenas de outros sistemas complexos foram entregues e permanecem sob confidencialidade.',
    projects: [
      {
        name: 'KyteApp Financial Worker',
        type: 'Cliente Workana',
        problem: 'Uma rede de lojas precisava consolidar o faturamento diário de suas filiais. O grande obstáculo era que o sistema de vendas utilizado não possuía API pública, o que obrigava a equipe a extrair os dados manualmente todos os dias.',
        solution: 'Para contornar a falta de API, desenvolvi um worker autônomo em Node.js com Playwright rodando em instâncias isoladas via Docker. O script acessa os portais com segurança, raspa os dados do DOM de forma resiliente e os centraliza em um dashboard.',
        stack: 'Node.js · Playwright · Express · Prisma · Docker',
        year: '2025'
      },
      {
        name: 'Catálogo & App Imobiliário',
        type: 'Projeto sob medida / Uso interno',
        url: 'https://marciliobarbosacorretor.com.br',
        problem: 'Meu pai, corretor de imóveis, perdia horas todo mês apenas recebendo fotos desorganizadas no WhatsApp e tentando redigir anúncios imobiliários atrativos. O processo inteiro era extremamente manual e lento.',
        solution: 'Decidi construir uma plataforma para automatizar esse fluxo. Desenvolvi um app mobile para o envio rápido dos arquivos brutos e uma API conectada à OpenAI que analisa as imagens e os áudios gravados por ele em campo, estruturando e publicando o anúncio final no site.',
        stack: 'Next.js SSR · Expo/React Native · Prisma · MinIO · OpenAI API',
        year: '2026'
      },
      {
        name: 'Sushi do Verão',
        type: 'Empresa local',
        problem: 'Um restaurante de alto volume da minha cidade sofria com cardápios online genéricos e lentos, que não permitiam atualizar preços e indisponibilidades em tempo real durante os picos de pedidos.',
        solution: 'Levei uma proposta inicial ao proprietário e refinamos a ideia juntos: em vez de um template, uma API própria em NestJS com painel administrativo e cardápio em PWA. Construí a base do sistema, mas ele não foi aprovado para produção. O que está no ar hoje é o site institucional que desenvolvi para eles.',
        stack: 'NestJS · Next.js · Expo · PostgreSQL',
        year: '2026'
      }
    ],
    reviewsLabel: 'PROVA SOCIAL',
    reviewsTitle: 'O que os clientes',
    reviewsTitleHighlight: 'dizem.',
    reviews: [
      {
        name: 'Fernando (Gerente de Operações)',
        project: 'Automação KyteApp',
        quote: 'O Marcilio conseguiu contornar a falta de API oficial que estava travando nossa operação. A automação está rodando sem problemas e poupando muito tempo de toda a equipe.'
      },
      null,
      null
    ]
  }
};

export const enContent = {
  nav: {
    links: [
      { href: '#inicio', label: 'Home' },
      { href: '#sobre', label: 'About' },
      { href: '#projetos', label: 'Projects' },
      { href: '#contato', label: 'Contact' },
    ],
  },

  hero: {
    greeting: 'HELLO, I AM',
    name: 'Marcilio Ortiz',
    role: ['Fullstack', 'AI Developer'],
    subtitle:
      'Technical IT Student with real experience in freelance projects. I work end to end: database, API, interface and whatever else the project needs — testing and infrastructure included.',
    availability: {
      defaultStatus: 'Available for opportunities',
      defaultTypes: ['Internship', 'Full-time', 'Projects'],
      freelanceStatus: 'Available for freelance projects',
      freelanceTypes: ['Web Apps', 'Websites', 'APIs'],
      cta: 'Let\'s build something incredible together?',
    },
    techs: [
      { name: 'NestJS', icon: 'nestjs' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'Docker', icon: 'docker' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'React', icon: 'react' },
    ],
    ctaPrimary: 'View Projects',
    ctaSecondary: 'About me',
  },

  trajectory: {
    label: 'TRAJECTORY',
    title: 'What I have built',
    titleHighlight: 'so far.',
    archiveText: 'Explore Full Archive',
    scrollText: 'scroll to advance',
    openText: 'Open',
    eras: [
      {
        id: 'surface',
        name: 'The Surface',
        subtitle: 'Production products. Engineering with a business focus.',
        glowColor: 'rgba(63, 24, 171, 0.12)',
        projects: [
          {
            name: 'Real Estate Catalog & App',
            type: 'Custom Solution',
            year: '2026',
            narrative: 'A real estate catalog website for my father and a simple app for him to send photos from the street. The interface is super direct, but the real highlight is the invisible technology: he sends raw and messy data from his cell phone, and the OpenAI API formats everything into a perfect commercial description for the website. It is engineering removing friction from a non-technical user\'s life.',
            stack: 'Next.js SSR · Expo/React Native · Prisma · MinIO · OpenAI API',
            links: [
              { label: 'Visit Site', href: 'https://marciliobarbosacorretor.com.br/' },
              { label: 'Portal Repo', href: 'https://github.com/KriawqZero/marciliobarbosa-corretor' },
              { label: 'App Repo', href: 'https://github.com/KriawqZero/app-marciliobarbosa-corretor' }
            ],
            stat: { value: 'Full Stack', label: 'production + AI' },
            media: {
              image: '/cases/catalogo-corretor.webp',
              alt: 'Real-estate catalog home page in production, with search by city and type and the count of published listings',
              url: 'https://marciliobarbosacorretor.com.br/',
            },
          },
          {
            name: 'SISCO',
            type: 'Academic (In Production)',
            year: '2025',
            narrative: 'My high school graduation project. The real impact of this system is not in the code architecture, but in the organization. Before it, managing complementary hours was a chaos of messy spreadsheets shared in WhatsApp groups. SISCO took this mess and turned it into a real, centralized system that more than 200 students and coordinators use today. I replaced the chaos of Excel with real software.',
            stack: 'Laravel 11 · Livewire 3 · Alpine.js · MariaDB',
            links: [{ label: 'Repository', href: 'https://github.com/KriawqZero/SISCO-IFMS' }],
            stat: { value: '200+', label: 'active users' },
            media: {
              image: '/cases/sisco.webp',
              alt: 'SISCO dashboard: certificates awaiting validation and the classes assigned to the professor',
            },
          },
          {
            name: 'VamoAgendar',
            type: 'Proprietary SaaS',
            year: '2026',
            narrative: 'A complete scheduling Software as a Service (SaaS) focused on self-employed professionals. All application complexity is concentrated in the backend: I developed a complex time engine that calculates free slots by crossing time zones, service durations, local holidays, and existing appointments. I used this project to master Server Actions and signature encryption via webhooks.',
            stack: 'Next.js 16 · Prisma 7 · PostgreSQL · Mercado Pago · better-auth',
            links: [{ label: 'Repository', href: 'https://github.com/KriawqZero/vamoagendar' }, { label: 'Visit', href: 'https://vamoagendar.com.br/' }],
            stat: { value: 'SaaS', label: 'temporal infra' },
            media: {
              image: '/cases/vamoagendar.webp',
              alt: 'VamoAgendar home page in production, with the booking simulator on the service selection step',
              url: 'https://vamoagendar.com.br/',
              video: '/cases/vamoagendar.webm',
              poster: '/cases/vamoagendar-poster.webp',
            },
          },
        ],
      },
      {
        id: 'infra',
        name: 'The Infrastructure',
        subtitle: 'Workers, data flows, and behind-the-scenes engineering.',
        glowColor: 'rgba(16, 185, 129, 0.10)',
        projects: [
          {
            name: 'KyteApp Scrapper',
            type: 'Custom Solution / B2B',
            year: '2025',
            narrative: 'I developed a distributed ecosystem for a large corporate client in São Paulo who needed to centralize financial data from dozens of stores on KyteApp, a platform that does not have an official API. The solution was to create an autonomous worker in Playwright that navigates through headless browser instances in batches, isolating cookies and sessions to extract billing metrics directly from the DOM and centralize them in a proprietary API.',
            stack: 'Node.js · Playwright · Express · Prisma · Docker',
            links: [
              { label: 'Worker Repo', href: 'https://github.com/KriawqZero/scrapper-scrapper' },
              { label: 'API Repo', href: 'https://github.com/KriawqZero/scrapper-api' },
              { label: 'Dashboard Repo', href: 'https://github.com/KriawqZero/scrapper-frontend' }
            ],
            stat: { value: '3 Services', label: 'distributed architecture' },
          },
        ],
      },
      {
        id: 'lowlevel',
        name: 'The Low Level',
        subtitle: 'C++, OpenGL, and direct friction with rendering.',
        glowColor: 'rgba(239, 68, 68, 0.08)',
        projects: [
          {
            name: 'Voxel Engine (Classic OpenGL)',
            type: 'Personal Lab',
            year: '2024',
            narrative: 'Yes, the original name was just a lazy abbreviation for Minecraft. My intention here was to try to recreate a basic clone of the game from scratch to understand 3D math and graphic rendering without pre-made engines. I struggled a lot in high school with projection matrices and vectors just to get a first-person camera working in C++.',
            stack: 'C++20 · OpenGL · GLFW · GLM · Dear ImGui',
            links: [{ label: 'Repository', href: 'https://github.com/KriawqZero/mine' }],
            stat: { value: '3D Math', label: 'classic pipeline' },
          },
          {
            name: 'Voxel Engine (Shader Pipeline)',
            type: 'Incomplete Experiment',
            year: '2024',
            narrative: 'My attempt to take the Minecraft clone and rewrite it for the modern GPU pipeline (with Shaders and VBOs). The school semester ended and the project became a cemetery of incomplete code, but it taught me through brute force how to manually allocate memory and compile shaders. A very fun and direct friction with the machine.',
            stack: 'C++20 · OpenGL Core Profile · GLEW · CMake',
            links: [{ label: 'Repository', href: 'https://github.com/KriawqZero/mine_glModerno' }],
            stat: { value: 'GPU Pipeline', label: 'incomplete project' },
          },
        ],
      },
      {
        id: 'roots',
        name: 'The Roots',
        subtitle: '12 years old. The beginning of everything, before the pandemic.',
        glowColor: 'rgba(245, 158, 11, 0.08)',
        projects: [
          {
            name: 'Bank Simulator',
            type: 'Childhood Curiosity',
            year: 'March 2020',
            narrative: 'Developed at 12 years old, exactly the week the pandemic broke out. I wanted to understand how programs kept data saved after closing the window. Without knowing what a relational database was, I created a rudimentary mechanic in Python to collect text inputs, serialize them, and save them permanently to my childhood computer\'s disk in JSON files.',
            stack: 'Python · Kivy Framework · Local JSON',
            links: [{ label: 'Repository', href: 'https://github.com/KriawqZero/bankkp' }],
            stat: { value: '12 years old', label: 'raw persistence' },
          },
          {
            name: 'Desktop Player',
            type: 'Childhood Curiosity',
            year: 'March 2020',
            narrative: 'My second visual experiment with Python in childhood. I built a complete audio player capable of reading a Windows directory, filtering files with .mp3 extension, and managing track states (play, stop, forward, and rewind). The original code has hardcoded paths directly to my childhood computer\'s partition (F:/marcilinho/...), exposing the pure and homemade nature of my start in programming.',
            stack: 'Python · Kivy Core Audio',
            links: [{ label: 'Repository', href: 'https://github.com/KriawqZero/musicplayer' }],
            stat: { value: '12 years old', label: 'file management' },
          },
          {
            name: 'Event Loop',
            type: 'Childhood Curiosity',
            year: 'Early 2020',
            narrative: 'Created shortly before the pandemic, this project was born out of curiosity to take Python out of the terminal and put it into an interactive interface. It forced me to understand, for the first time, the event-driven programming paradigm. Discovering that time on a screen does not update itself and that it was necessary to create a scheduling loop in 0.1-second cycles without blocking the UI thread was my first big architecture lesson.',
            stack: 'Python · Kivy KV Language',
            links: [{ label: 'Repository', href: 'https://github.com/KriawqZero/cronometer' }],
            stat: { value: '12 years old', label: 'event loop' },
          },
          {
            name: 'Mod for Minecraft (1.12.2)',
            type: 'Ground Zero',
            year: 'May 2019',
            narrative: 'The ground zero of my journey. My first repository published on GitHub, created at 12 years old. As an active Minecraft player, I wanted to change the game rules. I ventured into Java to compile my own mod using the Forge API, adding new blocks, ores, and a functional furnace with its own graphical interface. A patchwork quilt made on trial and error that proves I have been programming since childhood for pure pleasure.',
            stack: 'Java · Forge API 1.12.2 · Gradle',
            links: [{ label: 'Repository', href: 'https://github.com/KriawqZero/vbmod-minecraft' }],
            stat: { value: '12 years old', label: 'first commit' },
          },
        ],
      },
    ],
  },

  archive: [
    {
      year: '2026',
      name: 'Summer Sushi (Ecosystem)',
      type: 'Commercial System',
      stack: ['NestJS', 'Next.js', 'Expo', 'PostgreSQL'],
      narrative: 'Developed to give real autonomy to the restaurant\'s operation. The central challenge was modeling the API and managing state on the client so that the staff could change prices and dishes during peak hours without technical intervention.',
      links: [
        { label: 'API', href: 'https://github.com/KriawqZero/rv-api' },
        { label: 'Admin', href: 'https://github.com/KriawqZero/rv-admin' },
        { label: 'App', href: 'https://github.com/KriawqZero/rv-frontend' }
      ]
    },
    {
      year: '2024',
      name: 'Geometric Labyrinth',
      type: 'Web Game',
      stack: ['HTML5 Canvas', 'TypeScript', 'Vite'],
      narrative: 'A school experiment in rendering and gamification. The technical focus was to abandon pre-made engines and manage the game loop, collisions, and graphic rendering directly in HTML5 Canvas with pure TypeScript.',
      links: [
        { label: 'Repository', href: 'https://github.com/KriawqZero/jogo_matematica' }
      ],
      media: { image: '/cases/thumbs/jogo-matematica.webp', alt: 'Geometric Maze running in the browser, with Canvas fog of war' }
    },
    {
      year: '2024',
      name: 'Storage Crates',
      type: 'NeoForge Mod',
      stack: ['Java', 'NeoForge', 'Minecraft API'],
      narrative: 'Built in Java on the NeoForge ecosystem to solve the large-scale storage problem in the game. The greatest learning was dealing with the complexity and constraints of the internal Minecraft API.',
      links: [
        { label: 'Repository', href: 'https://github.com/KriawqZero/kriawqsstoragecrates' }
      ]
    },
    {
      year: '2024',
      name: 'Simple Machines',
      type: 'NeoForge Mod',
      stack: ['Java', 'NeoForge', 'Gradle'],
      narrative: 'Focused on adding mechanical components to the game. The architecture required deep manipulation of block states and the Minecraft engine\'s native physics, in addition to the detailed configuration of builds in Gradle.',
      links: [
        { label: 'Repository', href: 'https://github.com/KriawqZero/kriawqssimplemachines-26.1.2' }
      ]
    },
    {
      year: '2023',
      name: 'Portfolio Avantis',
      type: 'Landing Page',
      stack: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
      narrative: 'Institutional website developed for my brand as a freelancer. The goal was to create a high-converting page to attract small businesses and micro-entrepreneurs, using Framer Motion for micro-interactions that convey professionalism.',
      media: { image: '/cases/thumbs/avantis.webp', alt: 'Avantis landing page, live' },
      links: [
        { label: 'Visit Site', href: 'https://avantis.dev' },
        { label: 'Repository', href: 'https://github.com/KriawqZero/avantis-porfolio' }
      ]
    }
  ],

  about: {
    number: '03',
    label: 'ABOUT ME',
    title: 'More than code,',
    titleHighlight: 'purpose.',
    text: 'Still in Technical High School, I have been freelancing since March 2025, delivering real solutions. As an independent developer, I own the entire product cycle and I do not stick to one layer: backend, frontend, testing or infrastructure, whatever the project needs. I am seeking my first corporate opportunity to turn that experience into real value for a team.',
    cta: 'Explore my journey',
    stats: [
      { value: '+1', label: 'year', sublabel: 'Of daily programming immersion' },
      { value: '+50', label: 'projects', sublabel: 'Web apps and practical challenges' },
      { value: '+10', label: 'clients', sublabel: 'Served with solutions in production' },
      { value: '+1200', label: 'commits', sublabel: 'Recorded on GitHub in the last year' },
      { value: '+5', label: 'technologies', sublabel: 'Mastered in the main tech stack' },
      { value: '100%', label: 'focus', sublabel: 'On building robust and scalable systems' },
      { value: '+1000', label: 'hours', sublabel: 'Reading official documentation' },
      { value: '+200k', label: 'lines', sublabel: 'Of code written or refactored' },
      { value: '∞', label: 'bugs', sublabel: 'Solved with a lot of patience' },
      { value: '∞', label: 'drive', sublabel: 'Drive to learn and evolve' },
    ],
  },

  avantis: {
    number: '02',
    label: 'THE INITIATIVE',
    title: 'From study to',
    titleHighlight: 'real practice.',
    description: 'Brand used for my freelance projects and client work.',
    text: 'When I started developing work for clients, I realized that presentation mattered as much as the code. That is how I created Avantis: a brand to structure my portfolio, standardize deliveries, and consolidate my professional identity. It marks the phase when I took the responsibility of transforming study into real solutions.',
    links: [
      { label: 'avantis.dev', href: 'https://avantis.dev' },
      { label: 'instagram.com/avantis.dev', href: 'https://instagram.com/avantis.dev' }
    ]
  },

  process: {
    number: '04',
    label: 'PROCESS',
    title: 'How I develop',
    description: 'Each project follows a process designed to deliver quality at every stage, from planning to deployment.',
    scrollText: 'scroll to advance',
    steps: [
      {
        number: '01',
        title: 'Idea',
        description:
          'I understand the problem, research references, and define the project scope clearly.',
      },
      {
        number: '02',
        title: 'Architecture',
        description:
          'I plan the structure, choose the right technologies, and design the solution before coding.',
      },
      {
        number: '03',
        title: 'Code',
        description:
          'I implement with quality, testing, and attention to detail. Every line has a purpose.',
      },
      {
        number: '04',
        title: 'Deploy',
        description:
          'I deliver to production with CI/CD, monitoring, and documentation. Ready to scale.',
      },
    ],
  },

  aiChat: {
    number: '05',
    label: 'MARCILIO AI',
    title: 'Ask',
    titleHighlight: 'my AI.',
    description: 'A representation built from professional information I reviewed myself. It answers about projects, stack and how I work.',
    disclaimer: 'You are talking to an AI, not to me. It explains my work, but it does not decide anything or commit to anything on my behalf.',
    placeholder: 'ask about projects, stack, how I work…',
    sendLabel: 'Send question',
    inputLabel: 'Your question for Marcilio\'s AI',
    clear: 'clear conversation',
    thinking: 'checking what I already told it',
    sourcesLabel: 'sources',
    followUpsLabel: 'keep going',
    contactCta: 'talk to Marcilio',
    emptyState: 'Pick a question from the list or write your own.',
    errors: {
      generic: 'Something broke on my side. Try again in a moment.',
      timeout: 'I took too long to answer. Try asking again.',
      disabled: 'The AI is switched off right now. The answers below come from Marcilio himself.',
      rateLimit: 'That was a lot of questions in a row. Give it a minute before the next one.',
      budget: 'The AI hit today\'s usage limit. Come back tomorrow or talk to Marcilio directly.',
    },
    suggestions: [
      'What have you built in production?',
      'How do you use AI without depending on it?',
      'How do you work in a team?',
      'Why would you be a good hire for an internship?',
      'Which projects best show your technical level?',
      'What are you still learning?',
    ],
    suggestionsFreelance: [
      'Have you delivered systems for real clients?',
      'How does a project with you work?',
      'Do you handle both frontend and backend?',
      'How do you communicate deadlines and progress?',
      'Which past jobs are similar to mine?',
      'How do you use AI on client projects?',
    ],
    fallback: {
      intro: 'While the AI is not answering, here are a few answers I had already written.',
      label: 'pre-written answer — the AI is unavailable right now',
      items: [
        {
          question: 'What have you built in production?',
          answer: 'Systems with real users on them. SISCO, which handles the complementary-hours records of more than 200 students and coordinators at IFMS — it used to be a spreadsheet passed around a WhatsApp group. An automation that consolidates daily revenue for a retail chain in São Paulo whose sales system has no public API: it went live in April 2025 and still runs every day across their three stores. A real estate platform with its own app, where AI turns photos and voice notes recorded on site into a finished listing. And VamoAgendar, a scheduling SaaS I build with an investing partner.',
        },
        {
          question: 'How do you use AI without depending on it?',
          answer: 'Every day, for the mechanical part: scaffolding a module, finding where something happens in a large repository, reviewing what I wrote. What stays mine is architecture, decisions and review — I read everything before accepting it, I check library signatures against the official docs, and what I cannot explain does not ship. The proof that this is not just talk is a project where AI got in my way: on the C++ voxel engine I built in 2024, every attempt to use it broke what already worked, mostly on matrix math. I stopped and finished by hand. I only started using AI seriously in June 2025 — by then I had been programming for six years.',
        },
        {
          question: 'Are you available for an internship?',
          answer: 'I am. And there is a reason beyond career: I have completed every course of my technical degree in IT at IFMS, and the mandatory internship is what is left for me to graduate — the plan is to close that in 2026. It is also the experience I lack, because I have never worked inside an engineering team: all of my experience came from direct clients. Schedule, deadlines and rates are not something I handle here — for that, the direct contact is right below, by email or LinkedIn.',
        },
        {
          question: 'How does a project with you work?',
          answer: 'It starts by understanding the problem, not by picking technology: the first conversation is about what hurts today and what it costs. Then written scope, architecture, implementation and delivery to production. It has happened that the initial request was not what solved the problem, and in those cases I say so — the decision stays with the client, but I do not quietly ship something I believe is wrong. On follow-up: I learned the expensive way that delivering well does not replace keeping the client informed, so today I generate automatic progress briefings instead of relying on my memory.',
        },
        {
          question: 'What are you still learning?',
          answer: 'Working inside an engineering team, which I have never done: reviewing code with more experienced people, working on a large codebase with decisions made before I arrived, and dealing with real consequences when something breaks. On the technical side, what I have been studying comes from VamoAgendar — the engine that computes free slots and the billing and subscription side, where the decisions I had not faced before are. And learning to use AI better, which is ongoing: I only started using it seriously a little over a year ago.',
        },
      ],
    },
  },

  contact: {
    number: '06',
    label: 'NEXT CHAPTER',
    title: 'Let\'s build',
    titleHighlight: 'together.',
    titleHighlightClient: 'about your project.',
    text: 'If you made it this far, you already know my work, my process, and my way of thinking. Now all that\'s left is the conversation.',
    narrativePhrases: [
      'A job opening.',
      'A new project.',
      'A technical partnership.',
      'An architecture challenge.',
      'Your next hire.',
    ],
    narrativePhrasesClient: [
      'A new project.',
      'A custom system.',
      'An API integration.',
      'An automation bot.',
      'Your next freelancer.',
    ],
    links: {
      email: {
        label: 'E-mail',
        value: 'marciliortizz@gmail.com',
        href: 'mailto:marciliortizz@gmail.com',
      },
      linkedin: {
        label: 'LinkedIn',
        value: '/in/marcilio-ortiz-barbosa',
        href: 'https://www.linkedin.com/in/marc%C3%ADlio-ortiz-barbosa-7b5a35165/',
      },
      github: {
        label: 'GitHub',
        value: '@KriawqZero',
        href: 'https://github.com/KriawqZero',
      },
    },
    copyright: '© 2026 Marcilio Ortiz. All rights reserved.',
  },

  personalization: {
    workana: 'Welcome! If you came from Workana, I have prepared some additional details about the projects I\'ve built for clients below.',
    upwork: 'Welcome! If you came from Upwork, below you\'ll find some selected client work.',
    '99freelas': 'Welcome! If you came from 99Freelas, I have prepared some additional details about the projects I\'ve built for clients below.',
    freelancer: 'Welcome! If you came from Freelancer.com, below you\'ll find some selected client work.',
  },

  freelance: {
    label: 'CLIENT PROJECTS',
    title: 'Selected Client',
    titleHighlight: 'Projects.',
    freelanceProjectsTitle: 'Projects for',
    freelanceProjectsTitleHighlight: 'Clients.',
    problemLabel: 'Client Problem',
    solutionLabel: 'Developed Solution',
    techsLabel: 'Core Technologies',
    epilogue: 'A fraction of my experience. Beyond the selected cases, dozens of other complex systems have been delivered and remain under confidentiality.',
    projects: [
      {
        name: 'KyteApp Financial Worker',
        type: 'Workana Client',
        problem: 'A retail chain needed to consolidate daily billing data from their branches. The main obstacle was that their POS system didn\'t have a public API, forcing the team to extract data manually every single day.',
        solution: 'To bypass the lack of an API, I developed an autonomous worker in Node.js using Playwright, running on isolated Docker instances. The script securely accesses the portals, scrapes the DOM resiliently, and centralizes everything in a dashboard.',
        stack: 'Node.js · Playwright · Express · Prisma · Docker',
        year: '2025'
      },
      {
        name: 'Real Estate Catalog & App',
        type: 'Custom Project / Internal Use',
        url: 'https://marciliobarbosacorretor.com.br',
        problem: 'My father, a real estate agent, wasted hours every month just receiving unorganized photos on WhatsApp and trying to write appealing property listings. The entire process was extremely manual and slow.',
        solution: 'I decided to build a platform to automate this workflow. I developed a mobile app for quick uploads of raw files and an API connected to OpenAI that analyzes the images and voice notes he records on-site, automatically drafting and publishing the final listing.',
        stack: 'Next.js SSR · Expo/React Native · Prisma · MinIO · OpenAI API',
        year: '2026'
      },
      {
        name: 'Sushi do Verão',
        type: 'Local Business',
        problem: 'A high-volume restaurant in my city suffered from slow, generic online menus that didn\'t allow them to update prices and out-of-stock items in real-time during peak delivery hours.',
        solution: 'I brought an initial proposal to the owner and we refined the idea together: instead of a template, a NestJS API with an admin panel and a PWA menu. I built the base of the system, but it was not approved for production. What is live today is the institutional site I built for them.',
        stack: 'NestJS · Next.js · Expo · PostgreSQL',
        year: '2026'
      }
    ],
    reviewsLabel: 'SOCIAL PROOF',
    reviewsTitle: 'What clients',
    reviewsTitleHighlight: 'are saying.',
    reviews: [
      {
        name: 'Fernando (Operations Manager)',
        project: 'KyteApp Automation',
        quote: 'Marcilio managed to bypass the lack of an official API that was stalling our operation. The automation has been running flawlessly and saving the entire team a lot of time.'
      },
      null,
      null
    ]
  }
};
