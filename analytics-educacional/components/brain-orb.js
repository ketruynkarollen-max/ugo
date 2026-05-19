// Orbital brain illustration for the Agentes section
(function(){
  const root = document.getElementById('brain-orb');
  if (!root) return;
  root.innerHTML = `
    <svg viewBox="0 0 240 240" width="100%" height="auto" style="max-width:240px" aria-hidden="true">
      <defs>
        <radialGradient id="orb-glow" cx=".5" cy=".5" r=".6">
          <stop offset="0" stop-color="#FFE3D1" stop-opacity=".8"/>
          <stop offset="1" stop-color="#FFE3D1" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="120" cy="120" r="100" fill="url(#orb-glow)"/>
      <!-- orbit rings -->
      <ellipse cx="120" cy="120" rx="92" ry="32" fill="none" stroke="#FF6A1A" stroke-width="1.4" stroke-dasharray="4 6" opacity=".7" transform="rotate(-18 120 120)"/>
      <ellipse cx="120" cy="120" rx="100" ry="42" fill="none" stroke="#FF6A1A" stroke-width="1.4" opacity=".4" transform="rotate(18 120 120)"/>
      <!-- brain -->
      <g transform="translate(72 70)">
        <path d="M30 14 q-8 -10 -20 -4 q-14 6 -8 22 q-10 4 -6 18 q-2 12 10 16 q-4 14 10 18 q12 6 22 -2 l0 -68 q-4 -6 -8 0z"
              fill="#FFFFFF" stroke="#FF6A1A" stroke-width="2" stroke-linejoin="round"/>
        <path d="M62 14 q8 -10 20 -4 q14 6 8 22 q10 4 6 18 q2 12 -10 16 q4 14 -10 18 q-12 6 -22 -2 l0 -68 q4 -6 8 0z"
              fill="#FFFFFF" stroke="#FF6A1A" stroke-width="2" stroke-linejoin="round"/>
        <path d="M30 30 q14 0 16 12 M62 30 q-14 0 -16 12 M28 54 q14 4 18 -2 M64 54 q-14 4 -18 -2 M46 14 v68"
              fill="none" stroke="#FF6A1A" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>
      </g>
      <!-- floating dots -->
      <circle cx="40" cy="72" r="5" fill="#FF6A1A"/>
      <circle cx="208" cy="74" r="4" fill="#FF8A4C"/>
      <circle cx="32" cy="180" r="4" fill="#FF8A4C"/>
      <circle cx="210" cy="190" r="6" fill="#FF6A1A"/>
      <circle cx="120" cy="220" r="3" fill="#FF6A1A"/>
      <!-- connector lines -->
      <path d="M40 72 q40 12 56 26" fill="none" stroke="#FFE3D1" stroke-width="2"/>
      <path d="M208 74 q-40 12 -52 26" fill="none" stroke="#FFE3D1" stroke-width="2"/>
      <path d="M210 190 q-30 -10 -42 -20" fill="none" stroke="#FFE3D1" stroke-width="2"/>
    </svg>
  `;
})();
