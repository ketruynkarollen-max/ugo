// Hero visual: dashboard + astronaut (slim, editorial layout)
(function(){
  const root = document.getElementById('hero-visual');
  if (!root) return;

  root.innerHTML = `
    <div class="hv-stage">

      <!-- decorative dots -->
      <span class="hv-dot" style="top:6%;right:6%"></span>
      <span class="hv-dot" style="top:42%;right:-2%;background:var(--brand-2)"></span>
      <span class="hv-dot" style="bottom:8%;left:6%"></span>

      <!-- DESKTOP DASHBOARD -->
      <div class="hv-desktop card">
        <aside class="hv-side">
          <div class="hv-logo">U<span style="color:var(--brand)">.</span>go</div>
          <div class="hv-side-list">
            <div class="hv-side-item active"><span class="dot"></span> Visão Geral</div>
            <div class="hv-side-item">Times</div>
            <div class="hv-side-item">Pessoas</div>
            <a href="#analytics" class="hv-side-item hv-side-item--link">Analytics</a>
            <div class="hv-side-item">Comunidade</div>
            <div class="hv-side-item">Desafios</div>
            <div class="hv-side-item">Relatórios</div>
            <div class="hv-side-item">Configurações</div>
          </div>
        </aside>
        <main class="hv-main">
          <div class="hv-main-head">
            <div>
              <div class="muted-2" style="font-size:10.5px;font-weight:500">Empresa · Acme Tech</div>
              <div style="font-size:15px;font-weight:700;color:var(--ink);margin-top:2px">Visão Geral da Empresa</div>
            </div>
            <div class="row gap-2">
              <span class="hv-chip">Hoje</span>
              <span class="hv-chip">▾ Período</span>
              <div class="hv-avatar"></div>
            </div>
          </div>

          <!-- KPIs -->
          <div class="hv-kpis">
            <div class="hv-kpi">
              <div class="hv-kpi-label">Engajamento médio</div>
              <div class="hv-kpi-value hv-kpi-value--brand">82%</div>
              <div class="hv-kpi-delta">↑ +12% vs mês anterior</div>
            </div>
            <div class="hv-kpi">
              <div class="hv-kpi-label">Constância</div>
              <div class="hv-kpi-value">76%</div>
              <div class="hv-kpi-delta">↑ +9% vs mês anterior</div>
            </div>
            <div class="hv-kpi">
              <div class="hv-kpi-label">Colab. ativos</div>
              <div class="hv-kpi-value">1.842</div>
              <div class="hv-kpi-delta">↑ +112 esse mês</div>
            </div>
            <div class="hv-kpi">
              <div class="hv-kpi-label">Risco de turnover</div>
              <div class="hv-kpi-value">8%</div>
              <div class="hv-kpi-delta">↓ −3% vs mês anterior</div>
            </div>
          </div>

          <!-- charts row -->
          <div class="hv-charts">
            <div class="hv-chart">
              <div class="hv-chart-head">
                <span style="font-size:11px;color:var(--ink);font-weight:600">Evolução de Engajamento</span>
                <span class="hv-pill-mini">87% pico</span>
              </div>
              <svg viewBox="0 0 240 84" preserveAspectRatio="none" style="width:100%;height:84px;margin-top:6px">
                <defs>
                  <linearGradient id="hv-area" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stop-color="#E45A12" stop-opacity=".22"/>
                    <stop offset="1" stop-color="#E45A12" stop-opacity="0"/>
                  </linearGradient>
                </defs>
                <g stroke="#ECECEA" stroke-width=".5">
                  <line x1="0" x2="240" y1="20" y2="20"/>
                  <line x1="0" x2="240" y1="42" y2="42"/>
                  <line x1="0" x2="240" y1="64" y2="64"/>
                </g>
                <path d="M0 62 L24 56 L48 60 L72 48 L96 52 L120 38 L144 30 L168 22 L192 28 L216 24 L240 30"
                      fill="none" stroke="#E45A12" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M0 62 L24 56 L48 60 L72 48 L96 52 L120 38 L144 30 L168 22 L192 28 L216 24 L240 30 L240 84 L0 84 Z"
                      fill="url(#hv-area)"/>
                <circle cx="168" cy="22" r="3" fill="#fff" stroke="#E45A12" stroke-width="1.8"/>
              </svg>
              <div class="hv-x-labels"><span>Jan</span><span>Fev</span><span>Mar</span><span>Abr</span><span>Mai</span><span>Jun</span></div>
            </div>
            <div class="hv-chart">
              <div class="hv-chart-head">
                <span style="font-size:11px;color:var(--ink);font-weight:600">Engajamento por Time</span>
              </div>
              <div style="display:flex;gap:14px;align-items:center;margin-top:8px">
                <svg viewBox="0 0 60 60" style="width:80px;height:80px;flex-shrink:0">
                  <circle cx="30" cy="30" r="22" fill="none" stroke="#F4F4F1" stroke-width="10"/>
                  <circle cx="30" cy="30" r="22" fill="none" stroke="#0E0E10" stroke-width="10"
                          stroke-dasharray="76 62" stroke-dashoffset="0" transform="rotate(-90 30 30)" stroke-linecap="butt"/>
                  <circle cx="30" cy="30" r="22" fill="none" stroke="#E45A12" stroke-width="10"
                          stroke-dasharray="41 97" stroke-dashoffset="-76" transform="rotate(-90 30 30)"/>
                  <circle cx="30" cy="30" r="22" fill="none" stroke="#D6D6D2" stroke-width="10"
                          stroke-dasharray="21 117" stroke-dashoffset="-117" transform="rotate(-90 30 30)"/>
                  <text x="30" y="33" text-anchor="middle" font-size="11" font-weight="700" fill="#0E0E10">73%</text>
                </svg>
                <div style="display:flex;flex-direction:column;gap:6px;font-size:10.5px">
                  <div class="row gap-2"><span class="hv-legend" style="background:#0E0E10"></span> Alto · 55%</div>
                  <div class="row gap-2"><span class="hv-legend" style="background:#E45A12"></span> Médio · 30%</div>
                  <div class="row gap-2"><span class="hv-legend" style="background:#D6D6D2"></span> Baixo · 15%</div>
                </div>
              </div>
            </div>
          </div>

          <!-- risco list -->
          <div class="hv-risco">
            <div class="hv-chart-head" style="padding:0">
              <span style="font-size:11px;color:var(--ink);font-weight:600">Colaboradores em Risco</span>
              <a href="#" style="font-size:10.5px;color:var(--brand);font-weight:600">Ver todos →</a>
            </div>
            <div class="hv-risco-row">
              <span class="hv-av" style="background:#F5DCC8;color:#E45A12">MS</span>
              <div class="flex-1">
                <div style="font-size:11.5px;font-weight:600;color:var(--ink)">Mariana S.</div>
                <div style="font-size:10px;color:var(--ink-3)">Engajamento −45%</div>
              </div>
              <span class="hv-tag-danger">Risco alto</span>
            </div>
            <div class="hv-risco-row">
              <span class="hv-av" style="background:#EAEAE6;color:#2B2B2E">JV</span>
              <div class="flex-1">
                <div style="font-size:11.5px;font-weight:600;color:var(--ink)">João V.</div>
                <div style="font-size:10px;color:var(--ink-3)">Constância baixa há 2 semanas</div>
              </div>
              <span class="hv-tag-warn">Atenção</span>
            </div>
            <div class="hv-risco-row">
              <span class="hv-av" style="background:#EAEAE6;color:#2B2B2E">BA</span>
              <div class="flex-1">
                <div style="font-size:11.5px;font-weight:600;color:var(--ink)">Beatriz A.</div>
                <div style="font-size:10px;color:var(--ink-3)">Baixa participação</div>
              </div>
              <span class="hv-tag-warn">Atenção</span>
            </div>
          </div>
        </main>
      </div>


    </div>
  `;

  function astronautSVG(){
    return `
    <svg viewBox="0 0 260 320" width="100%" height="100%" style="display:block" aria-label="Mascote U.GO astronauta">
      <defs>
        <linearGradient id="suit" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stop-color="#FFFFFF"/>
          <stop offset="1" stop-color="#E8E9EE"/>
        </linearGradient>
        <linearGradient id="visor" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stop-color="#3B3F47"/>
          <stop offset="1" stop-color="#0F1115"/>
        </linearGradient>
        <radialGradient id="visorGlow" cx=".35" cy=".3" r=".5">
          <stop offset="0" stop-color="#FF8A4C" stop-opacity=".85"/>
          <stop offset=".4" stop-color="#E45A12" stop-opacity=".4"/>
          <stop offset="1" stop-color="#E45A12" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <ellipse cx="130" cy="298" rx="80" ry="8" fill="#0F1115" opacity=".08"/>

      <!-- legs sitting -->
      <path d="M82 250 q-6 30 12 42 l36 0 q4 -10 -2 -16 l-18 -8 q-6 -2 -8 -10 l-4 -16z" fill="url(#suit)" stroke="#C8CAD2" stroke-width="1.5"/>
      <path d="M178 250 q6 30 -12 42 l-36 0 q-4 -10 2 -16 l18 -8 q6 -2 8 -10 l4 -16z" fill="url(#suit)" stroke="#C8CAD2" stroke-width="1.5"/>
      <ellipse cx="118" cy="294" rx="22" ry="7" fill="#1F2227"/>
      <ellipse cx="142" cy="294" rx="22" ry="7" fill="#1F2227"/>

      <!-- torso -->
      <path d="M70 178 q0 -28 30 -36 l60 0 q30 8 30 36 l0 60 q0 14 -14 18 l-92 0 q-14 -4 -14 -18z" fill="url(#suit)" stroke="#C8CAD2" stroke-width="1.5"/>

      <!-- chest panel -->
      <rect x="106" y="200" width="48" height="34" rx="8" fill="#0F1115"/>
      <text x="130" y="222" text-anchor="middle" fill="white" font-size="13" font-weight="700" font-family="Inter, sans-serif">U<tspan fill="#E45A12">.</tspan>go</text>

      <!-- left arm resting -->
      <path d="M72 192 q-22 8 -26 36 q-2 12 8 18 l24 4 q10 -2 8 -16 l-4 -24 q-2 -16 -10 -18z" fill="url(#suit)" stroke="#C8CAD2" stroke-width="1.5"/>
      <circle cx="62" cy="246" r="12" fill="#1F2227"/>

      <!-- right arm waving -->
      <path d="M188 184 q26 -10 44 -34 q8 -10 -2 -20 q-10 -8 -22 0 l-22 24 q-12 12 -8 22z" fill="url(#suit)" stroke="#C8CAD2" stroke-width="1.5"/>
      <circle cx="220" cy="124" r="14" fill="#1F2227"/>
      <circle cx="216" cy="120" r="3" fill="white" opacity=".5"/>

      <!-- helmet -->
      <circle cx="130" cy="118" r="62" fill="white" stroke="#C8CAD2" stroke-width="2"/>
      <circle cx="130" cy="118" r="56" fill="#1A1D22"/>
      <ellipse cx="130" cy="118" rx="48" ry="44" fill="url(#visor)"/>
      <ellipse cx="130" cy="118" rx="48" ry="44" fill="url(#visorGlow)"/>
      <ellipse cx="108" cy="98" rx="22" ry="14" fill="white" opacity=".18" transform="rotate(-20 108 98)"/>
      <ellipse cx="116" cy="92" rx="6" ry="3" fill="white" opacity=".55" transform="rotate(-20 116 92)"/>
      <text x="130" y="124" text-anchor="middle" fill="#FF8A4C" font-size="16" font-weight="700" font-family="Inter, sans-serif" opacity=".75">U<tspan fill="white" opacity=".9">.</tspan>go</text>

      <circle cx="130" cy="118" r="62" fill="none" stroke="white" stroke-width="2"/>
      <circle cx="78" cy="118" r="4" fill="#E45A12"/>
      <circle cx="182" cy="118" r="4" fill="#C8CAD2"/>

      <circle cx="232" cy="76" r="3" fill="#E45A12"/>
      <circle cx="44" cy="172" r="3" fill="#FF8A4C"/>
    </svg>`;
  }
})();
