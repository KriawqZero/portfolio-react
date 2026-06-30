export const content = {
  nav: {
    links: [
      { href: '#inicio', label: 'Início' },
      { href: '#sobre', label: 'Sobre' },
      { href: '#projetos', label: 'Projetos' },
      { href: '#habilidades', label: 'Habilidades' },
      { href: '#contato', label: 'Contato' },
    ],
  },

  hero: {
    greeting: 'OLÁ, EU SOU',
    name: 'Marcilio Ortiz',
    role: ['Desenvolvedor', 'Full Stack'],
    subtitle:
      'Estudante apaixonado por criar experiências digitais modernas, funcionais e com propósito. Transformo ideias em interfaces que conectam.',
    availability: {
      status: 'Disponível para oportunidades',
      types: ['Estágio', 'Emprego', 'Projetos'],
      cta: 'Vamos construir algo incrível juntos?',
    },
    techs: [
      { name: 'React', icon: 'react' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'NestJS', icon: 'nestjs' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'Docker', icon: 'docker' },
    ],
    ctaPrimary: 'Ver Projetos',
    ctaSecondary: 'Sobre mim',
  },

  featuredProject: {
    number: '01',
    label: 'PROJETO EM DESTAQUE',
    project: {
      name: 'Condy',
      tagline: 'Sistema de chamados institucional',
      description:
        'Plataforma completa com workflow multi-etapas, controle granular de permissões, upload dinâmico para AWS S3 e arquitetura frontend/backend separada. Sistema real em uso com mais de 400 usuários ativos.',
      stats: [
        { value: '400+', label: 'Usuários ativos' },
        { value: 'Multi', label: 'Tenant' },
        { value: 'AWS', label: 'Cloud' },
      ],
      tech: ['NestJS', 'Next.js', 'PostgreSQL', 'Docker', 'AWS S3'],
      link: 'https://condy.com.br',
    },
  },

  about: {
    number: '02',
    label: 'SOBRE MIM',
    title: 'Mais que código,',
    titleHighlight: 'propósito.',
    text: 'Sou um estudante de desenvolvimento web apaixonado por transformar ideias em interfaces que fazem sentido. Atualmente focado em React e na criação de experiências digitais modernas, acessíveis e funcionais.',
    cta: 'Conhecer minha jornada',
    stats: [
      { value: '+1', label: 'ano', sublabel: 'Estudando e praticando' },
      { value: '+10', label: 'projetos', sublabel: 'Projetos pessoais' },
      { value: '∞', label: '', sublabel: 'Horas de dedicação' },
    ],
  },

  otherProjects: {
    number: '03',
    label: 'PROJETOS',
    title: 'Outros trabalhos',
    items: [
      {
        name: 'WebGestor',
        description:
          'Reformulação completa do sistema de páginas de vendas para clientes CRM. Stack moderna integrada a banco de dados legado.',
        tech: ['Laravel', 'Inertia.js', 'React', 'MySQL', 'TailwindCSS'],
        link: 'https://webgestor.com.br/',
        highlights: [
          'Reformulação completa de páginas de vendas',
          'Integração com banco de dados legado (2006)',
          'Sistema multi-cliente em produção',
        ],
      },
      {
        name: 'SISCO',
        description:
          'Sistema institucional oficial de emissão de certificados do IFMS. Adoção obrigatória para todos os alunos do ensino médio.',
        tech: ['Laravel', 'MariaDB', 'Alpine.js', 'TailwindCSS'],
        link: 'https://github.com/KriawqZero/IFMS-Sistema_CargaHoraria',
        highlights: [
          '400+ alunos cadastrados',
          'Redução de 80% no tempo de emissão',
          'Automação completa de processos acadêmicos',
        ],
      },
    ],
  },

  stack: {
    number: '04',
    label: 'STACK & DIFERENCIAIS',
    title: 'Ferramentas que uso para criar',
    titleHighlight: 'soluções',
    subtitle:
      'Tecnologias que estudo, pratico e utilizo para transformar ideias em projetos reais.',
    skills: [
      { name: 'React', category: 'Frontend' },
      { name: 'TypeScript', category: 'Linguagem' },
      { name: 'JavaScript', category: 'Linguagem' },
      { name: 'HTML5', category: 'Frontend' },
      { name: 'CSS3', category: 'Frontend' },
      { name: 'Tailwind CSS', category: 'Frontend' },
      { name: 'NestJS', category: 'Backend' },
      { name: 'Node.js', category: 'Backend' },
      { name: 'PostgreSQL', category: 'Database' },
      { name: 'Git', category: 'Ferramentas' },
      { name: 'GitHub', category: 'Ferramentas' },
      { name: 'Vite', category: 'Ferramentas' },
      { name: 'Figma', category: 'Design' },
      { name: 'Docker', category: 'DevOps' },
      { name: 'VS Code', category: 'Ferramentas' },
    ],
    differentials: [
      {
        title: 'Foco em UI',
        description: 'Interfaces pensadas para o usuário final.',
      },
      {
        title: 'Código limpo',
        description: 'Legibilidade, organização e boas práticas.',
      },
      {
        title: 'Responsividade',
        description: 'Funciona perfeitamente em qualquer tela.',
      },
      {
        title: 'Performance',
        description: 'Carregamento rápido, animações suaves.',
      },
      {
        title: 'Acessibilidade',
        description: 'Web para todos, sem exceções.',
      },
    ],
  },

  process: {
    number: '05',
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
    number: '06',
    label: 'VAMOS CONVERSAR?',
    title: 'Tem uma',
    titleHighlight: 'oportunidade',
    titleEnd: 'em mente?',
    subtitle:
      'Estou sempre aberto a novas oportunidades, colaborações e ideias criativas.',
    links: {
      email: {
        label: 'Enviar e-mail',
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
      resume: {
        label: 'Currículo (PDF)',
        value: 'Download',
        href: '#',
      },
    },
    formLabels: {
      name: 'Nome',
      namePlaceholder: 'Seu nome',
      email: 'E-mail',
      emailPlaceholder: 'seu@email.com',
      message: 'Mensagem',
      messagePlaceholder: 'Fale sobre a oportunidade ou projeto...',
      submit: 'Enviar mensagem',
    },
  },

  footer: {
    description:
      'Estudante de desenvolvimento web apaixonado por criar experiências digitais modernas, funcionais e com propósito.',
    availability: 'Disponível para oportunidades',
    availabilityDesc: 'Vamos conversar sobre como posso contribuir no seu projeto.',
    availabilityCta: 'Entrar em contato',
    navigation: [
      { label: 'Início', href: '#inicio' },
      { label: 'Sobre', href: '#sobre' },
      { label: 'Projetos', href: '#projetos' },
      { label: 'Habilidades', href: '#habilidades' },
      { label: 'Contato', href: '#contato' },
    ],
    usefulLinks: [
      { label: 'GitHub', href: 'https://github.com/KriawqZero' },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/marc%C3%ADlio-ortiz-barbosa-7b5a35165/',
      },
      { label: 'Currículo (PDF)', href: '#' },
      { label: 'E-mail', href: 'mailto:marciliortizz@gmail.com' },
    ],
    availableFor: ['Estágio', 'Projetos', 'Colaborações'],
    copyright: '© 2025 Marcilio Ortiz. Todos os direitos reservados.',
  },
}
