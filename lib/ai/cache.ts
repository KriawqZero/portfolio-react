/**
 * Cache de respostas.
 *
 * A maioria das perguntas de um portfólio se repete: as seis sugestões da
 * interface concentram quase todo o volume, e visitantes diferentes fazem as
 * mesmas perguntas com palavras parecidas. Responder de novo a mesma coisa é
 * gasto puro.
 *
 * Guardamos a resposta já validada, indexada pela pergunta normalizada. Um
 * acerto custa zero: nem chamada à OpenAI, nem espera.
 *
 * Só entra no cache resposta com status 'answered'. Recusa e desconhecimento
 * ficam de fora de propósito: são baratas de gerar e sensíveis a mudanças no
 * dossiê.
 */

import { createHash } from 'node:crypto'
import { Redis } from '@upstash/redis'
import type { AskResponse } from './types.js'

function configurado(): boolean {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN)
}

let redis: Redis | null = null
function cliente(): Redis {
  if (!redis) redis = Redis.fromEnv()
  return redis
}

/**
 * "Como você usa IA?" e "como voce usa ia" são a mesma pergunta. Normalizamos
 * acento, caixa, pontuação e espaço para que as duas batam na mesma chave.
 */
function normalizar(pergunta: string): string {
  return pergunta
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * A versão entra na chave para que uma mudança no dossiê ou no prompt invalide
 * tudo de uma vez, sem precisar limpar o Redis à mão.
 */
function chave(pergunta: string, lang: string, contexto: string, versao: string): string {
  const digest = createHash('sha256')
    .update(`${normalizar(pergunta)}|${lang}|${contexto}|${versao}`)
    .digest('hex')
    .slice(0, 32)
  return `ai:resposta:${digest}`
}

function ttl(): number {
  const valor = Number(process.env.AI_ANSWER_CACHE_TTL_SECONDS)
  return Number.isFinite(valor) && valor > 0 ? valor : 604800 // 7 dias
}

export async function respostaEmCache(
  pergunta: string,
  lang: string,
  contexto: string,
  versao: string,
): Promise<AskResponse | null> {
  if (!configurado() || process.env.AI_ANSWER_CACHE === 'false') return null
  try {
    return await cliente().get<AskResponse>(chave(pergunta, lang, contexto, versao))
  } catch {
    // Cache é otimização, não dependência: se falhar, seguimos e perguntamos.
    return null
  }
}

export async function guardarResposta(
  pergunta: string,
  lang: string,
  contexto: string,
  versao: string,
  resposta: AskResponse,
): Promise<void> {
  if (!configurado() || process.env.AI_ANSWER_CACHE === 'false') return
  if (resposta.status !== 'answered') return
  try {
    await cliente().set(chave(pergunta, lang, contexto, versao), resposta, { ex: ttl() })
  } catch {
    // idem: falhar aqui não pode derrubar a resposta que já está pronta.
  }
}
