import puppeteer from 'puppeteer'
import sharp from 'sharp'
import { mkdirSync } from 'fs'
import { resolve } from 'path'
import { CAPTURAS, type Captura } from './manifesto'

/**
 * Captura screenshots padronizados dos cases: 1200×675 (moldura da Trajectory)
 * e 320×180 (thumb do Archive), ambos WebP. Reproduzível: quando a UI de um
 * projeto mudar, rode de novo e o print se atualiza.
 *
 * Uso: pnpm capture <slug|all>
 */

const SAIDA = resolve(process.cwd(), 'capturas')
const LARGURA = 1200
const ALTURA = 675
const QUALIDADE = 82

async function capturar(item: Captura) {
  const browser = await puppeteer.launch({ headless: true })
  try {
    const page = await browser.newPage()
    await page.setViewport({ width: LARGURA, height: ALTURA, deviceScaleFactor: 1 })
    await page.goto(item.origem, { waitUntil: 'networkidle0', timeout: 60_000 })
    await page.evaluate(() => document.fonts.ready)
    await new Promise(r => setTimeout(r, item.atrasoMs ?? 2500))

    const png = await page.screenshot({ type: 'png' })

    const cheio = resolve(SAIDA, `${item.slug}.webp`)
    const thumb = resolve(SAIDA, `${item.slug}-thumb.webp`)
    await sharp(png).webp({ quality: QUALIDADE, effort: 6 }).toFile(cheio)
    await sharp(png).resize(320, 180).webp({ quality: QUALIDADE, effort: 6 }).toFile(thumb)

    const meta = await sharp(cheio).metadata()
    console.log(`✓ ${item.slug}: ${meta.width}x${meta.height} → ${cheio}`)
    if (meta.width !== LARGURA || meta.height !== ALTURA) {
      throw new Error(`Dimensões inesperadas em ${item.slug}: ${meta.width}x${meta.height}`)
    }
  } finally {
    await browser.close()
  }
}

async function main() {
  const alvo = process.argv[2]
  if (!alvo) {
    console.error(`Uso: pnpm capture <slug|all>\nSlugs: ${CAPTURAS.map(c => c.slug).join(', ')}`)
    process.exit(1)
  }
  mkdirSync(SAIDA, { recursive: true })
  const fila = alvo === 'all' ? CAPTURAS : CAPTURAS.filter(c => c.slug === alvo)
  if (fila.length === 0) {
    console.error(`Slug desconhecido: ${alvo}`)
    process.exit(1)
  }
  for (const item of fila) await capturar(item)
}

main().catch(err => { console.error(err); process.exit(1) })
