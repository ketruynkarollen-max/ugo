(function () {
  const CAT_LABELS = {
    habitos: 'Hábitos',
    produtividade: 'Produtividade',
    'soft-skills': 'Soft Skills',
    gestao: 'Gestão de Tempo',
    ia: 'IA & Tecnologia',
    comunidade: 'Comunidade',
  };

  function esc(s) {
    return String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function postImageSrc(p) {
    return (window.UgoPostsSource && window.UgoPostsSource.normalizeImageUrl(p && p.image)) || (p && p.image) || '';
  }

  function cardThumb(p, size) {
    const fz = size === 'scroll' ? '3.5rem' : '3rem';
    const src = postImageSrc(p);
    if (src) {
      return (
        '<img src="' +
        esc(src) +
        '" alt="' +
        esc(p.title) +
        '" loading="lazy" decoding="async">'
      );
    }
    const bg = p.color || 'linear-gradient(135deg,#F5F5F7,#E8E8EC)';
    return (
      '<span style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:' +
      bg +
      ';font-size:' +
      fz +
      '">' +
      (p.emoji || '📝') +
      '</span>'
    );
  }

  function renderFeatured(p) {
    const el = document.getElementById('sticky-featured');
    if (!el) return;
    let bg;
    const featSrc = postImageSrc(p);
    if (featSrc) {
      bg =
        '<img src="' +
        esc(featSrc) +
        '" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">';
    } else {
      bg =
        '<div style="width:100%;height:100%;background:' +
        (p.color || 'linear-gradient(160deg,#1a1a2e,#533483)') +
        ';position:absolute;inset:0;"></div>' +
        "<div style=\"position:absolute;inset:0;background:url('og-landing-correta.png') center/cover no-repeat;opacity:0.35;\"></div>";
    }
    el.innerHTML =
      '<a class="sticky-left-link" href="post.html?id=' +
      esc(p.id) +
      '" data-cat="' +
      esc(p.cat) +
      '">' +
      bg +
      '<div class="sticky-left-overlay"></div><div class="sticky-left-body">' +
      '<span class="sticky-left-cat" data-cat="' +
      esc(p.cat) +
      '">' +
      esc(CAT_LABELS[p.cat] || p.cat) +
      '</span>' +
      '<h2 class="sticky-left-title">' +
      esc(p.title) +
      '</h2>' +
      '<div class="sticky-left-meta"><strong>' +
      esc(p.author || 'Equipe U.GO') +
      '</strong> · ' +
      esc(p.date || '') +
      ' · ' +
      esc(p.read || '5 min') +
      '</div></div></a>';
  }

  function renderScrollArticle(p) {
    return (
      '<a class="scroll-article" href="post.html?id=' +
      esc(p.id) +
      '" data-cat="' +
      esc(p.cat) +
      '">' +
      '<div class="scroll-article-img">' +
      cardThumb(p, 'scroll') +
      '</div><div class="scroll-article-body">' +
      '<' + 'div class="art-cat" data-cat="' +
      esc(p.cat) +
      '">' +
      esc(CAT_LABELS[p.cat] || p.cat) +
      '</div>' +
      '<h3 class="art-title">' +
      esc(p.title) +
      '</h3><p class="art-excerpt">' +
      esc(p.excerpt) +
      '</p>' +
      '<div class="art-meta"><strong>' +
      esc(p.author || 'Equipe U.GO') +
      '</strong> · ' +
      esc(p.read || '5 min') +
      '</div></div></a>'
    );
  }

  function renderGridCard(p) {
    return (
      '<a class="grid-card" href="post.html?id=' +
      esc(p.id) +
      '" data-cat="' +
      esc(p.cat) +
      '">' +
      '<div class="grid-card-img">' +
      cardThumb(p, 'grid') +
      '</div><div class="grid-card-body">' +
      '<div class="grid-card-cat">' +
      esc(CAT_LABELS[p.cat] || p.cat) +
      '</div>' +
      '<h3 class="grid-card-title">' +
      esc(p.title) +
      '</h3><p class="grid-card-excerpt">' +
      esc(p.excerpt) +
      '</p>' +
      '<div class="grid-card-meta"><strong>' +
      esc(p.author || 'Equipe U.GO') +
      '</strong> · ' +
      esc(p.read || '5 min') +
      ' · ' +
      esc(p.date || '') +
      '</div></div></a>'
    );
  }

  async function loadDynamicPosts() {
    try {
      const posts = window.UgoPostsSource
        ? await window.UgoPostsSource.fetchPosts()
        : await fetch('posts.json?_=' + Date.now()).then((r) => r.json());
      if (!posts.length) return;
      renderFeatured(posts[0]);
      const scroll = document.getElementById('scroll-articles');
      if (scroll) scroll.innerHTML = posts.slice(1, 5).map(renderScrollArticle).join('');
      const grid = document.getElementById('grid-posts');
      if (grid) grid.innerHTML = posts.slice(1).map(renderGridCard).join('');
    } catch (e) {
      console.warn('blog posts:', e);
    }
  }

  document.addEventListener('DOMContentLoaded', loadDynamicPosts);

  window.filterAll = function (btn) {
    document.querySelectorAll('.cat-tab').forEach(function (b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');
    document.querySelectorAll('[data-cat]').forEach(function (el) {
      el.style.display = '';
    });
  };

  window.filterCat = function (btn, cat) {
    document.querySelectorAll('.cat-tab').forEach(function (b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');
    document.querySelectorAll('[data-cat]').forEach(function (el) {
      el.style.display = el.dataset.cat === cat ? '' : 'none';
    });
  };
})();
