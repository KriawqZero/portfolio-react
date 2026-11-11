import { useRef, useEffect, useState, useId } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { getProjectCatalog, filterProjects, statusLabels, categoryLabels } from '../data/projectCatalog'
import './ProjectCatalog.css'

interface ArchiveOverlayProps { isOpen: boolean; onClose: () => void }

export default function ArchiveOverlay({ isOpen, onClose }: ArchiveOverlayProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const { language } = useLanguage()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [category, setCategory] = useState('all')
  const projects = getProjectCatalog(language)
  const visible = filterProjects(projects, query, status, category)
  const en = language === 'en'

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (!isOpen) {
      if (dialog.open) dialog.close()
      return
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    return () => {
      document.body.style.overflow = previousOverflow
      if (dialog.open) dialog.close()
    }
  }, [isOpen])

  const clearFilters = () => { setQuery(''); setStatus('all'); setCategory('all') }
  return (
    <dialog ref={dialogRef} className="project-catalog" aria-labelledby={titleId} data-lenis-prevent
      onCancel={event => { event.preventDefault(); onClose() }}>
      <div className="project-catalog__shell">
        <header className="project-catalog__header">
          <div>
            <h2 id={titleId}>{en ? 'Projects, in detail.' : 'Projetos, de perto.'}</h2>
            <p>{en ? 'Websites, systems and experiments. Explore what I built and each project’s stage.' : 'Sites, sistemas e experimentos. Veja o que construí e o estágio de cada projeto.'}</p>
          </div>
          <button type="button" className="project-catalog__close" onClick={onClose} aria-label={en ? 'Close projects' : 'Fechar projetos'}>×</button>
        </header>
        <div className="project-catalog__filters">
          <label className="project-catalog__search">
            <span>{en ? 'Find a project' : 'Encontre um projeto'}</span>
            <input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={en ? 'Name, problem or technology' : 'Nome, problema ou tecnologia'} />
          </label>
          <label>
            <span>{en ? 'Stage' : 'Estágio'}</span>
            <select value={status} onChange={event => setStatus(event.target.value)}>
              <option value="all">{en ? 'All stages' : 'Todos os estágios'}</option>
              {Object.entries(statusLabels[language]).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
          <label>
            <span>{en ? 'Area' : 'Área'}</span>
            <select value={category} onChange={event => setCategory(event.target.value)}>
              <option value="all">{en ? 'All areas' : 'Todas as áreas'}</option>
              {Object.entries(categoryLabels[language]).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
        </div>
        <div className="project-catalog__results" aria-live="polite" aria-atomic="true">
          {en ? `${visible.length} of ${projects.length} projects` : `${visible.length} de ${projects.length} projetos`}
          {(query || status !== 'all' || category !== 'all') && <button type="button" onClick={clearFilters}>{en ? 'Clear filters' : 'Limpar filtros'}</button>}
        </div>
        <div className="project-catalog__list" data-lenis-prevent>
          {visible.length === 0 && <div className="project-catalog__empty">
            <h3>{en ? 'No projects found.' : 'Nenhum projeto encontrado.'}</h3>
            <p>{en ? 'Try another term or clear the filters to see all projects.' : 'Tente outro termo ou limpe os filtros para ver todos os projetos.'}</p>
          </div>}
          {visible.map(project => <details className="project-catalog__item" key={project.id}>
            <summary>
              <div className="project-catalog__identity">
                <span className="project-catalog__area">{categoryLabels[language][project.category]}</span>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
              </div>
              <div className="project-catalog__meta">
                <span className={`project-catalog__status project-catalog__status--${project.status}`}>{statusLabels[language][project.status]}</span>
                <span className="project-catalog__year">{project.year}</span>
              </div>
              <span className="project-catalog__expand" aria-hidden="true">+</span>
            </summary>
            <div className="project-catalog__detail">
              {project.media && <img src={project.media.image} alt={project.media.alt} width="400" height="225" loading="lazy" decoding="async" />}
              <div>
                <h4>{en ? 'What this project covers' : 'O que este projeto inclui'}</h4>
                <p>{project.scope}</p>
                <ul className="project-catalog__stack" aria-label={en ? 'Technologies' : 'Tecnologias'}>
                  {project.stack.map(tech => <li key={tech}>{tech}</li>)}
                </ul>
                {project.links.length > 0 && <div className="project-catalog__links">
                  {project.links.map(link => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} <span aria-hidden="true">↗</span></a>)}
                </div>}
              </div>
            </div>
          </details>)}
        </div>
      </div>
    </dialog>
  )
}
