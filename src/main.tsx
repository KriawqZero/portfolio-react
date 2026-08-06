import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import './index.css'
import Rotas from './Rotas'
import { LanguageProvider } from './hooks/LanguageProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* reducedMotion="user" faz todo o framer-motion respeitar a preferência
        do sistema — cobre as revelações de Trajectory e DevProcess no mobile. */}
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <Rotas />
      </LanguageProvider>
    </MotionConfig>
  </StrictMode>,
)
