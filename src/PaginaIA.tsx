import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from './hooks/useLanguage'
import DuasPortas from './components/DuasPortas'
import Conversa from './components/ia/Conversa'

/**
 * Marcilio IA — página própria.
 *
 * Nada de GSAP nem Lenis aqui, e isso não é omissão: é o que faz esta página
 * abrir sem baixar as bibliotecas de rolagem e as oito seções do portfólio.
 * As revelações usam framer-motion, que é a fronteira já estabelecida no
 * projeto — GSAP para o que a rolagem comanda, framer-motion para o que o
 * estado do React comanda. Aqui nada é comandado pela rolagem.
 */

/** Mesma revelação com máscara do título da Avantis, sem depender do GSAP. */
function Revela({
  children,
  atraso = 0,
  className,
}: {
  children: React.ReactNode
  atraso?: number
  className?: string
}) {
  return (
    <span className="mask-text-container" style={{ display: 'block' }}>
      <motion.span
        className={className}
        style={{ display: 'block' }}
        initial={{ y: '100%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.1, delay: atraso, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default function PaginaIA() {
  const { t, language } = useLanguage()
  const data = t.aiChat

  /**
   * A página ocupa a tela e não rola — quem rola é o fio da conversa. O
   * `overflow: hidden` no `.ia-pagina` já impede o vazamento, mas travar o
   * body também corta o arrasto elástico do mobile, que faz o ambiente inteiro
   * descolar da borda da tela. Reaproveita a classe que o arquivo do portfólio
   * já define, e devolve o estado ao sair para não sequestrar o scroll de lá.
   */
  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.classList.add('no-scroll')
    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [])

  // O título do documento é o que aparece na aba e no histórico. Guardar e
  // devolver o anterior evita que a volta ao portfólio herde o título da IA.
  useEffect(() => {
    const anterior = document.title
    document.title = data.pageTitle
    document.documentElement.lang = language === 'en' ? 'en' : 'pt-BR'
    return () => {
      document.title = anterior
    }
  }, [data.pageTitle, language])

  return (
    <div className="ia-pagina">
      <div className="noise-overlay" />

      {/* Mesma atmosfera do portfólio, em versão de um respiro só: a página
          precisa parecer o mesmo lugar, não um subdomínio de outra pessoa. */}
      <div className="ia-ambiente" aria-hidden="true">
        <div className="ia-ambiente-alto" />
        <div className="ia-ambiente-baixo" />
      </div>

      <header className="ia-topo">
        <div className="container ia-topo-interno">
          <a href="/" className="nav-logo" aria-label={data.nav.portfolio}>
            <img src="/logo-simple.png" alt="MO" style={{ height: 28, width: 'auto' }} />
          </a>
          <DuasPortas ativa="ia" />
        </div>
      </header>

      <main className="container ia-grid">
        {/* Fora da coluna editorial de propósito: preso a ela, o número
            encostava no título. Na borda da página ele é a mesma marca-d'água
            que AboutMe e Avantis usam. */}
        <span className="section-number ia-numero" aria-hidden="true">
          {data.number}
        </span>

        <div className="ia-editorial">
          {/* O rótulo e o aviso curto são o que sobra do bloco editorial no
              celular depois que a conversa começa. O aviso fica escondido até
              lá — enquanto o disclaimer inteiro está na tela, repeti-lo seria
              redundância. */}
          <div className="ia-topo-editorial">
            <Revela className="section-label">{data.label}</Revela>
            <span className="ia-aviso-curto">{data.compactNotice}</span>
          </div>

          {/* Tudo daqui para baixo recolhe no celular quando a conversa começa.
              As duas camadas existem para a altura poder ser animada: a de fora
              vai de `1fr` a `0fr`, a de dentro corta o que sobra. Animar
              `height: auto` não é possível, e `max-height` chutado ou corta
              texto ou deixa a transição com um trecho morto no fim. */}
          <div className="ia-editorial-expansivel">
            <div className="ia-editorial-conteudo">
          <h1 className="text-display ia-titulo">
            <Revela atraso={0.08}>{data.title}</Revela>
            <Revela atraso={0.16} className="gradient-text">
              {data.titleHighlight}
            </Revela>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="ai-description">{data.description}</p>

            <p className="ai-disclaimer">
              <span aria-hidden="true" className="ai-disclaimer-mark" />
              {data.disclaimer}
            </p>

            {/* Mais discreto que o disclaimer de propósito: o que importa saber
                antes de perguntar é que do outro lado tem uma IA. Que a
                pergunta fica registrada é obrigação de contar, não manchete. */}
            <p className="ai-privacidade">{data.privacy}</p>
          </motion.div>
            </div>
          </div>
        </div>

        <Conversa />
      </main>
    </div>
  )
}
