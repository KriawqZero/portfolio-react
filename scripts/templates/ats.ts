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
    .join('\n        ')

  return `
    <div class="entrada">
      <div class="entrada-cabecalho">
        <span class="entrada-nome">${esc(p.name)}</span>
        <span class="entrada-ano">${esc(String(p.year))}</span>
      </div>
      <div class="entrada-tipo">${esc(p.type)}</div>
      <div class="entrada-stack">${esc(p.stack)}</div>
      <ul class="entrada-bullets">
        ${bullets}
      </ul>
    </div>`
}

export function renderAts(dados: DadosCv): string {
  const contatosLinha = [
    dados.contatos.email.display,
    dados.contatos.linkedin.display,
    dados.contatos.github.display,
    dados.portfolio.replace('https://', ''),
    dados.localizacao,
  ].join(' · ')

  const habilidadesHtml = Object.entries(dados.habilidades)
    .map(([cat, techs]) =>
      `<div class="skill-linha"><span class="skill-cat">${esc(cat)}:</span> ${techs.map(esc).join(', ')}</div>`
    )
    .join('\n    ')

  const clientWorkHtml = dados.clientWork
    .map(p => renderEntrada(p as Entrada))
    .join('')

  const projetosHtml = dados.projetos
    .map(p => renderEntrada(p as Entrada))
    .join('')

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Currículo ATS — ${esc(dados.nome)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

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
      font-size: 9.5pt;
      line-height: 1.5;
      color: #111;
      background: #fff;
      width: 210mm;
      min-height: 297mm;
      padding: 13mm 16mm;
    }

    a { color: #111; text-decoration: none; }

    /* ─── Cabeçalho ─────────────────────────────────────────────────── */

    .header-nome {
      font-size: 20pt;
      font-weight: 700;
      color: #000;
      line-height: 1.1;
    }

    .header-cargo {
      font-size: 11pt;
      font-weight: 600;
      color: #222;
      margin-top: 2px;
    }

    .header-contatos {
      font-size: 8pt;
      color: #333;
      margin-top: 5px;
      padding-bottom: 10px;
      border-bottom: 1.5px solid #111;
    }

    /* ─── Seções ─────────────────────────────────────────────────────── */

    .secao-titulo {
      font-size: 9pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #000;
      border-bottom: 1px solid #333;
      padding-bottom: 2px;
      margin-top: 11px;
      margin-bottom: 7px;
    }

    /* ─── Resumo ──────────────────────────────────────────────────────── */

    .resumo {
      font-size: 9pt;
      color: #222;
      line-height: 1.55;
    }

    /* ─── Habilidades ─────────────────────────────────────────────────── */

    .skill-linha { font-size: 8.5pt; margin-bottom: 3px; }
    .skill-cat   { font-weight: 700; }

    /* ─── Idiomas ─────────────────────────────────────────────────────── */

    .idioma-linha { font-size: 8.5pt; margin-bottom: 3px; }

    /* ─── Entradas de projeto / experiência ───────────────────────────── */

    .entrada {
      break-inside: avoid;
      margin-bottom: 10px;
    }

    .entrada-cabecalho {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }

    .entrada-nome { font-size: 9.5pt; font-weight: 700; color: #000; }
    .entrada-ano  { font-size: 8.5pt; color: #444; }

    .entrada-tipo  { font-size: 8.5pt; color: #444; margin-bottom: 1px; }
    .entrada-stack { font-size: 8pt;   color: #555; margin-bottom: 5px; }

    .entrada-bullets { padding-left: 18px; }

    .entrada-bullets li {
      font-size: 8.5pt;
      line-height: 1.5;
      margin-bottom: 2px;
    }

    /* ─── Formação ────────────────────────────────────────────────────── */

    .formacao-inst    { font-size: 9pt; font-weight: 700; }
    .formacao-detalhe { font-size: 8.5pt; color: #333; }
    .formacao-proximo { font-size: 8pt; color: #555; font-style: italic; margin-top: 3px; }
  </style>
</head>
<body>

  <div class="header-nome">${esc(dados.nome)}</div>
  <div class="header-cargo">${esc(dados.cargo)}</div>
  <div class="header-contatos">${esc(contatosLinha)}</div>

  <div class="secao-titulo">Resumo</div>
  <p class="resumo">${esc(dados.resumo)}</p>

  <div class="secao-titulo">Habilidades</div>
  ${habilidadesHtml}
  <div class="skill-linha"><span class="skill-cat">Idiomas:</span> ${dados.idiomas.map(i => `${esc(i.idioma)} (${esc(i.nivel)})`).join(' · ')}</div>

  <div class="secao-titulo">Experiência Freelance</div>
  ${clientWorkHtml}

  <div class="secao-titulo">Projetos Próprios</div>
  ${projetosHtml}

  <div class="secao-titulo">Formação</div>
  <div class="entrada" style="break-inside: avoid">
    <div class="formacao-inst">${esc(dados.formacao.instituicao)}</div>
    <div class="formacao-detalhe">${esc(dados.formacao.curso)} · ${esc(dados.formacao.periodo)}</div>
    <div class="formacao-proximo">${esc(dados.formacao.proximo)}</div>
  </div>

</body>
</html>`
}
