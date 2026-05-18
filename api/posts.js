const GH_OWNER = 'ketruynkarollen-max';
const GH_REPO = 'ugo';
const GH_FILE = 'posts.json';
const GH_BRANCH = 'main';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-Pass');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
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

  const apiUrl = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${GH_FILE}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
    'User-Agent': 'ugo-admin',
  };

  if (req.method === 'GET') {
    try {
      const r = await fetch(`${apiUrl}?ref=${GH_BRANCH}`, { headers });
      if (!r.ok) {
        const err = await r.json().catch(() => ({}));
        return res.status(r.status).json({ error: err.message || 'Erro ao ler posts' });
      }
      const data = await r.json();
      const content = JSON.parse(Buffer.from(data.content, 'base64').toString('utf8'));
      return res.status(200).json(content);
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      const posts = req.body?.posts;
      if (!Array.isArray(posts)) {
        return res.status(400).json({ error: 'Corpo inválido: esperado { posts: [] }' });
      }

      let sha = '';
      const getR = await fetch(`${apiUrl}?ref=${GH_BRANCH}`, { headers });
      if (getR.ok) {
        const d = await getR.json();
        sha = d.sha;
      }

      const content = Buffer.from(JSON.stringify(posts, null, 2), 'utf8').toString('base64');
      const body = {
        message: `Update posts — ${new Date().toISOString()}`,
        content,
        branch: GH_BRANCH,
      };
      if (sha) body.sha = sha;

      const putR = await fetch(apiUrl, { method: 'PUT', headers, body: JSON.stringify(body) });
      if (!putR.ok) {
        const err = await putR.json().catch(() => ({}));
        return res.status(putR.status).json({ error: err.message || 'Erro ao publicar' });
      }
      return res.status(200).json({ ok: true });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
};
