/**
 * Última barreira antes da tela do visitante. As duas garantias que este
 * módulo promete no próprio cabeçalho:
 *   - nenhuma URL inventada pelo modelo chega ao visitante;
 *   - nenhum sourceId fora do contexto vira citação.
 * Se algum destes testes cair, o site passou a publicar alucinação.
 */

import { describe, it, expect } from 'vitest'
import { validarResposta } from '../lib/ai/validate-answer'
import type { KnowledgeDoc } from '../lib/ai/types'

const doc = (id: string, extra: Partial<KnowledgeDoc> = {}): KnowledgeDoc => ({
  id,
  title: id,
  type: 'project',
  topics: [],
  aliases: [],
  text: 'corpo',
  ...extra,
})

const CONTEXTO = [
  doc('vamoagendar', { sourceLabel: 'VamoAgendar', sourceHref: 'https://vamoagendar.com' }),
  doc('avantis', { sourceLabel: 'Avantis' }),
  doc('sem-fonte'),
]

const LIMITES = { caracteresResposta: 900 }

const RESPOSTA_OK = {
  status: 'answered',
  answer: 'Construí o VamoAgendar, um sistema de agendamento.',
  sourceIds: ['vamoagendar'],
  followUps: ['Como foi a arquitetura?'],
  requiresHumanContact: false,
}

describe('validarResposta — saneamento do texto', () => {
  it('remove URLs que o modelo inventou', () => {
    const r = validarResposta(
      { ...RESPOSTA_OK, answer: 'Veja em https://site-inventado.com e www.outro.com.br agora.' },
      CONTEXTO,
      LIMITES,
    )
    expect(r.answer).not.toContain('http')
    expect(r.answer).not.toContain('site-inventado')
    expect(r.answer).not.toContain('www.')
  })

  it('remove domínios soltos sem protocolo', () => {
    const r = validarResposta(
      { ...RESPOSTA_OK, answer: 'Fale comigo em contato.exemplo.com por favor.' },
      CONTEXTO,
      LIMITES,
    )
    expect(r.answer).not.toContain('exemplo.com')
  })

  it('remove HTML', () => {
    const r = validarResposta(
      { ...RESPOSTA_OK, answer: 'Texto <script>alert(1)</script> normal.' },
      CONTEXTO,
      LIMITES,
    )
    expect(r.answer).not.toContain('<')
    expect(r.answer).not.toContain('script')
  })

  it('trunca no limite e não corta no meio da frase quando dá', () => {
    const longa = `${'Primeira frase completa. '.repeat(10)}${'x'.repeat(900)}`
    const r = validarResposta({ ...RESPOSTA_OK, answer: longa }, CONTEXTO, { caracteresResposta: 300 })
    expect(r.answer.length).toBeLessThanOrEqual(300)
    expect(r.answer.endsWith('.')).toBe(true)
  })

  it('quando não há frase completa que caiba, corta com reticências', () => {
    const r = validarResposta(
      { ...RESPOSTA_OK, answer: 'x'.repeat(500) },
      CONTEXTO,
      { caracteresResposta: 100 },
    )
    expect(r.answer.endsWith('…')).toBe(true)
  })
})

describe('validarResposta — fontes', () => {
  // A garantia anti-alucinação: citar documento que não foi enviado ao modelo
  // é invenção, e tem que sumir silenciosamente.
  it('descarta sourceId que não estava no contexto', () => {
    const r = validarResposta(
      { ...RESPOSTA_OK, sourceIds: ['vamoagendar', 'projeto-que-nao-existe'] },
      CONTEXTO,
      LIMITES,
    )
    expect(r.sources.map(f => f.id)).toEqual(['vamoagendar'])
  })

  it('descarta documento sem sourceLabel', () => {
    const r = validarResposta({ ...RESPOSTA_OK, sourceIds: ['sem-fonte'] }, CONTEXTO, LIMITES)
    expect(r.sources).toEqual([])
  })

  it('deduplica sourceIds repetidos', () => {
    const r = validarResposta(
      { ...RESPOSTA_OK, sourceIds: ['vamoagendar', 'vamoagendar'] },
      CONTEXTO,
      LIMITES,
    )
    expect(r.sources).toHaveLength(1)
  })

  it('deduplica fontes distintas que compartilham o mesmo label', () => {
    const contexto = [
      doc('a', { sourceLabel: 'Mesmo Projeto', sourceHref: 'https://um.com' }),
      doc('b', { sourceLabel: 'Mesmo Projeto', sourceHref: 'https://dois.com' }),
    ]
    const r = validarResposta({ ...RESPOSTA_OK, sourceIds: ['a', 'b'] }, contexto, LIMITES)
    expect(r.sources).toHaveLength(1)
  })

  it('href ausente vira null, não undefined', () => {
    const r = validarResposta({ ...RESPOSTA_OK, sourceIds: ['avantis'] }, CONTEXTO, LIMITES)
    expect(r.sources[0]).toEqual({ id: 'avantis', label: 'Avantis', href: null })
  })

  it('ignora sourceIds que não são string', () => {
    const r = validarResposta(
      { ...RESPOSTA_OK, sourceIds: [42, null, 'vamoagendar'] },
      CONTEXTO,
      LIMITES,
    )
    expect(r.sources.map(f => f.id)).toEqual(['vamoagendar'])
  })
})

describe('validarResposta — estrutura', () => {
  it('devolve resposta vazia para entrada que não é objeto', () => {
    for (const invalido of [null, 'texto', 42, undefined]) {
      expect(validarResposta(invalido, CONTEXTO, LIMITES)).toEqual({
        status: 'unknown',
        answer: '',
        sources: [],
        followUps: [],
        requiresHumanContact: false,
      })
    }
  })

  it('rebaixa answered para unknown quando o texto sobra vazio', () => {
    // Uma resposta que era só uma URL fica vazia depois do saneamento.
    const r = validarResposta({ ...RESPOSTA_OK, answer: 'https://so-um-link.com' }, CONTEXTO, LIMITES)
    expect(r.answer).toBe('')
    expect(r.status).toBe('unknown')
  })

  it('preserva out_of_scope mesmo com texto vazio', () => {
    const r = validarResposta(
      { ...RESPOSTA_OK, status: 'out_of_scope', answer: '' },
      CONTEXTO,
      LIMITES,
    )
    expect(r.status).toBe('out_of_scope')
  })

  it('status desconhecido vira unknown', () => {
    const r = validarResposta({ ...RESPOSTA_OK, status: 'inventado' }, CONTEXTO, LIMITES)
    expect(r.status).toBe('unknown')
  })

  it('limita quantidade e tamanho dos followUps', () => {
    const r = validarResposta(
      {
        ...RESPOSTA_OK,
        followUps: ['uma', 'duas', 'tres', 'quatro', '', '  ', 'x'.repeat(81)],
      },
      CONTEXTO,
      LIMITES,
    )
    expect(r.followUps).toEqual(['uma', 'duas', 'tres'])
  })

  it('requiresHumanContact só é true quando vem exatamente true', () => {
    expect(
      validarResposta({ ...RESPOSTA_OK, requiresHumanContact: 'sim' }, CONTEXTO, LIMITES)
        .requiresHumanContact,
    ).toBe(false)
    expect(
      validarResposta({ ...RESPOSTA_OK, requiresHumanContact: true }, CONTEXTO, LIMITES)
        .requiresHumanContact,
    ).toBe(true)
  })
})
