/**
 * Leitura das variáveis de ambiente num único lugar, com defaults conservadores.
 * Nenhum valor sensível é exposto — só números e flags saem daqui.
 */

function numero(nome: string, padrao: number): number {
  const bruto = process.env[nome]
  if (!bruto) return padrao
  const valor = Number(bruto)
  return Number.isFinite(valor) && valor > 0 ? valor : padrao
}

export const config = {
  get modelo(): string {
    return process.env.OPENAI_MODEL || 'gpt-5.6-terra'
  },
  /**
   * Esforço de raciocínio. As perguntas aqui são curtas e o contexto vem
   * pronto, então raciocínio alto só adiciona segundos de espera visível.
   */
  get esforco(): 'none' | 'low' | 'medium' | 'high' {
    const bruto = process.env.AI_REASONING_EFFORT
    return bruto === 'none' || bruto === 'medium' || bruto === 'high' ? bruto : 'low'
  },
  get habilitado(): boolean {
    return process.env.AI_CHAT_ENABLED === 'true'
  },
  get producao(): boolean {
    return process.env.VERCEL_ENV === 'production'
  },
  limites: {
    get caracteresMensagem() {
      return numero('AI_MAX_MESSAGE_CHARACTERS', 500)
    },
    get mensagensHistorico() {
      return numero('AI_MAX_HISTORY_MESSAGES', 6)
    },
    get tokensSaida() {
      return numero('AI_MAX_OUTPUT_TOKENS', 350)
    },
    /**
     * Reduzidos depois de medir: com o perfil e o índice de projetos já nas
     * instruções, quatro documentos cobrem as perguntas reais. Cada documento
     * a mais era ~250 tokens de entrada por pergunta que não mudavam a resposta.
     */
    get caracteresContexto() {
      return numero('AI_MAX_CONTEXT_CHARACTERS', 6000)
    },
    get documentos() {
      return numero('AI_MAX_DOCUMENTS', 4)
    },
    get timeoutMs() {
      return numero('AI_REQUEST_TIMEOUT_MS', 20000)
    },
    /** Teto duro do corpo da requisição, antes de qualquer parse. */
    get bytesCorpo() {
      return numero('AI_MAX_BODY_BYTES', 8192)
    },
    /** Teto do texto devolvido ao visitante, depois da validação. */
    get caracteresResposta() {
      return numero('AI_MAX_ANSWER_CHARACTERS', 900)
    },
  },
  /** Origens que podem chamar o endpoint. Em preview a Vercel usa *.vercel.app. */
  origensPermitidas(): string[] {
    const fixas = ['https://www.marciliortiz.dev.br', 'https://marciliortiz.dev.br']
    if (config.producao) return fixas
    return [...fixas, 'http://localhost:5173', 'http://localhost:3000']
  },
}
