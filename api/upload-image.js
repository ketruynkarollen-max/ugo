const GH_OWNER = 'ketruynkarollen-max';
const GH_REPO = 'ugo';
const GH_BRANCH = 'main';
const GH_PREFIX = 'blog-images';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Pass');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const adminPass = process.env.ADMIN_PASS || 'ugo2026';
  if (req.headers['x-admin-pass'] !== adminPass) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return res.status(503).json({
      error: 'no_server_token',
      message: 'Defina GITHUB_TOKEN nas variáveis de ambiente do Vercel.',
    });
  }

  try {
    const { image, filename } = req.body || {};
    if (!image || typeof image !== 'string') {
      return res.status(400).json({ error: 'Campo image obrigatório' });
    }

    let base64 = image;
    let ext = 'jpg';
    const m = image.match(/^data:image\/(\w+);base64,(.+)$/);
    if (m) {
      ext = m[1] === 'jpeg' ? 'jpg' : m[1].replace('svg+xml', 'svg');
      base64 = m[2];
    }

    const safeName = (filename || `post-${Date.now()}`)
      .replace(/[^a-zA-Z0-9._-]/g, '-')
      .slice(0, 80);
    const path = `${GH_PREFIX}/${safeName}.${ext}`;
    const apiUrl = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${path}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'User-Agent': 'ugo-admin',
    };

    let sha = '';
    const getR = await fetch(`${apiUrl}?ref=${GH_BRANCH}`, { headers });
    if (getR.ok) {
      const d = await getR.json();
      sha = d.sha;
    }

    const body = {
      message: `Upload blog image — ${safeName}`,
      content: base64,
      branch: GH_BRANCH,
    };
    if (sha) body.sha = sha;

    const putR = await fetch(apiUrl, { method: 'PUT', headers, body: JSON.stringify(body) });
    if (!putR.ok) {
      const err = await putR.json().catch(() => ({}));
      return res.status(putR.status).json({ error: err.message || 'Erro ao enviar imagem' });
    }

    const pathKey = `${GH_PREFIX}/${safeName}.${ext}`;
    const url = `https://raw.githubusercontent.com/${GH_OWNER}/${GH_REPO}/${GH_BRANCH}/${pathKey}`;
    return res.status(200).json({ ok: true, url, path: pathKey });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
