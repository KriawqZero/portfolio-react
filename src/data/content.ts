export const content = {
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
      'Estudante Técnico em Informática com experiência real em projetos freelancer. Atuo de ponta a ponta: da arquitetura de banco de dados e APIs robustas até a interface final, pois um produto de verdade não vive apenas de respostas JSON.',
    availability: {
      status: 'Disponível para oportunidades',
      types: ['Estágio', 'Emprego', 'Projetos'],
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
    eras: [
      {
        id: 'surface',
        name: 'A Superfície',
        subtitle: 'Produtos em produção. Engenharia com foco em negócios.',
        glowColor: 'rgba(63, 24, 171, 0.12)',
        projects: [
          {
            name: 'Ecossistema Corretor',
            type: 'Solução sob Medida',
            year: '2025',
            narrative: 'Desenvolvi uma plataforma imobiliária completa para o meu pai. Ele é corretor de imóveis e leigo em tecnologia. Criei um portal público em Next.js altamente performático para indexação no Google (SEO) e um aplicativo mobile nativo em Expo que ele usa na rua para cadastrar imóveis. Integrei a API da OpenAI para receber os dados crus coletados por ele e gerar descrições comerciais impecáveis automaticamente.',
            stack: 'Next.js SSR · Expo/React Native · Prisma · MinIO · OpenAI API',
            links: [
              { label: 'Visitar Site', href: 'https://marciliobarbosacorretor.com.br/' },
              { label: 'Repo Portal', href: 'https://github.com/KriawqZero/marciliobarbosa-corretor' },
              { label: 'Repo App', href: 'https://github.com/KriawqZero/app-marciliobarbosa-corretor' }
            ],
            stat: { value: 'Full Stack', label: 'produção + ia' },
          },
          {
            name: 'SISCO',
            type: 'Acadêmico (Em Produção)',
            year: '2025',
            narrative: 'Meu Trabalho de Conclusão de Curso do ensino médio técnico no IFMS. Em vez de deixar o código morrer na gaveta da escola, projetei uma arquitetura robusta baseada no Service Pattern e processamento assíncrono em fila para automatizar a contagem de horas complementares. O projeto foi homologado e hoje opera em produção real, gerenciando a vida acadêmica de mais de 200 alunos e coordenadores.',
            stack: 'Laravel 11 · Livewire 3 · Alpine.js · MariaDB',
            links: [{ label: 'Repositório', href: 'https://github.com/KriawqZero/SISCO-IFMS' }],
            stat: { value: '200+', label: 'usuários ativos' },
          },
          {
            name: 'VamoAgendar',
            type: 'SaaS Autoral',
            year: '2025',
            narrative: 'Um software como serviço (SaaS) completo de agendamento online focado em profissionais autônomos. Toda a complexidade da aplicação está concentrada no backend: desenvolvi um motor temporal complexo que calcula slots de horários livres cruzando fusos horários, durações de serviços, feriados locais e agendamentos existentes. Usei este projeto para dominar Server Actions e criptografia de assinaturas via webhooks.',
            stack: 'Next.js 16 · Prisma 7 · PostgreSQL · Mercado Pago · better-auth',
            links: [{ label: 'Repositório', href: 'https://github.com/KriawqZero/vamoagendar' }, { label: 'Visitar', href: 'https://vamoagendar.com.br/' }],
            stat: { value: 'SaaS', label: 'infraestrutura temporal' },
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
            name: 'Mine Voxel Engine (Legado)',
            type: 'Laboratório Pessoal',
            year: '2024',
            narrative: 'Para entender como os motores gráficos funcionam sem a abstração de engines prontas, decidi construir um motor baseado em voxels usando C++ e OpenGL clássico. O maior desafio técnico foi desenvolver o sistema de câmera 3D em primeira pessoa, calculando sensibilidade do mouse, pitch, yaw e matrizes de projeção usando puramente matemática vetorial no ensino médio.',
            stack: 'C++20 · OpenGL · GLFW · GLM · Dear ImGui',
            links: [{ label: 'Repositório', href: 'https://github.com/KriawqZero/mine' }],
            stat: { value: '3D Math', label: 'pipeline clássica' },
          },
          {
            name: 'Mine (OpenGL Moderno)',
            type: 'Experimento Incompleto',
            year: '2024',
            narrative: 'Uma tentativa honesta de refatorar o motor de voxels anterior para a pipeline programável moderna da GPU, utilizando Shaders, VBOs e VAOs. O projeto acabou sendo congelado devido ao final do semestre letivo na escola, tornando-se um cemitério de código altamente produtivo. Guardar esse repositório público é um lembrete do meu primeiro contato bruto com alocação manual de memória e compilação de shaders na unha.',
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
            name: 'Bank Simulator Kivy',
            type: 'Curiosidade de Infância',
            year: 'Março de 2020',
            narrative: 'Desenvolvido aos 12 anos de idade, exatamente na semana em que a pandemia estourou. Eu queria entender como os programas mantinham dados salvos após fechar a janela. Sem saber o que era um banco de dados relacional, criei uma mecânica rudimentar em Python para coletar inputs de texto, serializá-los e gravá-los de forma permanente no disco do meu computador de infância em arquivos JSON.',
            stack: 'Python · Kivy Framework · JSON Local',
            links: [{ label: 'Repositório', href: 'https://github.com/KriawqZero/bankkp' }],
            stat: { value: '12 anos', label: 'persistência crua' },
          },
          {
            name: 'Music Player Kivy',
            type: 'Curiosidade de Infância',
            year: 'Março de 2020',
            narrative: 'Meu segundo experimento visual com Python na infância. Construí um player de áudio completo capaz de ler um diretório do Windows, filtrar arquivos com extensão .mp3 e gerenciar o estado das faixas (play, stop, avançar e retroceder). O código original possui caminhos engessados diretamente para a partição do meu computador de infância (F:/marcilinho/...), expondo a natureza pura e caseira do meu início na programação.',
            stack: 'Python · Kivy Core Audio',
            links: [{ label: 'Repositório', href: 'https://github.com/KriawqZero/musicplayer' }],
            stat: { value: '12 anos', label: 'gerenciamento de arquivos' },
          },
          {
            name: 'Cronômetro Kivy',
            type: 'Curiosidade de Infância',
            year: 'Início de 2020',
            narrative: 'Criado um pouco antes da pandemia, este projeto nasceu da curiosidade de tirar o Python do terminal e colocá-lo em uma interface interativa. Me forçou a entender, pela primeira vez, o paradigma de desenvolvimento orientado a eventos. Descobrir que o tempo em uma tela não se atualiza sozinho e que era necessário criar um loop de agendamento em ciclos de 0.1 segundos sem travar a thread da UI foi minha primeira grande lição de arquitetura.',
            stack: 'Python · Kivy KV Language',
            links: [{ label: 'Repositório', href: 'https://github.com/KriawqZero/cronometer' }],
            stat: { value: '12 anos', label: 'event loop' },
          },
          {
            name: 'vbmod',
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

  about: {
    number: '03',
    label: 'SOBRE MIM',
    title: 'Mais que código,',
    titleHighlight: 'propósito.',
    text: 'Ainda no Ensino Técnico, atuo como freelancer há mais de um ano entregando soluções reais. Como desenvolvedor independente, domino o ciclo completo do produto. Minha paixão é projetar arquiteturas no Backend, mas sei que o usuário consome interfaces. Busco minha primeira oportunidade corporativa para transformar essa vivência Full Stack em valor real para uma grande equipe.',
    cta: 'Conhecer minha jornada',
    stats: [
      { value: '+1', label: 'ano', sublabel: 'De imersão diária em programação' },
      { value: '+30', label: 'projetos', sublabel: 'Aplicações web e desafios práticos' },
      { value: '+10', label: 'clientes', sublabel: 'Atendidos com soluções em produção' },
      { value: '+500', label: 'commits', sublabel: 'Registrados no GitHub no último ano' },
      { value: '+5', label: 'tecnologias', sublabel: 'Dominadas na stack principal' },
      { value: '100%', label: 'foco', sublabel: 'Em construir sistemas robustos e escaláveis' },
      { value: '+1000', label: 'horas', sublabel: 'Lendo documentação oficial' },
      { value: '+20k', label: 'linhas', sublabel: 'De código escritas ou refatoradas' },
      { value: '∞', label: 'bugs', sublabel: 'Resolvidos com muita paciência' },
      { value: '∞', label: '', sublabel: 'Vontade de aprender e evoluir' },
    ],
  },

  avantis: {
    number: '02',
    label: 'A INICIATIVA',
    title: 'Do estudo à',
    titleHighlight: 'prática real.',
    subtitle: '',
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

  contact: {
    number: '05',
    label: 'PRÓXIMO CAPÍTULO',
    title: 'Vamos construir',
    titleHighlight: 'juntos.',
    text: 'Se você chegou até aqui, já conhece meu trabalho, meu processo e minha forma de pensar. Agora só falta a conversa.',
    narrativePhrases: [
      'Uma vaga.',
      'Um estágio.',
      'Uma parceria.',
      'Uma ideia.',
      'Ou apenas uma boa conversa.',
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
}
