/**
 * O índice é gerado, não escrito à mão — mas é ele que vai para o modelo. Um
 * índice desatualizado não quebra o build nem o lint: só faz a IA responder
 * "não sei" sobre algo que já está escrito em `knowledge/`, ou citar uma fonte
 * com endereço inválido. Estes testes existem para esse silêncio ter voz.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { describe, it, expect } from 'vitest'

import { KNOWLEDGE, KNOWLEDGE_VERSION, POLICIES } from '../lib/ai/generated/knowledge-index'
import { FIXOS } from '../lib/ai/retrieval'

const RAIZ = new URL('..', import.meta.url).pathname

function markdownsEm(dir: string): string[] {
  return readdirSync(dir).flatMap(nome => {
    const caminho = join(dir, nome)
    if (statSync(caminho).isDirectory()) return markdownsEm(caminho)
    return nome.endsWith('.md') ? [caminho] : []
  })
}

function idDoFrontmatter(caminho: string): string {
  const bruto = readFileSync(caminho, 'utf8')
  return bruto.match(/^---\r?\n[\s\S]*?^id:\s*(.+?)\s*$/m)?.[1] ?? ''
}

describe('índice de conhecimento', () => {
  it('tem versão e políticas preenchidas', () => {
    expect(KNOWLEDGE_VERSION).toMatch(/^[0-9a-f]{6,}$/)
    expect(POLICIES.length).toBeGreaterThan(200)
  })

  it('não tem id repetido', () => {
    const ids = KNOWLEDGE.map(d => d.id)
    expect(ids).toHaveLength(new Set(ids).size)
  })

  it('contém todos os documentos aprovados do dossiê', () => {
    const doDisco = markdownsEm(join(RAIZ, 'knowledge/approved')).map(idDoFrontmatter)
    expect(doDisco.every(Boolean)).toBe(true)

    const noIndice = new Set(KNOWLEDGE.map(d => d.id))
    const ausentes = doDisco.filter(id => !noIndice.has(id))
    // Se isto falhar, rode `pnpm knowledge:build`.
    expect(ausentes).toEqual([])
  })

  it('todo documento tem título e corpo com conteúdo', () => {
    const vazios = KNOWLEDGE.filter(d => !d.title.trim() || d.text.trim().length < 40)
    expect(vazios.map(d => d.id)).toEqual([])
  })

  it('os documentos fixos existem — sem eles toda resposta perde a base', () => {
    const ids = new Set(KNOWLEDGE.map(d => d.id))
    for (const fixo of FIXOS) expect(ids.has(fixo)).toBe(true)
  })
})

describe('allowlist de fontes', () => {
  /**
   * A resposta do modelo cita `sourceId`; quem vira link é o par
   * label/href do índice. Um href quebrado aqui é um link quebrado na tela,
   * e o modelo não tem como perceber.
   */
  it('toda fonte tem rótulo e endereço https absolutos', () => {
    const comFonte = KNOWLEDGE.filter(d => d.sourceHref || d.sourceLabel)
    expect(comFonte.length).toBeGreaterThan(0)

    for (const doc of comFonte) {
      expect(doc.sourceLabel, `${doc.id} tem href sem rótulo`).toBeTruthy()
      expect(doc.sourceHref, `${doc.id} tem rótulo sem href`).toBeTruthy()
      expect(() => new URL(doc.sourceHref as string), `${doc.id}: href inválido`).not.toThrow()
      expect(doc.sourceHref, `${doc.id}: href precisa ser https`).toMatch(/^https:\/\//)
    }
  })
})
