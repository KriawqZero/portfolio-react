import { dadosCv, type DadosCv } from './cv.content'

const catalogo = dadosCv.experienciaFreelance.projetos[0]
const kyte = dadosCv.experienciaFreelance.projetos[1]
const sisco = dadosCv.projetos[0]

export const dadosCvSuporte: DadosCv = {
  ...dadosCv,
  cargo: 'Suporte Técnico | Atendimento e Redes',
  localizacao: 'Corumbá, MS · disponível para trabalho presencial',

  resumo:
    'Técnico em Informática em formação e desenvolvedor freelancer desde 2024. Atendo diretamente clientes não técnicos: entendo a necessidade, transformo o problema em uma solução, explico o funcionamento em linguagem simples e presto suporte aos sistemas contratados. Tenho prática em investigar falhas de aplicações por logs e testes. Quero aplicar essa base no atendimento de um provedor e aprender rapidamente os procedimentos de ativação de clientes, acesso remoto, ordens de serviço e configuração de roteadores e TV Box.',

  labels: {
    ...dadosCv.labels,
    projetosProprios: 'Projeto de destaque',
  },

  habilidades: {
    'Atendimento ao cliente': [
      'Comunicação com clientes leigos',
      'Levantamento de necessidades',
      'Explicação de soluções técnicas',
      'Suporte pós-entrega',
    ],
    'Fundamentos de redes': [
      'TCP/IP',
      'DNS',
      'DHCP',
      'LAN e Wi-Fi',
      'Ping e traceroute',
    ],
    'Diagnóstico de aplicações': [
      'Reprodução de erros',
      'Análise de logs',
      'Testes e validação',
    ],
    'Sistemas e ferramentas': [
      'Windows',
      'Linux',
      'Docker',
      'Git',
    ],
  },

  experienciaFreelance: {
    ...dadosCv.experienciaFreelance,
    cargo: 'Desenvolvedor Freelancer | Atendimento ao Cliente',
    projetos: [
      {
        ...catalogo,
        name: 'Catálogo e automação imobiliária',
        type: 'Cliente autônomo',
        stack: 'Expo · Node.js · Docker · Next.js',
        bullets: [
          'Desenvolvimento sob encomenda de portal e aplicativo para um cliente sem formação técnica',
          'Transformação do processo explicado pelo cliente em um fluxo automatizado, apresentado em linguagem simples',
          'Suporte direto ao contratante após a entrega, corrigindo problemas e ajustando o sistema a partir do retorno dele',
        ],
      },
      {
        ...kyte,
        name: 'Automação B2B para rede varejista',
        type: 'Rede varejista',
        stack: 'Linux · Docker · Playwright · API REST',
        bullets: [
          'Desenvolvimento de automação sob encomenda para consolidar dados de faturamento de dezenas de lojas',
          'Contato direto com o contratante para entender regras, demonstrar o funcionamento e alinhar ajustes',
          'Suporte à solução entregue, investigando sessões e autenticação quando o cliente relatava falhas',
        ],
      },
    ],
  },

  projetos: [{
    ...sisco,
    name: 'SISCO — sistema do IFMS',
    type: 'Projeto técnico em produção',
    stack: 'Linux · Laravel · MariaDB · Git',
    bullets: [
      'Sistema adotado por mais de 200 alunos e coordenadores do IFMS, substituindo planilhas dispersas',
      'Desenvolvimento e implantação do sistema com banco de dados, autenticação e diferentes níveis de acesso',
      'TCC do Ensino Médio Técnico entregue em produção e utilizado no ambiente real da instituição',
    ],
  }],
}
