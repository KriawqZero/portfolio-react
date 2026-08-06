/**
 * Mostra quantas perguntas a IA já respondeu hoje e no mês, lendo os mesmos
 * contadores que barram as chamadas.
 *
 *   pnpm ai:stats
 */

import { consumo } from '../../lib/ai/limits'

const dados = await consumo()

if (!dados) {
  console.log('Redis não configurado — sem contadores. Em produção isso bloqueia a IA.')
  process.exit(0)
}

const tetoDia = Number(process.env.AI_GLOBAL_DAILY_LIMIT ?? 100)
const tetoMes = Number(process.env.AI_GLOBAL_MONTHLY_LIMIT ?? 1000)

function barra(uso: number, teto: number): string {
  const cheio = Math.min(20, Math.round((uso / teto) * 20))
  return `${'█'.repeat(cheio)}${'░'.repeat(20 - cheio)}`
}

console.log(`\nhoje  ${barra(dados.dia, tetoDia)}  ${dados.dia}/${tetoDia}`)
console.log(`mês   ${barra(dados.mes, tetoMes)}  ${dados.mes}/${tetoMes}\n`)

if (dados.dia >= tetoDia) console.log('Teto do dia atingido: a IA está respondendo pelo fallback.')
if (dados.mes >= tetoMes) console.log('Teto do mês atingido: a IA está respondendo pelo fallback.')
