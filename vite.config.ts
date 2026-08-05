import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'

/**
 * Em produção quem serve /api/ask é a Vercel. No `pnpm dev` não existe nada
 * ouvindo nessa rota, então este plugin monta o mesmo handler no dev server —
 * o front usa exatamente o mesmo caminho nos dois ambientes.
 *
 * Só roda em `serve`; não entra no build.
 */
function apiDev(): Plugin {
  return {
    name: 'api-ask-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/ask', async (req, res) => {
        const partes: Uint8Array[] = []
        for await (const parte of req) partes.push(parte as Uint8Array)
        const bruto = Buffer.concat(partes).toString('utf8')

        const requisicao = {
          method: req.method,
          headers: req.headers,
          body: bruto ? JSON.parse(bruto) : {},
        }

        const resposta = {
          setHeader: (nome: string, valor: string) => {
            res.setHeader(nome, valor)
            return resposta
          },
          status: (codigo: number) => {
            res.statusCode = codigo
            return resposta
          },
          json: (dados: unknown) => {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(dados))
            return resposta
          },
          end: () => {
            res.end()
            return resposta
          },
        }

        try {
          const modulo = await server.ssrLoadModule('/api/ask.ts')
          await modulo.default(requisicao, resposta)
        } catch (e) {
          server.config.logger.error(`[api-ask-dev] ${String(e)}`)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'erro_dev' }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiDev()],
})
