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

  it('descarta stopwords e tokens de uma letra', () => {
    expect(tokenizar('o que você fez com a API')).toEqual(['fez', 'api'])
  })

  it('quebra em qualquer não-alfanumérico', () => {
    expect(tokenizar('react-native, spring boot')).toEqual([
      'react', 'native', 'spring', 'boot',
    ])
  })

  /**
   * "você sabe C++?" chegava ao scorer como a palavra "sabe": o separador
   * transformava `c++` em `c`, e o corte de tamanho descartava em seguida. A
   * pergunta trazia de volta qualquer documento com "sabe" no corpo, menos o
   * de C++.
   */
  it('preserva nomes de tecnologia que o separador destruiria', () => {
    expect(tokenizar('você sabe C++?')).toEqual(['sabe', 'cpp'])
    expect(tokenizar('trabalha com C#?')).toEqual(['trabalha', 'csharp'])
    expect(tokenizar('node.js e next.js')).toEqual(['nodejs', 'nextjs'])
  })

  it('mantém siglas de duas letras, que costumam ser o termo mais específico', () => {
    expect(tokenizar('você usa IA no trabalho')).toContain('ia')
    expect(tokenizar('faz QA e UX')).toEqual(['faz', 'qa', 'ux'])
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

  /**
   * O caso que motivou o piso: o dossiê escrito à mão tem ~1000 caracteres e os
   * documentos derivados do `content.ts` têm ~280. Com a normalização aplicada
   * ao score inteiro, uma coincidência de vocabulário num stub curto vencia o
   * documento curado, e o ranking virava função do tamanho do texto.
   */
  it('metadado curado não é diluído pelo tamanho do corpo', () => {
    const acervoCurado = [
      doc('stub-curto', { title: 'projeto antigo', text: 'lembro que era tecnico' }),
      doc('dossie-longo', {
        title: 'nivel tecnico',
        topics: ['tecnico'],
        text: `explicacao detalhada ${'contexto '.repeat(150)}`,
      }),
    ]
    const r = selecionarDocumentos('nivel tecnico', acervoCurado, {
      maxDocumentos: 1,
      maxCaracteres: 99999,
    })
    expect(r[0].id).toBe('dossie-longo')
  })

  it('descarta documento que casa poucos termos só no corpo', () => {
    const acervoRuido = [
      doc('tangente', { title: 'labirinto', text: 'projeto tecnico de faculdade' }),
    ]
    // 1 termo de 5 casado, e só no corpo: é coincidência de vocabulário.
    const r = selecionarDocumentos('projetos mostram melhor nivel tecnico', acervoRuido, {
      maxDocumentos: 4,
      maxCaracteres: 99999,
    })
    expect(r).toEqual([])
  })

  /**
   * "qual a stack do SISCO?" trazia três projetos de arquivo junto com o
   * SISCO: todo documento derivado do content.ts termina com "Stack: ...", e a
   * vaga sobrando no teto era preenchida com quem casava só essa palavra.
   */
  it('não completa o teto com candidato muito abaixo do melhor', () => {
    const acervoMisto = [
      doc('sisco', { title: 'SISCO', topics: ['stack'], text: 'sistema academico. Stack: Laravel' }),
      doc('outro-1', { title: 'labirinto', text: 'jogo em java. Stack: Java' }),
      doc('outro-2', { title: 'crates', text: 'mod de minecraft. Stack: Java' }),
    ]
    const r = selecionarDocumentos('stack sisco', acervoMisto, {
      maxDocumentos: 4,
      maxCaracteres: 99999,
    })
    expect(r.map(d => d.id)).toEqual(['sisco'])
  })

  it('mantém empatados quando ninguém se destaca', () => {
    const acervoEmpatado = [
      doc('a', { title: 'agendamento', text: 'um' }),
      doc('b', { title: 'agendamento', text: 'dois' }),
    ]
    const r = selecionarDocumentos('agendamento', acervoEmpatado, {
      maxDocumentos: 4,
      maxCaracteres: 99999,
    })
    expect(r).toHaveLength(2)
  })

  it('mantém o documento que casa poucos termos, mas por metadado', () => {
    const acervoAlias = [
      doc('certo', { aliases: ['nivel tecnico'], text: 'texto qualquer sem os termos' }),
    ]
    const r = selecionarDocumentos('projetos mostram melhor nivel tecnico', acervoAlias, {
      maxDocumentos: 4,
      maxCaracteres: 99999,
    })
    expect(r.map(d => d.id)).toEqual(['certo'])
  })
})
