/**
 * Captura a seção "Marcilio IA" rodando de verdade, em desktop e mobile,
 * nos três estados que importam: vazio, esperando e respondido.
 *
 *   pnpm ai:shot            # usa http://127.0.0.1:5199
 *   pnpm ai:shot http://...
 *
 * As imagens vão para capturas/ (fora do Git).
 */

import { mkdirSync } from 'node:fs'
import puppeteer from 'puppeteer'

const base = process.argv[2] ?? 'http://127.0.0.1:5199'
const destino = 'capturas/ia'
mkdirSync(destino, { recursive: true })

const navegador = await puppeteer.launch({ args: ['--no-sandbox'] })

async function capturar(nome: string, largura: number, altura: number) {
  const pagina = await navegador.newPage()
  await pagina.setViewport({ width: largura, height: altura, deviceScaleFactor: 2 })
  await pagina.goto(base, { waitUntil: 'networkidle2' })
  await pagina.evaluate(() => document.querySelector('#ia')?.scrollIntoView({ block: 'center' }))
  await new Promise(r => setTimeout(r, 900))

  const secao = await pagina.$('#ia')
  if (!secao) throw new Error('Seção #ia não encontrada')

  await secao.screenshot({ path: `${destino}/${nome}-vazio.png` })

  // Dispara uma pergunta pela primeira sugestão e pega o estado de espera.
  await pagina.evaluate(() => {
    const botao = document.querySelector<HTMLButtonElement>('.ai-suggestions .ai-chip')
    botao?.click()
  })
  await new Promise(r => setTimeout(r, 500))
  await secao.screenshot({ path: `${destino}/${nome}-esperando.png` })

  // Espera a resposta chegar e assentar.
  await pagina.waitForSelector('.ai-answer', { timeout: 30000 })
  await new Promise(r => setTimeout(r, 1200))
  await secao.screenshot({ path: `${destino}/${nome}-respondido.png` })

  await pagina.close()
  console.log(`✓ ${nome}: 3 capturas`)
}

await capturar('desktop', 1440, 900)
await capturar('mobile', 390, 844)

await navegador.close()
console.log(`\nImagens em ${destino}/`)
