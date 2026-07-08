import puppeteer from 'puppeteer'
import QRCode from 'qrcode'
import { mkdirSync } from 'fs'
import { resolve } from 'path'
import { dadosCv } from './cv.content'
import { renderEstagio } from './templates/estagio'
import { renderAts } from './templates/ats'

type Variante = 'estagio' | 'ats'

const VARIANTES: Variante[] = ['estagio', 'ats']

async function main() {
  const variante = process.argv[2] as Variante

  if (!VARIANTES.includes(variante)) {
    console.error(`Uso: pnpm cv:gen [${VARIANTES.join('|')}]`)
    process.exit(1)
  }

  let html: string

  if (variante === 'estagio') {
    const qrDataUrl = await QRCode.toDataURL(dadosCv.portfolio, {
      width: 200,
      margin: 1,
      errorCorrectionLevel: 'M',
      color: { dark: '#6D4AFF', light: '#F4F2FF' },
    })
    html = renderEstagio(dadosCv, qrDataUrl)
  } else {
    html = renderAts(dadosCv)
  }

  mkdirSync('./cv-output', { recursive: true })

  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  await page.setContent(html, { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)

  const outputPath = resolve(`./cv-output/marcilio-ortiz-${variante}.pdf`)

  await page.pdf({
    path: outputPath,
    format: 'A4',
    preferCSSPageSize: true,
    printBackground: true,
    displayHeaderFooter: false,
  })

  await browser.close()

  console.log(`✓ PDF gerado: ${outputPath}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
