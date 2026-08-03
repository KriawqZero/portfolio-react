import puppeteer, { type Page } from 'puppeteer'
import { mkdirSync } from 'fs'
import { resolve } from 'path'

/**
 * Grava o simulador de agendamento da home do VamoAgendar em WebM via
 * page.screencast(). O widget é a demonstração pública do próprio site
 * ("Pode clicar — é uma demonstração de verdade"), então nada é agendado
 * de verdade e nenhum dado real de cliente entra no fluxo.
 *
 * Saída bruta em capturas/vamoagendar-bruto.webm; a compressão final é um
 * passo ffmpeg (VP9, mudo, ≤3 MB) documentado no plano.
 *
 * Os botões do widget não têm id/data-attribute estável, e os dias mudam a
 * cada execução — por isso os passos casam por regex de texto + índice.
 */

const SAIDA = resolve(process.cwd(), 'capturas')
const URL_FLUXO = 'https://vamoagendar.com.br/'

interface Passo {
  descricao: string
  /** Regex (fonte) casada contra o texto dos botões da página. */
  padrao: string
  /** Qual ocorrência usar quando o padrão casa com vários botões. Default 0. */
  indice?: number
  /** Quando presente, digita no input em vez de clicar num botão. */
  digitar?: { placeholder: string; valor: string }
  esperaMs: number
}

const PASSOS: Passo[] = [
  { descricao: 'escolher o serviço', padrao: 'Design \\+ henna', esperaMs: 1600 },
  { descricao: 'escolher o dia', padrao: '^\\w{3}\\d{2}/\\d{2}$', indice: 2, esperaMs: 1400 },
  { descricao: 'escolher o horário', padrao: '^14:00$', esperaMs: 1600 },
  { descricao: 'informar o nome', padrao: '', digitar: { placeholder: 'Camila', valor: 'Camila' }, esperaMs: 1800 },
]

async function executar(page: Page, passo: Passo) {
  if (passo.digitar) {
    const seletor = `input[placeholder="${passo.digitar.placeholder}"]`
    await page.waitForSelector(seletor, { visible: true, timeout: 15_000 })
    await page.type(seletor, passo.digitar.valor, { delay: 120 })
  } else {
    const achou = await page.evaluate(
      ({ padrao, indice }) => {
        const re = new RegExp(padrao)
        const alvos = Array.from(document.querySelectorAll('button')).filter(b =>
          re.test((b.textContent ?? '').trim().replace(/\s+/g, ' '))
        )
        const alvo = alvos[indice ?? 0]
        if (!alvo) return false
        alvo.scrollIntoView({ block: 'center', behavior: 'instant' as ScrollBehavior })
        alvo.click()
        return true
      },
      { padrao: passo.padrao, indice: passo.indice }
    )
    if (!achou) throw new Error(`Passo "${passo.descricao}": nenhum botão casou com /${passo.padrao}/`)
  }
  await new Promise(r => setTimeout(r, passo.esperaMs))
  console.log(`  · ${passo.descricao}`)
}

async function main() {
  mkdirSync(SAIDA, { recursive: true })
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewport({ width: 1200, height: 675, deviceScaleFactor: 1 })
  await page.goto(URL_FLUXO, { waitUntil: 'networkidle0', timeout: 60_000 })
  await page.evaluate(() => document.fonts.ready)

  // Enquadra o widget antes de gravar — o vídeo é sobre o fluxo, não sobre a landing.
  await page.evaluate(() => {
    const alvo = Array.from(document.querySelectorAll('button')).find(b =>
      (b.textContent ?? '').includes('Design de sobrancelhas')
    )
    alvo?.closest('div')?.scrollIntoView({ block: 'center', behavior: 'instant' as ScrollBehavior })
  })
  await new Promise(r => setTimeout(r, 2000))

  const recorder = await page.screencast({
    path: resolve(SAIDA, 'vamoagendar-bruto.webm') as `${string}.webm`,
  })
  for (const passo of PASSOS) await executar(page, passo)
  await new Promise(r => setTimeout(r, 1500))
  await recorder.stop()
  await browser.close()
  console.log('✓ gravação bruta em capturas/vamoagendar-bruto.webm')
}

main().catch(err => { console.error(err); process.exit(1) })
