// Comunidade e Gamificação — 4 mockups em imagem
(function () {
  const root = document.getElementById('comunidade-grid');
  if (!root) return;

  root.classList.add('comunidade-grid--images');
  const imgs = [
    { src: '2%20%281%29.png', alt: 'U.GO — mockup 1' },
    { src: '2%20%282%29.png', alt: 'U.GO — mockup 2' },
    { src: '2%20%283%29.png', alt: 'U.GO — mockup 3' },
    { src: '2%20%284%29.png', alt: 'U.GO — mockup 4' },
    { src: '2%20%285%29.png', alt: 'U.GO — mockup 5' },
  ];

  root.innerHTML = imgs
    .map(
      ({ src, alt }) => `
    <figure class="com-mock">
      <img src="${src}" alt="${alt}" loading="lazy" decoding="async" width="431" height="911">
    </figure>`
    )
    .join('');
})();
