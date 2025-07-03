import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Otimizações para SEO e performance
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    },
    // Habilitar sourcemap para produção (opcional)
    sourcemap: false,
    // Otimizar tamanho dos chunks
    chunkSizeWarningLimit: 1000,
  },
  // Otimizações de desenvolvimento
  server: {
    port: 5174,
    host: true,
  },
  // Preview server config
  preview: {
    port: 4173,
    host: true,
  },
  // Otimizações de build
  define: {
    // Remover logs em produção
    __DEV__: JSON.stringify(false),
  },
  // CSS otimizations
  css: {
    devSourcemap: true,
  },
})
