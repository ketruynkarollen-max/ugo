// Right column of "O Problema" — risk analysis, heatmap, bar chart
(function(){
  const root = document.getElementById('risco-panel');
  if (!root) return;

  const teams = ['COM 1','OPS 1','FIN 1','RH 1','TI 1','JUR 1'];
  const rows = ['Q1','Q2','Q3','Q4','Q5'];

  // heat values: 0 = green, 1 = warm, 2 = warn, 3 = danger
  const heatData = [
    [0,1,0,3,1,0],
    [1,3,2,0,2,1],
    [3,1,1,2,3,2],
    [0,2,3,1,0,3],
    [1,0,2,3,1,2],
  ];
  const heatColor = ['#DCFCE7','#FED7AA','#FECDD3','#FCA5A5'];

  let heatHTML = '';
  heatHTML += `<div class="heat-cell-row" style="display:grid;grid-template-columns:56px repeat(6,1fr);gap:6px;margin-bottom:6px">
    <div></div>
    ${teams.map(t => `<div class="heat-col">${t}</div>`).join('')}
  </div>`;
  rows.forEach((r, ri) => {
    heatHTML += `<div class="heat-cell-row" style="display:grid;grid-template-columns:56px repeat(6,1fr);gap:6px;margin-bottom:6px">
      <div class="heat-label">${r}</div>
      ${heatData[ri].map(v => `<div class="heat-cell" style="background:${heatColor[v]}"></div>`).join('')}
    </div>`;
  });

  root.innerHTML = `
    <div class="risco-stack">

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <!-- analise risco turnover -->
        <div class="card" style="padding:20px">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:18px">
            <div>
              <div style="font-size:10.5px;color:var(--ink-3);font-weight:600;letter-spacing:.06em;text-transform:uppercase">Análise</div>
              <div style="font-size:14px;font-weight:700;color:var(--ink);margin-top:2px">Risco de Turnover</div>
            </div>
            <svg class="icon icon--ink3" style="width:16px;height:16px"><use href="#i-bars"/></svg>
          </div>

          <div class="risco-band">
            <span class="risco-dot" style="background:var(--danger)"></span>
            <span class="risco-label">Colaboradores em risco alto</span>
            <span class="risco-count">32</span>
          </div>
          <div class="risco-band">
            <span class="risco-dot" style="background:var(--warn)"></span>
            <span class="risco-label">Risco médio</span>
            <span class="risco-count">57</span>
          </div>
          <div class="risco-band">
            <span class="risco-dot" style="background:var(--success)"></span>
            <span class="risco-label">Risco baixo</span>
            <span class="risco-count">128</span>
          </div>
        </div>

        <!-- heatmap por time -->
        <div class="card" style="padding:20px">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:18px">
            <div>
              <div style="font-size:10.5px;color:var(--ink-3);font-weight:600;letter-spacing:.06em;text-transform:uppercase">Mapa</div>
              <div style="font-size:14px;font-weight:700;color:var(--ink);margin-top:2px">Risco por Time</div>
            </div>
            <div style="display:flex;align-items:center;gap:8px">
              <span style="display:flex;align-items:center;gap:4px;font-size:9.5px;color:var(--ink-3)"><span style="width:8px;height:8px;background:#DCFCE7;border-radius:2px"></span>Baixo</span>
              <span style="display:flex;align-items:center;gap:4px;font-size:9.5px;color:var(--ink-3)"><span style="width:8px;height:8px;background:#FCA5A5;border-radius:2px"></span>Alto</span>
            </div>
          </div>
          <div class="heatmap-wrap">
            ${heatHTML}
          </div>
        </div>
      </div>

      <!-- principais fatores -->
      <div class="card" style="padding:24px">
        <div style="font-size:13px;font-weight:700;color:var(--ink)">Principais fatores que antecedem o disengagement</div>
        <div class="mt-4">
          ${[
            ['Queda de engajamento', 72],
            ['Baixa constância', 65],
            ['Falta de propósito', 48],
            ['Participação reduzida', 42],
          ].map(([label, pct]) => `
            <div class="bar-row">
              <div class="bar-label">${label}</div>
              <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
              <div class="bar-pct">${pct}%</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
})();
