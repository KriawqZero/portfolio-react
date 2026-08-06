/**
 * Confere que nenhum segredo foi parar no bundle que vai ao navegador.
 *
 * Roda automaticamente depois de `pnpm build` — inclusive no build da Vercel,
 * onde as variáveis reais existem. Se um segredo vazar, o build falha e o
 * deploy não acontece: é o único momento em que dá para impedir, porque depois
 * de publicado qualquer pessoa baixa o arquivo.
 *
 * O Vite só embute variáveis com prefixo `VITE_`. Todo o resto fica no
 * servidor. Por isso há duas checagens: o valor de qualquer variável do
 * servidor aparecendo no bundle, e uma variável `VITE_` com cara de segredo —
 * que é o jeito de furar a regra sem perceber.
 */

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const DIST = new URL('../dist', import.meta.url).pathname

if (!existsSync(DIST)) {
  console.log('sem dist/ — nada a verificar')
  process.exit(0)
}

/** Site key do Turnstile é pública por desenho: o widget a expõe no HTML. */
const PUBLICAS_CONHECIDAS = new Set(['VITE_TURNSTILE_SITE_KEY'])

const CARA_DE_SEGREDO = /(SECRET|PASSWORD|PRIVATE|_KEY|TOKEN|CREDENTIAL)/i

function arquivosDoBundle(dir: string): string[] {
  return readdirSync(dir).flatMap(nome => {
    const caminho = join(dir, nome)
    if (statSync(caminho).isDirectory()) return arquivosDoBundle(caminho)
    return /\.(js|css|html|json|map|txt|xml)$/.test(nome) ? [caminho] : []
  })
}

const arquivos = arquivosDoBundle(DIST)
const conteudo = new Map(arquivos.map(a => [a, readFileSync(a, 'utf8')]))

const problemas: string[] = []

// 1. O valor de alguma variável do servidor foi parar no bundle?
for (const [nome, valor] of Object.entries(process.env)) {
  if (!valor || valor.length < 12) continue // curto demais para ser segredo e gera falso positivo
  if (nome.startsWith('VITE_')) continue // essas são embutidas de propósito
  if (!CARA_DE_SEGREDO.test(nome)) continue

  for (const [arquivo, texto] of conteudo) {
    if (texto.includes(valor)) {
      problemas.push(`valor de ${nome} encontrado em ${arquivo.replace(DIST, 'dist')}`)
      break
    }
  }
}

// 2. Alguma variável VITE_ com nome de segredo? Ela vai para o navegador por
//    desenho — o erro está no nome, e só aparece depois de publicado.
for (const nome of Object.keys(process.env)) {
  if (!nome.startsWith('VITE_')) continue
  if (PUBLICAS_CONHECIDAS.has(nome)) continue
  if (CARA_DE_SEGREDO.test(nome)) {
    problemas.push(
      `${nome} tem prefixo VITE_ e nome de segredo: o Vite embute isso no bundle, ` +
        'visível para qualquer visitante. Renomeie sem o prefixo e leia no servidor.',
    )
  }
}

if (problemas.length) {
  console.error('\n\x1b[31mSegredo no bundle — build interrompido:\x1b[0m')
  for (const p of problemas) console.error(`  · ${p}`)
  console.error('\nO deploy não deve seguir: publicado, o arquivo fica acessível a qualquer um.\n')
  process.exit(1)
}

console.log(`bundle verificado: ${arquivos.length} arquivos, nenhum segredo exposto`)
