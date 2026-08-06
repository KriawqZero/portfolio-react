/**
 * As continuações são o que mantém a conversa andando para quem prefere tocar
 * a digitar. Duas coisas podem estragá-las em silêncio, e nenhuma delas o
 * compilador enxerga: uma pergunta do repertório que o dossiê não responde, e
 * um complemento que devolve menos do que promete.
 */

import { describe, it, expect } from 'vitest'
import { CONTINUACOES, completarContinuacoes } from '../lib/ai/continuacoes'
import { KNOWLEDGE } from '../lib/ai/generated/knowledge-index'
import { selecionarDocumentos } from '../lib/ai/retrieval'
import { config } from '../lib/ai/config'
import type { KnowledgeDoc } from '../lib/ai/types'

const doc = (id: string, topics: string[]): KnowledgeDoc => ({
  id,
  title: id,
  type: 'project',
  topics,
  aliases: [],
  text: '',
})

describe('repertório de continuações', () => {
  it('tem a mesma quantidade nos dois idiomas', () => {
    expect(CONTINUACOES.pt).toHaveLength(CONTINUACOES.en.length)
  })

  it('tem repertório suficiente para completar sem repetir', () => {
    // Precisa sobrar escolha depois de descartar o que já foi perguntado numa
    // conversa longa; um repertório do tamanho do mínimo esgota na segunda.
    expect(CONTINUACOES.pt.length).toBeGreaterThanOrEqual(config.limites.continuacoes * 3)
  })

  it.each(['pt', 'en'] as const)('%s cabe no teto de caracteres do validador', lang => {
    for (const { pergunta } of CONTINUACOES[lang]) {
      expect(pergunta.length, pergunta).toBeLessThanOrEqual(config.limites.caracteresContinuacao)
    }
  })

  it.each(['pt', 'en'] as const)('%s não repete pergunta', lang => {
    const perguntas = CONTINUACOES[lang].map(c => c.pergunta)
    expect(perguntas).toHaveLength(new Set(perguntas).size)
  })

  /**
   * O teste que mais importa. Uma continuação que o dossiê não sustenta gasta o
   * clique do visitante e devolve "não sei" — pior do que não ter sugerido
   * nada, porque foi o site que sugeriu.
   */
  it.each(['pt', 'en'] as const)('%s: toda pergunta encontra documento no dossiê', lang => {
    for (const { pergunta } of CONTINUACOES[lang]) {
      const encontrados = selecionarDocumentos(pergunta, KNOWLEDGE, {
        maxDocumentos: config.limites.documentos,
        maxCaracteres: config.limites.caracteresContexto,
      })
      expect(encontrados.length, `sem documento para: ${pergunta}`).toBeGreaterThan(0)
    }
  })
})

describe('completar continuações', () => {
  const base = {
    perguntaAtual: 'Qual a sua stack?',
    documentos: [],
    lang: 'pt' as const,
  }

  it('completa até o mínimo quando o modelo devolve nada', () => {
    const r = completarContinuacoes({ ...base, atuais: [] })
    expect(r).toHaveLength(3)
  })

  it('completa o que falta quando o modelo devolve pouco', () => {
    const r = completarContinuacoes({ ...base, atuais: ['Uma pergunta do modelo?'] })
    expect(r).toHaveLength(3)
    expect(r[0]).toBe('Uma pergunta do modelo?')
  })

  it('não mexe no que o modelo devolveu quando já basta', () => {
    const atuais = ['Primeira?', 'Segunda?', 'Terceira?']
    expect(completarContinuacoes({ ...base, atuais })).toEqual(atuais)
  })

  it('nunca sugere a pergunta que acabou de ser feita', () => {
    const r = completarContinuacoes({
      ...base,
      perguntaAtual: 'Com que stack você se sente mais à vontade?',
      atuais: [],
    })
    expect(r).not.toContain('Com que stack você se sente mais à vontade?')
  })

  /** Reformulação conta como repetição: para quem lê, é a mesma pergunta. */
  it('descarta pergunta apenas reformulada', () => {
    const r = completarContinuacoes({
      ...base,
      perguntaAtual: 'Você mantém o cliente informado como?',
      atuais: [],
    })
    expect(r).not.toContain('Como você mantém o cliente informado?')
  })

  it('não sugere o que já foi perguntado antes na conversa', () => {
    const r = completarContinuacoes({
      ...base,
      atuais: [],
      historico: [
        { role: 'user', content: 'O que é a Avantis?' },
        { role: 'assistant', content: 'É a marca...' },
      ],
    })
    expect(r).not.toContain('O que é a Avantis?')
  })

  /**
   * O complemento não pode parecer sorteio: quando a resposta veio de
   * documentos sobre cliente e freelance, a continuação oferecida tem que
   * puxar esse fio, não um assunto qualquer.
   */
  it('prefere a continuação afim aos documentos que sustentaram a resposta', () => {
    const r = completarContinuacoes({
      ...base,
      atuais: [],
      documentos: [doc('a', ['cliente', 'freelance']), doc('b', ['cliente'])],
      minimo: 1,
    })
    expect(r[0]).toBe('Quais projetos você fez para cliente real?')
  })

  it('sem afinidade nenhuma, ainda entrega o mínimo', () => {
    const r = completarContinuacoes({
      ...base,
      atuais: [],
      documentos: [doc('z', ['assunto-que-nao-existe'])],
    })
    expect(r).toHaveLength(3)
  })

  it('funciona em inglês', () => {
    const r = completarContinuacoes({ ...base, atuais: [], lang: 'en' })
    expect(r).toHaveLength(3)
    for (const p of r) {
      expect(CONTINUACOES.en.map(c => c.pergunta)).toContain(p)
    }
  })
})
