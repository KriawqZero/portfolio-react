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
    role: ['Desenvolvedor', 'Full Stack'],
    subtitle:
      'Faço sites, sistemas e automações. Aqui estão alguns trabalhos para clientes, produtos que estou desenvolvendo e projetos que fiz para aprender.',
    availability: {
      defaultStatus: 'Vamos falar sobre seu projeto',
      defaultTypes: ['Sites', 'Sistemas', 'Automações'],
      freelanceStatus: 'Vamos falar sobre seu projeto',
      freelanceTypes: ['Sistemas', 'Websites', 'APIs'],
      cta: 'O que você precisa construir?',
    },
    techs: [
      { name: 'NestJS', icon: 'nestjs' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'Docker', icon: 'docker' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'React', icon: 'react' },
    ],
    ctaPrimary: 'Ver projetos',
    ctaSecondary: 'Sobre mim',
  },

  trajectory: {
    label: 'TRAJETÓRIA',
    title: 'O que eu construí',
    titleHighlight: 'até aqui.',
    archiveText: 'Explorar todos os projetos',
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
        name: 'Sites e sistemas',
        subtitle: 'Sites, sistemas e produtos em diferentes estágios.',
        glowColor: 'rgba(63, 24, 171, 0.12)',
        projects: [
          {
            name: 'Catálogo & App Imobiliário',
            type: 'Solução sob Medida',
            year: '2026',
            narrative: 'Um catálogo de imóveis e um aplicativo para meu pai, que é corretor. Pelo celular, ele envia fotos e áudios; a integração com IA ajuda a estruturar as informações para os anúncios. O trabalho reuniu site, área administrativa e app em um fluxo pensado para o uso em campo.',
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
            type: 'Sistema Acadêmico',
            year: '2025',
            narrative: 'Meu TCC do ensino médio no IFMS: um sistema para organizar horas complementares. Alunos enviam certificados e professores acompanham a validação em um painel, reunindo informações que antes ficavam dispersas em planilhas e mensagens.',
            stack: 'Laravel 11 · Livewire 3 · Alpine.js · MariaDB',
            links: [{ label: 'Repositório', href: 'https://github.com/KriawqZero/SISCO-IFMS' }],
            stat: { value: 'IFMS', label: 'horas complementares' },
            media: {
              image: '/cases/sisco.webp',
              alt: 'Painel do SISCO: certificados pendentes de validação e turmas designadas ao professor',
            },
          },
          {
            name: 'VamoAgendar',
            type: 'SaaS em Desenvolvimento',
            year: '2026',
            narrative: 'Estou desenvolvendo este produto de agendamento com um sócio investidor. O profissional cadastra os serviços e horários; o cliente escolhe pelo link. O painel e as regras de agenda estão implementados. A cobrança de assinaturas ainda precisa ser concluída antes do beta.',
            stack: 'Next.js 16 · Prisma 7 · PostgreSQL · Mercado Pago · better-auth',
            links: [{ label: 'Repositório', href: 'https://github.com/KriawqZero/vamoagendar' }, { label: 'Visitar', href: 'https://vamoagendar.com.br/' }],
            stat: { value: 'SaaS', label: 'em desenvolvimento' },
            media: {
              image: '/cases/vamoagendar.webp',
              alt: 'Interface do VamoAgendar, com o simulador de agendamento na etapa de escolha do serviço',
              url: 'https://vamoagendar.com.br/',
              video: '/cases/vamoagendar.webm',
              poster: '/cases/vamoagendar-poster.webp',
            },
          },
        ],
      },
      {
        id: 'infra',
        name: 'Automações',
        subtitle: 'Coleta de dados, integrações e tarefas que antes eram manuais.',
        glowColor: 'rgba(16, 185, 129, 0.10)',
        projects: [
          {
            name: 'Ecossistema de Coleta',
            type: 'Solução sob Medida / B2B',
            year: '2025',
            narrative: 'Automação para consolidar dados de faturamento de uma rede de lojas cujo sistema de vendas não oferecia API pública. Desenvolvi um coletor com sessões isoladas, uma API para armazenar os dados e um painel para acompanhar as informações. Os três serviços fazem parte da mesma solução.',
            stack: 'Node.js · Playwright · Express · Prisma · Docker',
            links: [],
            stat: { value: '3 Serviços', label: 'arquitetura distribuída' },
          },
        ],
      },
      {
        id: 'lowlevel',
        name: 'Jogos e gráficos',
        subtitle: 'Experimentos com C++, OpenGL e renderização 3D.',
        glowColor: 'rgba(239, 68, 68, 0.08)',
        projects: [
          {
            name: 'Voxel Engine (OpenGL Clássico)',
            type: 'Laboratório Pessoal',
            year: '2024',
            narrative: 'Tentei fazer um mundo de blocos em C++ para aprender renderização 3D sem uma engine pronta. Fiz câmera em primeira pessoa, geração de chunks e uma interface de depuração. As matrizes de projeção deram bastante trabalho até a câmera se comportar como eu queria.',
            stack: 'C++20 · OpenGL · GLFW · GLM · Dear ImGui',
            links: [{ label: 'Repositório', href: 'https://github.com/KriawqZero/mine' }],
            stat: { value: '3D Math', label: 'pipeline clássica' },
          },
          {
            name: 'Voxel Engine (Shader Pipeline)',
            type: 'Experimento Incompleto',
            year: '2024',
            narrative: 'Comecei a reescrever o mundo de blocos usando shaders e buffers na GPU. A versão ficou incompleta quando o semestre terminou. Foi onde escrevi meus primeiros shaders e trabalhei com gerenciamento de memória em C++.',
            stack: 'C++20 · OpenGL Core Profile · GLEW · CMake',
            links: [{ label: 'Repositório', href: 'https://github.com/KriawqZero/mine_glModerno' }],
            stat: { value: 'GPU Pipeline', label: 'projeto incompleto' },
          },
        ],
      },
      {
        id: 'roots',
        name: 'Os primeiros projetos',
        subtitle: 'Mods de Minecraft e programas em Python, ainda na escola.',
        glowColor: 'rgba(245, 158, 11, 0.08)',
        projects: [
          {
            name: 'Simulador Bancário',
            type: 'Curiosidade de Infância',
            year: 'Março de 2020',
            narrative: 'Um dos meus primeiros programas em Python. Eu queria descobrir como manter os dados depois de fechar a janela, então fiz formulários com Kivy e gravei as informações em arquivos JSON.',
            stack: 'Python · Kivy Framework · JSON Local',
            links: [{ label: 'Repositório', href: 'https://github.com/KriawqZero/bankkp' }],
            stat: { value: 'JSON', label: 'dados em arquivo' },
          },
          {
            name: 'Player Desktop',
            type: 'Curiosidade de Infância',
            year: 'Março de 2020',
            narrative: 'Um player em Python que lê uma pasta de arquivos MP3 e permite tocar, parar e trocar de faixa. No código original, o caminho da pasta ainda aponta para o computador em que eu programava.',
            stack: 'Python · Kivy Core Audio',
            links: [{ label: 'Repositório', href: 'https://github.com/KriawqZero/musicplayer' }],
            stat: { value: 'Áudio', label: 'arquivos MP3' },
          },
          {
            name: 'Event Loop',
            type: 'Curiosidade de Infância',
            year: 'Início de 2020',
            narrative: 'Um cronômetro feito com Python e Kivy. Aprendi a atualizar o tempo na tela sem travar os botões, usando chamadas agendadas em intervalos curtos.',
            stack: 'Python · Kivy KV Language',
            links: [{ label: 'Repositório', href: 'https://github.com/KriawqZero/cronometer' }],
            stat: { value: 'Eventos', label: 'atualização da tela' },
          },
          {
            name: 'Mod para Minecraft (1.12.2)',
            type: 'O Marco Zero',
            year: 'Maio de 2019',
            narrative: 'Meu primeiro repositório no GitHub, de maio de 2019. Eu jogava Minecraft e queria acrescentar coisas ao jogo. Fui aprendendo Java enquanto fazia blocos, minérios e uma fornalha com interface própria usando o Forge.',
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
      narrative: 'Construí a base de uma API, um painel e um cardápio para o restaurante alterar pratos e preços. Esse sistema não foi aprovado para produção. A entrega publicada para o cliente foi o site institucional.',
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
      narrative: 'Jogo feito para a escola, com labirinto, colisões e desenho em Canvas. Usei TypeScript para controlar os movimentos e a atualização da tela.',
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
      narrative: 'Mod de Minecraft em Java com caixas de armazenamento. Trabalhei com o registro de blocos e a forma como o NeoForge guarda o estado dos itens no jogo.',
      links: [
        { label: 'Repositório', href: 'https://github.com/KriawqZero/kriawqsstoragecrates' }
      ]
    },
    {
      year: '2024',
      name: 'Simple Machines',
      type: 'NeoForge Mod',
      stack: ['Java', 'NeoForge', 'Gradle'],
      narrative: 'Mod com um gerador de energia e um macerador. Fiz os blocos trocarem energia e manterem o estado entre as atualizações do servidor.',
      links: [
        { label: 'Repositório', href: 'https://github.com/KriawqZero/kriawqssimplemachines-26.1.2' }
      ]
    },
    {
      year: '2023',
      name: 'Avantis — site da marca anterior',
      type: 'Landing Page',
      stack: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
      narrative: 'Site que fiz para apresentar meus serviços quando usava a marca Avantis. Ficou como registro dessa fase; meu trabalho agora é apresentado como Marcilio Ortiz.',
      links: [
        { label: 'Repositório', href: 'https://github.com/KriawqZero/avantis-porfolio' }
      ],
      media: { image: '/cases/thumbs/avantis.webp', alt: 'Registro do site da antiga marca Avantis' }
    }
  ],

  about: {
    number: '03',
    label: 'SOBRE MIM',
    title: 'Sobre',
    titleHighlight: 'mim.',
    text: 'Sou de Corumbá, MS, e trabalho como freelancer desde março de 2025. Comecei fazendo mods de Minecraft em Java. Depois vieram os programas em Python, o TCC no IFMS e os trabalhos para clientes. Gosto de entender como as coisas funcionam e de aprender enquanto construo.',
    cta: 'Conhecer meu processo',
    principles: [
      { title: 'Antes de começar', text: 'Conversamos sobre o que você precisa, o que já existe e o que vai entrar na entrega.' },
      { title: 'O desenvolvimento', text: 'Trabalho no banco de dados, na API, nas telas, nos testes e na publicação, conforme o projeto precisa.' },
      { title: 'Você fala comigo', text: 'Sou eu quem desenvolve e acompanha o trabalho. Quando uma decisão muda o escopo, a gente conversa antes de seguir.' },
    ],
  },

  avantis: {
    number: '02',
    label: 'DESENVOLVIMENTO INDEPENDENTE',
    title: 'Você fala',
    titleHighlight: 'comigo.',
    description: 'Sites, sistemas e automações',
    text: 'Precisa criar um site, automatizar uma tarefa ou mexer em um sistema que já existe? Me conte como funciona hoje e o que precisa mudar. A gente define o trabalho antes de começar.',
    links: [
      { label: 'Conversar sobre um projeto', href: '#contato' },
      { label: '@marciliortiz.dev', href: 'https://www.instagram.com/marciliortiz.dev/' }
    ]
  },

  process: {
    number: '04',
    label: 'PROCESSO',
    title: 'Como o projeto acontece',
    description: 'Da primeira conversa à entrega, estas são as etapas do trabalho.',
    scrollText: 'role para avançar',
    steps: [
      {
        number: '01',
        title: 'Conversa',
        description:
          'Você me mostra como trabalha hoje, o que precisa mudar e o que já tentou.',
      },
      {
        number: '02',
        title: 'Escopo',
        description:
          'Definimos as telas, integrações, prioridades e o que fica fora desta entrega.',
      },
      {
        number: '03',
        title: 'Desenvolvimento',
        description:
          'Implemento as partes combinadas e testo os fluxos. Você acompanha o andamento e avalia o que está pronto.',
      },
      {
        number: '04',
        title: 'Entrega',
        description:
          'Publico no ambiente combinado, confiro o funcionamento e deixo as orientações de uso e manutenção.',
      },
    ],
  },

  aiChat: {
    number: '05',
    label: 'MARCILIO IA',
    title: 'Pergunte',
    titleHighlight: 'à minha IA.',
    /** Título da aba na página própria da IA. */
    pageTitle: 'Marcilio IA — pergunte sobre o meu trabalho',
    nav: {
      label: 'Navegação principal',
      portfolio: 'O portfólio',
      ia: 'Converse com minha IA',
    },
    invite: {
      hero: 'Converse com minha IA',
      contactPrompt: 'Prefere perguntar antes de escrever?',
      contactCta: 'Converse com minha IA',
    },
    description: 'Um assistente com informações sobre meus projetos e minha forma de trabalhar.',
    disclaimer: 'Você está falando com uma IA, não comigo. Ela explica meu trabalho, mas não decide nem assume compromissos por mim.',
    /**
     * As perguntas são gravadas. Avisar não é gentileza: é o que a LGPD chama
     * de transparência, e é o que separa um registro legítimo de um silencioso.
     */
    privacy: 'As perguntas ficam registradas comigo, para eu acompanhar o que perguntam e melhorar as respostas.',
    /**
     * No celular, quando a conversa começa, o bloco de apresentação recolhe
     * para a conversa caber. O aviso não pode sumir junto: ele encolhe para
     * esta linha, que fica ao lado do rótulo.
     */
    compactNotice: 'você está falando com uma IA',
    placeholder: 'pergunte sobre projetos, stack, forma de trabalhar…',
    sendLabel: 'Enviar pergunta',
    inputLabel: 'Sua pergunta para a IA do Marcilio',
    clear: 'limpar conversa',
    /**
     * Uma delas é sorteada por pergunta, a partir do id do turno — não muda
     * enquanto a resposta não chega. Sem tom de quem está se justificando pelo
     * que pode ou não pode dizer: isso já está no disclaimer, e repetir a cada
     * espera soa defensivo.
     */
    thinking: [
      'consultando os projetos',
      'buscando as informações',
      'preparando a resposta',
    ],
    sourcesLabel: 'fontes',
    followUpsLabel: 'continue por aqui',
    contactCta: 'falar com o Marcilio',
    emptyState: 'Escolha uma pergunta abaixo ou escreva a sua.',
    errors: {
      generic: 'Deu problema aqui do meu lado. Tenta de novo em instantes.',
      timeout: 'Demorei demais para responder. Tenta perguntar de novo.',
      disabled: 'A IA está desligada no momento. Você pode consultar as respostas fixas abaixo ou falar com o Marcilio.',
      rateLimit: 'Você fez muitas perguntas seguidas. Espere um pouco antes da próxima.',
      budget: 'A IA atingiu o limite de uso. Você pode consultar as respostas abaixo ou falar direto com o Marcilio.',
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
    // Respostas fixas do portfólio, exibidas sem uma chamada ao modelo.
    fallback: {
      intro: 'Enquanto a IA está indisponível, você pode consultar estas respostas do portfólio.',
      label: 'resposta fixa do portfólio',
      items: [
        {
          question: 'O que você já construiu em produção?',
          answer: 'Publiquei o catálogo imobiliário feito para meu pai e o site do Sushi do Verão. Também desenvolvi o SISCO, usado no IFMS para organizar horas complementares, e uma automação de faturamento para uma rede de lojas. O VamoAgendar é outro projeto meu, mas ainda está em desenvolvimento para o beta.',
        },
        {
          question: 'Como você usa IA sem depender dela?',
          answer: 'Uso para pesquisar código, discutir caminhos, implementar e revisar. Continuo responsável pelas decisões e pela entrega: confiro a documentação e testo o comportamento. Já tive um caso em que ela atrapalhou, no voxel engine em C++ de 2024. As sugestões para a câmera e as matrizes quebravam o que funcionava, então segui com a documentação e a depuração.',
        },
        {
          question: 'Você está disponível para estágio?',
          answer: 'Tenho interesse em estágio e em uma primeira vaga formal. Minha experiência até aqui veio de projetos próprios e clientes diretos, e quero trabalhar também em uma equipe de engenharia. Para conversar sobre uma vaga e confirmar disponibilidade, fale comigo pelo e-mail ou LinkedIn.',
        },
        {
          question: 'Como funciona um projeto com você?',
          answer: 'Primeiro conversamos sobre o que você precisa e o que já existe. Definimos o escopo por escrito, depois eu desenvolvo, testo e publico no ambiente combinado. Uso relatórios de andamento para acompanhar o trabalho. Preço, prazo e disponibilidade são combinados diretamente comigo.',
        },
        {
          question: 'O que você ainda está aprendendo?',
          answer: 'No VamoAgendar, tenho trabalhado com regras de horários, cobrança e assinaturas. Também quero ganhar experiência revisando código com outras pessoas e trabalhando em uma base mantida por uma equipe.',
        },
      ],
    },
  },

  contact: {
    number: '06',
    label: 'CONTATO',
    title: 'Vamos',
    titleHighlight: 'conversar.',
    titleHighlightClient: 'conversar.',
    text: 'Me conte o que você precisa desenvolver. Pode ser uma ideia nova ou algo que já existe e precisa de ajustes.',
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
    problemLabel: 'O que precisava mudar',
    solutionLabel: 'O que eu fiz',
    techsLabel: 'Tecnologias',
    epilogue: 'No catálogo também estão os produtos que estou desenvolvendo e os projetos de estudo.',
    projects: [
      {
        name: 'Ecossistema de Coleta e Metas',
        type: 'Cliente Workana',
        problem: 'A equipe de uma rede de lojas copiava os dados de faturamento de cada filial todos os dias. O sistema de vendas não tinha uma API pública para buscar essas informações.',
        solution: 'Criei um coletor que acessa o painel de cada loja em uma sessão separada, uma API que recebe os dados e um painel que reúne os resultados. Depois acrescentei metas, comissões e aprovação de premiações.',
        stack: 'Node.js · Playwright · Express · Prisma · Docker',
        year: '2025'
      },
      {
        name: 'Catálogo & App Imobiliário',
        type: 'Projeto sob medida / Uso interno',
        url: 'https://marciliobarbosacorretor.com.br',
        problem: 'Meu pai é corretor e recebia fotos e informações de imóveis pelo WhatsApp. Depois precisava organizar esse material e escrever os anúncios.',
        solution: 'Fiz um app para enviar fotos e áudios durante as visitas, uma área administrativa e o catálogo público. A integração com a OpenAI ajuda a organizar as informações e preparar os anúncios.',
        stack: 'Next.js SSR · Expo/React Native · Prisma · MinIO · OpenAI API',
        year: '2026'
      },
      {
        name: 'Sushi do Verão',
        type: 'Empresa local',
        problem: 'Um restaurante da minha cidade precisava apresentar os pratos, a localização e os horários para quem chega pelo celular, com um caminho direto até o atendimento.',
        solution: 'Desenvolvi o site institucional com fotos, informações do restaurante e contato pelo WhatsApp. Também construí a base de uma proposta de sistema de pedidos; essa parte não foi aprovada para produção e não integra a entrega publicada.',
        url: 'https://sushidoverao.com.br/',
        stack: 'TypeScript · Vite · CSS',
        year: '2026'
      }
    ],
    reviewsLabel: 'DEPOIMENTO',
    reviewsTitle: 'O que os clientes',
    reviewsTitleHighlight: 'dizem.',
    reviews: [
      {
        name: 'Fernando (Gerente de Operações)',
        project: 'Ecossistema de Coleta',
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
    role: ['Full Stack', 'Developer'],
    subtitle:
      'I build websites, systems and automations. Here you can see my client work, products in development and projects I built to learn.',
    availability: {
      defaultStatus: 'Let\'s discuss your project',
      defaultTypes: ['Websites', 'Systems', 'Automations'],
      freelanceStatus: 'Let\'s discuss your project',
      freelanceTypes: ['Web Apps', 'Websites', 'APIs'],
      cta: 'What do you need to build?',
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
    archiveText: 'Explore all projects',
    scrollText: 'scroll to advance',
    openText: 'Open',
    eras: [
      {
        id: 'surface',
        name: 'Websites and systems',
        subtitle: 'Websites, systems and products at different stages.',
        glowColor: 'rgba(63, 24, 171, 0.12)',
        projects: [
          {
            name: 'Real Estate Catalog & App',
            type: 'Custom Solution',
            year: '2026',
            narrative: 'A property catalog and mobile app for my father, a real estate agent. He sends photos and voice notes from his phone; AI helps structure the information for listings. The work connects the website, administration area and app in a workflow designed for field use.',
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
            type: 'Academic System',
            year: '2025',
            narrative: 'My high school graduation project at IFMS: a system for managing complementary course hours. Students submit certificates and teachers review them in a dashboard, bringing together information previously scattered across spreadsheets and messages.',
            stack: 'Laravel 11 · Livewire 3 · Alpine.js · MariaDB',
            links: [{ label: 'Repository', href: 'https://github.com/KriawqZero/SISCO-IFMS' }],
            stat: { value: 'IFMS', label: 'complementary hours' },
            media: {
              image: '/cases/sisco.webp',
              alt: 'SISCO dashboard: certificates awaiting validation and the classes assigned to the professor',
            },
          },
          {
            name: 'VamoAgendar',
            type: 'SaaS in Development',
            year: '2026',
            narrative: 'I am building this scheduling product with an investing partner. Professionals enter their services and availability, and customers book through a link. The dashboard and scheduling rules are implemented. Subscription billing still needs work before beta.',
            stack: 'Next.js 16 · Prisma 7 · PostgreSQL · Mercado Pago · better-auth',
            links: [{ label: 'Repository', href: 'https://github.com/KriawqZero/vamoagendar' }, { label: 'Visit', href: 'https://vamoagendar.com.br/' }],
            stat: { value: 'SaaS', label: 'in development' },
            media: {
              image: '/cases/vamoagendar.webp',
              alt: 'VamoAgendar interface, with the booking simulator on the service selection step',
              url: 'https://vamoagendar.com.br/',
              video: '/cases/vamoagendar.webm',
              poster: '/cases/vamoagendar-poster.webp',
            },
          },
        ],
      },
      {
        id: 'infra',
        name: 'Automations',
        subtitle: 'Data collection, integrations and tasks that used to be manual.',
        glowColor: 'rgba(16, 185, 129, 0.10)',
        projects: [
          {
            name: 'Data Collection Ecosystem',
            type: 'Custom Solution / B2B',
            year: '2025',
            narrative: 'Automation to consolidate revenue data for a retail chain whose sales system had no public API. I developed a collector with isolated sessions, an API for storing the data and a dashboard for reviewing it. The three services form a single solution.',
            stack: 'Node.js · Playwright · Express · Prisma · Docker',
            links: [],
            stat: { value: '3 Services', label: 'distributed architecture' },
          },
        ],
      },
      {
        id: 'lowlevel',
        name: 'Games and graphics',
        subtitle: 'Experiments with C++, OpenGL and 3D rendering.',
        glowColor: 'rgba(239, 68, 68, 0.08)',
        projects: [
          {
            name: 'Voxel Engine (Classic OpenGL)',
            type: 'Personal Lab',
            year: '2024',
            narrative: 'I tried building a block world in C++ to learn 3D rendering without an existing engine. I worked on a first-person camera, chunk generation and a debugging interface. Getting the projection matrices right took a while.',
            stack: 'C++20 · OpenGL · GLFW · GLM · Dear ImGui',
            links: [{ label: 'Repository', href: 'https://github.com/KriawqZero/mine' }],
            stat: { value: '3D Math', label: 'classic pipeline' },
          },
          {
            name: 'Voxel Engine (Shader Pipeline)',
            type: 'Incomplete Experiment',
            year: '2024',
            narrative: 'I started rewriting the block world using shaders and GPU buffers. This version was left unfinished when the school semester ended. It was where I wrote my first shaders and worked with memory management in C++.',
            stack: 'C++20 · OpenGL Core Profile · GLEW · CMake',
            links: [{ label: 'Repository', href: 'https://github.com/KriawqZero/mine_glModerno' }],
            stat: { value: 'GPU Pipeline', label: 'incomplete project' },
          },
        ],
      },
      {
        id: 'roots',
        name: 'My first projects',
        subtitle: 'Minecraft mods and Python programs I made while at school.',
        glowColor: 'rgba(245, 158, 11, 0.08)',
        projects: [
          {
            name: 'Bank Simulator',
            type: 'Childhood Curiosity',
            year: 'March 2020',
            narrative: 'One of my first Python programs. I wanted to find out how to keep data after closing a window, so I built forms with Kivy and saved the information in JSON files.',
            stack: 'Python · Kivy Framework · Local JSON',
            links: [{ label: 'Repository', href: 'https://github.com/KriawqZero/bankkp' }],
            stat: { value: 'JSON', label: 'file storage' },
          },
          {
            name: 'Desktop Player',
            type: 'Childhood Curiosity',
            year: 'March 2020',
            narrative: 'A Python player that reads a folder of MP3 files and lets you play, stop and change tracks. The original code still points to the folder on the computer I used back then.',
            stack: 'Python · Kivy Core Audio',
            links: [{ label: 'Repository', href: 'https://github.com/KriawqZero/musicplayer' }],
            stat: { value: 'Audio', label: 'MP3 files' },
          },
          {
            name: 'Event Loop',
            type: 'Childhood Curiosity',
            year: 'Early 2020',
            narrative: 'A stopwatch made with Python and Kivy. I learned to update the time on screen without blocking the buttons, using scheduled callbacks at short intervals.',
            stack: 'Python · Kivy KV Language',
            links: [{ label: 'Repository', href: 'https://github.com/KriawqZero/cronometer' }],
            stat: { value: 'Events', label: 'screen updates' },
          },
          {
            name: 'Mod for Minecraft (1.12.2)',
            type: 'Ground Zero',
            year: 'May 2019',
            narrative: 'My first GitHub repository, from May 2019. I played Minecraft and wanted to add things to the game. I learned Java while building blocks, ores and a furnace with its own interface using Forge.',
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
      narrative: 'I built the foundation of an API, a dashboard and a menu so the restaurant could change dishes and prices. That system was not approved for production. The published delivery was the restaurant website.',
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
      narrative: 'A school game with a maze, collisions and Canvas rendering. I used TypeScript to control movement and screen updates.',
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
      narrative: 'A Java Minecraft mod with storage crates. I worked with block registration and how NeoForge stores item state in the game.',
      links: [
        { label: 'Repository', href: 'https://github.com/KriawqZero/kriawqsstoragecrates' }
      ]
    },
    {
      year: '2024',
      name: 'Simple Machines',
      type: 'NeoForge Mod',
      stack: ['Java', 'NeoForge', 'Gradle'],
      narrative: 'A mod with an energy generator and a macerator. I worked on transferring energy between blocks and preserving their state across server updates.',
      links: [
        { label: 'Repository', href: 'https://github.com/KriawqZero/kriawqssimplemachines-26.1.2' }
      ]
    },
    {
      year: '2023',
      name: 'Avantis — former brand website',
      type: 'Landing Page',
      stack: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
      narrative: 'The website I built to present my services under the Avantis name. It is now a record of that period; I present my work as Marcilio Ortiz.',
      media: { image: '/cases/thumbs/avantis.webp', alt: 'Archived view of the former Avantis website' },
      links: [
        { label: 'Repository', href: 'https://github.com/KriawqZero/avantis-porfolio' }
      ]
    }
  ],

  about: {
    number: '03',
    label: 'ABOUT ME',
    title: 'About',
    titleHighlight: 'me.',
    text: 'I am from Corumbá, Brazil, and have been freelancing since March 2025. I started with Minecraft mods in Java, then Python programs, my final project at IFMS and work for clients. I like figuring out how things work and learning by building them.',
    cta: 'Explore my process',
    principles: [
      { title: 'Before we start', text: 'We discuss what you need, what already exists and what the delivery should include.' },
      { title: 'Development', text: 'I work on databases, APIs, screens, tests and deployment, depending on what the project needs.' },
      { title: 'You talk to me', text: 'I build and follow the work myself. When a decision changes the scope, we discuss it before moving on.' },
    ],
  },

  avantis: {
    number: '02',
    label: 'INDEPENDENT DEVELOPMENT',
    title: 'You work',
    titleHighlight: 'with me.',
    description: 'Websites, systems and automations',
    text: 'Need a website, an automated task or changes to an existing system? Tell me how it works today and what needs to change. We can work out the scope before getting started.',
    links: [
      { label: 'Discuss a project', href: '#contato' },
      { label: '@marciliortiz.dev', href: 'https://www.instagram.com/marciliortiz.dev/' }
    ]
  },

  process: {
    number: '04',
    label: 'PROCESS',
    title: 'How a project works',
    description: 'These are the steps from our first conversation to delivery.',
    scrollText: 'scroll to advance',
    steps: [
      {
        number: '01',
        title: 'Conversation',
        description:
          'You show me how you work today, what needs to change and what you have already tried.',
      },
      {
        number: '02',
        title: 'Scope',
        description:
          'We agree on screens, integrations, priorities and what is outside this delivery.',
      },
      {
        number: '03',
        title: 'Development',
        description:
          'I build the agreed features and test the flows. You follow the progress and review what is ready.',
      },
      {
        number: '04',
        title: 'Delivery',
        description:
          'I deploy to the agreed environment, check that it works and leave instructions for use and maintenance.',
      },
    ],
  },

  aiChat: {
    number: '05',
    label: 'MARCILIO AI',
    title: 'Ask',
    titleHighlight: 'my AI.',
    /** Título da aba na página própria da IA. */
    pageTitle: 'Marcilio AI — ask about my work',
    nav: {
      label: 'Main navigation',
      portfolio: 'The portfolio',
      ia: 'Talk to my AI',
    },
    invite: {
      hero: 'Talk to my AI',
      contactPrompt: 'Rather ask before writing?',
      contactCta: 'Talk to my AI',
    },
    description: 'An assistant with information about my projects and how I work.',
    disclaimer: 'You are talking to an AI, not to me. It explains my work, but it does not decide anything or commit to anything on my behalf.',
    /** Ver a nota no bloco em português. */
    privacy: 'Questions are recorded on my side, so I can follow what people ask and improve the answers.',
    /** Ver a nota no bloco em português. */
    compactNotice: 'you are talking to an AI',
    placeholder: 'ask about projects, stack, how I work…',
    sendLabel: 'Send question',
    inputLabel: 'Your question for Marcilio\'s AI',
    clear: 'clear conversation',
    /** Ver a nota no bloco em português. */
    thinking: [
      'checking the projects',
      'finding the information',
      'preparing the answer',
    ],
    sourcesLabel: 'sources',
    followUpsLabel: 'keep going',
    contactCta: 'talk to Marcilio',
    emptyState: 'Pick a question from the list or write your own.',
    errors: {
      generic: 'Something broke on my side. Try again in a moment.',
      timeout: 'I took too long to answer. Try asking again.',
      disabled: 'The AI is switched off right now. You can read the prepared answers below or contact Marcilio.',
      rateLimit: 'That was a lot of questions in a row. Give it a minute before the next one.',
      budget: 'The AI has reached its usage limit. You can read the answers below or contact Marcilio directly.',
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
      intro: 'While the AI is unavailable, you can read these answers from the portfolio.',
      label: 'prepared portfolio answer',
      items: [
        {
          question: 'What have you built in production?',
          answer: 'I published the property catalog I built for my father and the Sushi do Verão website. I also developed SISCO, used at IFMS to manage complementary course hours, and a revenue automation for a retail chain. VamoAgendar is another project of mine, but it is still in development toward beta.',
        },
        {
          question: 'How do you use AI without depending on it?',
          answer: 'I use it to explore code, discuss options, implement and review. I remain responsible for the decisions and delivery: I check documentation and test the behavior. It has also got in the way. On my 2024 C++ voxel engine, suggestions for the camera and matrices broke working code, so I continued with documentation and debugging.',
        },
        {
          question: 'Are you available for an internship?',
          answer: 'I am interested in an internship or my first formal role. My experience so far comes from personal projects and direct clients, and I want to work in an engineering team too. Please contact me by email or LinkedIn to discuss a role and confirm availability.',
        },
        {
          question: 'How does a project with you work?',
          answer: 'We first discuss what you need and what already exists. We write down the scope, then I build, test and deploy to the agreed environment. I use progress reports to keep track of the work. Prices, deadlines and availability are agreed directly with me.',
        },
        {
          question: 'What are you still learning?',
          answer: 'On VamoAgendar, I have been working on scheduling rules, billing and subscriptions. I also want more experience reviewing code with other people and working on a codebase maintained by a team.',
        },
      ],
    },
  },

  contact: {
    number: '06',
    label: 'CONTACT',
    title: 'Let\'s',
    titleHighlight: 'talk.',
    titleHighlightClient: 'talk.',
    text: 'Tell me what you need to build. It can be a new idea or something you already have and want to improve.',
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
    problemLabel: 'What needed to change',
    solutionLabel: 'What I built',
    techsLabel: 'Technologies',
    epilogue: 'The catalog also includes products I am working on and projects I built to learn.',
    projects: [
      {
        name: 'Data Collection & Goals Ecosystem',
        type: 'Workana Client',
        problem: 'A retail team copied revenue data from each store every day. Their sales system had no public API for retrieving that information.',
        solution: 'I built a collector that opens each store dashboard in a separate session, an API that receives the data and a dashboard that brings the results together. I later added goals, commissions and reward approvals.',
        stack: 'Node.js · Playwright · Express · Prisma · Docker',
        year: '2025'
      },
      {
        name: 'Real Estate Catalog & App',
        type: 'Custom Project / Internal Use',
        url: 'https://marciliobarbosacorretor.com.br',
        problem: 'My father is a real estate agent. He received property photos and information through WhatsApp, then had to organize the material and write the listings.',
        solution: 'I built an app for sending photos and voice notes during visits, an administration area and the public catalog. The OpenAI integration helps organize the information and prepare listings.',
        stack: 'Next.js SSR · Expo/React Native · Prisma · MinIO · OpenAI API',
        year: '2026'
      },
      {
        name: 'Sushi do Verão',
        type: 'Local Business',
        problem: 'A local restaurant needed to present its dishes, location and opening hours to mobile visitors, with a direct path to contact the business.',
        solution: 'I built the institutional website with photography, restaurant information and WhatsApp contact. I also built the foundation of an ordering system proposal; that part was not approved for production and is not part of the published delivery.',
        url: 'https://sushidoverao.com.br/',
        stack: 'TypeScript · Vite · CSS',
        year: '2026'
      }
    ],
    reviewsLabel: 'TESTIMONIAL',
    reviewsTitle: 'What clients',
    reviewsTitleHighlight: 'are saying.',
    reviews: [
      {
        name: 'Fernando (Operations Manager)',
        project: 'Data Collection Ecosystem',
        quote: 'Marcilio managed to bypass the lack of an official API that was stalling our operation. The automation has been running flawlessly and saving the entire team a lot of time.'
      },
      null,
      null
    ]
  }
};
