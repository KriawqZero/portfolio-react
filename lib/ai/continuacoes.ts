/**
 * Continuações: as perguntas que aparecem como botões depois de uma resposta.
 *
 * Elas existem porque boa parte dos visitantes prefere tocar a digitar — e a
 * conversa morre quando não vem nenhuma. O modelo é quem deve propô-las, porque
 * só ele sabe o que acabou de ser dito; este arquivo é o piso, para o caso de
 * ele devolver menos do que três.
 *
 * Duas coisas o piso não pode ser: aleatório e repetido. Por isso as perguntas
 * carregam tópicos e são escolhidas pela sobreposição com os documentos que
 * sustentaram a resposta, e tudo que já foi perguntado na conversa é descartado
 * antes.
 *
 * Toda pergunta daqui precisa ser respondível pelo dossiê. Sugerir o que a IA
 * não sabe responder é pior que não sugerir nada: o visitante gasta o clique e
 * recebe um "não sei". Existe teste garantindo isso.
 */

import type { KnowledgeDoc } from './types.js'

export type Continuacao = {
  pergunta: string
  topicos: string[]
}

export const CONTINUACOES: Record<'pt' | 'en', readonly Continuacao[]> = {
  pt: [
    { pergunta: 'Qual foi o projeto mais difícil que você fez?', topicos: ['projeto', 'carreira'] },
    { pergunta: 'Como você decide qual tecnologia usar?', topicos: ['arquitetura', 'stack'] },
    { pergunta: 'Como você mantém o cliente informado?', topicos: ['comunicacao', 'cliente', 'briefing'] },
    { pergunta: 'Como você aprendeu a programar?', topicos: ['formacao', 'autodidata', 'estudo'] },
    { pergunta: 'O que é a Avantis?', topicos: ['avantis', 'marca'] },
    { pergunta: 'Com que stack você se sente mais à vontade?', topicos: ['stack'] },
    { pergunta: 'Que tipo de vaga você está procurando?', topicos: ['estagio', 'carreira', 'perfil'] },
    { pergunta: 'Você trabalha com backend também?', topicos: ['stack', 'arquitetura'] },
    { pergunta: 'Quais projetos você fez para cliente real?', topicos: ['cliente', 'freelance', 'projeto'] },
    { pergunta: 'O que você faz antes de escrever a primeira linha?', topicos: ['briefing', 'proposta', 'arquitetura'] },
    { pergunta: 'Onde você estuda?', topicos: ['ifms', 'escola', 'formacao'] },
    { pergunta: 'Como é trabalhar com você num projeto?', topicos: ['freelance', 'cliente', 'comunicacao'] },
  ],
  /**
   * O bloco em inglês não é tradução do de cima, e isso é consequência, não
   * descuido: a busca é lexical e o dossiê é todo em português, então casa por
   * id e título dos documentos — que são slugs em inglês. "education" e
   * "internship" encontram documento; "study" e "role" não encontram nada.
   * Cada pergunta daqui foi escolhida contra a busca real, não traduzida.
   */
  en: [
    { pergunta: 'What is the SISCO project?', topicos: ['projeto', 'ifms'] },
    { pergunta: 'How do you decide which technology to use?', topicos: ['arquitetura', 'stack'] },
    { pergunta: 'How do you keep a client informed?', topicos: ['comunicacao', 'cliente', 'briefing'] },
    { pergunta: 'How did you learn to code?', topicos: ['formacao', 'autodidata', 'estudo'] },
    { pergunta: 'What is Avantis?', topicos: ['avantis', 'marca'] },
    { pergunta: 'Which stack are you most comfortable with?', topicos: ['stack'] },
    { pergunta: 'Are you looking for an internship?', topicos: ['estagio', 'carreira', 'objetivos'] },
    { pergunta: 'Do you work on the backend too?', topicos: ['stack', 'arquitetura'] },
    { pergunta: 'Which projects did you build for real clients?', topicos: ['cliente', 'freelance', 'projeto'] },
    { pergunta: 'How do you use AI in your work?', topicos: ['ia', 'produtividade', 'ferramentas'] },
    { pergunta: 'What is your education?', topicos: ['formacao', 'escola', 'ifms'] },
    { pergunta: 'What is it like to work with you on a project?', topicos: ['freelance', 'cliente', 'comunicacao'] },
  ],
}

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Palavras curtas demais não distinguem nada: "que", "de", "com". */
function palavras(texto: string): Set<string> {
  return new Set(normalizar(texto).split(' ').filter(p => p.length > 3))
}

/**
 * Duas perguntas dizem a mesma coisa?
 *
 * Igualdade exata não basta: "Como você trabalha em equipe?" e "Como é
 * trabalhar em equipe com você?" são a mesma pergunta para quem lê, e oferecer
 * as duas lado a lado é oferecer uma. Jaccard sobre as palavras que carregam
 * sentido resolve o caso comum sem inventar semântica.
 */
function parecidas(a: string, b: string): boolean {
  const pa = palavras(a)
  const pb = palavras(b)
  if (pa.size === 0 || pb.size === 0) return normalizar(a) === normalizar(b)

  let comuns = 0
  for (const p of pa) if (pb.has(p)) comuns++
  return comuns / (pa.size + pb.size - comuns) >= 0.6
}

export type OpcoesDeComplemento = {
  /** O que o modelo devolveu, já validado. */
  atuais: string[]
  perguntaAtual: string
  historico?: Array<{ role: 'user' | 'assistant'; content: string }>
  /** Documentos que sustentaram a resposta: guiam a escolha do complemento. */
  documentos: KnowledgeDoc[]
  lang: 'pt' | 'en'
  minimo?: number
}

/**
 * Completa a lista até o mínimo, sem nunca reduzir o que o modelo propôs.
 * Se ele deu três, nada aqui acontece.
 */
export function completarContinuacoes(opcoes: OpcoesDeComplemento): string[] {
  const minimo = opcoes.minimo ?? 3
  const resultado = [...opcoes.atuais]
  if (resultado.length >= minimo) return resultado

  const jaPerguntado = [
    opcoes.perguntaAtual,
    ...(opcoes.historico ?? []).filter(m => m.role === 'user').map(m => m.content),
  ]

  const topicosEmJogo = new Set(opcoes.documentos.flatMap(d => d.topics ?? []))

  const candidatas = CONTINUACOES[opcoes.lang]
    .filter(c => !jaPerguntado.some(p => parecidas(p, c.pergunta)))
    .filter(c => !resultado.some(r => parecidas(r, c.pergunta)))
    .map((c, ordem) => ({
      ...c,
      // Quantos tópicos esta pergunta divide com o que acabou de ser respondido.
      afinidade: c.topicos.filter(t => topicosEmJogo.has(t)).length,
      ordem,
    }))
    // Afinidade primeiro; empate mantém a ordem do arquivo, que é estável e
    // torna o comportamento reproduzível em teste.
    .sort((a, b) => b.afinidade - a.afinidade || a.ordem - b.ordem)

  for (const candidata of candidatas) {
    if (resultado.length >= minimo) break
    resultado.push(candidata.pergunta)
  }

  return resultado
}
