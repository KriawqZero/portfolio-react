/**
 * POST /api/ask — a única peça server-side da seção "Marcilio IA".
 *
 * A ordem das verificações é deliberada: o que é barato roda antes do que
 * custa dinheiro, e nada alcança a OpenAI sem passar por todas.
 *
 *   forma da requisição → origem → tamanho → schema
 *   → dependências de contagem → kill switch → Turnstile
 *   → rate limit → teto de gasto → OpenAI
 *
 * Em produção tudo falha fechado. A única camada que não depende deste código
 * é o limite de gasto configurado no projeto da OpenAI — e é ela que garante
 * que o pior caso seja um teto, não uma surpresa.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { waitUntil } from '@vercel/functions'
import OpenAI from 'openai'

import { respostaEmCache, guardarResposta } from '../lib/ai/cache.js'
import { config } from '../lib/ai/config.js'
import { completarContinuacoes } from '../lib/ai/continuacoes.js'
import { KNOWLEDGE, KNOWLEDGE_VERSION, POLICIES } from '../lib/ai/generated/knowledge-index.js'
import {
  chaveAnonima,
  dentroDoOrcamento,
  dentroDoRateLimit,
  dependenciasOk,
  desligadaNoRedis,
  ipDaRequisicao,
} from '../lib/ai/limits.js'
import { montarBlocoDocumentos, montarInstrucoes } from '../lib/ai/prompt.js'
import { documentosFixos, selecionarDocumentos } from '../lib/ai/retrieval.js'
import { verificarTurnstile } from '../lib/ai/turnstile.js'
import { ANSWER_JSON_SCHEMA } from '../lib/ai/types.js'
import { validarResposta } from '../lib/ai/validate-answer.js'
import { origemPermitida, validarCorpo } from '../lib/ai/validate-request.js'
import { registrarPergunta, type RegistroDePergunta } from '../lib/ai/registro.js'

function erro(res: VercelResponse, status: number, codigo: string, estado?: string) {
  return res.status(status).json({ error: codigo, ...(estado ? { state: estado } : {}) })
}

/**
 * Grava depois de a resposta já ter saído.
 *
 * `waitUntil` é o que mantém a instância viva até a escrita terminar sem
 * segurar o visitante. Fora da Vercel — no `pnpm dev`, onde o handler roda
 * dentro do Vite — não existe contexto de requisição e a chamada lança; ali a
 * promessa fica solta mesmo, e quem impede rejeição não tratada é o try/catch
 * dentro de `registrarPergunta`, que nunca deixa nada escapar.
 */
function registrarEmSegundoPlano(registro: RegistroDePergunta) {
  const tarefa = registrarPergunta(registro)
  try {
    waitUntil(tarefa)
  } catch {
    void tarefa
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origem = req.headers.origin
  const permitida = origemPermitida(origem, config.origensPermitidas(), !config.producao)

  if (permitida && origem) {
    res.setHeader('Access-Control-Allow-Origin', origem)
    res.setHeader('Vary', 'Origin')
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return erro(res, 405, 'metodo_nao_permitido')
  if (!req.headers['content-type']?.includes('application/json')) {
    return erro(res, 415, 'tipo_nao_suportado')
  }
  if (!permitida) return erro(res, 403, 'origem_nao_permitida')

  const tamanho = Number(req.headers['content-length'] ?? 0)
  if (tamanho > config.limites.bytesCorpo) return erro(res, 413, 'corpo_grande')

  const validacao = validarCorpo(req.body, {
    caracteresMensagem: config.limites.caracteresMensagem,
    mensagensHistorico: config.limites.mensagensHistorico,
    caracteresHistorico: config.limites.caracteresHistorico,
  })
  if (!validacao.ok) return erro(res, validacao.status, validacao.erro)

  const { question, history, sessionId, lang, context, turnstileToken } = validacao.dados

  // Sem contadores confiáveis não existe teto de gasto — em produção isso
  // barra a requisição em vez de virar modo degradado silencioso.
  const dependencias = dependenciasOk(config.producao)
  if (!dependencias.ok) return erro(res, dependencias.status, dependencias.codigo, dependencias.estado)

  if (!config.habilitado) return erro(res, 503, 'desativado', 'disabled')
  if (!process.env.OPENAI_API_KEY) return erro(res, 503, 'sem_credencial', 'disabled')
  if (await desligadaNoRedis()) return erro(res, 503, 'desativado', 'disabled')

  const ip = ipDaRequisicao(req.headers)

  const verificacao = await verificarTurnstile(turnstileToken, ip, config.producao)
  if (!verificacao.ok) return erro(res, verificacao.status, verificacao.codigo, verificacao.estado)

  const limite = await dentroDoRateLimit(sessionId, ip)
  if (!limite.ok) {
    if (limite.tentarEm) res.setHeader('Retry-After', String(limite.tentarEm))
    return erro(res, limite.status, limite.codigo, limite.estado)
  }

  /**
   * Campos que todo registro carrega, montados uma vez.
   *
   * As portas anteriores a esta — origem, Turnstile, rate limit — não gravam
   * nada de propósito: elas existem justamente para recusar barato, e escrever
   * no Postgres a cada recusa entregaria de graça o custo que elas evitam. O
   * que passou daqui é pergunta de verdade, e é isso que vai para a tabela.
   */
  const recebidoEm = Date.now()
  const registroBase = {
    sessao: sessionId,
    origem: chaveAnonima(ip),
    idioma: lang,
    contexto: context ?? 'default',
    pergunta: question,
  }

  // Cache só na primeira pergunta da conversa.
  //
  // A chave é a pergunta, não a conversa. Com histórico, "e quem é seu sócio?"
  // depende do que veio antes — servir a resposta guardada de outra conversa
  // daria uma resposta coerente sobre o assunto errado, que é pior que erro.
  const conversaNova = !history || history.length === 0

  if (conversaNova) {
    const guardada = await respostaEmCache(question, lang, context ?? 'default', KNOWLEDGE_VERSION)
    if (guardada) {
      console.log(JSON.stringify({ evento: 'ask_cache', status: guardada.status, lang }))
      // `documentos` fica nulo: o cache guarda a resposta, não a seleção que a
      // produziu. A coluna `cache` é o que impede ler isso como falha da busca.
      registrarEmSegundoPlano({
        ...registroBase,
        resposta: guardada.answer,
        status: guardada.status,
        continuacoes: guardada.followUps,
        ms: Date.now() - recebidoEm,
        cache: true,
      })
      return res.status(200).json(guardada)
    }
  }

  // Última porta antes de gastar: incrementa os contadores globais do dia e
  // do mês. Se estourou, a OpenAI não é chamada.
  const orcamento = await dentroDoOrcamento()
  if (!orcamento.ok) return erro(res, orcamento.status, orcamento.codigo, orcamento.estado)

  const documentos = selecionarDocumentos(question, KNOWLEDGE, {
    maxDocumentos: config.limites.documentos,
    maxCaracteres: config.limites.caracteresContexto,
    contexto: context,
  })

  const inicio = Date.now()

  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    const resposta = await client.responses.create(
      {
        model: config.modelo,
        instructions: montarInstrucoes(POLICIES, lang, documentosFixos(KNOWLEDGE)),
        // Roteia perguntas semelhantes para o mesmo cache de prefixo da OpenAI,
        // que é onde o desconto de entrada acontece.
        prompt_cache_key: `marcilio-ia-${lang}-${KNOWLEDGE_VERSION}`,
        input: [
          ...(history ?? []).map(m => ({ role: m.role, content: m.content })),
          { role: 'developer' as const, content: montarBlocoDocumentos(documentos) },
          { role: 'user' as const, content: question },
        ],
        store: false,
        reasoning: { effort: config.esforco },
        max_output_tokens: config.limites.tokensSaida,
        text: {
          verbosity: 'low',
          format: {
            type: 'json_schema',
            name: 'portfolio_answer',
            strict: true,
            schema: ANSWER_JSON_SCHEMA,
          },
        },
        safety_identifier: chaveAnonima(sessionId),
      },
      { timeout: config.limites.timeoutMs },
    )

    let bruto: unknown = null
    try {
      bruto = JSON.parse(resposta.output_text)
    } catch {
      bruto = null
    }

    const validado = validarResposta(bruto, [...documentos, ...documentosFixos(KNOWLEDGE)], {
      caracteresResposta: config.limites.caracteresResposta,
      maxFollowUps: config.limites.continuacoes,
      caracteresFollowUp: config.limites.caracteresContinuacao,
    })

    /**
     * Piso das continuações. O modelo devolver menos de três não é raro —
     * acontece com mais frequência justamente quando ele não sabe responder,
     * que é quando o visitante mais precisa de um caminho adiante.
     *
     * Isto entra antes do cache de propósito: assim a resposta guardada também
     * carrega o piso, em vez de a garantia valer só na primeira vez.
     */
    const validada: typeof validado = {
      ...validado,
      followUps: completarContinuacoes({
        atuais: validado.followUps,
        perguntaAtual: question,
        historico: history,
        documentos,
        lang,
        minimo: config.limites.continuacoes,
      }),
    }

    if (conversaNova) {
      await guardarResposta(question, lang, context ?? 'default', KNOWLEDGE_VERSION, validada)
    }

    // Log operacional: sem pergunta, sem resposta, sem contexto — só o que
    // serve para diagnosticar custo e relevância.
    console.log(
      JSON.stringify({
        evento: 'ask',
        status: validada.status,
        modelo: config.modelo,
        docs: documentos.map(d => d.id),
        tokensEntrada: resposta.usage?.input_tokens ?? null,
        tokensCacheados: resposta.usage?.input_tokens_details?.cached_tokens ?? null,
        tokensSaida: resposta.usage?.output_tokens ?? null,
        latenciaMs: Date.now() - inicio,
        lang,
      }),
    )

    registrarEmSegundoPlano({
      ...registroBase,
      resposta: validada.answer,
      status: validada.status,
      documentos: documentos.map(d => d.id),
      continuacoes: validada.followUps,
      ms: Date.now() - recebidoEm,
    })

    return res.status(200).json(validada)
  } catch (e) {
    const nome = e instanceof Error ? e.name : 'desconhecido'
    const timeout = nome === 'APIUserAbortError' || nome === 'AbortError' || nome === 'TimeoutError'

    console.error(
      JSON.stringify({
        evento: 'ask_erro',
        tipo: nome,
        latenciaMs: Date.now() - inicio,
      }),
    )

    // A pergunta que falhou vale tanto quanto a que deu certo: é ela que
    // mostra o que a IA não conseguiu responder, e quando.
    registrarEmSegundoPlano({
      ...registroBase,
      documentos: documentos.map(d => d.id),
      erro: timeout ? 'tempo_esgotado' : nome,
      ms: Date.now() - recebidoEm,
    })

    return timeout
      ? erro(res, 504, 'tempo_esgotado', 'upstream')
      : erro(res, 503, 'indisponivel', 'upstream')
  }
}
