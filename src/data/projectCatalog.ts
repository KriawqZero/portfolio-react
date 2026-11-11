import { ptContent, enContent } from './content'
import type { Language } from '../hooks/useLanguage'

export type ProjectStatus = 'published' | 'implemented' | 'development' | 'experiment' | 'historical'
export type ProjectCategory = 'web' | 'systems' | 'automation' | 'games'

export interface CatalogProject {
  id: string
  name: string
  year: string
  category: ProjectCategory
  status: ProjectStatus
  summary: string
  scope: string
  stack: string[]
  links: { label: string; href: string }[]
  media?: { image: string; alt: string }
}

export const statusLabels: Record<Language, Record<ProjectStatus, string>> = {
  pt: { published: 'Publicado', implemented: 'Implementado', development: 'Em desenvolvimento', experiment: 'Experimento', historical: 'Histórico' },
  en: { published: 'Published', implemented: 'Implemented', development: 'In development', experiment: 'Experiment', historical: 'Historical' },
}

export const categoryLabels: Record<Language, Record<ProjectCategory, string>> = {
  pt: { web: 'Sites e comércio', systems: 'Sistemas e apps', automation: 'Automações', games: 'Jogos e gráficos' },
  en: { web: 'Websites & commerce', systems: 'Systems & apps', automation: 'Automation', games: 'Games & graphics' },
}

type Localized = { pt: string; en: string }
type CatalogEntry = Omit<CatalogProject, 'name' | 'summary' | 'scope'> & {
  name: Localized
  summary: Localized
  scope: Localized
}

// Only public descriptions belong here. Internal evidence and client data stay
// outside the site. One product can have several repositories and deliverables.
const additions: CatalogEntry[] = [
  {
    id: 'aplicativo-de-imoveis', name: { pt: 'Aplicativo de Imóveis', en: 'Aplicativo de Imóveis' }, year: '2026', category: 'systems', status: 'published',
    summary: { pt: 'Plataforma imobiliária com catálogo, painel administrativo e importação de dados com revisão.', en: 'Real-estate platform with a catalog, administration dashboard and reviewed data imports.' },
    scope: { pt: 'Desenvolvimento e evolução da plataforma, incluindo acesso controlado e organização de cadastros. É um projeto distinto do catálogo feito para meu pai.', en: 'Platform development and maintenance, including access controls and record management. This is separate from the catalog built for my father.' },
    stack: ['Laravel', 'PHP'], links: [{ label: 'Site', href: 'https://www.aplicativodeimoveis.com.br/' }],
  },
  {
    id: 'kriawq-finance', name: { pt: 'Kriawq Finance', en: 'Kriawq Finance' }, year: '2026', category: 'systems', status: 'implemented',
    summary: { pt: 'Aplicação de finanças pessoais com contas, cartões, planejamento e relatórios exploráveis.', en: 'Personal finance application with accounts, cards, planning and interactive reports.' },
    scope: { pt: 'Produto próprio desenvolvido em módulos, com regras de cálculo e conciliação. Contas, cartões e relatórios fazem parte de uma única aplicação em evolução.', en: 'A personal product built in modules, with calculation and reconciliation rules. Accounts, cards and reports are part of one evolving application.' },
    stack: ['TypeScript', 'React', 'PostgreSQL'], links: [],
  },
  {
    id: 'studio-airbnb', name: { pt: 'Studio Airbnb', en: 'Studio Airbnb' }, year: '2026', category: 'systems', status: 'implemented',
    summary: { pt: 'Manutenção de uma plataforma imobiliária, com recuperação das fotos no catálogo e nas galerias.', en: 'Maintenance of a property platform, restoring photos in the catalog and galleries.' },
    scope: { pt: 'Este recorte apresenta o diagnóstico e a correção da integração de armazenamento de imagens, com verificação no ambiente publicado.', en: 'This case covers diagnosing and fixing the image storage integration, with verification in the deployed environment.' },
    stack: ['Laravel', 'S3', 'Railway'], links: [],
  },
  {
    id: 'shopify-theme', name: { pt: 'Personalização de tema Shopify', en: 'Shopify theme customization' }, year: '2026', category: 'web', status: 'implemented',
    summary: { pt: 'Aprimoramento de um tema de loja, com ajustes de layout, personalização e pacote de instalação.', en: 'Improvements to a store theme, including layout, customization and an installation package.' },
    scope: { pt: 'Evolução de um tema existente. O entregável deste recorte é o pacote validado; a publicação e os resultados comerciais da loja não fazem parte do case.', en: 'Evolution of an existing theme. This case covers the validated package; store publication and commercial results are outside its scope.' },
    stack: ['Shopify', 'Liquid', 'CSS', 'JavaScript'], links: [],
  },
  {
    id: 'mocksmith', name: { pt: 'MockSmith', en: 'MockSmith' }, year: '2026', category: 'systems', status: 'development',
    summary: { pt: 'Ferramenta para testes com dashboard, feed de requisições e atualizações ao vivo.', en: 'A testing tool with a dashboard, request feed and live updates.' },
    scope: { pt: 'Interface e integração implementadas, com validação de interação ainda em andamento. Apresentado como ferramenta em desenvolvimento.', en: 'Interface and integration implemented, with interaction validation still in progress. Presented as a tool under development.' },
    stack: ['TypeScript'], links: [],
  },
  {
    id: 'bolao-do-leo', name: { pt: 'Bolão do Léo', en: 'Bolão do Léo' }, year: '2026', category: 'systems', status: 'development',
    summary: { pt: 'Aplicação para organizar participações, comprovantes e conferência manual pelo responsável.', en: 'Application for organizing entries, receipts and manual review by the organizer.' },
    scope: { pt: 'Fluxos implementados e ensaiados com dados de demonstração. O lançamento operacional ainda depende da configuração e validação dos processos do responsável.', en: 'Flows implemented and rehearsed with demonstration data. Operational launch still depends on configuring and validating the organizer’s processes.' },
    stack: ['Web'], links: [],
  },
  {
    id: 'horror-prototype', name: { pt: 'Protótipo de terror em primeira pessoa', en: 'First-person horror prototype' }, year: '2026', category: 'games', status: 'experiment',
    summary: { pt: 'Exploração, interação e construção de um cenário de terror em Godot.', en: 'Exploration, interaction and a horror environment built in Godot.' },
    scope: { pt: 'Protótipo com movimento, câmera, colisões e exportação web. É um estudo de jogo e ambientação, com o cenário ainda em evolução.', en: 'Prototype with movement, camera, collisions and a web export. A study of gameplay and atmosphere, with the environment still evolving.' },
    stack: ['Godot', 'GDScript'], links: [],
  },
  {
    id: 'price-adjustment', name: { pt: 'Sistema de reajuste de preços', en: 'Price adjustment system' }, year: '2026', category: 'automation', status: 'implemented',
    summary: { pt: 'Aplicativo desktop para consultar produtos e aplicar regras de formação de preços a partir de planilhas.', en: 'Desktop application for looking up products and applying pricing rules from spreadsheets.' },
    scope: { pt: 'Interface de atendimento, integração com Google Sheets e cache local. O case apresenta a solução construída, sem expor preços ou margens do negócio.', en: 'Service interface, Google Sheets integration and local cache. The case presents the solution built without exposing business prices or margins.' },
    stack: ['Python', 'Tkinter', 'SQLite', 'Google Sheets'], links: [],
  },
  {
    id: 'suzy-paiva', name: { pt: 'Suzy Paiva Joias', en: 'Suzy Paiva Joias' }, year: '2026', category: 'web', status: 'published',
    summary: { pt: 'Microsite de inauguração para apresentar a loja e orientar quem chega pelo link da bio.', en: 'A store launch microsite that introduces the business and guides visitors arriving from its social bio.' },
    scope: { pt: 'Página com identidade visual, informações da loja e navegação para celular. A publicação documentada teve aprovação preliminar da direção visual.', en: 'A page with visual identity, store information and mobile navigation. The documented publication received preliminary approval of its visual direction.' },
    stack: ['Web', 'CSS'], links: [{ label: 'Site', href: 'https://suzy-paiva-joias.vercel.app/' }],
  },
  {
    id: 'gesture-math', name: { pt: 'Gesture Math', en: 'Gesture Math' }, year: '2026', category: 'systems', status: 'experiment',
    summary: { pt: 'Calculadora experimental controlada por gestos captados pela webcam, com processamento no navegador.', en: 'An experimental calculator controlled through webcam gestures, with processing in the browser.' },
    scope: { pt: 'Estudo de interação por câmera. A implementação e os testes automatizados não substituem a avaliação prática de reconhecimento de gestos em diferentes condições.', en: 'A study of camera-based interaction. Implementation and automated tests do not replace practical evaluation of gesture recognition in different conditions.' },
    stack: ['Computer vision', 'Web'], links: [],
  },
  {
    id: 'personal-portfolio', name: { pt: 'Portfólio Marcílio Ortiz', en: 'Marcílio Ortiz portfolio' }, year: '2026', category: 'web', status: 'published',
    summary: { pt: 'Este portfólio: apresentação bilíngue de projetos e uma IA que responde a partir de um dossiê revisado.', en: 'This portfolio: bilingual project presentation and an AI assistant grounded in a reviewed dossier.' },
    scope: { pt: 'Interface, animações, catálogo e integração de IA. O assistente consulta informações do portfólio e usa fontes delimitadas para responder sobre meu trabalho.', en: 'Interface, animations, catalog and AI integration. The assistant consults portfolio information and bounded sources to answer questions about my work.' },
    stack: ['React', 'TypeScript', 'Vite', 'GSAP', 'OpenAI'], links: [{ label: 'Site', href: 'https://www.marciliortiz.dev.br/' }],
  },
]

type LegacyEntry = { id: string; pt: string; en: string; category: ProjectCategory; status: ProjectStatus; scope: Localized }
const legacy: LegacyEntry[] = [
  { id: 'catalogo-corretor', pt: 'Catálogo & App Imobiliário', en: 'Real Estate Catalog & App', category: 'systems', status: 'published', scope: { pt: 'Site, painel e app mobile fazem parte da mesma solução. A integração com IA ajuda a estruturar os anúncios.', en: 'Website, dashboard and mobile app are parts of one solution. AI integration helps structure listings.' } },
  { id: 'sushi-do-verao', pt: 'Sushi do Verão (Ecossistema)', en: 'Summer Sushi (Ecosystem)', category: 'web', status: 'published', scope: { pt: 'O case publicado é o site institucional. A base do sistema de pedidos, painel e app foi construída, mas não aprovada para produção.', en: 'The published case is the institutional website. The ordering system, dashboard and app foundation was built but not approved for production.' } },
  { id: 'ecossistema-coleta', pt: 'Ecossistema de Coleta', en: 'Data Collection Ecosystem', category: 'automation', status: 'implemented', scope: { pt: 'Coletor, API e painel são três serviços do mesmo projeto. A solução foi construída para uma rede de lojas.', en: 'Collector, API and dashboard are three services in the same project, built for a retail chain.' } },
  { id: 'sisco', pt: 'SISCO', en: 'SISCO', category: 'systems', status: 'implemented', scope: { pt: 'Projeto acadêmico desenvolvido no IFMS. O case descreve as funcionalidades construídas, sem estimar usuários ativos atuais.', en: 'Academic project developed at IFMS. The case describes the functionality built without estimating current active users.' } },
  { id: 'vamoagendar', pt: 'VamoAgendar', en: 'VamoAgendar', category: 'systems', status: 'development', scope: { pt: 'Produto em evolução para o beta. Agendamento e painel não significam que todo o fluxo de assinaturas e operação esteja concluído.', en: 'A product progressing toward beta. Scheduling and a dashboard do not mean subscriptions and operations are fully complete.' } },
  { id: 'voxel-engine', pt: 'Voxel Engine (OpenGL Clássico)', en: 'Voxel Engine (Classic OpenGL)', category: 'games', status: 'experiment', scope: { pt: 'As versões clássica e com shaders pertencem à mesma linha de estudo. A reescrita para a pipeline moderna ficou incompleta.', en: 'The classic and shader versions belong to the same line of study. The rewrite for the modern pipeline remained incomplete.' } },
  { id: 'labirinto-geometrico', pt: 'Labirinto Geométrico', en: 'Geometric Labyrinth', category: 'games', status: 'experiment', scope: { pt: 'Jogo acadêmico com renderização e colisões em Canvas.', en: 'Academic game with Canvas rendering and collisions.' } },
  { id: 'storage-crates', pt: 'Storage Crates', en: 'Storage Crates', category: 'games', status: 'experiment', scope: { pt: 'Estudo de extensão do Minecraft e organização de armazenamento no jogo.', en: 'A study of Minecraft extensions and in-game storage.' } },
  { id: 'simple-machines', pt: 'Simple Machines', en: 'Simple Machines', category: 'games', status: 'experiment', scope: { pt: 'Estudo de blocos e componentes mecânicos em um mod.', en: 'A study of blocks and mechanical components in a mod.' } },
  { id: 'avantis-site', pt: 'Avantis — site da marca anterior', en: 'Avantis — former brand website', category: 'web', status: 'historical', scope: { pt: 'Registro da identidade anterior. Hoje o trabalho é apresentado como Marcílio Ortiz e o domínio antigo não é usado.', en: 'A record of the former identity. My work is now presented as Marcílio Ortiz, and the old domain is no longer used.' } },
  { id: 'bank-simulator', pt: 'Simulador Bancário', en: 'Bank Simulator', category: 'systems', status: 'historical', scope: { pt: 'Experimento de aprendizado com persistência local; não é um serviço financeiro.', en: 'A learning experiment with local persistence; not a financial service.' } },
  { id: 'desktop-player', pt: 'Player Desktop', en: 'Desktop Player', category: 'systems', status: 'historical', scope: { pt: 'Projeto de aprendizado de interface e reprodução de áudio local.', en: 'A learning project for interfaces and local audio playback.' } },
  { id: 'event-loop', pt: 'Event Loop', en: 'Event Loop', category: 'systems', status: 'historical', scope: { pt: 'Cronômetro criado para estudar eventos e atualização de interface.', en: 'A stopwatch built to study events and interface updates.' } },
  { id: 'minecraft-first-mod', pt: 'Mod para Minecraft (1.12.2)', en: 'Mod for Minecraft (1.12.2)', category: 'games', status: 'historical', scope: { pt: 'Primeiros estudos de Java e criação de blocos no Minecraft.', en: 'Early studies in Java and creating Minecraft blocks.' } },
]

export function getProjectCatalog(language: Language): CatalogProject[] {
  const content = language === 'en' ? enContent : ptContent
  const existing = [
    ...content.trajectory.eras.flatMap(era => era.projects.map(p => ({ ...p, stack: p.stack.split('·').map(s => s.trim()) }))),
    ...content.archive,
  ]
  const recovered = additions.map(p => ({ ...p, name: p.name[language], summary: p.summary[language], scope: p.scope[language] }))
  const preserved = legacy.map(entry => {
    const project = existing.find(p => p.name === entry[language])
    if (!project) throw new Error(`Missing catalog project: ${entry.id} (${language})`)
    const item: CatalogProject = {
      id: entry.id, name: project.name, year: project.year, category: entry.category,
      status: entry.status, summary: project.narrative, scope: entry.scope[language],
      stack: project.stack, links: project.links, media: 'media' in project ? project.media : undefined,
    }
    if (entry.id === 'sushi-do-verao') {
      item.name = 'Sushi do Verão'
      item.summary = language === 'pt'
        ? 'Site de restaurante com fotos dos pratos, localização, horários e contato pelo WhatsApp, pensado para o celular.'
        : 'A mobile-focused restaurant website with food photography, location, opening hours and WhatsApp contact.'
      item.stack = ['TypeScript', 'Vite', 'CSS']
      item.links = [{ label: 'Site', href: 'https://sushidoverao.com.br/' }]
    }
    if (entry.id === 'voxel-engine') {
      item.links = [...item.links, { label: language === 'pt' ? 'Versão com shaders' : 'Shader version', href: 'https://github.com/KriawqZero/mine_glModerno' }]
    }
    return item
  })
  // Business cases first; the catalog remains complete and searchable.
  return [...preserved.slice(0, 3), ...recovered, ...preserved.slice(3)]
}

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export function filterProjects(projects: CatalogProject[], query: string, status = 'all', category = 'all') {
  const words = normalize(query.trim()).split(/\s+/).filter(Boolean)
  return projects.filter(project => {
    const haystack = normalize([project.name, project.summary, project.scope, ...project.stack].join(' '))
    return (status === 'all' || project.status === status) &&
      (category === 'all' || project.category === category) && words.every(word => haystack.includes(word))
  })
}
