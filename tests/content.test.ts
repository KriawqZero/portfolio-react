/**
 * `enContent` não é declarado como `typeof ptContent` — é um objeto
 * independente. O compilador só reclama quando o `t` é consumido com a forma
 * do português, o que deixa passar diferença de tamanho de lista e texto
 * esquecido em português dentro do bloco inglês.
 *
 * O preço de um escorregão desses é uma seção meio traduzida na frente de um
 * recrutador estrangeiro, então vale um teste.
 */

import { describe, it, expect } from 'vitest'
import { ptContent, enContent } from '../src/data/content'
import { config } from '../lib/ai/config'

function forma(valor: unknown): unknown {
  if (Array.isArray(valor)) return valor.map(forma)
  if (valor && typeof valor === 'object') {
    return Object.fromEntries(
      Object.entries(valor as Record<string, unknown>)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([chave, v]) => [chave, forma(v)]),
    )
  }
  return typeof valor
}

describe('conteúdo pt e en', () => {
  it('a seção da IA tem exatamente a mesma forma nos dois idiomas', () => {
    expect(forma(enContent.aiChat)).toEqual(forma(ptContent.aiChat))
  })

  it('as duas listas de sugestões continuam com o mesmo tamanho', () => {
    expect(enContent.aiChat.suggestions).toHaveLength(ptContent.aiChat.suggestions.length)
    expect(enContent.aiChat.suggestionsFreelance).toHaveLength(
      ptContent.aiChat.suggestionsFreelance.length,
    )
  })
})

describe('fallback curado', () => {
  const idiomas = [
    ['pt', ptContent.aiChat.fallback],
    ['en', enContent.aiChat.fallback],
  ] as const

  it.each(idiomas)('%s tem cinco pares com pergunta e resposta preenchidas', (_lang, fallback) => {
    expect(fallback.items).toHaveLength(5)
    for (const item of fallback.items) {
      expect(item.question.trim().length).toBeGreaterThan(10)
      expect(item.answer.trim().length).toBeGreaterThan(80)
    }
  })

  it.each(idiomas)('%s não repete pergunta', (_lang, fallback) => {
    const perguntas = fallback.items.map(i => i.question)
    expect(perguntas).toHaveLength(new Set(perguntas).size)
  })

  /**
   * O rótulo é o que separa "resposta pré-escrita" de "a IA respondeu isso".
   * Se ele sumir num idioma, a seção passa a mentir só para quem lê aquele.
   */
  it.each(idiomas)('%s tem rótulo e introdução', (_lang, fallback) => {
    expect(fallback.label.trim()).not.toBe('')
    expect(fallback.intro.trim()).not.toBe('')
  })

  /**
   * As respostas são escritas à mão e nunca passam por validate-answer, que é
   * quem remove URL do texto do modelo. Um endereço aqui vira link morto ou
   * texto cru na tela, sem nada no caminho para perceber.
   */
  it.each(idiomas)('%s não tem URL solta no texto', (_lang, fallback) => {
    for (const item of fallback.items) {
      expect(item.answer, item.question).not.toMatch(/https?:\/\//)
    }
  })

  /**
   * O fallback ocupa o mesmo lugar da resposta real, com a mesma tipografia.
   * Passar do teto que a IA respeita entrega o disfarce e estoura o painel de
   * altura fixa, que é o que segura os ScrollTriggers vizinhos.
   */
  it.each(idiomas)('%s cabe no mesmo espaço de uma resposta real', (_lang, fallback) => {
    for (const item of fallback.items) {
      expect(item.answer.length, item.question).toBeLessThanOrEqual(
        config.limites.caracteresResposta,
      )
    }
  })
})
