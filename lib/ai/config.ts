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
  /**
   * Luna em vez de Terra: a tarefa aqui é responder pergunta curta a partir de
   * um contexto que chega pronto e já filtrado, com o formato imposto por JSON
   * Schema. Não há raciocínio longo a fazer, e o modelo mais caro cobraria por
   * uma capacidade que este caminho não usa.
   */
  get modelo(): string {
    return process.env.OPENAI_MODEL || 'gpt-5.6-luna'
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
    /** 20 mensagens = 10 perguntas e 10 respostas, em janela deslizante. */
    get mensagensHistorico() {
      return numero('AI_MAX_HISTORY_MESSAGES', 20)
    },
    /**
     * O histórico carrega respostas da própria IA, que podem chegar ao teto de
     * caracteresResposta. Validá-lo com o limite da pergunta (500) rejeitaria
     * qualquer conversa em que a IA tivesse respondido mais longo.
     */
    get caracteresHistorico() {
      return numero('AI_MAX_HISTORY_CHARACTERS', 1000)
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
    /**
     * Teto duro do corpo, antes de qualquer parse. Precisa comportar a janela
     * inteira de histórico: 20 mensagens de até 1.000 caracteres, mais o
     * token do Turnstile e o resto do envelope.
     */
    get bytesCorpo() {
      return numero('AI_MAX_BODY_BYTES', 32768)
    },
    /** Teto do texto devolvido ao visitante, depois da validação. */
    get caracteresResposta() {
      return numero('AI_MAX_ANSWER_CHARACTERS', 900)
    },
    /** Quantas continuações aparecem como botão depois de uma resposta. */
    get continuacoes() {
      return numero('AI_FOLLOW_UPS', 3)
    },
    /**
     * Teto de uma continuação. O validador descarta a que passar daqui — e
     * descartar é certo, porque cortar uma pergunta ao meio produz outra
     * pergunta. Estava em 80, e nesse valor uma resposta cujas três sugestões
     * fossem longas chegava ao visitante sem sugestão nenhuma, em silêncio. O
     * prompt pede setenta caracteres; a folga até cem existe para o descarte
     * ser exceção, não rotina.
     */
    get caracteresContinuacao() {
      return numero('AI_MAX_FOLLOW_UP_CHARACTERS', 100)
    },
  },
  /** Origens que podem chamar o endpoint. Em preview a Vercel usa *.vercel.app. */
  origensPermitidas(): string[] {
    const fixas = ['https://www.marciliortiz.dev.br', 'https://marciliortiz.dev.br']
    if (config.producao) return fixas
    return [...fixas, 'http://localhost:5173', 'http://localhost:3000']
  },
}
