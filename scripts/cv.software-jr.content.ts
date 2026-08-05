import { dadosCv, type DadosCv } from './cv.content'

const catalogo = dadosCv.experienciaFreelance.projetos[0]
const kyte = dadosCv.experienciaFreelance.projetos[1]
const sisco = dadosCv.projetos[0]

export const dadosCvSoftwareJr: DadosCv = {
  ...dadosCv,
  cargo: 'Software Developer Jr. | Full Stack',
  localizacao: 'Corumbá, MS · disponível para trabalho remoto',

  resumo:
    'Desenvolvedor freelancer desde 2024, com experiência entregando sistemas web em produção para clientes reais. Atuo da análise de requisitos à implementação, transformando necessidades de negócio em interfaces e funcionalidades com JavaScript, TypeScript, React e Node.js. Tenho prática com autenticação, controle de acesso por perfil, testes e documentação, além de workflows low-code no n8n e fundamentos de roles e policies no AWS IAM. Busco integrar uma equipe como Software Developer Jr. e aprofundar minha experiência em projetos de IAM.',

  labels: {
    ...dadosCv.labels,
    projetosProprios: 'Projeto de destaque',
  },

  habilidades: {
    'Front-end': [
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
    ],
    'Back-end': [
      'Node.js',
      'NestJS',
      'Laravel',
      'APIs REST',
    ],
    'Qualidade e entrega': [
      'Git',
      'Playwright',
      'Testes e validação',
      'Documentação técnica',
    ],
    'Low-code e automação': [
      'n8n',
      'Webhooks',
      'Integrações HTTP',
      'Workflows',
    ],
    'Dados e infraestrutura': [
      'PostgreSQL',
      'MariaDB',
      'Docker',
      'AWS IAM (básico)',
    ],
  },

  experienciaFreelance: {
    ...dadosCv.experienciaFreelance,
    cargo: 'Desenvolvedor Full Stack Freelancer',
    projetos: [
      {
        ...catalogo,
        name: 'Catálogo e automação imobiliária',
        type: 'Projeto sob encomenda',
        stack: 'Next.js · TypeScript · Node.js · Expo · Docker',
        bullets: [
          'Análise do processo do cliente e transformação dos requisitos em portal web, aplicativo e automação integrados',
          'Desenvolvimento da interface e dos serviços responsáveis por processar e publicar anúncios imobiliários',
          'Validação com o contratante, implantação em produção e ajustes a partir do retorno obtido no uso real',
        ],
      },
      {
        ...kyte,
        name: 'Automação B2B para rede varejista',
        type: 'Projeto sob encomenda',
        stack: 'Node.js · Playwright · API REST · Docker',
        bullets: [
          'Desenvolvimento de automação para extrair e consolidar métricas de faturamento de dezenas de lojas',
          'Interpretação das regras do negócio e implementação de sessões autenticadas e isoladas por instância',
          'Testes, investigação por logs, documentação da implantação e alinhamento de ajustes com o contratante',
        ],
      },
    ],
  },

  projetos: [{
    ...sisco,
    name: 'SISCO — sistema do IFMS',
    type: 'TCC em produção',
    stack: 'HTML · CSS · Laravel · Livewire · MariaDB',
    bullets: [
      'Sistema adotado por mais de 200 alunos e coordenadores do IFMS, substituindo planilhas dispersas',
      'Implementação de autenticação, controle de acesso por perfil e interfaces para diferentes fluxos de usuário',
      'Levantamento de requisitos, desenvolvimento, testes, documentação e implantação no ambiente real da instituição',
    ],
  }],
}
