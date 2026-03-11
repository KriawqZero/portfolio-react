export type Locale = 'pt' | 'en'

interface TranslationSchema {
  nav: {
    about: string
    stack: string
    projects: string
    experience: string
    contact: string
  }
  hero: {
    role: string
    subtitle: string
    available: string
    remote: string
    tags: string[]
    cta: string
    viewProjects: string
  }
  about: {
    title: string
    bio: string
    educationTitle: string
    education: {
      course: string
      institution: string
      period: string
      status: string
    }
    journeyTitle: string
    journey: string[]
    focusTitle: string
    focus: { title: string; description: string }[]
  }
  expertise: {
    title: string
    items: { title: string; description: string }[]
  }
  skills: {
    title: string
    subtitle: string
    categories: { name: string; color: string; techs: string[] }[]
    competenciesTitle: string
    competencies: { title: string; description: string }[]
  }
  projects: {
    title: string
    subtitle: string
    highlightsLabel: string
    stackLabel: string
    viewSite: string
    viewRepo: string
    privateRepo: string
    inDevelopment: string
    statusProduction: string
    statusDevelopment: string
    statusDone: string
    ctaTitle: string
    ctaDescription: string
    ctaButton: string
    items: {
      title: string
      description: string
      category: string
      status: string
      highlights: string[]
      tech: string[]
    }[]
  }
  experience: {
    title: string
    subtitle: string
    stats: { number: string; label: string }[]
    items: {
      title: string
      type: string
      period: string
      description: string
      achievements: string[]
      skills: string[]
      featured: boolean
    }[]
    ctaTitle: string
    ctaDescription: string
    ctaButton: string
    ctaProjects: string
    achievementsLabel: string
    techLabel: string
    featuredLabel: string
  }
  contact: {
    title: string
    subtitle: string
    email: { label: string; description: string }
    linkedin: { label: string; description: string }
    github: { label: string; description: string }
    whatsapp: { label: string; description: string }
    locationTitle: string
    location: string
    timezone: string
    modalitiesTitle: string
    modalities: { type: string; description: string }[]
    statusTitle: string
    statusAvailable: string
    statusStart: string
    statusRelocation: string
    ctaTitle: string
    ctaDescription: string
    ctaSendEmail: string
    ctaWhatsApp: string
  }
  footer: {
    text: string
    builtWith: string
  }
}

export type Translations = TranslationSchema

export const translations: Record<Locale, TranslationSchema> = {
  pt: {
    nav: {
      about: 'Sobre',
      stack: 'Stack',
      projects: 'Projetos',
      experience: 'Experiência',
      contact: 'Contato',
    },
    hero: {
      role: 'Desenvolvedor Full Stack TypeScript',
      subtitle: 'Construindo plataformas SaaS escaláveis, APIs robustas e sistemas de automação.',
      available: 'Disponível para projetos',
      remote: 'Remoto',
      tags: ['NestJS Expert', 'React/Next.js', 'AWS Cloud'],
      cta: 'Entrar em Contato',
      viewProjects: 'Ver Projetos',
    },
    about: {
      title: 'Sobre Mim',
      bio: 'Desenvolvedor Full Stack TypeScript atuando profissionalmente desde 2025, com jornada de programação iniciada em 2017. Focado em arquitetura de sistemas escaláveis e desenvolvimento SaaS. Construo plataformas completas com NestJS e Next.js — do design da API ao deploy em produção. Sistemas reais em uso, incluindo plataforma institucional com 400+ usuários ativos.',
      educationTitle: 'Formação',
      education: {
        course: 'Técnico Integrado em Informática',
        institution: 'IFMS — Instituto Federal de Mato Grosso do Sul',
        period: 'Desde Julho de 2022',
        status: 'Em andamento',
      },
      journeyTitle: 'Trajetória',
      journey: [
        'Programando desde 2017 (11 anos) — mods, jogos Unity, automações',
        'Trajetória autodidata, atuando profissionalmente desde 2025',
        'Foco em arquitetura de sistemas, não apenas desenvolvimento',
        'Experiência com projetos institucionais e SaaS',
      ],
      focusTitle: 'Foco Atual',
      focus: [
        {
          title: 'Desenvolvimento SaaS',
          description: 'Plataformas full-stack escaláveis com arquitetura multi-tenant e integrações complexas.',
        },
        {
          title: 'Automação & IA',
          description: 'Sistemas de automação inteligente com integração de APIs de IA e mensageria.',
        },
      ],
    },
    expertise: {
      title: 'Core Expertise',
      items: [
        { title: 'Backend Architecture', description: 'APIs escaláveis com NestJS' },
        { title: 'API Design', description: 'RESTful e integrações complexas' },
        { title: 'SaaS Development', description: 'Plataformas multi-tenant' },
        { title: 'Cloud Deployment', description: 'Docker, NGINX e AWS' },
        { title: 'AI Integrations', description: 'OpenAI, automação inteligente' },
      ],
    },
    skills: {
      title: 'Stack',
      subtitle: 'Tecnologias que uso em produção',
      categories: [
        {
          name: 'Stack Principal',
          color: 'from-indigo-500 to-purple-500',
          techs: ['NestJS', 'Next.js', 'React', 'TypeScript', 'PostgreSQL'],
        },
        {
          name: 'Infraestrutura',
          color: 'from-green-500 to-teal-500',
          techs: ['Docker', 'NGINX', 'Linux VPS', 'AWS S3'],
        },
        {
          name: 'Outras Experiências',
          color: 'from-gray-400 to-gray-600',
          techs: ['Laravel', 'Redis', 'MongoDB', 'C#'],
        },
      ],
      competenciesTitle: 'Competências',
      competencies: [
        { title: 'Full Stack', description: 'TypeScript end-to-end' },
        { title: 'Arquitetura', description: 'Sistemas escaláveis' },
        { title: 'Cloud & DevOps', description: 'Deploy e infraestrutura' },
        { title: 'Performance', description: 'Otimização e qualidade' },
      ],
    },
    projects: {
      title: 'Projetos em Destaque',
      subtitle: 'Sistemas reais em produção',
      highlightsLabel: 'Destaques:',
      stackLabel: 'Stack:',
      viewSite: 'Ver Site',
      viewRepo: 'Ver Repositório',
      privateRepo: 'Repositório Privado',
      inDevelopment: 'Em desenvolvimento',
      statusProduction: 'Em produção',
      statusDevelopment: 'Em desenvolvimento',
      statusDone: 'Concluído',
      ctaTitle: 'Interessado?',
      ctaDescription: 'Sempre aberto a novos desafios e projetos que envolvam arquitetura de sistemas e soluções escaláveis.',
      ctaButton: 'Entrar em Contato',
      items: [
        {
          title: 'Condy',
          description: 'Sistema de chamados com workflow multi-etapas, controle granular de permissões e arquitetura frontend/backend separada.',
          category: 'Full Stack',
          status: 'production',
          highlights: [
            'Workflow de chamados multi-etapas',
            'Upload dinâmico para AWS S3',
            'Controle de permissões granular',
            'Arquitetura separada frontend/backend',
          ],
          tech: ['NestJS', 'Next.js', 'PostgreSQL', 'Docker', 'AWS'],
        },
        {
          title: 'WebGestor',
          description: 'Reformulação completa do sistema de páginas de vendas para clientes CRM. Modernização de interface com stack moderna integrada a banco de dados legado.',
          category: 'Full Stack',
          status: 'production',
          highlights: [
            'Reformulação completa de páginas de vendas',
            'Integração com banco de dados legado (2006)',
            'Stack moderna: Laravel + Inertia + React',
            'Sistema multi-cliente em produção',
          ],
          tech: ['Laravel', 'Inertia.js', 'React', 'MySQL', 'TailwindCSS'],
        },
        {
          title: 'SISCO - Sistema IFMS',
          description: 'Sistema institucional oficial de emissão de certificados do IFMS. Adoção obrigatória para todos os alunos do ensino médio do campus.',
          category: 'Institucional',
          status: 'production',
          highlights: [
            '400+ alunos cadastrados (1º ao 6º semestre)',
            'Uso obrigatório no campus desde 2025',
            'Redução de 80% no tempo de emissão',
            'Automação completa de processos acadêmicos',
          ],
          tech: ['Laravel', 'MariaDB', 'Alpine.js', 'TailwindCSS'],
        },
      ],
    },
    experience: {
      title: 'Experiência',
      subtitle: 'Programando desde 2017, atuando profissionalmente desde 2025',
      stats: [
        { number: '8+', label: 'Anos programando' },
        { number: '400+', label: 'Usuários em produção' },
        { number: '80%', label: 'Redução em processos' },
      ],
      items: [
        {
          title: 'Desenvolvedor Full Stack',
          type: 'Freelancer & Projetos',
          period: '2025 — Presente',
          description: 'Desenvolvimento de sistemas completos para clientes e projetos pessoais, incluindo plataformas SaaS, automação com IA e infraestrutura cloud.',
          achievements: [
            'Plataformas SaaS com arquitetura multi-tenant',
            'Infraestrutura Docker multi-cliente em produção',
            'Sistema institucional com 400+ usuários',
            'Integrações com IA e WhatsApp Business API',
          ],
          skills: ['NestJS', 'Next.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS'],
          featured: true,
        },
        {
          title: 'Desenvolvedor Full Stack',
          type: 'IFMS — Projeto SISCO',
          period: '2024 — 2025',
          description: 'Desenvolvimento do SISCO, sistema oficial de emissão de certificados do IFMS. Adoção obrigatória para todos os alunos do ensino médio do campus.',
          achievements: [
            'Criação do SISCO com 400+ alunos cadastrados',
            'Implementação de uso obrigatório no campus',
            'Redução de 80% no tempo de emissão',
            'Automação completa de processos acadêmicos',
          ],
          skills: ['Laravel', 'Alpine.js', 'MariaDB', 'TailwindCSS'],
          featured: true,
        },
      ],
      ctaTitle: 'Pronto para o próximo desafio',
      ctaDescription: 'Disponível para projetos freelance, posições remotas ou oportunidades internacionais.',
      ctaButton: 'Entrar em Contato',
      ctaProjects: 'Ver Projetos',
      achievementsLabel: 'Realizações:',
      techLabel: 'Stack:',
      featuredLabel: 'Principal',
    },
    contact: {
      title: 'Vamos Trabalhar Juntos',
      subtitle: 'Disponível para projetos freelance e oportunidades remotas',
      email: {
        label: 'Email',
        description: 'Para oportunidades profissionais',
      },
      linkedin: {
        label: 'LinkedIn',
        description: 'Conecte-se comigo',
      },
      github: {
        label: 'GitHub',
        description: 'Projetos e código',
      },
      whatsapp: {
        label: 'Canal privado',
        description: 'Não divulgado publicamente',
      },
      locationTitle: 'Localização',
      location: 'Não divulgado',
      timezone: 'Não divulgado',
      modalitiesTitle: 'Modalidades',
      modalities: [
        { type: 'Remoto', description: 'Experiência completa em trabalho remoto' },
        { type: 'Híbrido', description: 'Flexibilidade entre remoto e presencial' },
        { type: 'Presencial', description: 'Aberto a realocação' },
      ],
      statusTitle: 'Status',
      statusAvailable: 'Disponível para novas oportunidades',
      statusStart: 'Início imediato ou conforme combinado',
      statusRelocation: 'Aberto a realocação',
      ctaTitle: 'Vamos conversar?',
      ctaDescription: 'Disponível para projetos freelance, posições remotas ou oportunidades que envolvam desafios técnicos relevantes.',
      ctaSendEmail: 'Enviar Email',
      ctaWhatsApp: 'Canal privado',
    },
    footer: {
      text: '© 2025 Marcilio Ortiz.',
      builtWith: 'Desenvolvido com React, TypeScript e Tailwind CSS.',
    },
  },
  en: {
    nav: {
      about: 'About',
      stack: 'Stack',
      projects: 'Projects',
      experience: 'Experience',
      contact: 'Contact',
    },
    hero: {
      role: 'Full Stack TypeScript Developer',
      subtitle: 'Building scalable SaaS platforms, robust APIs and automation systems.',
      available: 'Available for projects',
      remote: 'Remote',
      tags: ['NestJS Expert', 'React/Next.js', 'AWS Cloud'],
      cta: 'Get in Touch',
      viewProjects: 'View Projects',
    },
    about: {
      title: 'About Me',
      bio: 'Full Stack TypeScript developer working professionally since 2025, with a coding journey started in 2017. Focused on scalable system architecture and SaaS development. I build end-to-end platforms with NestJS and Next.js — from API design to production deployment. Real-world systems in use, including institutional platform serving 400+ active users.',
      educationTitle: 'Education',
      education: {
        course: 'Technical Degree in Computer Science',
        institution: 'IFMS — Federal Institute of Mato Grosso do Sul',
        period: 'Since July 2022',
        status: 'In progress',
      },
      journeyTitle: 'Journey',
      journey: [
        'Coding since 2017 (age 11) — mods, Unity games, automations',
        'Self-taught journey, working professionally since 2025',
        'Focus on system architecture, not just development',
        'Experience with institutional and SaaS projects',
      ],
      focusTitle: 'Current Focus',
      focus: [
        {
          title: 'SaaS Development',
          description: 'Scalable full-stack platforms with multi-tenant architecture and complex integrations.',
        },
        {
          title: 'Automation & AI',
          description: 'Intelligent automation systems with AI API integrations and messaging platforms.',
        },
      ],
    },
    expertise: {
      title: 'Core Expertise',
      items: [
        { title: 'Backend Architecture', description: 'Scalable APIs with NestJS' },
        { title: 'API Design', description: 'RESTful & complex integrations' },
        { title: 'SaaS Development', description: 'Multi-tenant platforms' },
        { title: 'Cloud Deployment', description: 'Docker, NGINX & AWS' },
        { title: 'AI Integrations', description: 'OpenAI, smart automation' },
      ],
    },
    skills: {
      title: 'Stack',
      subtitle: 'Technologies I use in production',
      categories: [
        {
          name: 'Core Stack',
          color: 'from-indigo-500 to-purple-500',
          techs: ['NestJS', 'Next.js', 'React', 'TypeScript', 'PostgreSQL'],
        },
        {
          name: 'Infrastructure',
          color: 'from-green-500 to-teal-500',
          techs: ['Docker', 'NGINX', 'Linux VPS', 'AWS S3'],
        },
        {
          name: 'Other Experience',
          color: 'from-gray-400 to-gray-600',
          techs: ['Laravel', 'Redis', 'MongoDB', 'C#'],
        },
      ],
      competenciesTitle: 'Competencies',
      competencies: [
        { title: 'Full Stack', description: 'End-to-end TypeScript' },
        { title: 'Architecture', description: 'Scalable systems' },
        { title: 'Cloud & DevOps', description: 'Deployment & infra' },
        { title: 'Performance', description: 'Optimization & quality' },
      ],
    },
    projects: {
      title: 'Featured Projects',
      subtitle: 'Real-world systems in production',
      highlightsLabel: 'Highlights:',
      stackLabel: 'Stack:',
      viewSite: 'View Site',
      viewRepo: 'View Repository',
      privateRepo: 'Private Repository',
      inDevelopment: 'In development',
      statusProduction: 'In production',
      statusDevelopment: 'In development',
      statusDone: 'Completed',
      ctaTitle: 'Interested?',
      ctaDescription: 'Always open to new challenges and projects involving system architecture and scalable solutions.',
      ctaButton: 'Get in Touch',
      items: [
        {
          title: 'Condy',
          description: 'Ticketing system with multi-step workflows, granular permission control and decoupled frontend/backend architecture.',
          category: 'Full Stack',
          status: 'production',
          highlights: [
            'Multi-step ticket workflows',
            'Dynamic file upload to AWS S3',
            'Granular permission control',
            'Decoupled frontend/backend architecture',
          ],
          tech: ['NestJS', 'Next.js', 'PostgreSQL', 'Docker', 'AWS'],
        },
        {
          title: 'WebGestor',
          description: 'Complete overhaul of sales page system for CRM clients. Interface modernization with modern stack integrated with legacy database.',
          category: 'Full Stack',
          status: 'production',
          highlights: [
            'Complete sales page redesign',
            'Legacy database integration (2006)',
            'Modern stack: Laravel + Inertia + React',
            'Multi-client system in production',
          ],
          tech: ['Laravel', 'Inertia.js', 'React', 'MySQL', 'TailwindCSS'],
        },
        {
          title: 'SISCO - IFMS System',
          description: 'Official institutional certificate issuance system for IFMS. Mandatory adoption for all high school students on campus.',
          category: 'Institutional',
          status: 'production',
          highlights: [
            '400+ enrolled students (1st to 6th semester)',
            'Mandatory campus use since 2025',
            '80% reduction in issuance time',
            'Complete academic process automation',
          ],
          tech: ['Laravel', 'MariaDB', 'Alpine.js', 'TailwindCSS'],
        },
      ],
    },
    experience: {
      title: 'Experience',
      subtitle: 'Coding since 2017, working professionally since 2025',
      stats: [
        { number: '8+', label: 'Years coding' },
        { number: '400+', label: 'Users in production' },
        { number: '80%', label: 'Process time reduction' },
      ],
      items: [
        {
          title: 'Full Stack Developer',
          type: 'Freelance & Projects',
          period: '2025 — Present',
          description: 'End-to-end system development for clients and personal projects, including SaaS platforms, AI automation and cloud infrastructure.',
          achievements: [
            'SaaS platforms with multi-tenant architecture',
            'Multi-client Docker infrastructure in production',
            'Institutional system serving 400+ users',
            'AI and WhatsApp Business API integrations',
          ],
          skills: ['NestJS', 'Next.js', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS'],
          featured: true,
        },
        {
          title: 'Full Stack Developer',
          type: 'IFMS — SISCO Project',
          period: '2024 — 2025',
          description: 'Development of SISCO, official certificate issuance system for IFMS. Mandatory adoption for all high school students on campus.',
          achievements: [
            'Created SISCO with 400+ enrolled students',
            'Implemented mandatory campus use',
            '80% reduction in issuance time',
            'Complete academic process automation',
          ],
          skills: ['Laravel', 'Alpine.js', 'MariaDB', 'TailwindCSS'],
          featured: true,
        },
      ],
      ctaTitle: 'Ready for the next challenge',
      ctaDescription: 'Available for freelance projects, remote positions or international opportunities.',
      ctaButton: 'Get in Touch',
      ctaProjects: 'View Projects',
      achievementsLabel: 'Achievements:',
      techLabel: 'Stack:',
      featuredLabel: 'Featured',
    },
    contact: {
      title: "Let's Work Together",
      subtitle: 'Available for freelance projects and remote opportunities',
      email: {
        label: 'Email',
        description: 'For professional opportunities',
      },
      linkedin: {
        label: 'LinkedIn',
        description: 'Connect with me',
      },
      github: {
        label: 'GitHub',
        description: 'Projects & code',
      },
      whatsapp: {
        label: 'Private channel',
        description: 'Not publicly shared',
      },
      locationTitle: 'Location',
      location: 'Not shared',
      timezone: 'Not shared',
      modalitiesTitle: 'Work Modes',
      modalities: [
        { type: 'Remote', description: 'Full remote work experience' },
        { type: 'Hybrid', description: 'Flexible between remote and on-site' },
        { type: 'On-site', description: 'Open to relocation' },
      ],
      statusTitle: 'Status',
      statusAvailable: 'Available for new opportunities',
      statusStart: 'Immediate or scheduled start',
      statusRelocation: 'Open to relocation',
      ctaTitle: "Let's talk?",
      ctaDescription: 'Available for freelance projects, remote positions, or opportunities involving meaningful technical challenges.',
      ctaSendEmail: 'Send Email',
      ctaWhatsApp: 'Private channel',
    },
    footer: {
      text: '© 2025 Marcilio Ortiz.',
      builtWith: 'Built with React, TypeScript and Tailwind CSS.',
    },
  },
}
