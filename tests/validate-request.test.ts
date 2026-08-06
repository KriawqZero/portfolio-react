/**
 * Portão de entrada do /api/ask. Tudo o que passa daqui custa dinheiro:
 * Turnstile, Redis e, no fim, OpenAI. Um furo aqui é furo de custo.
 */

import { describe, it, expect } from 'vitest'
import { origemPermitida, validarCorpo } from '../lib/ai/validate-request'

const PERMITIDAS = ['https://marciliortiz.dev.br', 'https://www.marciliortiz.dev.br']

const LIMITES = {
  caracteresMensagem: 500,
  mensagensHistorico: 20,
  caracteresHistorico: 1000,
}

const CORPO_VALIDO = {
  question: 'Com o que você trabalha?',
  sessionId: 'sessao-de-teste-1234',
  lang: 'pt',
}

describe('origemPermitida', () => {
  it('aceita as origens da allowlist', () => {
    expect(origemPermitida('https://marciliortiz.dev.br', PERMITIDAS)).toBe(true)
    expect(origemPermitida('https://www.marciliortiz.dev.br', PERMITIDAS)).toBe(true)
  })

  it('recusa origin ausente', () => {
    expect(origemPermitida(undefined, PERMITIDAS)).toBe(false)
  })

  it('aceita previews da Vercel', () => {
    expect(origemPermitida('https://portfolio-abc123.vercel.app', PERMITIDAS)).toBe(true)
  })

  // O regex de preview é ancorado (^...$). Sem isso, um atacante registraria
  // um domínio que apenas *contém* vercel.app e passaria.
  it('recusa domínio que só imita um preview da Vercel', () => {
    expect(origemPermitida('https://x.vercel.app.atacante.com', PERMITIDAS)).toBe(false)
    expect(origemPermitida('https://atacante.com/https://x.vercel.app', PERMITIDAS)).toBe(false)
    expect(origemPermitida('http://x.vercel.app', PERMITIDAS)).toBe(false)
  })

  it('só aceita localhost quando permitirLocal está ligado', () => {
    expect(origemPermitida('http://localhost:5173', PERMITIDAS)).toBe(false)
    expect(origemPermitida('http://localhost:5173', PERMITIDAS, true)).toBe(true)
    expect(origemPermitida('http://127.0.0.1:3000', PERMITIDAS, true)).toBe(true)
  })

  it('não aceita subdomínio de localhost forjado nem com permitirLocal', () => {
    expect(origemPermitida('http://localhost.atacante.com', PERMITIDAS, true)).toBe(false)
  })
})

describe('validarCorpo', () => {
  it('aceita um corpo mínimo válido e normaliza os defaults', () => {
    const r = validarCorpo(CORPO_VALIDO, LIMITES)
    expect(r.ok).toBe(true)
    if (!r.ok) return
    expect(r.dados.lang).toBe('pt')
    expect(r.dados.context).toBe('default')
    expect(r.dados.history).toEqual([])
    expect(r.dados.turnstileToken).toBeUndefined()
  })

  it('recusa corpo que não é objeto', () => {
    for (const invalido of [null, undefined, 'texto', 42]) {
      const r = validarCorpo(invalido, LIMITES)
      expect(r.ok).toBe(false)
      if (!r.ok) expect(r.status).toBe(400)
    }
  })

  it('exige pergunta não-vazia dentro do limite', () => {
    expect(validarCorpo({ ...CORPO_VALIDO, question: undefined }, LIMITES)).toMatchObject({
      ok: false,
      erro: 'pergunta_ausente',
    })
    expect(validarCorpo({ ...CORPO_VALIDO, question: '   ' }, LIMITES)).toMatchObject({
      ok: false,
      erro: 'pergunta_vazia',
    })
    expect(validarCorpo({ ...CORPO_VALIDO, question: 'x'.repeat(501) }, LIMITES)).toMatchObject({
      ok: false,
      erro: 'pergunta_longa',
    })
  })

  it('faz trim da pergunta antes de medir', () => {
    const r = validarCorpo({ ...CORPO_VALIDO, question: `  ${'x'.repeat(500)}  ` }, LIMITES)
    expect(r.ok).toBe(true)
    if (r.ok) expect(r.dados.question.length).toBe(500)
  })

  it('exige sessionId entre 8 e 64 caracteres', () => {
    for (const invalido of ['curto', 'x'.repeat(65), 123, undefined]) {
      expect(validarCorpo({ ...CORPO_VALIDO, sessionId: invalido }, LIMITES)).toMatchObject({
        ok: false,
        erro: 'sessao_invalida',
      })
    }
  })

  // A janela de histórico é o que mais pesa no custo por pergunta.
  it('recusa histórico acima do teto de mensagens', () => {
    const history = Array.from({ length: 21 }, () => ({ role: 'user', content: 'oi' }))
    expect(validarCorpo({ ...CORPO_VALIDO, history }, LIMITES)).toMatchObject({
      ok: false,
      erro: 'historico_longo',
    })
  })

  it('recusa mensagem de histórico malformada ou longa demais', () => {
    const casos = [
      [{ role: 'sistema', content: 'oi' }],
      [{ role: 'user', content: 123 }],
      [{ role: 'user', content: 'x'.repeat(1001) }],
      [null],
      ['texto solto'],
    ]
    for (const history of casos) {
      expect(validarCorpo({ ...CORPO_VALIDO, history }, LIMITES)).toMatchObject({
        ok: false,
        erro: 'historico_invalido',
      })
    }
    expect(validarCorpo({ ...CORPO_VALIDO, history: 'nao-e-array' }, LIMITES)).toMatchObject({
      ok: false,
      erro: 'historico_invalido',
    })
  })

  it('normaliza lang e context para valores conhecidos', () => {
    const r = validarCorpo({ ...CORPO_VALIDO, lang: 'klingon', context: 'qualquer' }, LIMITES)
    expect(r.ok).toBe(true)
    if (!r.ok) return
    expect(r.dados.lang).toBe('pt')
    expect(r.dados.context).toBe('default')
  })

  it('descarta turnstileToken absurdamente grande em vez de rejeitar o corpo', () => {
    const r = validarCorpo({ ...CORPO_VALIDO, turnstileToken: 'x'.repeat(2049) }, LIMITES)
    expect(r.ok).toBe(true)
    if (r.ok) expect(r.dados.turnstileToken).toBeUndefined()
  })
})
