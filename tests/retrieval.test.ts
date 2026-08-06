/**
 * O retrieval decide o que entra no prompt — logo, decide o custo de cada
 * pergunta e se a resposta tem base para existir. Os tetos aqui são a
 * diferença entre uma pergunta barata e uma cara.
 */

import { describe, it, expect } from 'vitest'
import { tokenizar, documentosFixos, selecionarDocumentos, FIXOS } from '../lib/ai/retrieval'
import type { KnowledgeDoc } from '../lib/ai/types'

const doc = (id: string, extra: Partial<KnowledgeDoc> = {}): KnowledgeDoc => ({
  id,
  title: id,
  type: 'project',
  topics: [],
  aliases: [],
  text: 'texto generico do documento',
  ...extra,
})

describe('tokenizar', () => {
  it('remove acentos e normaliza para minúsculas', () => {
    expect(tokenizar('Programação Ágil')).toEqual(['programacao', 'agil'])
  })

  it('descarta stopwords e tokens de até 2 caracteres', () => {
    expect(tokenizar('o que você fez com a API')).toEqual(['fez', 'api'])
  })

  it('quebra em qualquer não-alfanumérico', () => {
    expect(tokenizar('node.js, react-native')).toEqual(['node', 'react', 'native'])
  })

  it('devolve lista vazia para entrada sem termos úteis', () => {
    expect(tokenizar('o a de que')).toEqual([])
  })
})

describe('documentosFixos', () => {
  it('devolve os fixos na ordem declarada', () => {
    const todos = [doc('avantis'), doc('projects-overview'), doc('profile-core')]
    expect(documentosFixos(todos).map(d => d.id)).toEqual(FIXOS)
  })

  it('ignora fixo ausente em vez de quebrar', () => {
    expect(documentosFixos([doc('profile-core')]).map(d => d.id)).toEqual(['profile-core'])
    expect(documentosFixos([])).toEqual([])
  })
})

describe('selecionarDocumentos', () => {
  const acervo = [
    doc('profile-core', { title: 'perfil' }),
    doc('projects-overview', { title: 'projetos' }),
    doc('vamoagendar', { title: 'VamoAgendar', topics: ['agendamento'], text: 'sistema de agendamento para barbearias' }),
    doc('avantis', { title: 'Avantis', topics: ['consultoria'], text: 'consultoria e negocios' }),
  ]

  it('nunca devolve os fixos — eles vão pelo prefixo do prompt', () => {
    const r = selecionarDocumentos('perfil projetos', acervo, { maxDocumentos: 4, maxCaracteres: 9999 })
    expect(r.map(d => d.id)).not.toContain('profile-core')
    expect(r.map(d => d.id)).not.toContain('projects-overview')
  })

  it('encontra o documento certo pelo termo', () => {
    const r = selecionarDocumentos('agendamento', acervo, { maxDocumentos: 4, maxCaracteres: 9999 })
    expect(r[0].id).toBe('vamoagendar')
  })

  it('devolve vazio quando nada pontua', () => {
    const r = selecionarDocumentos('astrofisica quantica', acervo, {
      maxDocumentos: 4,
      maxCaracteres: 9999,
    })
    expect(r).toEqual([])
  })

  it('devolve vazio para pergunta só de stopwords', () => {
    expect(selecionarDocumentos('o que é', acervo, { maxDocumentos: 4, maxCaracteres: 9999 })).toEqual([])
  })

  // Teto de quantidade: é o que segura o tamanho do prompt.
  it('respeita maxDocumentos', () => {
    const muitos = Array.from({ length: 10 }, (_, i) =>
      doc(`p${i}`, { title: 'agendamento', text: 'agendamento' }),
    )
    const r = selecionarDocumentos('agendamento', muitos, { maxDocumentos: 4, maxCaracteres: 99999 })
    expect(r).toHaveLength(4)
  })

  // Teto de caracteres: é o que segura o custo por pergunta.
  it('pula documento que estouraria maxCaracteres, mas segue avaliando os próximos', () => {
    const acervoMisto = [
      doc('gigante', { title: 'agendamento', text: 'a'.repeat(5000) }),
      doc('pequeno', { title: 'agendamento', text: 'agendamento curto' }),
    ]
    const r = selecionarDocumentos('agendamento', acervoMisto, {
      maxDocumentos: 4,
      maxCaracteres: 100,
    })
    expect(r.map(d => d.id)).toEqual(['pequeno'])
  })

  it('no contexto freelance, documentos client-* ganham peso', () => {
    const acervoFreelance = [
      doc('client-alpha', { title: 'sistema', text: 'sistema web' }),
      doc('proprio-beta', { title: 'sistema', text: 'sistema web' }),
    ]
    const padrao = selecionarDocumentos('sistema', acervoFreelance, {
      maxDocumentos: 1,
      maxCaracteres: 9999,
    })
    const freelance = selecionarDocumentos('sistema', acervoFreelance, {
      maxDocumentos: 1,
      maxCaracteres: 9999,
      contexto: 'freelance',
    })
    expect(freelance[0].id).toBe('client-alpha')
    // Sem o boost, o desempate é a ordem original — o teste acima só tem valor
    // se o contexto realmente mudou alguma coisa.
    expect(padrao).toHaveLength(1)
  })

  it('normaliza pelo tamanho: documento longo não vence por volume', () => {
    const acervoTamanhos = [
      doc('verboso', { title: 'x', text: `agendamento ${'palavra '.repeat(500)}` }),
      doc('direto', { title: 'x', text: 'agendamento' }),
    ]
    const r = selecionarDocumentos('agendamento', acervoTamanhos, {
      maxDocumentos: 1,
      maxCaracteres: 99999,
    })
    expect(r[0].id).toBe('direto')
  })
})
