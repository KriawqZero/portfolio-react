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
      link: '',
      image: '/condy-tablet.png',
    },
  },

  about: {
    number: '02',
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
        stat: { value: 'Multi-cliente', label: 'em produção' },
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
        stat: { value: '400+', label: 'alunos' },
        highlights: [
          '400+ alunos cadastrados',
          'Redução de 80% no tempo de emissão',
          'Automação completa de processos acadêmicos',
        ],
      },
    ],
  },

  avantis: {
    number: '04',
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
    label: 'PRÓXIMO CAPÍTULO',
    title: 'Vamos construir',
    titleHighlight: 'juntos.',
    text: 'Se você chegou até aqui, já conhece meu trabalho, meu processo e minha forma de pensar. Agora só falta a conversa. Estou disponível para oportunidades, colaborações e ideias que valham a pena construir.',
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
  },

  footer: {
    copyright: '© 2026 Marcilio Ortiz. Todos os direitos reservados.',
  },
}
