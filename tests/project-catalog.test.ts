import { describe, expect, it } from 'vitest'
import { filterProjects, getProjectCatalog, statusLabels } from '../src/data/projectCatalog'
import { KNOWLEDGE } from '../lib/ai/generated/knowledge-index'

describe('catálogo público de projetos', () => {
  it('mantém a mesma seleção sem duplicatas nos dois idiomas', () => {
    const pt = getProjectCatalog('pt')
    const en = getProjectCatalog('en')
    expect(new Set(pt.map(p => p.id)).size).toBe(pt.length)
    expect(en.map(p => [p.id, p.status, p.category])).toEqual(pt.map(p => [p.id, p.status, p.category]))
    expect(pt.some(p => p.id === 'aplicativo-de-imoveis')).toBe(true)
    expect(pt.some(p => p.id === 'catalogo-corretor')).toBe(true)
    expect(pt.filter(p => p.id.includes('voxel'))).toHaveLength(1)
  })

  it('busca sem acentos e combina busca, estágio e área', () => {
    const projects = getProjectCatalog('pt')
    expect(filterProjects(projects, 'imoveis', 'published', 'systems').map(p => p.id))
      .toEqual(expect.arrayContaining(['catalogo-corretor', 'aplicativo-de-imoveis']))
    expect(filterProjects(projects, 'python', 'implemented', 'automation').map(p => p.id)).toEqual(['price-adjustment'])
    expect(filterProjects(projects, 'não existe um projeto assim')).toEqual([])
    expect(filterProjects(projects, '  ')).toHaveLength(projects.length)
  })

  it('mantém estágio e escopo nos documentos usados pela IA', () => {
    for (const project of getProjectCatalog('pt')) {
      const doc = KNOWLEDGE.find(d => d.id === `catalog-${project.id}`)
      expect(doc, project.id).toBeDefined()
      expect(doc?.text).toContain(`Estágio: ${statusLabels.pt[project.status]}`)
      expect(doc?.text).toContain(project.scope)
    }
  })

  it('não oferece o domínio perdido como destino nem confunde Sushi com o sistema não aprovado', () => {
    for (const language of ['pt', 'en'] as const) {
      const projects = getProjectCatalog(language)
      expect(projects.flatMap(p => p.links).some(l => /https?:\/\/(?:www\.)?avantis\.dev/.test(l.href))).toBe(false)
      const sushi = projects.find(p => p.id === 'sushi-do-verao')!
      expect(sushi.name).toBe('Sushi do Verão')
      expect(sushi.links[0].href).toBe('https://sushidoverao.com.br/')
      expect(sushi.stack).not.toContain('NestJS')
      expect(projects.find(p => p.id === 'vamoagendar')?.status).toBe('development')
    }
    expect(KNOWLEDGE.some(d => /https?:\/\/(?:www\.)?avantis\.dev/.test(d.sourceHref ?? ''))).toBe(false)
  })
})
