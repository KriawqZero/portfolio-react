/**
 * `dependenciasOk` é o portão que decide se a requisição pode seguir para as
 * camadas que gastam dinheiro. O princípio do arquivo é falhar fechado em
 * produção: sem contador confiável não existe teto de gasto, e sem sal o
 * "anônimo" do rate limit não é anônimo.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  dependenciasOk,
  chaveAnonima,
  ipDaRequisicao,
  dentroDoRateLimit,
} from '../lib/ai/limits'

const AMBIENTE = { ...process.env }

function comEnv(vars: Record<string, string | undefined>) {
  for (const [k, v] of Object.entries(vars)) {
    if (v === undefined) delete process.env[k]
    else process.env[k] = v
  }
}

const REDIS_OK = {
  UPSTASH_REDIS_REST_URL: 'https://exemplo.upstash.io',
  UPSTASH_REDIS_REST_TOKEN: 'token-de-teste',
}

beforeEach(() => {
  comEnv({
    UPSTASH_REDIS_REST_URL: undefined,
    UPSTASH_REDIS_REST_TOKEN: undefined,
    RATE_LIMIT_HASH_SECRET: undefined,
  })
})

afterEach(() => {
  process.env = { ...AMBIENTE }
})

describe('dependenciasOk', () => {
  it('fora de produção passa mesmo sem nada configurado', () => {
    expect(dependenciasOk(false)).toEqual({ ok: true })
  })

  it('em produção sem Redis, barra antes de gastar', () => {
    const v = dependenciasOk(true)
    expect(v.ok).toBe(false)
    if (!v.ok) expect(v.codigo).toBe('sem_contadores')
  })

  /**
   * Sem sal, a chave do rate limit é sha256(ip) — e o espaço inteiro de IPv4
   * são 4 bilhões de entradas, reversível em minutos por quem ler o Redis.
   * O código promete que o IP nunca é gravado em claro; sem o segredo essa
   * promessa não se sustenta, então produção não sobe assim.
   */
  it('em produção com Redis mas sem segredo de hash, também barra', () => {
    comEnv(REDIS_OK)
    const v = dependenciasOk(true)
    expect(v.ok).toBe(false)
    if (!v.ok) expect(v.codigo).toBe('sem_segredo_hash')
  })

  it('em produção com tudo configurado, libera', () => {
    comEnv({ ...REDIS_OK, RATE_LIMIT_HASH_SECRET: 'segredo-longo-de-teste' })
    expect(dependenciasOk(true)).toEqual({ ok: true })
  })
})

describe('operação sem Redis (AI_NO_REDIS)', () => {
  it('sem a flag, produção sem Redis continua barrada', () => {
    const v = dependenciasOk(true)
    expect(v.ok).toBe(false)
    if (!v.ok) expect(v.codigo).toBe('sem_contadores')
  })

  it('com a flag e o segredo de hash, produção passa', () => {
    comEnv({ AI_NO_REDIS: 'true', RATE_LIMIT_HASH_SECRET: 'segredo-de-teste' })
    expect(dependenciasOk(true)).toEqual({ ok: true })
  })

  /**
   * A flag assume o risco de não ter contador distribuído; ela não autoriza
   * abrir mão do sal, que é o que mantém o IP irreversível no que sobrou.
   */
  it('a flag não dispensa o segredo de hash', () => {
    comEnv({ AI_NO_REDIS: 'true' })
    const v = dependenciasOk(true)
    expect(v.ok).toBe(false)
    if (!v.ok) expect(v.codigo).toBe('sem_segredo_hash')
  })

  it('o limite em memória barra depois do teto configurado', async () => {
    comEnv({
      AI_NO_REDIS: 'true',
      RATE_LIMIT_HASH_SECRET: 'segredo-de-teste',
      AI_RATE_LIMIT_REQUESTS: '3',
      AI_RATE_LIMIT_WINDOW_SECONDS: '600',
    })
    const sessao = `sessao-${Math.random()}`
    const ip = `10.0.0.${Math.floor(Math.random() * 250) + 1}`

    for (let i = 0; i < 3; i++) {
      expect((await dentroDoRateLimit(sessao, ip)).ok, `pergunta ${i + 1}`).toBe(true)
    }

    const quarta = await dentroDoRateLimit(sessao, ip)
    expect(quarta.ok).toBe(false)
    if (!quarta.ok) {
      expect(quarta.status).toBe(429)
      expect(quarta.codigo).toBe('muitas_perguntas')
    }
  })

  it('uma sessão que estourou não derruba outra', async () => {
    comEnv({
      AI_NO_REDIS: 'true',
      RATE_LIMIT_HASH_SECRET: 'segredo-de-teste',
      AI_RATE_LIMIT_REQUESTS: '2',
      AI_RATE_LIMIT_WINDOW_SECONDS: '600',
    })
    const ip = `10.1.0.${Math.floor(Math.random() * 250) + 1}`
    const a = `sessao-a-${Math.random()}`
    const b = `sessao-b-${Math.random()}`

    await dentroDoRateLimit(a, ip)
    await dentroDoRateLimit(a, ip)
    expect((await dentroDoRateLimit(a, ip)).ok).toBe(false)
    expect((await dentroDoRateLimit(b, ip)).ok).toBe(true)
  })

  it('sem a flag e fora de produção, não limita nada', async () => {
    const sessao = `livre-${Math.random()}`
    const ip = '10.2.0.1'
    for (let i = 0; i < 20; i++) {
      expect((await dentroDoRateLimit(sessao, ip)).ok).toBe(true)
    }
  })
})

describe('chaveAnonima', () => {
  it('não devolve o valor original nem parte dele', () => {
    comEnv({ RATE_LIMIT_HASH_SECRET: 'segredo' })
    const chave = chaveAnonima('189.45.12.7')
    expect(chave).not.toContain('189')
    expect(chave).toMatch(/^[0-9a-f]{32}$/)
  })

  it('o mesmo IP com segredos diferentes gera chaves diferentes', () => {
    comEnv({ RATE_LIMIT_HASH_SECRET: 'segredo-a' })
    const a = chaveAnonima('189.45.12.7')
    comEnv({ RATE_LIMIT_HASH_SECRET: 'segredo-b' })
    const b = chaveAnonima('189.45.12.7')
    expect(a).not.toBe(b)
  })

  it('é estável para o mesmo IP e segredo, senão o rate limit não conta', () => {
    comEnv({ RATE_LIMIT_HASH_SECRET: 'segredo' })
    expect(chaveAnonima('189.45.12.7')).toBe(chaveAnonima('189.45.12.7'))
  })
})

describe('ipDaRequisicao', () => {
  it('pega o primeiro IP de x-forwarded-for, que é o cliente', () => {
    expect(ipDaRequisicao({ 'x-forwarded-for': '203.0.113.9, 70.41.3.18' })).toBe('203.0.113.9')
  })

  it('cai para x-real-ip quando não há encaminhamento', () => {
    expect(ipDaRequisicao({ 'x-real-ip': '203.0.113.9' })).toBe('203.0.113.9')
  })

  it('sem cabeçalho nenhum devolve um marcador, não vazio', () => {
    expect(ipDaRequisicao({})).toBe('desconhecido')
  })
})
