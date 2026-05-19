// CTA Final visual — astronaut + translucent dashboards
(function(){
  const root = document.getElementById('cta-visual');
  if (!root) return;

  root.innerHTML = `
    <div class="cta-stage">
      <!-- back dashboard glow -->
      <div class="cta-dash cta-dash--lg">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
          <div>
            <div style="font-size:9px;color:rgba(255,255,255,.55);font-weight:600;letter-spacing:.08em;text-transform:uppercase">Painel Executivo</div>
            <div style="font-size:13px;font-weight:700;color:white;margin-top:2px">Saúde Comportamental · 2026</div>
          </div>
          <div style="font-size:11px;color:#FF8A4C;font-weight:700">82% ↑</div>
        </div>
        <!-- mini area chart -->
        <svg viewBox="0 0 240 60" preserveAspectRatio="none" style="width:100%;height:60px">
          <defs>
            <linearGradient id="cta-area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stop-color="#FF6A1A" stop-opacity=".4"/>
              <stop offset="1" stop-color="#FF6A1A" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <path d="M0 44 L24 38 L48 42 L72 32 L96 36 L120 24 L144 16 L168 20 L192 12 L216 18 L240 8 L240 60 L0 60 Z"
                fill="url(#cta-area)"/>
          <path d="M0 44 L24 38 L48 42 L72 32 L96 36 L120 24 L144 16 L168 20 L192 12 L216 18 L240 8"
                fill="none" stroke="#FF6A1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div style="display:flex;justify-content:space-between;font-size:9px;color:rgba(255,255,255,.4);margin-top:4px">
          <span>Jan</span><span>Mar</span><span>Mai</span><span>Jul</span><span>Set</span><span>Nov</span>
        </div>
      </div>

      <!-- radar mini -->
      <div class="cta-dash cta-dash--radar">
        <div style="font-size:9px;color:rgba(255,255,255,.55);font-weight:600;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px">Soft skills</div>
        <svg viewBox="0 0 100 100" style="width:100%;height:auto;max-width:100px">
          ${[20,40,60,80].map(r => {
            const pts = Array.from({length:6}).map((_,i) => {
              const a = (i*Math.PI*2/6) - Math.PI/2;
              return (50 + r/2 * Math.cos(a)) + ',' + (50 + r/2 * Math.sin(a));
            }).join(' ');
            return `<polygon points="${pts}" fill="none" stroke="rgba(255,255,255,.15)" stroke-width=".5"/>`;
          }).join('')}
          ${(() => {
            const vals = [76, 64, 82, 70, 78, 68];
            const pts = vals.map((v,i) => {
              const a = (i*Math.PI*2/6) - Math.PI/2;
              const r = v/2 * 0.9;
              return (50 + r * Math.cos(a)) + ',' + (50 + r * Math.sin(a));
            }).join(' ');
            return `<polygon points="${pts}" fill="rgba(255,106,26,.3)" stroke="#FF6A1A" stroke-width="1.4" stroke-linejoin="round"/>`;
          })()}
        </svg>
      </div>

      <!-- big % -->
      <div class="cta-dash cta-dash--kpi">
        <div style="font-size:9px;color:rgba(255,255,255,.55);font-weight:600;letter-spacing:.06em;text-transform:uppercase">Engajamento</div>
        <div style="font-size:34px;font-weight:700;color:#FF6A1A;line-height:1;margin-top:4px">82%</div>
        <div style="font-size:9.5px;color:rgba(255,255,255,.55);margin-top:6px">Dias de Segurança · 247</div>
      </div>

      <!-- astronaut -->
      <div class="cta-astronaut">
        <image-slot id="cta-astronaut"
                    placeholder="Mascote U.go visto de costas / lateral"
                    shape="rect"
                    style="width:100%;height:100%;background:transparent;border:none">
          ${astronautBack()}
        </image-slot>
      </div>
    </div>
  `;

  function astronautBack(){
    // Astronaut from behind/side, looking at dashboards
    return `
    <svg viewBox="0 0 220 280" width="100%" height="100%" style="display:block" aria-label="Mascote U.go astronauta">
      <defs>
        <linearGradient id="suit2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stop-color="#F6F7FB"/>
          <stop offset="1" stop-color="#C8CAD2"/>
        </linearGradient>
      </defs>
      <ellipse cx="110" cy="262" rx="70" ry="6" fill="#000" opacity=".25"/>

      <!-- legs -->
      <path d="M70 200 q-4 30 14 50 l28 0 q4 -10 -2 -16 l-12 -10 q-4 -2 -6 -10 l-8 -22z" fill="url(#suit2)" stroke="#9A9AA0" stroke-width="1.3"/>
      <path d="M150 200 q4 30 -14 50 l-28 0 q-4 -10 2 -16 l12 -10 q4 -2 6 -10 l8 -22z" fill="url(#suit2)" stroke="#9A9AA0" stroke-width="1.3"/>
      <ellipse cx="98" cy="252" rx="18" ry="6" fill="#0E0E10"/>
      <ellipse cx="122" cy="252" rx="18" ry="6" fill="#0E0E10"/>

      <!-- body, back view -->
      <path d="M60 140 q0 -22 22 -28 l56 0 q22 6 22 28 l0 64 q0 12 -12 16 l-76 0 q-12 -4 -12 -16z" fill="url(#suit2)" stroke="#9A9AA0" stroke-width="1.3"/>

      <!-- backpack -->
      <rect x="70" y="148" width="80" height="44" rx="8" fill="#1F2227"/>
      <rect x="76" y="158" width="10" height="24" rx="3" fill="#FF6A1A"/>
      <rect x="92" y="158" width="10" height="24" rx="3" fill="#FF8A4C" opacity=".5"/>
      <rect x="134" y="158" width="10" height="24" rx="3" fill="#22C55E"/>

      <!-- arms (slight) -->
      <path d="M58 144 q-14 18 -10 42 l16 4 q6 -2 4 -12 l-2 -22 q-2 -10 -8 -12z" fill="url(#suit2)" stroke="#9A9AA0" stroke-width="1.3"/>
      <path d="M162 144 q14 18 10 42 l-16 4 q-6 -2 -4 -12 l2 -22 q2 -10 8 -12z" fill="url(#suit2)" stroke="#9A9AA0" stroke-width="1.3"/>

      <!-- helmet back -->
      <circle cx="110" cy="90" r="54" fill="#F6F7FB" stroke="#9A9AA0" stroke-width="1.5"/>
      <circle cx="110" cy="90" r="48" fill="#1A1D22"/>
      <ellipse cx="110" cy="86" rx="36" ry="32" fill="#0F1115"/>
      <!-- reflection of dashboards on visor -->
      <ellipse cx="110" cy="86" rx="36" ry="32" fill="#FF6A1A" opacity=".18"/>
      <rect x="92" y="74" width="12" height="6" rx="1" fill="#FF8A4C" opacity=".6"/>
      <rect x="108" y="80" width="20" height="3" rx="1" fill="#FF8A4C" opacity=".5"/>
      <rect x="92" y="90" width="16" height="3" rx="1" fill="white" opacity=".4"/>
      <!-- antenna -->
      <circle cx="148" cy="64" r="4" fill="#FF6A1A"/>
      <path d="M148 64 L142 78" stroke="#9A9AA0" stroke-width="1.5"/>
    </svg>`;
  }
})();
