/**
 * Registro das perguntas feitas à Marcilio IA.
 *
 * Existe por dois motivos: saber o que as pessoas de fato perguntam, e ver
 * quais documentos do dossiê a busca escolheu — que é onde já apareceu erro
 * antes, com resposta boa sustentada pelo documento errado.
 *
 * Três regras governam este arquivo:
 *
 *  1. **Nunca lança.** Falha aqui é falha de observação, não de produto. Uma
 *     resposta correta não pode virar erro na tela porque o banco caiu.
 *  2. **Nunca segura o visitante.** A escrita acontece depois da resposta ter
 *     saído, via `waitUntil`.
 *  3. **Sem prazo de descarte, por decisão explícita do autor** (2026-08-06).
 *     A limpeza é manual. Isso é escolha dele, não esquecimento — e vale
 *     lembrar que a coluna `pergunta` guarda texto livre digitado por
 *     terceiros, então é o campo com maior chance de conter dado pessoal que
 *     ninguém pediu.
 */

import { Pool } from 'pg'

let pool: Pool | null = null

/**
 * Sem `DATABASE_URL` o registro simplesmente não acontece — é assim que
 * desenvolvimento e preview não sujam o histórico de produção, e é também o
 * jeito de desligar o registro sem deploy: basta remover a variável.
 */
function conexao(): Pool | null {
  const url = process.env.DATABASE_URL
  if (!url) return null

  if (!pool) {
    pool = new Pool({
      connectionString: url,
      // Fluid Compute reaproveita instâncias e cria mais sob carga. Pool grande
      // aqui vira dezenas de conexões ociosas no Postgres, que tem teto baixo.
      max: 2,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 4_000,
      // Exige canal cifrado sem validar a cadeia: o proxy do Railway apresenta
      // certificado autoassinado.
      //
      // A `DATABASE_URL` **não** deve levar `?sslmode=require`. O pg moderno lê
      // esse parâmetro da string e passa a exigir cadeia válida, ignorando este
      // objeto — o resultado é SELF_SIGNED_CERT_IN_CHAIN em toda escrita, e
      // como aqui nada lança, o sintoma seria o registro simplesmente não
      // acontecer, em silêncio. A política de SSL vive aqui, não na URL.
      ssl: { rejectUnauthorized: false },
    })
    // Socket ocioso derrubado pelo proxy emite 'error' no pool. Sem este
    // ouvinte, o Node trata como exceção não capturada e mata a função.
    pool.on('error', () => {})
  }

  return pool
}

export type RegistroDePergunta = {
  /** sessionId do navegador: é o que agrupa a conversa de um visitante. */
  sessao: string
  /** Hash do IP com o sal do rate limit. Pseudônimo, não anônimo. */
  origem: string
  idioma: string
  contexto: string
  pergunta: string
  resposta?: string | null
  status?: string | null
  /** Ids do dossiê que entraram no prompt. Nulo quando veio do cache. */
  documentos?: string[] | null
  erro?: string | null
  ms?: number | null
  cache?: boolean
}

export async function registrarPergunta(registro: RegistroDePergunta): Promise<void> {
  const banco = conexao()
  if (!banco) return

  try {
    await banco.query(
      `insert into perguntas
         (sessao, origem, idioma, contexto, pergunta, resposta, status, documentos, erro, ms, cache)
       values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        registro.sessao,
        registro.origem,
        registro.idioma,
        registro.contexto,
        registro.pergunta,
        registro.resposta ?? null,
        registro.status ?? null,
        registro.documentos ?? null,
        registro.erro ?? null,
        registro.ms ?? null,
        registro.cache ?? false,
      ],
    )
  } catch (e) {
    // Só o tipo do erro vai para o log da plataforma: a mensagem do driver
    // costuma trazer host e usuário da conexão.
    console.error(
      JSON.stringify({
        evento: 'registro_falhou',
        tipo: e instanceof Error ? e.name : 'desconhecido',
      }),
    )
  }
}
