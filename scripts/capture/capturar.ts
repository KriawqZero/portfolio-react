import puppeteer from 'puppeteer'
import sharp from 'sharp'
import { createServer, type Server } from 'http'
import { createReadStream, mkdirSync, statSync } from 'fs'
import { extname, join, normalize, resolve } from 'path'
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

const MIMES: Record<string, string> = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.ico': 'image/x-icon',
}

/** Servidor estático mínimo — só para dar origem HTTP a projetos em disco. */
function servirDiretorio(raiz: string): Promise<{ url: string; fechar: () => Promise<void> }> {
  const server: Server = createServer((req, res) => {
    const caminho = decodeURIComponent((req.url ?? '/').split('?')[0])
    const alvo = join(raiz, normalize(caminho).replace(/^(\.\.[/\\])+/, ''))
    if (!alvo.startsWith(raiz)) { res.writeHead(403).end(); return }
    try {
      const arquivo = statSync(alvo).isDirectory() ? join(alvo, 'index.html') : alvo
      res.writeHead(200, { 'Content-Type': MIMES[extname(arquivo).toLowerCase()] ?? 'application/octet-stream' })
      createReadStream(arquivo).pipe(res)
    } catch {
      res.writeHead(404).end()
    }
  })
  return new Promise(ok => {
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address() as { port: number }
      ok({
        url: `http://127.0.0.1:${port}`,
        fechar: () => new Promise<void>(fim => server.close(() => fim())),
      })
    })
  })
}

async function capturar(item: Captura) {
  const servidor = item.servirDe ? await servirDiretorio(resolve(item.servirDe)) : null
  const origem = servidor ? servidor.url + item.origem : item.origem
  const browser = await puppeteer.launch({ headless: true })
  try {
    const page = await browser.newPage()
    await page.setViewport({ width: LARGURA, height: ALTURA, deviceScaleFactor: 1 })
    await page.goto(origem, { waitUntil: 'networkidle0', timeout: 60_000 })
    await page.evaluate(() => document.fonts.ready)
    await new Promise(r => setTimeout(r, item.atrasoMs ?? 2500))

    for (const acao of item.roteiro ?? []) {
      await page.waitForSelector(acao.seletor, { visible: true, timeout: 15_000 })
      if (acao.texto !== undefined) {
        await page.type(acao.seletor, acao.texto, { delay: 40 })
      } else {
        await page.click(acao.seletor)
      }
      await new Promise(r => setTimeout(r, acao.esperaMs ?? 800))
    }

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
    await servidor?.fechar()
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
