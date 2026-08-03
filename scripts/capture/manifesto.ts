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
export interface Captura {
  slug: string
  origem: string
  /** Espera extra após networkidle para animações de entrada. Default 2500. */
  atrasoMs?: number
}

export const CAPTURAS: Captura[] = [
  // ── No ar (captura autônoma) ─────────────────────────────────────────
  { slug: 'vamoagendar', origem: 'https://vamoagendar.com.br/' },
  { slug: 'catalogo-corretor', origem: 'https://marciliobarbosacorretor.com.br/' },
  { slug: 'avantis', origem: 'https://avantis.dev' },
  // ── Estático em disco (captura autônoma) ─────────────────────────────
  { slug: 'jogo-matematica', origem: 'file:///home/marcilio/Files/Projetos/jogo_matematica/index.html' },
  // ── Locais (subir com o Marcilio antes de capturar) ──────────────────
  { slug: 'sisco', origem: 'http://localhost:8000' },
  { slug: 'kyteapp', origem: 'http://localhost:3000' },
  { slug: 'sushi-verao', origem: 'http://localhost:3001' },
  // ── Fase 2 (captura oportunista, fica em capturas/) ──────────────────
  { slug: 'milion', origem: 'https://milion.marciliortiz.dev.br' },
]
