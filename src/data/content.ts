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
        subtitle: 'Produtos reais. Clientes reais. Problemas reais.',
        glowColor: 'rgba(63, 24, 171, 0.12)',
        projects: [
          {
            name: 'Ecossistema Corretor',
            year: '2025',
            narrative: 'Desenvolvi esse sistema para o meu pai. Ele é corretor de imóveis e não tem facilidade com tecnologia. Construí uma plataforma inteira: um site com renderização no servidor otimizado para SEO e um aplicativo nativo que ele usa na rua. A grande sacada foi integrar a API da OpenAI para escrever as descrições dos imóveis automaticamente. Resolve um problema real de comunicação com zero atrito.',
            stack: 'Next.js SSR · Expo/React Native · Prisma · MinIO · OpenAI API',
            link: 'https://github.com/KriawqZero/marciliobarbosa-corretor',
            stat: { value: 'Full Stack', label: 'web + mobile + ia' },
          },
          {
            name: 'SISCO',
            year: '2025',
            narrative: 'O código acadêmico que não morreu na gaveta. Esse foi meu TCC do ensino médio no IFMS. Projetei a arquitetura do zero usando jobs assíncronos para resolver o caos que era a contagem de horas complementares. Hoje o sistema opera em produção real gerenciando a vida acadêmica de mais de 200 alunos e coordenadores da instituição.',
            stack: 'TALL Stack (Tailwind, Alpine, Laravel, Livewire) · MariaDB',
            link: 'https://github.com/KriawqZero/IFMS-Sistema_CargaHoraria',
            stat: { value: '200+', label: 'alunos em produção' },
          },
          {
            name: 'VamoAgendar',
            year: '2025',
            narrative: 'Um SaaS para profissionais autônomos. A interface é limpa, mas a verdadeira complexidade mora na matemática temporal. Desenvolvi um motor que cruza fuso horário, feriados, duração variável de serviços e agendamentos conflitantes para gerar slots livres em tempo real. Usei esse case para consolidar os padrões de Server Actions e Server Components do ecossistema moderno.',
            stack: 'Next.js 16 · Prisma 7 · PostgreSQL · Mercado Pago · better-auth',
            link: 'https://github.com/KriawqZero/vamoagendar',
            stat: { value: 'SaaS', label: 'free / plus / pro' },
          },
        ],
      },
      {
        id: 'infra',
        name: 'A Infraestrutura',
        subtitle: 'Workers, robôs e a engenharia que ninguém vê.',
        glowColor: 'rgba(16, 185, 129, 0.10)',
        projects: [
          {
            name: 'Ecossistema Scrapper',
            year: '2025',
            narrative: 'Um cliente de grande porte geria dezenas de lojas no app Kyte, mas não havia uma API oficial para extrair relatórios. Desenvolvi uma infraestrutura distribuída. Construí um worker headless que roda em lote navegando em ambiente estéril (para não vazar sessões), extrai os dados direto do DOM e alimenta minha API central. Um motor de regras de negócio silencioso e autônomo.',
            stack: 'Node.js · Playwright · Express · Prisma · Docker',
            link: 'https://github.com/KriawqZero/scrapper-scrapper',
            stat: { value: '3 serviços', label: 'worker + api + dashboard' },
          },
        ],
      },
      {
        id: 'lowlevel',
        name: 'O Baixo Nível',
        subtitle: 'C++, OpenGL e o atrito direto com a máquina.',
        glowColor: 'rgba(239, 68, 68, 0.08)',
        projects: [
          {
            name: 'Mine',
            year: '2024',
            narrative: 'Eu precisava entender como a renderização 3D funcionava sem a mágica das engines prontas. Fui para o C++ e OpenGL. Calcular matrizes de projeção e a física de uma câmera com matemática vetorial no ensino médio doeu bastante. Minha tentativa de refatorar o código para o OpenGL Moderno travou na compilação de Shaders na mão. Guardo esse "fracasso" com orgulho porque ele me ensinou a pipeline da GPU na força bruta.',
            stack: 'C++20 · OpenGL · GLFW · GLM · Dear ImGui',
            link: 'https://github.com/KriawqZero/mine',
            stat: { value: '2 repos', label: 'legado + moderno' },
          },
        ],
      },
      {
        id: 'roots',
        name: 'As Raízes',
        subtitle: '12 anos. Curiosidade pura. Nenhuma IA.',
        glowColor: 'rgba(245, 158, 11, 0.08)',
        projects: [
          {
            name: 'Bank Simulator',
            year: '2020',
            narrative: 'Eu estava começando no Python e queria guardar informações visuais. Sem fazer ideia do que era arquitetura ou um banco de dados relacional, escrevi uma lógica engessada para serializar senhas e saldos num arquivo .json local. O código era ingênuo e puramente procedural, mas ver os dados resistindo ao fechar o programa foi incrível.',
            stack: 'Python · Kivy · Persistência em JSON Local',
            link: 'https://github.com/KriawqZero/Bank-Simulator-Kivy',
          },
          {
            name: 'vbmod',
            year: '2019',
            narrative: 'Meu primeiro repositório no GitHub. Eu jogava Minecraft e decidi compilar meu próprio mod em Java usando o Forge. Adicionei minérios, blocos mecânicos e ferramentas. A base de código é uma colcha de retalhos tirada de documentações confusas que eu mal sabia ler direito. Está aqui para provar algo simples: eu programo desde criança puramente pelo prazer de construir coisas.',
            stack: 'Java · API Forge 1.12.2 · Gradle',
            link: 'https://github.com/KriawqZero/vbmod',
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
