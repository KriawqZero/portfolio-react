import { ptContent } from '../src/data/content'

// ─── Auxiliar ─────────────────────────────────────────────────────────────────

function projetoPorNome(eraId: string, nome: string) {
  const era = ptContent.trajectory.eras.find(e => e.id === eraId)
  if (!era) throw new Error(`Era "${eraId}" não encontrada em content.ts`)
  const projeto = era.projects.find(p => p.name === nome)
  if (!projeto) throw new Error(`Projeto "${nome}" não encontrado na era "${eraId}"`)
  return projeto
}

// ─── Projetos base — nome, stack, ano, links vêm de content.ts ───────────────

const catalogo = projetoPorNome('surface', 'Catálogo & App Imobiliário')
const kyte = projetoPorNome('infra', 'KyteApp Scrapper')
const sisco = projetoPorNome('surface', 'SISCO')
const vamoAgendar = projetoPorNome('surface', 'VamoAgendar')

// ─── Dados do currículo ───────────────────────────────────────────────────────

export const dadosCv = {
  // Reaproveitado de content.ts
  nome: ptContent.hero.name,
  cargo: ptContent.hero.role.join(' '),
  contatos: {
    email: {
      href: ptContent.contact.links.email.href,
      display: ptContent.contact.links.email.value,
    },
    linkedin: {
      href: ptContent.contact.links.linkedin.href,
      display: 'linkedin.com' + ptContent.contact.links.linkedin.value,
    },
    github: {
      href: ptContent.contact.links.github.href,
      display: 'github.com/' + ptContent.contact.links.github.value.replace('@', ''),
    },
  },

  // Exclusivo do CV
  portfolio: 'https://marciliortiz.dev.br',
  localizacao: 'Corumbá, MS · disponível para trabalho remoto',

  resumo:
    'Tenho mais de um ano de experiência como freelancer entregando sistemas em produção para clientes reais. Meu foco principal é o back-end com Node.js, NestJS e bancos relacionais, mas domino o ciclo completo do produto, da modelagem até a interface. Estou no último ano do Técnico em Informática no IFMS e busco o primeiro estágio em uma equipe de engenharia.',

  habilidades: {
    'Back-end': ['NestJS', 'Node.js', 'Express', 'Laravel'],
    'Front-end': ['React', 'Next.js', 'TypeScript'],
    'Banco de dados': ['PostgreSQL', 'MariaDB', 'Prisma'],
    'Ferramentas': ['Docker', 'Playwright', 'Git'],
  },

  idiomas: [
    { idioma: 'Português', nivel: 'Nativo' },
    { idioma: 'Inglês', nivel: 'Intermediário' },
  ],

  formacao: {
    instituicao: 'Instituto Federal de Mato Grosso do Sul (IFMS)',
    curso: 'Ensino Médio Técnico em Informática',
    periodo: '2022 – 2026',
    proximo: 'Candidato a Sistemas de Informação · UFMS (2027)',
  },

  // Bullets de impacto exclusivos do CV; metadados base (nome, stack, ano, links) vêm de content.ts
  clientWork: [
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
      linkDisplay: 'github.com/KriawqZero/scrapper-api',
      bullets: [
        'Worker autônomo com Playwright que extrai métricas de faturamento de dezenas de lojas sem API oficial disponível',
        'Sessões e cookies isolados por instância de browser; orquestração e deploy via Docker',
        'Solução B2B entregue para rede varejista em São Paulo, com dados centralizados em API e dashboard próprios',
      ],
    },
  ],

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
