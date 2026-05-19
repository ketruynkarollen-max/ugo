(function (global) {
  const GH_RAW = 'https://raw.githubusercontent.com/ketruynkarollen-max/ugo/main';
  const GH_POSTS = GH_RAW + '/posts.json';

  function normalizeImageUrl(url) {
    if (!url) return '';
    if (url.startsWith('/blog-images/')) return GH_RAW + url;
    return url;
  }

  function normalizePost(p) {
    if (!p) return p;
    if (!p.image) return p;
    return Object.assign({}, p, { image: normalizeImageUrl(p.image) });
  }

  async function fetchPosts() {
    try {
      const r = await fetch(GH_POSTS + '?_=' + Date.now());
      if (r.ok) {
        const data = await r.json();
        if (Array.isArray(data) && data.length) {
          return data.map(normalizePost);
        }
      }
    } catch (e) {
      console.warn('UgoPostsSource: GitHub', e);
    }
    try {
      const r = await fetch('posts.json?_=' + Date.now());
      const data = await r.json();
      return Array.isArray(data) ? data.map(normalizePost) : [];
    } catch (e) {
      console.warn('UgoPostsSource: local', e);
      return [];
    }
  }

  global.UgoPostsSource = {
    GH_RAW: GH_RAW,
    GH_POSTS: GH_POSTS,
    normalizeImageUrl: normalizeImageUrl,
    normalizePost: normalizePost,
    fetchPosts: fetchPosts,
  };
})(typeof window !== 'undefined' ? window : global);
