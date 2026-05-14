// Analytics — dashboard-style layout
(function(){
  const root = document.getElementById('analytics-grid');
  if (!root) return;

  // Chart: Jan–Dez, 3 teams
  const teams = [
    { label: 'ADS 2025.1 · Turma A', color: '#FF6A1A', dashed: false,
      data: [50, 55, 60, 65, 68, 72, 76, 78, 75, 72, 68, 65] },
    { label: 'MKT 2025.2 · Turma B', color: '#2F6BFF', dashed: false,
      data: [48, 50, 52, 50, 55, 58, 60, 62, 64, 62, 58, 56] },
    { label: 'SI 2025.2 · Turma A',  color: '#9A9AA0', dashed: true,
      data: [45, 42, 46, 48, 50, 48, 46, 44, 42, 40, 38, 36] },
  ];

  const W = 520, H = 160, padL = 30, padR = 12, padT = 10, padB = 26;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  const xAt = i => padL + (i / (months.length - 1)) * innerW;
  const yAt = v => padT + (1 - (v - 20) / 80) * innerH;

  const gridLines = [30, 50, 70, 90].map(v =>
    `<line x1="${padL}" x2="${W-padR}" y1="${yAt(v).toFixed(1)}" y2="${yAt(v).toFixed(1)}"/>`
  ).join('');

  const yLabels = [30, 50, 70, 90].map(v =>
    `<text x="${padL-4}" y="${(yAt(v)+3).toFixed(1)}" text-anchor="end">${v}</text>`
  ).join('');

  const chartPaths = teams.map(t => {
    const d = t.data.map((v,i) => (i===0?'M':'L') + xAt(i).toFixed(1)+' '+yAt(v).toFixed(1)).join(' ');
    return `<path d="${d}" fill="none" stroke="${t.color}" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round"
      ${t.dashed ? 'stroke-dasharray="5 4"' : ''}/>`;
  }).join('');

  const endDots = teams.map(t =>
    `<circle cx="${xAt(11).toFixed(1)}" cy="${yAt(t.data[11]).toFixed(1)}" r="3" fill="${t.color}"/>`
  ).join('');

  const mainDots = teams[0].data.map((v,i) =>
    `<circle cx="${xAt(i).toFixed(1)}" cy="${yAt(v).toFixed(1)}" r="2.5" fill="#FF6A1A"/>`
  ).join('');

  const xLabels = months.map((m,i) =>
    `<text x="${xAt(i).toFixed(1)}" y="${H-6}" text-anchor="middle">${m}</text>`
  ).join('');

  // Program cards
  const programs = [
    { name: 'Programação Avançada', pulso: 78, ritmo: 80, taxa: 63, historias: 3 },
    { name: 'Agentes da IA',        pulso: 70, ritmo: 80, taxa: 63, historias: 3 },
    { name: 'Marketing III',        pulso: 78, ritmo: 85, taxa: 63, historias: 3 },
  ];

  const avatarColors = [
    { bg: '#FFE3D1', fg: '#FF6A1A' },
    { bg: '#DBE6FF', fg: '#2F6BFF' },
    { bg: '#DCFCE7', fg: '#22C55E' },
  ];
  const avatarLetters = ['João','Carlos','Ana'];

  const progCards = programs.map(p => `
    <div class="anl-prog-card card lift">
      <div class="anl-prog-head">
        <span class="anl-prog-name">${p.name}</span>
        <span class="anl-badge-ativo">Ativo</span>
      </div>
      <div class="anl-alert-banner">
        <svg style="width:13px;height:13px;flex-shrink:0" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        <span>Alerta do Programa: Participação em queda nas duas últimas semanas.</span>
      </div>
      <div class="anl-metrics">
        <div class="anl-metric-row">
          <span class="anl-metric-lbl">Pulso médio</span>
          <span class="anl-metric-val">${p.pulso} %</span>
        </div>
        <div class="anl-bar-track"><div class="anl-bar-fill" style="width:${p.pulso}%;background:#FF6A1A"></div></div>
        <div class="anl-metric-row mt-6">
          <span class="anl-metric-lbl">Ritmo médio</span>
          <span class="anl-metric-val">${p.ritmo} %</span>
        </div>
        <div class="anl-bar-track"><div class="anl-bar-fill" style="width:${p.ritmo}%;background:#FF6A1A"></div></div>
        <div class="anl-metric-row mt-6">
          <span class="anl-metric-lbl">Taxa de lei</span>
          <span class="anl-metric-val">${p.taxa} %</span>
        </div>
        <div class="anl-bar-track"><div class="anl-bar-fill" style="width:${p.taxa}%;background:#2F6BFF"></div></div>
      </div>
      <div class="anl-hist-block">
        <div class="anl-hist-lbl">Histórias que precisam de um novo capítulo</div>
        <div class="anl-hist-num">${p.historias} <span class="anl-hist-total">/ 40</span></div>
        <div class="anl-hist-sub">Faltas e não responder.</div>
        <div class="anl-hist-foot">
          <div class="anl-avatars">
            ${avatarLetters.map((name, i) => `
              <span class="anl-av" style="background:${avatarColors[i].bg};color:${avatarColors[i].fg}"
                title="${name}">${name[0]}</span>
            `).join('')}
          </div>
          <a href="#" class="anl-explorar">Explorar Jornada</a>
        </div>
      </div>
    </div>
  `).join('');

  // Saúde da Jornada
  const saude = [
    { label: 'Pulso',    sub: 'A intensidade da interação',    val: '7,5/10', pct: 75, color: '#FF6A1A' },
    { label: 'Ritmo',    sub: 'A constância no trajeto',       val: '88%',    pct: 88, color: '#FF6A1A' },
    { label: 'Evolução', sub: 'O progresso real conquistado',  val: '6,0/10', pct: 60, color: '#2F6BFF' },
    { label: 'Sintonia', sub: 'A conexão com o mentor',        val: '7,2/10', pct: 72, color: '#2F6BFF' },
  ];

  const saudeItems = saude.map(s => `
    <div class="anl-saude-item">
      <div class="anl-saude-top">
        <div>
          <div class="anl-saude-name">${s.label}</div>
          <div class="anl-saude-sub">${s.sub}</div>
        </div>
        <span class="anl-saude-val" style="color:${s.color}">${s.val}</span>
      </div>
      <div class="anl-bar-track" style="margin-top:7px">
        <div class="anl-bar-fill" style="width:${s.pct}%;background:${s.color}"></div>
      </div>
    </div>
  `).join('');

  const legend = teams.map(t => `
    <span class="anl-leg-item">
      <span class="anl-leg-line" style="background:${t.color};${t.dashed
        ? `background:repeating-linear-gradient(90deg,${t.color} 0,${t.color} 5px,transparent 5px,transparent 9px)`
        : ''}"></span>
      ${t.label}
    </span>
  `).join('');

  root.innerHTML = `
    <!-- Program cards -->
    <div class="anl-programs-row">
      ${progCards}
    </div>

    <!-- Chart + Saúde -->
    <div class="anl-main-row">
      <div class="card anl-chart-card">
        <div class="anl-chart-head">
          <span class="anl-chart-title">Pulso dos programas</span>
          <span class="anl-date-range">
            <svg style="width:13px;height:13px;stroke:currentColor;fill:none;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            04/05/2025 – 20/06/2025
          </span>
        </div>
        <svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;margin-top:14px">
          <g stroke="#ECECEA" stroke-width=".6">${gridLines}</g>
          <g font-size="9" fill="#9A9AA0">${yLabels}</g>
          ${chartPaths}
          ${endDots}
          ${mainDots}
          <g font-size="9" fill="#9A9AA0">${xLabels}</g>
        </svg>
        <div class="anl-legend">${legend}</div>
      </div>

      <div class="card anl-saude-card">
        <div class="anl-saude-title">Saúde da Jornada</div>
        <div class="anl-saude-subtitle">Pontuação de Saúde · Média da Turma</div>
        <div class="anl-saude-list">${saudeItems}</div>
      </div>
    </div>
  `;
})();
