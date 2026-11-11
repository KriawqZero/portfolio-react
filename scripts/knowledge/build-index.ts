/**
 * Gera lib/ai/generated/knowledge-index.ts a partir de duas fontes:
 *
 *   1. knowledge/approved/**.md  — escrito à mão, só informação pública aprovada
 *   2. src/data/content.ts       — o que o site já publica, derivado sem duplicar
 *
 * As políticas (knowledge/policies) não viram documento recuperável: elas entram
 * direto nas instruções do modelo, porque valem para toda pergunta.
 *
 * Rode com: pnpm knowledge:build
 */

import { createHash } from 'node:crypto'
import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { ptContent } from '../../src/data/content'
import { getProjectCatalog, statusLabels, categoryLabels } from '../../src/data/projectCatalog'
import type { DocType, KnowledgeDoc } from '../../lib/ai/types'

const RAIZ = resolve(import.meta.dirname, '../..')
const DIR_APROVADOS = join(RAIZ, 'knowledge/approved')
const DIR_POLITICAS = join(RAIZ, 'knowledge/policies')
const SAIDA = join(RAIZ, 'lib/ai/generated/knowledge-index.ts')

// ─── Frontmatter ──────────────────────────────────────────────────────────────

type Frontmatter = Record<string, string | string[] | boolean>

/**
 * Parser deliberadamente pequeno: chave: valor, listas em [a, b] ou em linhas
 * com hífen. Sete campos não justificam uma dependência de YAML.
 */
function lerFrontmatter(bruto: string, arquivo: string): { meta: Frontmatter; corpo: string } {
  if (!bruto.startsWith('---')) {
    throw new Error(`${arquivo}: frontmatter ausente`)
  }
  const fim = bruto.indexOf('\n---', 3)
  if (fim === -1) throw new Error(`${arquivo}: frontmatter não fechado`)

  const meta: Frontmatter = {}
  const linhas = bruto.slice(4, fim).split('\n')
  let chaveLista: string | null = null

  for (const linha of linhas) {
    if (!linha.trim()) continue

    const itemLista = linha.match(/^\s*-\s+(.*)$/)
    if (itemLista && chaveLista) {
      ;(meta[chaveLista] as string[]).push(itemLista[1].trim())
      continue
    }

    const par = linha.match(/^([a-z_]+):\s*(.*)$/)
    if (!par) continue
    const [, chave, valorBruto] = par
    const valor = valorBruto.trim()

    if (valor === '') {
      meta[chave] = []
      chaveLista = chave
    } else if (valor.startsWith('[')) {
      meta[chave] = valor
        .replace(/^\[|\]$/g, '')
        .split(',')
        .map(v => v.trim())
        .filter(Boolean)
      chaveLista = null
    } else if (valor === 'true' || valor === 'false') {
      meta[chave] = valor === 'true'
      chaveLista = null
    } else {
      meta[chave] = valor.replace(/^["']|["']$/g, '')
      chaveLista = null
    }
  }

  return { meta, corpo: bruto.slice(fim + 4).trim() }
}

function arquivosMarkdown(dir: string): string[] {
  const saida: string[] = []
  for (const nome of readdirSync(dir)) {
    const caminho = join(dir, nome)
    if (statSync(caminho).isDirectory()) saida.push(...arquivosMarkdown(caminho))
    else if (nome.endsWith('.md')) saida.push(caminho)
  }
  return saida
}

function texto(v: string | string[] | boolean | undefined): string {
  return typeof v === 'string' ? v : ''
}

function lista(v: string | string[] | boolean | undefined): string[] {
  return Array.isArray(v) ? v : []
}

// ─── Documentos escritos à mão ────────────────────────────────────────────────

function carregarAprovados(): KnowledgeDoc[] {
  return arquivosMarkdown(DIR_APROVADOS).map(caminho => {
    const rel = caminho.replace(`${RAIZ}/`, '')
    const { meta, corpo } = lerFrontmatter(readFileSync(caminho, 'utf8'), rel)

    // Portões que impedem conteúdo não revisado de chegar ao modelo.
    if (meta.approved !== true) throw new Error(`${rel}: approved precisa ser true`)
    if (texto(meta.visibility) !== 'public') throw new Error(`${rel}: visibility precisa ser public`)
    if (meta.requires_review === true) throw new Error(`${rel}: marcado como requires_review`)
    if (!texto(meta.id)) throw new Error(`${rel}: id ausente`)
    if (!texto(meta.last_reviewed)) throw new Error(`${rel}: last_reviewed ausente`)
    if (corpo.length < 80) throw new Error(`${rel}: corpo vazio ou curto demais`)

    const doc: KnowledgeDoc = {
      id: texto(meta.id),
      title: texto(meta.title),
      type: (texto(meta.type) || 'profile') as DocType,
      topics: lista(meta.topics),
      aliases: lista(meta.aliases),
      text: corpo,
    }
    if (texto(meta.source_label)) doc.sourceLabel = texto(meta.source_label)
    if (texto(meta.source_href)) doc.sourceHref = texto(meta.source_href)
    return doc
  })
}

function carregarPoliticas(): string {
  return arquivosMarkdown(DIR_POLITICAS)
    .map(caminho => {
      const rel = caminho.replace(`${RAIZ}/`, '')
      const { meta, corpo } = lerFrontmatter(readFileSync(caminho, 'utf8'), rel)
      if (meta.approved !== true) throw new Error(`${rel}: approved precisa ser true`)
      return `## ${texto(meta.title)}\n\n${corpo}`
    })
    .join('\n\n')
}

// ─── Documentos derivados do content.ts ───────────────────────────────────────

function slug(nome: string): string {
  return nome
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40)
}

/**
 * A fonte exibida ao visitante é o nome do projeto, não o rótulo do link:
 * "SISCO" diz alguma coisa, "Repositório" não diz nada. O endereço prefere o
 * site no ar; só cai para o repositório quando não existe site.
 */
function fonte(nome: string, links: ReadonlyArray<{ label: string; href: string }> | undefined) {
  const publicos = links?.filter(l => l.href.startsWith('http')) ?? []
  if (!publicos.length) return {}
  const preferido = publicos.find(l => !l.href.includes('github.com')) ?? publicos[0]
  return { sourceLabel: nome, sourceHref: preferido.href }
}

function derivarDoContent(): KnowledgeDoc[] {
  const docs: KnowledgeDoc[] = []
  const linhasIndice: string[] = []

  for (const project of getProjectCatalog('pt')) {
    const stage = statusLabels.pt[project.status]
    docs.push({
      id: `catalog-${project.id}`,
      title: project.name,
      type: 'project',
      topics: ['projeto', project.category, project.status, ...project.stack.map(slug)],
      aliases: [project.name.toLowerCase()],
      text: `${project.name} (${project.year}). Estágio: ${stage}. Área: ${categoryLabels.pt[project.category]}.\n\n${project.summary}\n\nEscopo: ${project.scope}\n\nTecnologias: ${project.stack.join(', ')}`,
      ...fonte(project.name, project.links),
    })
    linhasIndice.push(`- ${project.name} (${project.year}) — ${stage}: ${project.scope}`)
  }

  docs.push({
    id: 'profile-about',
    title: 'Como eu me apresento no portfólio',
    type: 'profile',
    topics: ['sobre', 'apresentacao', 'perfil'],
    aliases: ['sobre voce', 'about you'],
    text: ptContent.about.text,
  })

  docs.push({
    id: 'profile-professional-brand',
    title: 'Marcílio Ortiz — desenvolvimento independente',
    type: 'profile',
    topics: ['avantis', 'marca', 'freelance'],
    aliases: ['avantis', 'avantis studio', 'sua marca'],
    text: `${ptContent.avantis.description}\n\n${ptContent.avantis.text}`,
    sourceLabel: 'Marcílio Ortiz',
    sourceHref: 'https://www.marciliortiz.dev.br/',
  })

  docs.push({
    id: 'profile-process',
    title: 'Como eu conduzo um projeto',
    type: 'practice',
    topics: ['processo', 'metodo', 'como trabalha', 'etapas'],
    aliases: ['como voce trabalha', 'how do you work', 'seu processo'],
    text: `${ptContent.process.description}\n\n${ptContent.process.steps
      .map(s => `${s.number}. ${s.title}: ${s.description}`)
      .join('\n')}`,
  })

  docs.push({
    id: 'projects-overview',
    title: 'Catálogo de projetos e estágios',
    type: 'index',
    topics: ['projetos', 'portfolio', 'o que construiu'],
    aliases: ['seus projetos', 'your projects', 'o que voce construiu', 'what have you built'],
    text: `Seleção de projetos de Marcílio. Publicado, implementado, em desenvolvimento, experimento e histórico são estágios distintos. Não somar repositórios ou fases como novos produtos:\n${linhasIndice.join('\n')}`,
  })

  return docs
}

// ─── Escrita ──────────────────────────────────────────────────────────────────

const docs = [...carregarAprovados(), ...derivarDoContent()]

const duplicados = docs.map(d => d.id).filter((id, i, todos) => todos.indexOf(id) !== i)
if (duplicados.length) throw new Error(`IDs duplicados: ${[...new Set(duplicados)].join(', ')}`)

const politicas = carregarPoliticas()

// Identifica esta versão do dossiê. Entra na chave do cache de respostas, para
// que qualquer mudança em knowledge/ ou em content.ts invalide o que estava
// guardado, sem precisar limpar o Redis à mão.
const versao = createHash('sha256')
  .update(JSON.stringify(docs) + politicas)
  .digest('hex')
  .slice(0, 12)

const conteudo = `// GERADO por scripts/knowledge/build-index.ts — não edite à mão.
// Rode \`pnpm knowledge:build\` depois de mexer em knowledge/, content.ts ou projectCatalog.ts.

import type { KnowledgeDoc } from '../types.js'

export const KNOWLEDGE_VERSION = ${JSON.stringify(versao)}

export const POLICIES = ${JSON.stringify(politicas)}

export const KNOWLEDGE: KnowledgeDoc[] = ${JSON.stringify(docs, null, 2)}
`

mkdirSync(join(RAIZ, 'lib/ai/generated'), { recursive: true })
writeFileSync(SAIDA, conteudo)

console.log(`✓ ${docs.length} documentos indexados (versão ${versao}) em lib/ai/generated/knowledge-index.ts`)
