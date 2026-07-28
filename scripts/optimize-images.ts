import sharp, { type Sharp } from 'sharp'
import { mkdirSync, statSync } from 'fs'
import { resolve } from 'path'

/**
 * Gera as variantes otimizadas da foto do hero.
 *
 * O original (`public/marcilio-pose.png`) é um recorte RGBA de 472x1390 — corpo
 * inteiro em pé, proporção 1:2,94. Essa proporção funciona no desktop, onde a foto
 * ocupa 45vw e sangra para fora do viewport, mas no mobile ela renderizava com
 * ~109px de largura dentro de uma coluna quadrada.
 *
 * Por isso são geradas duas famílias:
 *   - `full`  → o original, para >= 1024px
 *   - `crop`  → recorte do topo (cabeça para baixo), para mobile
 *
 * A largura de origem é 472px, então não há upscale: as variantes existem para
 * trocar PNG por AVIF/WebP, não para aumentar resolução.
 *
 * Uso: pnpm img:gen
 */

const PUBLICO = resolve(process.cwd(), 'public')
const SAIDA = resolve(PUBLICO, 'generated')
const ORIGEM = resolve(PUBLICO, 'marcilio-pose.png')

/** Proporção do recorte mobile (largura : altura). 1.5 corta no quadril, 2.0 perto dos joelhos. */
const PROPORCAO_CROP = 1.5

/** Qualidade alta de propósito: a foto é o elemento de identidade do hero e o
 *  arquivo resultante ainda fica ~30x menor que o PNG original. */
const QUALIDADE = { avif: 72, webp: 86 }

async function gerar(entrada: Sharp, nome: string) {
  const destinos = [
    { ext: 'avif', fn: (s: Sharp) => s.avif({ quality: QUALIDADE.avif, effort: 6 }) },
    { ext: 'webp', fn: (s: Sharp) => s.webp({ quality: QUALIDADE.webp, effort: 6 }) },
  ]

  for (const { ext, fn } of destinos) {
    const caminho = resolve(SAIDA, `${nome}.${ext}`)
    await fn(entrada.clone()).toFile(caminho)
    const kb = (statSync(caminho).size / 1024).toFixed(1)
    console.log(`  ${nome}.${ext.padEnd(4)} ${kb.padStart(7)} KB`)
  }
}

async function main() {
  mkdirSync(SAIDA, { recursive: true })

  const meta = await sharp(ORIGEM).metadata()
  const largura = meta.width!
  const altura = meta.height!
  console.log(`origem: ${largura}x${altura} (${(statSync(ORIGEM).size / 1024).toFixed(0)} KB)\n`)

  console.log('desktop (corpo inteiro):')
  await gerar(sharp(ORIGEM), 'pose-full')

  const alturaCrop = Math.min(altura, Math.round(largura * PROPORCAO_CROP))
  console.log(`\nmobile (recorte do topo, ${largura}x${alturaCrop} — 1:${PROPORCAO_CROP}):`)
  await gerar(
    sharp(ORIGEM).extract({ left: 0, top: 0, width: largura, height: alturaCrop }),
    'pose-crop',
  )

  // Candidato alternativo, para comparação visual. Não é referenciado pelo site.
  if (process.argv.includes('--candidatos')) {
    const alt = Math.min(altura, Math.round(largura * 2.0))
    console.log(`\ncandidato alternativo (${largura}x${alt} — 1:2.0):`)
    await gerar(
      sharp(ORIGEM).extract({ left: 0, top: 0, width: largura, height: alt }),
      'pose-crop-alt',
    )
  }

  console.log(`\nsaída: ${SAIDA}`)
}

main().catch((erro) => {
  console.error(erro)
  process.exit(1)
})
