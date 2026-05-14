// Soft Skills section: gauge card + radar chart + table
(function(){
  const root = document.getElementById('softskills-grid');
  if (!root) return;

  // 8 axes
  const skills = [
    ['Protagonismo', 92, '+12%'],
    ['Comunicação', 76, '+9%'],
    ['Organização', 81, '+10%'],
    ['Liderança', 70, '+6%'],
    ['Inteligência emocional', 84, '+14%'],
    ['Adaptabilidade', 75, '+7%'],
    ['Disciplina', 79, '+9%'],
    ['Colaboração', 77, '+11%'],
  ];

  // radar coordinates
  const cx = 150, cy = 150, R = 110;
  const n = skills.length;
  const angle = i => (i * 2 * Math.PI / n) - Math.PI/2;
  const pt = (i, v) => {
    const r = (v/100) * R;
    return [cx + r * Math.cos(angle(i)), cy + r * Math.sin(angle(i))];
  };
  const polygon = skills.map(([_, v], i) => pt(i, v).join(',')).join(' ');
  const axisLines = skills.map((_, i) => {
    const [x,y] = pt(i, 100);
    return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="#ECECEA" stroke-width=".8"/>`;
  }).join('');
  const rings = [25, 50, 75, 100].map(p => {
    const ring = skills.map((_, i) => pt(i, p).join(',')).join(' ');
    return `<polygon points="${ring}" fill="none" stroke="#ECECEA" stroke-width=".7"/>`;
  }).join('');
  const dots = skills.map(([_, v], i) => {
    const [x,y] = pt(i, v);
    return `<circle cx="${x}" cy="${y}" r="3.5" fill="#FF6A1A" stroke="white" stroke-width="1.5"/>`;
  }).join('');
  // labels
  const labels = skills.map(([name, v], i) => {
    const [lx, ly] = pt(i, 122);
    const anchor = Math.abs(lx - cx) < 8 ? 'middle' : (lx > cx ? 'start' : 'end');
    return `
      <text x="${lx}" y="${ly}" text-anchor="${anchor}" font-size="11" font-weight="600" fill="#0E0E10" dominant-baseline="middle">${name}</text>
      <text x="${lx}" y="${ly + 13}" text-anchor="${anchor}" font-size="10" fill="#6B6B70">${v}</text>
    `;
  }).join('');

  // gauge (score 78)
  const score = 78;
  const arcLen = 2 * Math.PI * 60;
  const fillLen = (score/100) * arcLen;

  root.innerHTML = `
    <!-- Gauge card -->
    <div class="card score-card">
      <div style="font-size:13px;color:var(--ink-3);font-weight:600">Score Comportamental Geral</div>
      <div style="position:relative;width:170px;height:170px">
        <svg viewBox="0 0 140 140" width="170" height="170">
          <circle cx="70" cy="70" r="60" fill="none" stroke="#F4F4F1" stroke-width="14"/>
          <circle cx="70" cy="70" r="60" fill="none" stroke="#FF6A1A" stroke-width="14"
                  stroke-linecap="round"
                  stroke-dasharray="${fillLen} ${arcLen}"
                  transform="rotate(-90 70 70)"/>
        </svg>
        <div style="position:absolute;inset:0;display:grid;place-items:center;flex-direction:column">
          <div style="text-align:center">
            <div style="font-size:44px;font-weight:700;color:var(--ink);line-height:1;letter-spacing:-.02em">${score}</div>
            <div style="font-size:12px;color:var(--ink-3);margin-top:6px;font-weight:500">Muito bom</div>
          </div>
        </div>
      </div>
      <div class="delta delta--up" style="font-size:13px"><svg class="btn-icon"><use href="#i-arrow-up"/></svg> +11% vs mês anterior</div>
    </div>

    <!-- Radar -->
    <div class="card" style="padding:24px;display:flex;flex-direction:column">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
        <div style="font-size:14px;font-weight:700;color:var(--ink)">Evolução das Soft Skills</div>
        <div style="display:flex;gap:10px;font-size:11px">
          <span style="display:flex;align-items:center;gap:4px;color:var(--ink-3)"><span style="width:8px;height:8px;border-radius:50%;background:#22C55E"></span>Baixo</span>
          <span style="display:flex;align-items:center;gap:4px;color:var(--ink-3)"><span style="width:8px;height:8px;border-radius:50%;background:#FF6A1A"></span>Médio</span>
          <span style="display:flex;align-items:center;gap:4px;color:var(--ink-3)"><span style="width:8px;height:8px;border-radius:50%;background:#2F6BFF"></span>Alto</span>
        </div>
      </div>
      <div style="flex:1;display:grid;place-items:center;margin-top:8px">
        <svg viewBox="0 0 300 300" style="width:100%;max-width:340px;height:auto">
          ${rings}
          ${axisLines}
          <polygon points="${polygon}" fill="#FF6A1A" fill-opacity=".12" stroke="#FF6A1A" stroke-width="2" stroke-linejoin="round"/>
          ${dots}
          <circle cx="${cx}" cy="${cy}" r="28" fill="white" stroke="#ECECEA"/>
          <text x="${cx}" y="${cy - 2}" text-anchor="middle" font-size="22" font-weight="700" fill="#0E0E10">78</text>
          <text x="${cx}" y="${cy + 12}" text-anchor="middle" font-size="9" fill="#6B6B70">Score médio</text>
          ${labels}
        </svg>
      </div>
    </div>

    <!-- Table -->
    <div class="card" style="padding:18px 20px">
      <div style="font-size:13px;color:var(--ink-3);font-weight:600;margin-bottom:6px">Soft Skills</div>
      <table class="softskills-table">
        <thead>
          <tr><th>Soft skill</th><th>Score</th><th>Evolução</th></tr>
        </thead>
        <tbody>
          ${skills.map(([name, score, evo]) => `
            <tr>
              <td style="font-weight:500">${name}</td>
              <td style="font-weight:700">${score}</td>
              <td><span class="evo"><svg class="btn-icon"><use href="#i-arrow-up"/></svg>${evo}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
})();
