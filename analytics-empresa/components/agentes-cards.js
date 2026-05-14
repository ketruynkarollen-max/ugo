// Agentes de IA — 4 imagens (sem moldura; proporção original preservada)
(function () {
  const root = document.getElementById('agentes-cards');
  if (!root) return;

  const files = [
    'ChatGPT Image 14 de mai. de 2026, 17_40_42 (1).png',
    'ChatGPT Image 14 de mai. de 2026, 17_40_43 (2).png',
    'ChatGPT Image 14 de mai. de 2026, 17_40_43 (3).png',
    'ChatGPT Image 14 de mai. de 2026, 17_40_44 (4).png',
  ];

  const alts = [
    'Agente de Engajamento — conversa com HUGO',
    'Agente de Bem-estar — conversa com HUGO',
    'Agente de Constância — conversa com HUGO',
    'Agente de Clareza e Futuro — conversa com HUGO',
  ];

  root.classList.add('agentes-cards--images');
  root.innerHTML = files
    .map(
      (name, i) => `
    <figure class="agente-img-wrap">
      <img src="${encodeURIComponent(name)}" alt="${alts[i]}" loading="lazy" decoding="async">
    </figure>`
    )
    .join('');
})();
