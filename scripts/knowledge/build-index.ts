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

  for (const era of ptContent.trajectory.eras) {
    for (const p of era.projects) {
      docs.push({
        id: `project-${slug(p.name)}`,
        title: p.name,
        type: 'project',
        topics: [era.id, 'projeto', ...p.stack.split('·').map(s => slug(s))],
        aliases: [p.name.toLowerCase()],
        text: `${p.name} (${p.type}, ${p.year}).\n\n${p.narrative}\n\nStack: ${p.stack}`,
        ...fonte(p.name, p.links),
      })
      linhasIndice.push(`- ${p.name} (${p.year}, ${p.type}) — ${p.stack}`)
    }
  }

  for (const item of ptContent.archive) {
    docs.push({
      id: `archive-${slug(item.name)}`,
      title: item.name,
      type: 'project',
      topics: ['arquivo', 'projeto', ...item.stack.map(s => slug(s))],
      aliases: [item.name.toLowerCase()],
      text: `${item.name} (${item.type}, ${item.year}).\n\n${item.narrative}\n\nStack: ${item.stack.join(', ')}`,
      ...fonte(item.name, item.links),
    })
    linhasIndice.push(`- ${item.name} (${item.year}, ${item.type}) — ${item.stack.join(', ')}`)
  }

  for (const c of ptContent.freelance.projects) {
    docs.push({
      id: `client-${slug(c.name)}`,
      title: `${c.name} — trabalho para cliente`,
      type: 'project',
      topics: ['cliente', 'freelance', 'workana', slug(c.type)],
      aliases: [c.name.toLowerCase()],
      text: `${c.name} (${c.type}, ${c.year}).\n\nProblema do cliente: ${c.problem}\n\nSolução: ${c.solution}\n\nStack: ${c.stack}`,
    })
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
    id: 'profile-avantis',
    title: 'Avantis Studio',
    type: 'profile',
    topics: ['avantis', 'marca', 'freelance'],
    aliases: ['avantis', 'avantis studio', 'sua marca'],
    text: `${ptContent.avantis.description}\n\n${ptContent.avantis.text}`,
    sourceLabel: 'avantis.dev',
    sourceHref: 'https://avantis.dev',
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
    title: 'Índice de todos os projetos',
    type: 'index',
    topics: ['projetos', 'portfolio', 'o que construiu'],
    aliases: ['seus projetos', 'your projects', 'o que voce construiu', 'what have you built'],
    text: `Projetos do Marcilio, do mais recente ao mais antigo:\n${linhasIndice.join('\n')}`,
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
// Rode \`pnpm knowledge:build\` depois de mexer em knowledge/ ou em src/data/content.ts.

import type { KnowledgeDoc } from '../types.js'

export const KNOWLEDGE_VERSION = ${JSON.stringify(versao)}

export const POLICIES = ${JSON.stringify(politicas)}

export const KNOWLEDGE: KnowledgeDoc[] = ${JSON.stringify(docs, null, 2)}
`

mkdirSync(join(RAIZ, 'lib/ai/generated'), { recursive: true })
writeFileSync(SAIDA, conteudo)

console.log(`✓ ${docs.length} documentos indexados (versão ${versao}) em lib/ai/generated/knowledge-index.ts`)
