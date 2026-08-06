import { ptContent, enContent } from '../src/data/content'

// ─── Auxiliar ─────────────────────────────────────────────────────────────────

function projetoPorNome(
  eras: typeof ptContent.trajectory.eras,
  eraId: string,
  nome: string,
) {
  const era = eras.find(e => e.id === eraId)
  if (!era) throw new Error(`Era "${eraId}" não encontrada`)
  const projeto = era.projects.find(p => p.name === nome)
  if (!projeto) throw new Error(`Projeto "${nome}" não encontrado na era "${eraId}"`)
  return projeto
}

// ─── Projetos PT — nome, stack, ano, links vêm de content.ts ─────────────────

const pt          = ptContent.trajectory.eras
const catalogo    = projetoPorNome(pt, 'surface', 'Catálogo & App Imobiliário')
const kyte        = projetoPorNome(pt, 'infra',   'Ecossistema de Coleta')
const sisco       = projetoPorNome(pt, 'surface', 'SISCO')
const vamoAgendar = projetoPorNome(pt, 'surface', 'VamoAgendar')

// ─── Projetos EN ──────────────────────────────────────────────────────────────

const en            = enContent.trajectory.eras
const catalogoEn    = projetoPorNome(en, 'surface', 'Real Estate Catalog & App')
const kyteEn        = projetoPorNome(en, 'infra',   'Data Collection Ecosystem')
const siscoEn       = projetoPorNome(en, 'surface', 'SISCO')
const vamoAgendarEn = projetoPorNome(en, 'surface', 'VamoAgendar')

// ─── Dados do currículo (PT) ──────────────────────────────────────────────────

export const dadosCv = {
  nome:  ptContent.hero.name,
  cargo: ptContent.hero.role.join(' '),
  contatos: {
    email: {
      href:    ptContent.contact.links.email.href,
      display: ptContent.contact.links.email.value,
    },
    linkedin: {
      href:    ptContent.contact.links.linkedin.href,
      display: 'linkedin.com' + ptContent.contact.links.linkedin.value,
    },
    github: {
      href:    ptContent.contact.links.github.href,
      display: 'github.com/' + ptContent.contact.links.github.value.replace('@', ''),
    },
    telefone: {
      href:    'https://wa.me/5567984079762',
      display: '+55 (67) 98407-9762',
    },
  },

  portfolio:   'https://marciliortiz.dev.br',
  localizacao: 'Corumbá, MS · disponível para trabalho remoto',

  labels: {
    lang:             'pt-BR',
    resumo:           'Resumo',
    habilidades:      'Habilidades',
    formacao:         'Formação',
    idiomas:          'Idiomas',
    projetosProprios: 'Projetos Próprios',
    portfolioLabel:   'Portfólio online',
  },

  resumo:
    'Tenho mais de um ano de experiência como freelancer entregando sistemas em produção para clientes reais. Meu foco principal é o back-end com Node.js, NestJS e bancos relacionais, mas domino o ciclo completo do produto, da modelagem até a interface. Estou no último ano do Técnico em Informática no IFMS e busco o primeiro estágio em uma equipe de engenharia.',

  habilidades: {
    'Back-end':       ['NestJS', 'Node.js', 'Express', 'Laravel'],
    'Front-end':      ['React', 'Next.js', 'TypeScript'],
    'Banco de dados': ['PostgreSQL', 'MariaDB', 'Prisma'],
    'Ferramentas':    ['Docker', 'Playwright', 'Git'],
  } as Record<string, string[]>,

  idiomas: [
    { idioma: 'Português', nivel: 'Nativo' },
    { idioma: 'Inglês',    nivel: 'Intermediário (leitura e escuta avançadas)' },
  ],

  formacao: {
    instituicao: 'Instituto Federal de Mato Grosso do Sul (IFMS)',
    curso:       'Ensino Médio Técnico em Informática',
    periodo:     '2022 – 2026',
  },

  experienciaFreelance: {
    tituloEstagio: 'Experiência Freelance',
    tituloAts:     'Experiência Profissional',
    cargo:   'Desenvolvedor Freelancer',
    vinculo: 'Autônomo',
    periodo: '2024 – Atual',
    projetos: [
      {
        ...catalogo,
        linkDisplay: 'marciliobarbosacorretor.com.br',
        bullets: [
          'Pipeline IA: imagens e áudios do celular → OpenAI API → anúncio imobiliário formatado e publicado no site automaticamente',
          'Stack end-to-end em produção: Expo (app mobile), Node.js + MinIO (API/storage), Next.js SSR (portal)',
          'Eliminou processo inteiramente manual de um corretor não-técnico, poupando horas por semana',
        ],
      },
      {
        ...kyte,
        name: 'Ecossistema de Coleta',
        links: [{ label: 'Repo API', href: 'https://github.com/KriawqZero/scrapper-api' }, ...kyte.links],
        linkDisplay: 'github.com/KriawqZero/scrapper-api',
        bullets: [
          'Worker autônomo com Playwright que extrai métricas de faturamento de dezenas de lojas sem API oficial disponível',
          'Sessões e cookies isolados por instância de browser; orquestração e deploy via Docker',
          'Solução B2B entregue para rede varejista em São Paulo, com dados centralizados em API e dashboard próprios',
        ],
      },
    ],
  },

  projetos: [
    {
      ...sisco,
      linkDisplay: 'github.com/KriawqZero/SISCO-IFMS',
      bullets: [
        'Substituiu planilhas dispersas em grupos de WhatsApp por sistema centralizado com 200+ usuários ativos',
        'Arquitetura server-driven com Laravel 11 + Livewire 3, sem SPA nem JavaScript customizado no cliente',
        'TCC do Ensino Médio entregue em produção, adotado pelos alunos e coordenadores do IFMS',
      ],
    },
    {
      ...vamoAgendar,
      links: [{ label: 'Visitar', href: 'https://vamoagendar.com.br/' }, ...vamoAgendar.links],
      linkDisplay: 'vamoagendar.com.br',
      bullets: [
        'Motor temporal que calcula slots livres cruzando fusos, duração de serviços, feriados e agendamentos existentes',
        'Pagamentos recorrentes via Mercado Pago com verificação HMAC de assinatura em webhooks',
        'Ciclo SaaS completo: modelagem, back-end, front-end, infraestrutura e billing',
      ],
    },
  ],
}

export type DadosCv = typeof dadosCv

// ─── Dados do currículo (EN) ──────────────────────────────────────────────────

export const dadosCvEn: DadosCv = {
  nome:  enContent.hero.name,
  cargo: 'Full Stack Developer',
  contatos: {
    email: {
      href:    ptContent.contact.links.email.href,
      display: ptContent.contact.links.email.value,
    },
    linkedin: {
      href:    ptContent.contact.links.linkedin.href,
      display: 'linkedin.com' + ptContent.contact.links.linkedin.value,
    },
    github: {
      href:    ptContent.contact.links.github.href,
      display: 'github.com/' + ptContent.contact.links.github.value.replace('@', ''),
    },
    telefone: {
      href:    'https://wa.me/5567984079762',
      display: '+55 (67) 98407-9762',
    },
  },

  portfolio:   'https://marciliortiz.dev.br',
  localizacao: 'Corumbá, MS, Brazil · available for remote work',

  labels: {
    lang:             'en',
    resumo:           'Summary',
    habilidades:      'Skills',
    formacao:         'Education',
    idiomas:          'Languages',
    projetosProprios: 'Own Projects',
    portfolioLabel:   'Portfolio',
  },

  resumo:
    'I have over a year of experience as a freelancer delivering production systems for real clients. My main focus is back-end development with Node.js, NestJS and relational databases, but I handle the full product cycle from data modeling to the interface. I am finishing my Technical High School program in Computer Science at IFMS and looking for my first internship in an engineering team.',

  habilidades: {
    'Back-end':  ['NestJS', 'Node.js', 'Express', 'Laravel'],
    'Front-end': ['React', 'Next.js', 'TypeScript'],
    'Databases': ['PostgreSQL', 'MariaDB', 'Prisma'],
    'Tools':     ['Docker', 'Playwright', 'Git'],
  },

  idiomas: [
    { idioma: 'Portuguese', nivel: 'Native' },
    { idioma: 'English',    nivel: 'Intermediate (advanced reading and listening)' },
  ],

  formacao: {
    instituicao: 'Instituto Federal de Mato Grosso do Sul (IFMS)',
    curso:       'Technical High School — Computer Science',
    periodo:     '2022 – 2026',
  },

  experienciaFreelance: {
    tituloEstagio: 'Freelance Experience',
    tituloAts:     'Professional Experience',
    cargo:   'Freelance Developer',
    vinculo: 'Self-employed',
    periodo: '2024 – Present',
    projetos: [
      {
        ...catalogoEn,
        linkDisplay: 'marciliobarbosacorretor.com.br',
        bullets: [
          'AI pipeline: mobile photos and audio → OpenAI API → formatted real estate listing published on the site automatically',
          'Full end-to-end stack in production: Expo (mobile app), Node.js + MinIO (API/storage), Next.js SSR (portal)',
          'Eliminated a fully manual listing process for a non-technical real estate agent, saving hours per week',
        ],
      },
      {
        ...kyteEn,
        name: 'Data Collection Ecosystem',
        links: [{ label: 'API Repo', href: 'https://github.com/KriawqZero/scrapper-api' }, ...kyteEn.links],
        linkDisplay: 'github.com/KriawqZero/scrapper-api',
        bullets: [
          'Autonomous Playwright worker that extracts billing metrics from dozens of stores with no official API available',
          'Isolated browser sessions and cookies per instance; orchestration and deployment via Docker',
          'B2B solution delivered to a retail chain in São Paulo, with data centralized in a proprietary API and dashboard',
        ],
      },
    ],
  },

  projetos: [
    {
      ...siscoEn,
      linkDisplay: 'github.com/KriawqZero/SISCO-IFMS',
      bullets: [
        'Replaced scattered WhatsApp spreadsheets with a centralized system used by 200+ active users',
        'Server-driven architecture with Laravel 11 + Livewire 3, no SPA and no custom client-side JavaScript',
        'High school graduation project delivered to production and adopted by students and coordinators at IFMS',
      ],
    },
    {
      ...vamoAgendarEn,
      links: [{ label: 'Visit', href: 'https://vamoagendar.com.br/' }, ...vamoAgendarEn.links],
      linkDisplay: 'vamoagendar.com.br',
      bullets: [
        'Scheduling engine that calculates available slots by crossing time zones, service durations, holidays and existing bookings',
        'Recurring payments via Mercado Pago with HMAC signature verification on webhooks',
        'Full SaaS lifecycle: data modeling, back-end, front-end, infrastructure and billing',
      ],
    },
  ],
}
