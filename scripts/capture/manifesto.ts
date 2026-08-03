/**
 * Manifesto de capturas de tela dos cases.
 *
 * Contrato editorial (mesmo do avantis-porfolio): só entra print de UI real
 * rodando — produção quando existe, localhost quando não. Nenhum mockup
 * fabricado. A captura grava em ./capturas/ (staging, fora do git); o que
 * integra o site é copiado manualmente para public/cases/.
 *
 * Origens localhost exigem o projeto de pé antes de rodar (ver bloco de
 * comandos por projeto no plano). atrasoMs cobre animações de entrada.
 */
/** Interação declarativa antes do print (fechar splash, logar, entrar no jogo). */
export interface Acao {
  /** Seletor CSS do alvo. */
  seletor: string
  /** Quando presente, digita o texto no campo em vez de clicar. */
  texto?: string
  /** Espera após a ação. Default 800. */
  esperaMs?: number
}

export interface Captura {
  slug: string
  origem: string
  /** Espera extra após networkidle para animações de entrada. Default 2500. */
  atrasoMs?: number
  /** Passos executados antes do print — para UI que só aparece depois de interagir. */
  roteiro?: Acao[]
  /**
   * Diretório servido por HTTP efêmero durante a captura. Necessário para
   * projetos estáticos que usam ES modules: sob file:// o browser bloqueia o
   * módulo por CORS e a página fica morta. `origem` vira relativa à raiz servida.
   */
  servirDe?: string
}

export const CAPTURAS: Captura[] = [
  // ── No ar (captura autônoma) ─────────────────────────────────────────
  { slug: 'vamoagendar', origem: 'https://vamoagendar.com.br/' },
  { slug: 'catalogo-corretor', origem: 'https://marciliobarbosacorretor.com.br/' },
  { slug: 'avantis', origem: 'https://avantis.dev' },
  // ── Estático em disco (captura autônoma) ─────────────────────────────
  {
    slug: 'jogo-matematica',
    servirDe: '/home/marcilio/Files/Projetos/jogo_matematica',
    origem: '/index.html',
    // Sem o roteiro o print seria só o modal de boas-vindas; o labirinto com
    // fog of war (o que o projeto tem de interessante) só existe depois de entrar.
    roteiro: [
      { seletor: '#playerName', texto: 'Marcilio' },
      { seletor: '#startButton', esperaMs: 1500 },
    ],
  },
  // ── Locais (subir com o Marcilio antes de capturar) ──────────────────
  {
    slug: 'sisco',
    origem: 'http://localhost:8000/login/professor',
    // Credenciais do seed público do próprio SISCO (dados fictícios de TCC,
    // banco local em docker) — o login é primeironome.ultimonome.
    roteiro: [
      { seletor: 'input[name="login"]', texto: 'lucas.roberto' },
      { seletor: 'input[name="senha"]', texto: '123456' },
      { seletor: 'button[type="submit"]', esperaMs: 3500 },
    ],
  },
  { slug: 'kyteapp', origem: 'http://localhost:3000' },
  { slug: 'sushi-verao', origem: 'http://localhost:3001' },
  // ── Fase 2 (captura oportunista, fica em capturas/) ──────────────────
  { slug: 'milion', origem: 'https://milion.marciliortiz.dev.br' },
]
