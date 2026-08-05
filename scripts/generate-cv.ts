import puppeteer from 'puppeteer'
import QRCode from 'qrcode'
import { mkdirSync } from 'fs'
import { resolve } from 'path'
import { dadosCv, dadosCvEn } from './cv.content'
import { dadosCvSoftwareJr } from './cv.software-jr.content'
import { dadosCvSuporte } from './cv.support.content'
import { renderEstagio } from './templates/estagio'
import { renderAts } from './templates/ats'

type Variante =
  | 'estagio'
  | 'ats'
  | 'estagio-en'
  | 'ats-en'
  | 'suporte-ti'
  | 'suporte-ti-visual'
  | 'software-jr'
  | 'software-jr-visual'

const VARIANTES: Variante[] = [
  'estagio',
  'ats',
  'estagio-en',
  'ats-en',
  'suporte-ti',
  'suporte-ti-visual',
  'software-jr',
  'software-jr-visual',
]

async function main() {
  const variante = process.argv[2] as Variante

  if (!VARIANTES.includes(variante)) {
    console.error(`Uso: pnpm cv:gen [${VARIANTES.join('|')}]`)
    process.exit(1)
  }

  const dados =
    variante === 'suporte-ti' || variante === 'suporte-ti-visual'
      ? dadosCvSuporte
      : variante === 'software-jr' || variante === 'software-jr-visual'
        ? dadosCvSoftwareJr
        : variante.endsWith('-en')
          ? dadosCvEn
          : dadosCv

  let html: string

  if (
    variante === 'estagio'
    || variante === 'estagio-en'
    || variante === 'suporte-ti-visual'
    || variante === 'software-jr-visual'
  ) {
    const qrDataUrl = await QRCode.toDataURL(dados.portfolio, {
      width: 200,
      margin: 1,
      errorCorrectionLevel: 'M',
      color: { dark: '#6D4AFF', light: '#F4F2FF' },
    })
    html = renderEstagio(dados, qrDataUrl)
  } else {
    html = renderAts(dados)
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
