import type { DadosCv } from '../cv.content'

function esc(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

type Entrada = {
  name: string
  year: string | number
  type: string
  stack: string
  links: Array<{ label: string; href: string }>
  linkDisplay: string
  bullets: string[]
}

function renderEntrada(p: Entrada): string {
  const bullets = p.bullets
    .map(b => `<li>${esc(b)}</li>`)
    .join('\n          ')

  return `
    <div class="entrada">
      <div class="entrada-cabecalho">
        <span class="entrada-nome">${esc(p.name)}</span>
        <span class="entrada-ano">${esc(String(p.year))}</span>
      </div>
      <div class="entrada-meta">
        <span class="entrada-tipo">${esc(p.type)}</span>
        <a href="${esc(p.links[0]?.href ?? '#')}" class="entrada-link">${esc(p.linkDisplay)}</a>
      </div>
      <div class="entrada-stack">${esc(p.stack)}</div>
      <ul class="entrada-bullets">
          ${bullets}
      </ul>
    </div>`
}

function renderEntradaMae(exp: DadosCv['experienciaFreelance']): string {
  const filhosHtml = exp.projetos
    .map(p => `
    <div class="entrada-filho">
      <div class="entrada-cabecalho">
        <span class="entrada-nome">${esc(p.name)}</span>
        <span class="entrada-ano">${esc(String(p.year))}</span>
      </div>
      <div class="entrada-meta">
        <span class="entrada-tipo">${esc(p.type)}</span>
        <a href="${esc(p.links[0]?.href ?? '#')}" class="entrada-link">${esc(p.linkDisplay)}</a>
      </div>
      <div class="entrada-stack">${esc(p.stack)}</div>
      <ul class="entrada-bullets">
          ${p.bullets.map(b => `<li>${esc(b)}</li>`).join('\n          ')}
      </ul>
    </div>`)
    .join('')

  return `
    <div class="entrada-mae">
      <div class="entrada-mae-header">
        <div class="entrada-cabecalho">
          <span class="entrada-nome entrada-mae-nome">${esc(exp.cargo)}</span>
          <span class="entrada-ano">${esc(exp.periodo)}</span>
        </div>
        <div class="entrada-meta">
          <span class="entrada-tipo">${esc(exp.vinculo)}</span>
        </div>
      </div>
      ${filhosHtml}
    </div>`
}

export function renderEstagio(dados: DadosCv, qrDataUrl: string): string {
  const habilidadesHtml = Object.entries(dados.habilidades)
    .map(([cat, techs]) => `
      <div class="skill-categoria">
        <div class="skill-categoria-nome">${esc(cat)}</div>
        <div class="skill-tags">
          ${techs.map(t => `<span class="skill-tag">${esc(t)}</span>`).join('')}
        </div>
      </div>`)
    .join('')

  const idiomasHtml = dados.idiomas
    .map(i => `
      <div class="idioma-item">
        <span class="idioma-nome">${esc(i.idioma)}</span>
        <span class="idioma-sep"> · </span>
        <span class="idioma-nivel">${esc(i.nivel)}</span>
      </div>`)
    .join('')

  const expFreelanceHtml = renderEntradaMae(dados.experienciaFreelance)

  const projetosHtml = dados.projetos
    .map(p => renderEntrada(p as Entrada))
    .join('')

  const portfolioClean = dados.portfolio.replace('https://', '')

  return `<!DOCTYPE html>
<html lang="${dados.labels.lang}">
<head>
  <meta charset="UTF-8">
  <title>Currículo — ${esc(dados.nome)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap');

    @page { size: A4; margin: 0; }

    *, *::before, *::after {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    body {
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 8.5pt;
      line-height: 1.5;
      color: #1a1a2e;
      background: #fff;
      width: 210mm;
      min-height: 296mm;
    }

    a { color: inherit; text-decoration: none; }

    /* ─── Cabeçalho ─────────────────────────────────────────────────── */

    .header {
      background: #0d0d1a;
      padding: 9mm 12mm 7mm;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      border-bottom: 3px solid #6d4aff;
    }

    .header-nome h1 {
      font-size: 23pt;
      font-weight: 800;
      color: #fff;
      letter-spacing: -0.03em;
      line-height: 1;
    }

    .header-nome .cargo {
      font-size: 9.5pt;
      font-weight: 500;
      color: #9b82ff;
      margin-top: 4px;
      letter-spacing: 0.04em;
    }

    .header-contatos {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 3px;
    }

    .contato-item {
      font-size: 7pt;
      color: #b0a8d8;
      display: block;
    }

    .contato-loc {
      font-size: 6.5pt;
      color: #6d65a0;
      display: block;
      margin-top: 2px;
    }

    /* ─── Layout de duas colunas ─────────────────────────────────────── */

    .corpo {
      display: grid;
      grid-template-columns: 64mm 1fr;
      align-items: stretch;
      min-height: 253mm;
    }

    .sidebar {
      background: #f4f2ff;
      padding: 8mm 7mm;
      border-right: 1.5px solid #ddd8ff;
    }

    .main {
      background: #fff;
      padding: 8mm 11mm 8mm 10mm;
    }

    /* ─── Seções ─────────────────────────────────────────────────────── */

    .secao-titulo {
      font-size: 6pt;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #6d4aff;
      border-bottom: 1.5px solid #ddd8ff;
      padding-bottom: 3px;
      margin-bottom: 8px;
    }

    .sidebar .secao { margin-bottom: 8mm; }
    .main    .secao { margin-bottom: 7mm; }

    /* ─── Habilidades ─────────────────────────────────────────────────── */

    .skill-categoria { margin-bottom: 5px; }

    .skill-categoria-nome {
      font-size: 6.5pt;
      font-weight: 600;
      color: #4a30b8;
      margin-bottom: 3px;
    }

    .skill-tags { display: flex; flex-wrap: wrap; gap: 3px; }

    .skill-tag {
      font-size: 6pt;
      background: #eae6ff;
      color: #4a30b8;
      padding: 2px 5px;
      border-radius: 3px;
      font-weight: 500;
    }

    /* ─── Formação ────────────────────────────────────────────────────── */

    .formacao-inst {
      font-size: 7.5pt;
      font-weight: 700;
      color: #1a1a2e;
      line-height: 1.35;
    }

    .formacao-curso {
      font-size: 7pt;
      color: #555566;
      margin-top: 2px;
    }

    .formacao-periodo {
      font-size: 7pt;
      color: #6d4aff;
      font-weight: 600;
      margin-top: 2px;
    }

    /* ─── Idiomas ─────────────────────────────────────────────────────── */

    .idioma-item { margin-bottom: 4px; font-size: 7pt; }
    .idioma-nome  { font-weight: 600; color: #1a1a2e; }
    .idioma-sep   { color: #888899; }
    .idioma-nivel { color: #555566; }

    /* ─── Resumo ──────────────────────────────────────────────────────── */

    .resumo {
      font-size: 7.5pt;
      color: #333344;
      line-height: 1.6;
      padding: 6px 10px;
      border-left: 2.5px solid #6d4aff;
      margin-bottom: 8mm;
      background: #fafaff;
    }

    /* ─── Entradas de projeto / experiência ───────────────────────────── */

    .entrada {
      break-inside: avoid;
      margin-bottom: 6mm;
    }

    .entrada-cabecalho {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 2px;
    }

    .entrada-nome {
      font-size: 9pt;
      font-weight: 700;
      color: #1a1a2e;
    }

    .entrada-ano {
      font-size: 7pt;
      color: #888899;
      font-weight: 500;
    }

    .entrada-meta {
      display: flex;
      align-items: center;
      gap: 7px;
      margin-bottom: 3px;
    }

    .entrada-tipo {
      font-size: 6pt;
      font-weight: 600;
      color: #6d4aff;
      background: #eae6ff;
      padding: 1px 6px;
      border-radius: 3px;
    }

    .entrada-link {
      font-size: 6.5pt;
      color: #888899;
    }

    .entrada-stack {
      font-size: 6.5pt;
      color: #555566;
      margin-bottom: 5px;
      font-style: italic;
    }

    .entrada-bullets { list-style: none; }

    .entrada-bullets li {
      font-size: 7.5pt;
      color: #333344;
      line-height: 1.45;
      padding-left: 12px;
      position: relative;
      margin-bottom: 3px;
    }

    .entrada-bullets li::before {
      content: '—';
      position: absolute;
      left: 0;
      color: #6d4aff;
      font-weight: 700;
      font-size: 7pt;
    }

    /* ─── Entrada guarda-chuva ────────────────────────────────────────── */

    .entrada-mae { margin-bottom: 6mm; }

    .entrada-mae-header { break-after: avoid; margin-bottom: 3px; }

    .entrada-mae-nome { font-size: 9.5pt; }

    .entrada-filho {
      break-inside: avoid;
      margin-left: 10px;
      padding-left: 8px;
      border-left: 1.5px solid #e8e4ff;
      margin-top: 5px;
      margin-bottom: 4mm;
    }

    .entrada-filho:last-child { margin-bottom: 0; }

    /* ─── QR Code ────────────────────────────────────────────────────── */

    .qr-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }

    .qr-img {
      width: 58px;
      height: 58px;
      border-radius: 4px;
    }

    .qr-label {
      font-size: 6pt;
      color: #888899;
      text-align: center;
      line-height: 1.4;
    }
  </style>
</head>
<body>

  <header class="header">
    <div class="header-nome">
      <h1>${esc(dados.nome)}</h1>
      <p class="cargo">${esc(dados.cargo)}</p>
    </div>
    <div class="header-contatos">
      <a href="${esc(dados.contatos.email.href)}"    class="contato-item">${esc(dados.contatos.email.display)}</a>
      <a href="${esc(dados.contatos.telefone.href)}" class="contato-item">${esc(dados.contatos.telefone.display)}</a>
      <a href="${esc(dados.contatos.linkedin.href)}" class="contato-item">${esc(dados.contatos.linkedin.display)}</a>
      <a href="${esc(dados.contatos.github.href)}"   class="contato-item">${esc(dados.contatos.github.display)}</a>
      <a href="${esc(dados.portfolio)}"              class="contato-item">${esc(portfolioClean)}</a>
      <span class="contato-loc">${esc(dados.localizacao)}</span>
    </div>
  </header>

  <div class="corpo">
    <aside class="sidebar">

      <div class="secao">
        <div class="secao-titulo">${esc(dados.labels.habilidades)}</div>
        ${habilidadesHtml}
      </div>

      <div class="secao">
        <div class="secao-titulo">${esc(dados.labels.formacao)}</div>
        <div class="formacao-inst">${esc(dados.formacao.instituicao)}</div>
        <div class="formacao-curso">${esc(dados.formacao.curso)}</div>
        <div class="formacao-periodo">${esc(dados.formacao.periodo)}</div>
      </div>

      <div class="secao">
        <div class="secao-titulo">${esc(dados.labels.idiomas)}</div>
        ${idiomasHtml}
      </div>

      <div class="secao qr-wrapper">
        <img class="qr-img" src="${qrDataUrl}" alt="QR Code">
        <div class="qr-label">${esc(dados.labels.portfolioLabel)}<br>${esc(portfolioClean)}</div>
      </div>

    </aside>

    <main class="main">

      <p class="resumo">${esc(dados.resumo)}</p>

      <div class="secao">
        <div class="secao-titulo">${esc(dados.experienciaFreelance.tituloEstagio)}</div>
        ${expFreelanceHtml}
      </div>

      <div class="secao">
        <div class="secao-titulo">${esc(dados.labels.projetosProprios)}</div>
        ${projetosHtml}
      </div>

    </main>
  </div>

</body>
</html>`
}
