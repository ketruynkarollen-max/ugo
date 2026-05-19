/**
 * U.GO — i18n PT / EN (compartilhado entre páginas)
 */
(function (global) {
  'use strict';

  const store = { pt: {}, en: {} };
  let lang = 'pt';

  function merge(dict) {
    if (!dict) return;
    ['pt', 'en'].forEach((l) => {
      if (dict[l]) Object.assign(store[l], dict[l]);
    });
  }

  function injectLangToggle() {
    if (document.getElementById('lang-toggle')) return;
    const navLinks =
      document.querySelector('#nav .nav-links') ||
      document.querySelector('nav .nav-links');
    if (!navLinks) return;
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;gap:0.5rem;align-items:center;flex-shrink:0;';
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'lang-toggle';
    btn.setAttribute('aria-label', 'Switch language');
    btn.style.cssText =
      "background:none;border:1.5px solid rgba(0,0,0,0.08);border-radius:100px;padding:0.4rem 0.85rem;font-family:'Manrope',sans-serif;font-size:0.72rem;font-weight:700;letter-spacing:0.06em;color:#6E6E73;cursor:pointer;white-space:nowrap;transition:border-color .2s,color .2s;";
    wrap.appendChild(btn);
    navLinks.appendChild(wrap);
  }

  const dynamicRenderers = [];

  function translate(key) {
    const dict = store[lang] || store.pt;
    return dict[key] !== undefined ? dict[key] : key;
  }

  function hasKey(key) {
    const dict = store[lang] || store.pt;
    return dict[key] !== undefined;
  }

  function onDynamicRender(fn) {
    if (typeof fn === 'function') dynamicRenderers.push(fn);
  }

  function pagePrefix() {
    const p = document.body && document.body.dataset.i18nPage;
    return p === 'educacional' ? 'ad' : 'ae';
  }

  // Resolve chave dinâmica com fallback correto:
  // 1. Tenta {prefix}.dyn.{suffix} no idioma atual
  // 2. Tenta ae.dyn.{suffix} no idioma atual
  // 3. Tenta ambos no PT (fallback)
  // 4. Retorna apenas o sufixo como último recurso
  function tDyn(suffix) {
    const dict = store[lang] || store.pt;
    const p = pagePrefix();
    const k1 = `${p}.dyn.${suffix}`;
    const k2 = `ae.dyn.${suffix}`;
    if (dict[k1] !== undefined) return dict[k1];
    if (dict[k2] !== undefined) return dict[k2];
    // PT fallback
    if (store.pt[k1] !== undefined) return store.pt[k1];
    if (store.pt[k2] !== undefined) return store.pt[k2];
    return suffix;
  }

  function applyLang(l) {
    lang = l;
    try {
      localStorage.setItem('ugo-lang', l);
    } catch (e) {}
    const t = store[l] || store.pt;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.innerHTML = t[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) el.setAttribute('placeholder', t[key]);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      const key = el.getAttribute('data-i18n-aria');
      if (t[key] !== undefined) el.setAttribute('aria-label', t[key]);
    });
    if (global.__ugoFeCarouselApplyI18n) global.__ugoFeCarouselApplyI18n(t);
    if (global.__ugoHmChatApplyLang) global.__ugoHmChatApplyLang(l);
    const langLabel = l === 'pt' ? 'EN' : 'PT';
    document.querySelectorAll('#lang-toggle, #lang-toggle-mobile').forEach((btn) => {
      btn.textContent = langLabel;
    });
    document.documentElement.lang = l === 'pt' ? 'pt-BR' : 'en';
    const page = document.body.dataset.i18nPage;
    if (page) {
      const pageTitle = t[`meta.title.${page}`] || t['meta.title'];
      if (pageTitle) document.title = pageTitle;
    }
    if (global.__ugoBlogApplyLang) global.__ugoBlogApplyLang(l, t);
    dynamicRenderers.forEach((fn) => {
      try {
        fn(l);
      } catch (e) {
        if (typeof console !== 'undefined') console.warn('[i18n] dynamicRenderer error:', e);
      }
    });
    // Emite evento custom como mecanismo extra de notificação
    try {
      document.dispatchEvent(new CustomEvent('ugo:langchange', { detail: { lang: l } }));
    } catch (e) {}
  }

  function init() {
    injectLangToggle();
    let saved = 'pt';
    try {
      saved = localStorage.getItem('ugo-lang') || 'pt';
    } catch (e) {}
    applyLang(saved === 'en' ? 'en' : 'pt');
    function bindLangBtn(btn) {
      if (!btn || btn.dataset.i18nBound) return;
      btn.dataset.i18nBound = '1';
      btn.addEventListener('click', () => applyLang(lang === 'pt' ? 'en' : 'pt'));
    }
    bindLangBtn(document.getElementById('lang-toggle'));
    bindLangBtn(document.getElementById('lang-toggle-mobile'));
  }

  global.UgoI18n = { merge, applyLang, init, getLang: () => lang, t: translate, onDynamicRender, tDyn, pagePrefix };

  /* ── Comum (nav / footer) ── */
  merge({
    pt: {
      'nav.analytics': 'Analytics',
      'nav.analyticsEmpresa': 'Analytics Empresa',
      'nav.analyticsEducacional': 'Analytics Educacional',
      'nav.tips': 'Dicas',
      'nav.community': 'Comunidade',
      'nav.communities': 'Comunidades',
      'nav.login': 'Login web',
      'nav.cta': 'Agendar demonstração',
      'nav.back': '← Voltar ao blog',
      'skip.main': 'Ir para o conteúdo principal',
      'chip.hugo': 'IA Conversacional<br><b style="color:var(--ink);font-weight:600">(HUGO)</b>',
      'chip.analytics': 'Analytics em<br><b style="color:var(--ink);font-weight:600">tempo real</b>',
      'chip.community': 'Comunidade e<br><b style="color:var(--ink);font-weight:600">Gamificação</b>',
      'chip.softskills': 'Foco em Soft<br><b style="color:var(--ink);font-weight:600">Skills</b>',
      'footer.home': 'Início',
      'footer.privacy': 'Privacidade',
      'footer.terms': 'Termos',
      'footer.copy': '© 2026 U.GO. Todos os direitos reservados.',
      'footer.col1': 'Produto',
      'footer.col2': 'Legal',
      'footer.col3': 'Redes',
      'footer.analytics1': 'Analytics Empresa',
      'footer.analytics2': 'Analytics Educacional',
      'footer.community': 'Comunidade',
      'footer.softskills': 'Soft Skills',
      'footer.agents': 'Agentes de IA',
      'footer.privacyFull': 'Política de Privacidade',
      'footer.termsFull': 'Termos de Uso',
      'footer.tagline':
        'A plataforma de inteligência comportamental que transforma seus sonhos em ações diárias.',
      'footer.ios': 'Baixar para iOS',
      'footer.android': 'Baixar para Android',
    },
    en: {
      'nav.analytics': 'Analytics',
      'nav.analyticsEmpresa': 'Company Analytics',
      'nav.analyticsEducacional': 'Education Analytics',
      'nav.tips': 'Tips',
      'nav.community': 'Community',
      'nav.communities': 'Communities',
      'nav.login': 'Web login',
      'nav.cta': 'Schedule a demo',
      'nav.back': '← Back to blog',
      'skip.main': 'Skip to main content',
      'chip.hugo': 'Conversational AI<br><b style="color:var(--ink);font-weight:600">(HUGO)</b>',
      'chip.analytics': 'Analytics in<br><b style="color:var(--ink);font-weight:600">real time</b>',
      'chip.community': 'Community &<br><b style="color:var(--ink);font-weight:600">Gamification</b>',
      'chip.softskills': 'Focus on Soft<br><b style="color:var(--ink);font-weight:600">Skills</b>',
      'footer.home': 'Home',
      'footer.privacy': 'Privacy',
      'footer.terms': 'Terms',
      'footer.copy': '© 2026 U.GO. All rights reserved.',
      'footer.col1': 'Product',
      'footer.col2': 'Legal',
      'footer.col3': 'Social',
      'footer.analytics1': 'Company Analytics',
      'footer.analytics2': 'Education Analytics',
      'footer.community': 'Community',
      'footer.softskills': 'Soft Skills',
      'footer.agents': 'AI Agents',
      'footer.privacyFull': 'Privacy Policy',
      'footer.termsFull': 'Terms of Use',
      'footer.tagline':
        'The behavioral intelligence platform that turns your dreams into daily actions.',
      'footer.ios': 'Download for iOS',
      'footer.android': 'Download for Android',
    },
  });

  /* ── Analytics Empresa ── */
  merge({
    pt: {
      'meta.title': 'U.GO para Empresas — Inteligência comportamental para times de alta performance',
      'meta.title.empresa': 'U.GO para Empresas — Inteligência comportamental para times de alta performance',
      'ae.label01': 'Para Empresas',
      'ae.hero.h1': 'Imagine um time que não precisa ser motivado. <em>Ele se motiva sozinho.</em>',
      'ae.hero.sub':
        'Não é utopia. É o que acontece quando as pessoas sentem que pertencem, evoluem juntas e são reconhecidas pelo que fazem. O U.GO transforma essa cultura em realidade — todo dia.',
      'ae.hero.cta1': 'Quero transformar meu time',
      'ae.hero.cta2': 'Ver como funciona',
      'ae.compliance': 'Conformidade e segurança em <em>primeiro lugar</em>.',
      'ae.s02.label': 'Engajamento',
      'ae.s02.h2': 'Times extraordinários não são contratados. <em>São construídos.</em>',
      'ae.s02.p':
        'Os melhores ambientes de trabalho têm algo em comum: as pessoas acordam querendo fazer parte. Não por obrigação — por pertencimento. O U.GO cria as condições para isso acontecer de forma consistente, escalável e mensurável.',
      'ae.dor1': 'Desengajamento silencioso',
      'ae.dor2': 'Baixa constância',
      'ae.dor3': 'Procrastinação',
      'ae.dor4': 'Falta de protagonismo',
      'ae.dor5': 'Baixa participação',
      'ae.dor6': 'Risco de turnover',
      'ae.dor7': 'Soft skills pouco desenvolvidas',
      'ae.s03.label': 'Comunidade e Gamificação',
      'ae.s03.h2': 'Quando o time joga junto, <em>todo mundo cresce.</em>',
      'ae.s03.p':
        'Desafios coletivos, missões em time, reconhecimento público, recompensas reais. O U.GO cria rituais diários que fazem as pessoas quererem aparecer, contribuir e evoluir — sem que o RH precise empurrar.',
      'ae.s04.label': 'Soft Skills',
      'ae.s04.h2': 'Seu time evolui todo dia. <em>Agora você consegue ver isso.</em>',
      'ae.s04.p':
        'Comunicação, protagonismo, inteligência emocional, liderança. Comportamentos que antes eram invisíveis ganham visibilidade — e o desenvolvimento deixa de ser achismo para virar um processo real.<br><br><strong>8 eixos acompanhados continuamente. Por pessoa. Por time. Ao longo do tempo.</strong>',
      'ae.s05.label': 'Comunidade e Gamificação',
      'ae.s05.h2': 'Times evoluem mais quando <em>pertencem</em>.',
      'ae.s05.p':
        'Desafios, reconhecimento e ritual diário que criam motivação, constância e resultados reais — sem precisar puxar o time.',
      'ae.mini1t': 'Desafios semanais',
      'ae.mini1d': 'Metas que unem o time em torno de um propósito',
      'ae.mini2t': 'Missões coletivas',
      'ae.mini2d': 'Conquistas compartilhadas que fortalecem vínculos',
      'ae.mini3t': 'Reconhecimento',
      'ae.mini3d': 'Quem entrega, aparece. A cultura de alta performance se instala sozinha',
      'ae.mini4t': 'Recompensas reais',
      'ae.mini4d': 'O esforço se transforma em algo concreto e valioso',
      'ae.mini5t': 'XP por atividades',
      'ae.mini5d': 'Cada passo da evolução é celebrado e recompensado',
      'ae.mini.result': 'Resultado: constância sem cobrança. Engajamento sem forçar.',
      'ae.s06.label': 'Analytics',
      'ae.s06.h2': 'E enquanto tudo isso acontece, <em>você enxerga tudo.</em>',
      'ae.s06.p':
        'Cada interação, cada evolução, cada sinal — se transforma em dado. O RH e a liderança passam a ter uma visão clara do que está funcionando, quem está crescendo e onde é preciso agir.<br><br><em>Não para controlar. Para cuidar melhor.</em>',
      'ae.s06.link': 'Ver todos os relatórios',
      'ae.s07.label': 'Por que U.GO',
      'ae.s07.h2':
        'A diferença entre uma empresa comum e uma empresa que as pessoas amam trabalhar é <em>cultura.</em>',
      'ae.s07.p':
        'O U.GO não é mais uma ferramenta de RH. É a plataforma que torna o desenvolvimento humano parte da rotina — leve, contínuo e com dados reais para guiar cada decisão.',
      'ae.s08.label': 'Escala',
      'ae.s08.h2': 'Para times de 30 ou 3.000 pessoas. <em>A cultura não tem tamanho.</em>',
      'ae.s08.p':
        'De startups em fase de tração a operações multi-BU — a mesma inteligência, com profundidade que escala junto com o time.',
      'ae.cta.h2': 'Seu próximo grande resultado começa com pessoas que <em>querem estar lá.</em>',
      'ae.cta.p':
        'Veja ao vivo como o U.GO transforma engajamento em cultura — e cultura em performance.',
      'ae.cta.btn1': 'Agendar demonstração gratuita',
      'ae.cta.btn2': 'Falar com um especialista',
    },
    en: {
      'meta.title': 'U.GO for Companies — Behavioral intelligence for high-performance teams',
      'meta.title.empresa': 'U.GO for Companies — Behavioral intelligence for high-performance teams',
      'ae.label01': 'For Companies',
      'ae.hero.h1': 'Imagine a team that doesn\'t need to be pushed. <em>It motivates itself.</em>',
      'ae.hero.sub':
        'It\'s not utopia. It happens when people feel they belong, grow together and are recognized for what they do. U.GO turns that culture into reality — every day.',
      'ae.hero.cta1': 'I want to transform my team',
      'ae.hero.cta2': 'See how it works',
      'ae.compliance': 'Compliance and security <em>first</em>.',
      'ae.s02.label': 'Engagement',
      'ae.s02.h2': 'Extraordinary teams aren\'t hired. <em>They\'re built.</em>',
      'ae.s02.p':
        'The best workplaces have something in common: people wake up wanting to be part of it. Not out of obligation — out of belonging. U.GO creates the conditions for that to happen consistently, at scale and measurably.',
      'ae.dor1': 'Silent disengagement',
      'ae.dor2': 'Low consistency',
      'ae.dor3': 'Procrastination',
      'ae.dor4': 'Lack of agency',
      'ae.dor5': 'Low participation',
      'ae.dor6': 'Turnover risk',
      'ae.dor7': 'Underdeveloped soft skills',
      'ae.s03.label': 'Community & Gamification',
      'ae.s03.h2': 'When the team plays together, <em>everyone grows.</em>',
      'ae.s03.p':
        'Collective challenges, team missions, public recognition, real rewards. U.GO creates daily rituals that make people want to show up, contribute and grow — without HR having to push.',
      'ae.s04.label': 'Soft Skills',
      'ae.s04.h2': 'Your team evolves every day. <em>Now you can see it.</em>',
      'ae.s04.p':
        'Communication, agency, emotional intelligence, leadership. Behaviors that were invisible now have visibility — and development stops being guesswork and becomes a real process.<br><br><strong>8 axes tracked continuously. Per person. Per team. Over time.</strong>',
      'ae.s05.label': 'Community & Gamification',
      'ae.s05.h2': 'Teams evolve more when they <em>belong</em>.',
      'ae.s05.p':
        'Challenges, recognition and daily rituals that create motivation, consistency and real results — without having to push the team.',
      'ae.mini1t': 'Weekly challenges',
      'ae.mini1d': 'Goals that unite the team around a purpose',
      'ae.mini2t': 'Collective missions',
      'ae.mini2d': 'Shared wins that strengthen bonds',
      'ae.mini3t': 'Recognition',
      'ae.mini3d': 'Those who deliver stand out. High-performance culture installs itself',
      'ae.mini4t': 'Real rewards',
      'ae.mini4d': 'Effort turns into something concrete and valuable',
      'ae.mini5t': 'XP for activities',
      'ae.mini5d': 'Every step of growth is celebrated and rewarded',
      'ae.mini.result': 'Result: consistency without pressure. Engagement without forcing it.',
      'ae.s06.label': 'Analytics',
      'ae.s06.h2': 'And while all of this happens, <em>you see everything.</em>',
      'ae.s06.p':
        'Every interaction, every evolution, every signal — becomes data. HR and leadership get a clear view of what\'s working, who\'s growing and where action is needed.<br><br><em>Not to control. To care better.</em>',
      'ae.s06.link': 'View all reports',
      'ae.s07.label': 'Why U.GO',
      'ae.s07.h2':
        'The difference between an ordinary company and one people love working for is <em>culture.</em>',
      'ae.s07.p':
        'U.GO is no longer just an HR tool. It\'s the platform that makes human development part of the routine — light, continuous and guided by real data.',
      'ae.s08.label': 'Scale',
      'ae.s08.h2': 'For teams of 30 or 3,000 people. <em>Culture has no size limit.</em>',
      'ae.s08.p':
        'From traction-stage startups to multi-BU operations — the same intelligence, with depth that scales with your team.',
      'ae.cta.h2': 'Your next big result starts with people who <em>want to be there.</em>',
      'ae.cta.p':
        'See live how U.GO turns engagement into culture — and culture into performance.',
      'ae.cta.btn1': 'Book a free demo',
      'ae.cta.btn2': 'Talk to a specialist',
    },
  });

  /* ── Analytics Educacional ── */
  merge({
    pt: {
      'meta.title': 'U.GO Analytics Educacional — Inteligência comportamental para escolas e universidades',
      'meta.title.educacional': 'U.GO Analytics Educacional — Inteligência comportamental para escolas e universidades',
      'ad.label01': 'Analytics Educacional',
      'ad.hero.h1':
        'A primeira plataforma de inteligência comportamental para instituições de ensino que formam <em>gente de verdade</em>.',
      'ad.hero.sub':
        'Métricas reais de engajamento, soft skills e evolução humana — para coordenadores e diretores que querem ver <strong>além da nota</strong>.',
      'ad.hero.cta1': 'Quero aplicar na minha instituição',
      'ad.hero.cta2': 'Saiba como funciona',
      'ad.compliance': 'Ambiente <em>seguro e controlado</em>.',
      'ad.s02.label': 'Proposta de valor',
      'ad.s02.h2':
        'A U.GO resolveu o desafio de <em>alunos invisíveis</em> traduzindo comportamento em clareza real para o coordenador.',
      'ad.s02.p':
        'Setor: Educação · Escolas · Universidades · Função: Inteligência Comportamental Educacional · Plataforma: Web · Mobile · API · Estilo: Dados · Ética · Clareza',
      'ad.cta.h2': 'Clareza que vira <em>ação</em> na sua instituição.',
      'ad.cta.p':
        'Implemente a U.GO Analytics na sua instituição em menos de 48 horas. Sem configuração complexa. Com suporte do início ao fim.',
      'ad.cta.btn1': 'Quero aplicar na minha instituição',
      'ad.cta.btn2': 'Falar com especialista',
      'ad.dor1': 'Engajamento por turma e aluno',
      'ad.dor2': 'Risco precoce de evasão',
      'ad.dor3': 'Soft skills com evidência',
      'ad.dor4': 'Intervenções assertivas',
      'ad.dor5': 'Protagonismo discente',
      'ad.dor6': 'Retenção com dados reais',
      'ad.dor7': 'Evolução além da nota',
      'ad.s03.label': 'O que é o U.GO Analytics',
      'ad.s03.h2': 'O braço de inteligência da <em>U.GO</em>',
      'ad.s03.p':
        'Capta sinais de rotina e engajamento · Traduz em soft skills e evolução humana · Entrega insights éticos e agregados · Apoia intervenções pelo coordenador. Mais do que medir desempenho, a U.GO mede evolução humana.',
      'ad.s04.label': 'O que você mede',
      'ad.s04.h2': 'Foque no que <em>realmente importa</em>.',
      'ad.s04.p':
        'Cinco dimensões comportamentais da sua turma em tempo real: objetivos, hábitos, foco, humor e consistência.',
      'ad.s05.label': 'Aplicações por segmento',
      'ad.s05.h2': 'Valor claro para <em>escolas e universidades</em>.',
      'ad.s05.p':
        'Uma plataforma, múltiplos contextos — do colégio à universidade e programas de formação.',
      'ad.mini1t': 'Escolas e colégios',
      'ad.mini1d': 'Engajamento, evasão precoce, soft skills e coordenação',
      'ad.mini2t': 'Universidades',
      'ad.mini2d': 'Retenção, protagonismo e evolução discente',
      'ad.mini3t': 'Programas de formação',
      'ad.mini3d': 'Quem evolui, quem está em risco e qual intervenção funciona',
      'ad.mini4t': 'Protagonismo discente',
      'ad.mini4d': 'Cada aluno vê o próprio progresso e se torna protagonista',
      'ad.mini5t': 'Dados éticos',
      'ad.mini5d': 'Agregados e nunca invasivos — clareza sem vigilância',
      'ad.mini.result': 'Indicadores de evolução para além do desempenho acadêmico.',
      'ad.s06.label': 'Métricas',
      'ad.s06.h2': 'Métricas que medem <em>evolução humana</em>, não só nota.',
      'ad.s06.p':
        'Dados éticos e agregados, insights que viram decisões e evolução — não vigilância. Medimos objetivos, hábitos, foco, humor e consistência.',
      'ad.s06.link': 'Ver todos os relatórios',
      'ad.s07.label': 'Por que U.GO',
      'ad.s07.h2': 'Nota não conta a história inteira. <em>Comportamento sim</em>.',
      'ad.s07.p':
        'Dados éticos nunca invasivos, insights que viram decisão e evolução — não vigilância. O aluno vê seu progresso e se torna protagonista.',
      'ad.s08.label': 'Para quem é',
      'ad.s08.h2': 'Feito para quem <em>lidera formação</em>.',
      'ad.s08.p':
        'Se você lidera uma turma, um curso ou uma instituição — tenha clareza sobre seus alunos antes que a evasão apareça nos números.',
    },
    en: {
      'meta.title': 'U.GO Education Analytics — Behavioral intelligence for schools and universities',
      'meta.title.educacional': 'U.GO Education Analytics — Behavioral intelligence for schools and universities',
      'ad.label01': 'Education Analytics',
      'ad.hero.h1':
        'The first behavioral intelligence platform for institutions that develop <em>real human growth</em>.',
      'ad.hero.sub':
        'Real metrics on engagement, soft skills and human development — for coordinators and leaders who want to see <strong>beyond the grade</strong>.',
      'ad.hero.cta1': 'Apply at my institution',
      'ad.hero.cta2': 'See how it works',
      'ad.compliance': 'A <em>safe and controlled</em> environment.',
      'ad.s02.label': 'Value proposition',
      'ad.s02.h2':
        'U.GO solved the challenge of <em>invisible students</em> by turning behavior into real clarity for coordinators.',
      'ad.s02.p':
        'Sector: Education · Schools · Universities · Role: Educational Behavioral Intelligence · Platform: Web · Mobile · API · Style: Data · Ethics · Clarity',
      'ad.cta.h2': 'Clarity that turns into <em>action</em> at your institution.',
      'ad.cta.p':
        'Deploy U.GO Analytics at your institution in under 48 hours. No complex setup. Full support from day one.',
      'ad.cta.btn1': 'Apply at my institution',
      'ad.cta.btn2': 'Talk to a specialist',
      'ad.dor1': 'Engagement by class and student',
      'ad.dor2': 'Early dropout risk',
      'ad.dor3': 'Soft skills with evidence',
      'ad.dor4': 'Assertive interventions',
      'ad.dor5': 'Student agency',
      'ad.dor6': 'Retention with real data',
      'ad.dor7': 'Growth beyond grades',
      'ad.s03.label': 'What is U.GO Analytics',
      'ad.s03.h2': 'The intelligence arm of <em>U.GO</em>',
      'ad.s03.p':
        'Captures routine and engagement signals · Translates into soft skills and human growth · Delivers ethical, aggregated insights · Supports coordinator interventions. U.GO measures human development, not just performance.',
      'ad.s04.label': 'What you measure',
      'ad.s04.h2': 'Focus on what <em>really matters</em>.',
      'ad.s04.p':
        'Five behavioral dimensions for your class in real time: goals, habits, focus, mood and consistency.',
      'ad.s05.label': 'Applications by segment',
      'ad.s05.h2': 'Clear value for <em>schools and universities</em>.',
      'ad.s05.p':
        'One platform, multiple contexts — from K-12 to university and training programs.',
      'ad.mini1t': 'Schools',
      'ad.mini1d': 'Engagement, early dropout, soft skills and coordination',
      'ad.mini2t': 'Universities',
      'ad.mini2d': 'Retention, student agency and growth',
      'ad.mini3t': 'Training programs',
      'ad.mini3d': 'Who is growing, who is at risk and which intervention works',
      'ad.mini4t': 'Student agency',
      'ad.mini4d': 'Each student sees their own progress and becomes a protagonist',
      'ad.mini5t': 'Ethical data',
      'ad.mini5d': 'Aggregated and never invasive — clarity without surveillance',
      'ad.mini.result': 'Indicators of growth beyond academic performance.',
      'ad.s06.label': 'Metrics',
      'ad.s06.h2': 'Metrics that measure <em>human growth</em>, not just grades.',
      'ad.s06.p':
        'Ethical aggregated data, insights that become decisions and growth — not surveillance. We measure goals, habits, focus, mood and consistency.',
      'ad.s06.link': 'View all reports',
      'ad.s07.label': 'Why U.GO',
      'ad.s07.h2': 'Grades don\'t tell the whole story. <em>Behavior does</em>.',
      'ad.s07.p':
        'Ethical non-invasive data, insights that drive action and growth — not surveillance. Students see their own progress and become protagonists.',
      'ad.s08.label': 'Who it\'s for',
      'ad.s08.h2': 'Built for those who <em>lead learning</em>.',
      'ad.s08.p':
        'If you lead a class, program or institution — get clarity on your students before dropout shows up in the numbers.',
    },
  });

  /* ── Componentes dinâmicos (JS) + cards estáticos ── */
  merge({
    pt: {
      'ae.dyn.ss.scoreTitle': 'Score Comportamental Geral',
      'ae.dyn.ss.veryGood': 'Muito bom',
      'ae.dyn.ss.vsMonth': '+11% vs mês anterior',
      'ae.dyn.ss.evoTitle': 'Evolução das Soft Skills',
      'ae.dyn.ss.legendLow': 'Baixo',
      'ae.dyn.ss.legendMid': 'Médio',
      'ae.dyn.ss.legendHigh': 'Alto',
      'ae.dyn.ss.avgScore': 'Score médio',
      'ae.dyn.ss.tableTitle': 'Soft Skills',
      'ae.dyn.ss.thSkill': 'Soft skill',
      'ae.dyn.ss.thScore': 'Score',
      'ae.dyn.ss.thEvo': 'Evolução',
      'ae.dyn.ss.s1': 'Protagonismo',
      'ae.dyn.ss.s2': 'Comunicação',
      'ae.dyn.ss.s3': 'Organização',
      'ae.dyn.ss.s4': 'Liderança',
      'ae.dyn.ss.s5': 'Inteligência emocional',
      'ae.dyn.ss.s6': 'Adaptabilidade',
      'ae.dyn.ss.s7': 'Disciplina',
      'ae.dyn.ss.s8': 'Colaboração',
      // Educacional — mesmas soft skills (prefixo ad)
      'ad.dyn.ss.scoreTitle': 'Score Comportamental dos Alunos',
      'ad.dyn.ss.veryGood': 'Muito bom',
      'ad.dyn.ss.vsMonth': '+11% vs mês anterior',
      'ad.dyn.ss.evoTitle': 'Evolução das Soft Skills',
      'ad.dyn.ss.legendLow': 'Baixo',
      'ad.dyn.ss.legendMid': 'Médio',
      'ad.dyn.ss.legendHigh': 'Alto',
      'ad.dyn.ss.avgScore': 'Score médio',
      'ad.dyn.ss.tableTitle': 'Soft Skills',
      'ad.dyn.ss.thSkill': 'Soft skill',
      'ad.dyn.ss.thScore': 'Score',
      'ad.dyn.ss.thEvo': 'Evolução',
      'ad.dyn.ss.s1': 'Protagonismo',
      'ad.dyn.ss.s2': 'Comunicação',
      'ad.dyn.ss.s3': 'Organização',
      'ad.dyn.ss.s4': 'Liderança',
      'ad.dyn.ss.s5': 'Inteligência emocional',
      'ad.dyn.ss.s6': 'Adaptabilidade',
      'ad.dyn.ss.s7': 'Disciplina',
      'ad.dyn.ss.s8': 'Colaboração',
      'ae.dyn.risco.analysis': 'Análise',
      'ae.dyn.risco.turnover': 'Risco de Turnover',
      'ae.dyn.risco.high': 'Colaboradores em risco alto',
      'ae.dyn.risco.mid': 'Risco médio',
      'ae.dyn.risco.low': 'Risco baixo',
      'ae.dyn.risco.map': 'Mapa',
      'ae.dyn.risco.byTeam': 'Risco por Time',
      'ae.dyn.risco.heatLow': 'Baixo',
      'ae.dyn.risco.heatHigh': 'Alto',
      'ae.dyn.risco.factors': 'Principais fatores que antecedem o disengagement',
      'ae.dyn.risco.f1': 'Queda de engajamento',
      'ae.dyn.risco.f2': 'Baixa constância',
      'ae.dyn.risco.f3': 'Falta de propósito',
      'ae.dyn.risco.f4': 'Participação reduzida',
      // Educacional — chaves específicas (risco de evasão)
      'ad.dyn.risco.analysis': 'Análise',
      'ad.dyn.risco.turnover': 'Risco de Evasão',
      'ad.dyn.risco.high': 'Alunos em risco alto',
      'ad.dyn.risco.mid': 'Risco médio',
      'ad.dyn.risco.low': 'Risco baixo',
      'ad.dyn.risco.map': 'Mapa',
      'ad.dyn.risco.byTeam': 'Risco por Turma',
      'ad.dyn.risco.heatLow': 'Baixo',
      'ad.dyn.risco.heatHigh': 'Alto',
      'ad.dyn.risco.factors': 'Principais fatores que antecedem a evasão',
      'ad.dyn.risco.f1': 'Queda de engajamento',
      'ad.dyn.risco.f2': 'Baixa constância',
      'ad.dyn.risco.f3': 'Falta de propósito',
      'ad.dyn.risco.f4': 'Participação reduzida',
      'ae.dyn.an.active': 'Ativo',
      'ae.dyn.an.alert': 'Alerta do Programa: Participação em queda nas duas últimas semanas.',
      'ae.dyn.an.pulse': 'Pulso médio',
      'ae.dyn.an.pace': 'Ritmo médio',
      'ae.dyn.an.rate': 'Taxa de lei',
      'ae.dyn.an.stories': 'Histórias que precisam de um novo capítulo',
      'ae.dyn.an.storiesSub': 'Faltas e não responder.',
      'ae.dyn.an.explore': 'Explorar Jornada',
      'ae.dyn.an.chartTitle': 'Pulso dos programas',
      'ae.dyn.an.healthTitle': 'Saúde da Jornada',
      'ae.dyn.an.healthSub': 'Pontuação de Saúde · Média da Turma',
      'ae.dyn.an.p1': 'Programação Avançada',
      'ae.dyn.an.p2': 'Agentes da IA',
      'ae.dyn.an.p3': 'Marketing III',
      'ae.dyn.an.h1': 'Pulso',
      'ae.dyn.an.h1sub': 'A intensidade da interação',
      'ae.dyn.an.h2': 'Ritmo',
      'ae.dyn.an.h2sub': 'A constância no trajeto',
      'ae.dyn.an.h3': 'Evolução',
      'ae.dyn.an.h3sub': 'O progresso real conquistado',
      'ae.dyn.an.h4': 'Sintonia',
      'ae.dyn.an.h4sub': 'A conexão com o mentor',
      'ae.dyn.an.t1': 'ADS 2025.1 · Turma A',
      'ae.dyn.an.t2': 'MKT 2025.2 · Turma B',
      'ae.dyn.an.t3': 'SI 2025.2 · Turma A',
      'ae.dyn.an.months': 'Jan,Fev,Mar,Abr,Mai,Jun,Jul,Ago,Set,Out,Nov,Dez',
      // Educacional PT — analytics cards (prefixo ad)
      'ad.dyn.an.active': 'Ativo',
      'ad.dyn.an.alert': 'Alerta do Programa: Participação em queda nas duas últimas semanas.',
      'ad.dyn.an.pulse': 'Pulso médio',
      'ad.dyn.an.pace': 'Ritmo médio',
      'ad.dyn.an.rate': 'Taxa de lei',
      'ad.dyn.an.stories': 'Histórias que precisam de um novo capítulo',
      'ad.dyn.an.storiesSub': 'Faltas e não responder.',
      'ad.dyn.an.explore': 'Explorar Jornada',
      'ad.dyn.an.chartTitle': 'Pulso dos programas',
      'ad.dyn.an.healthTitle': 'Saúde da Jornada',
      'ad.dyn.an.healthSub': 'Pontuação de Saúde · Média da Turma',
      'ad.dyn.an.p1': 'Programação Avançada',
      'ad.dyn.an.p2': 'Agentes da IA',
      'ad.dyn.an.p3': 'Marketing III',
      'ad.dyn.an.h1': 'Pulso',
      'ad.dyn.an.h1sub': 'A intensidade da interação',
      'ad.dyn.an.h2': 'Ritmo',
      'ad.dyn.an.h2sub': 'A constância no trajeto',
      'ad.dyn.an.h3': 'Evolução',
      'ad.dyn.an.h3sub': 'O progresso real conquistado',
      'ad.dyn.an.h4': 'Sintonia',
      'ad.dyn.an.h4sub': 'A conexão com o mentor',
      'ad.dyn.an.t1': 'ADS 2025.1 · Turma A',
      'ad.dyn.an.t2': 'MKT 2025.2 · Turma B',
      'ad.dyn.an.t3': 'SI 2025.2 · Turma A',
      'ad.dyn.an.months': 'Jan,Fev,Mar,Abr,Mai,Jun,Jul,Ago,Set,Out,Nov,Dez',
      'ae.comp.trad': 'Ferramentas<br>tradicionais',
      'ae.comp.newCat': 'A nova categoria',
      'ae.comp.f1': 'Frequência de medição',
      'ae.comp.f1bad': 'Trimestral ou anual',
      'ae.comp.f1good': 'Contínua, em tempo real',
      'ae.comp.f2': 'Sinal capturado',
      'ae.comp.f2bad': 'Resposta de survey',
      'ae.comp.f2good': 'Comportamento observável',
      'ae.comp.f3': 'Tempo até a ação',
      'ae.comp.f3bad': 'Semanas ou meses',
      'ae.comp.f3good': 'Dias — alerta automático',
      'ae.comp.f4': 'Soft skills',
      'ae.comp.f4bad': 'Autoavaliação subjetiva',
      'ae.comp.f4good': '8 eixos mensurados',
      'ae.comp.f5': 'Engajamento do time',
      'ae.comp.f5bad': 'Resposta opcional',
      'ae.comp.f5good': 'Gamificado e diário',
      'ae.comp.f6': 'Predição de turnover',
      'ae.comp.f6bad': 'Reativa, pós-pedido',
      'ae.comp.f6good': 'Preditiva por sinais',
      'ae.kpi.p1': 'Programas Ativos',
      'ae.kpi.p2': 'Participantes',
      'ae.kpi.p3': 'Pulso',
      'ae.kpi.p4': 'Conclusão',
      'ae.kpi.p5': 'Histórias que precisam de um novo capítulo',
      'ae.comp.azure': 'Microsoft Azure',
      'ae.comp.azureSub': 'Infraestrutura enterprise',
      'ae.comp.lgpd': 'LGPD Compliant',
      'ae.comp.lgpdSub': 'Conformidade total',
      'ae.comp.data': 'Dados agregados',
      'ae.comp.dataSub': 'Sem exposição individual',
      'ae.caso.c1t': 'Startups & Scale-ups',
      'ae.caso.c1s': '30 — 200 pessoas',
      'ae.caso.c1l1': 'Construa uma cultura forte desde o início — antes que o crescimento dilua o que faz vocês únicos',
      'ae.caso.c1l2': 'Onboarding gamificado',
      'ae.caso.c1l3': 'Squad health em tempo real',
      'ae.caso.c1l4': 'HUGO substitui rituais de pulse antigos',
      'ae.caso.c1btn': 'Quero ver demo',
      'ae.caso.c2t': 'Mid-Market',
      'ae.caso.c2s': '200 — 2.000 pessoas',
      'ae.caso.c2l1': 'Mantenha a energia do time mesmo quando a empresa cresce e as distâncias aumentam',
      'ae.caso.c2l2': 'Detecção precoce de turnover',
      'ae.caso.c2l3': 'Desenvolvimento de líderes com Agentes de IA',
      'ae.caso.c2btn': 'Falar com especialista',
      'ae.caso.c3t': 'Enterprise',
      'ae.caso.c3s': '2.000+ pessoas',
      'ae.caso.c3l1': 'Cultura consistente em múltiplas áreas, regiões e BUs — com visibilidade total para a liderança',
      'ae.caso.c3l2': 'SSO + permissões granulares',
      'ae.caso.c3l3': 'SLA dedicado e CSM',
      'ae.caso.c3l4': 'Trilhas comportamentais customizadas',
      'ae.caso.c3btn': 'Conversar com vendas',
      'ae.footer.totop': 'Voltar ao topo',
      'ae.footer.lgpd': 'LGPD',
      'ae.footer.official': 'Site Oficial',
      'ad.dyn.risco.turnover': 'Risco de Evasão',
      'ad.dyn.risco.high': 'Alunos em risco alto',
      'ad.dyn.risco.mid': 'Risco médio',
      'ad.dyn.risco.low': 'Risco baixo',
      'ad.dyn.risco.byTeam': 'Risco por Turma',
      'ad.dyn.risco.factors': 'Principais fatores que antecedem a evasão',
      'ad.dyn.risco.f1': 'Queda de engajamento',
      'ad.dyn.risco.f2': 'Baixa constância',
      'ad.dyn.risco.f3': 'Falta de protagonismo',
      'ad.dyn.risco.f4': 'Participação reduzida',
      'ad.kpi.p1': 'Programas Ativos',
      'ad.kpi.p2': 'Alunos acompanhados',
      'ad.kpi.p3': 'Engajamento',
      'ad.kpi.p4': 'Retenção',
      'ad.kpi.p5': 'Turmas que precisam de intervenção',
      'ad.comp.trad': 'Ferramentas<br>tradicionais',
      'ad.comp.newCat': 'A nova categoria',
      'ad.comp.f1': 'Frequência de medição',
      'ad.comp.f1bad': 'Trimestral ou anual',
      'ad.comp.f1good': 'Contínua, em tempo real',
      'ad.comp.f2': 'Sinal capturado',
      'ad.comp.f2bad': 'Resposta de survey',
      'ad.comp.f2good': 'Comportamento observável',
      'ad.comp.f3': 'Tempo até a ação',
      'ad.comp.f3bad': 'Semanas ou meses',
      'ad.comp.f3good': 'Dias — alerta automático',
      'ad.comp.f4': 'Soft skills',
      'ad.comp.f4bad': 'Autoavaliação subjetiva',
      'ad.comp.f4good': '8 eixos mensurados',
      'ad.comp.f5': 'Engajamento discente',
      'ad.comp.f5bad': 'Resposta opcional',
      'ad.comp.f5good': 'Gamificado e diário',
      'ad.comp.f6': 'Predição de evasão',
      'ad.comp.f6bad': 'Reativa, pós-pedido',
      'ad.comp.f6good': 'Preditiva por sinais',
      'ad.caso.c1t': 'Escolas e colégios',
      'ad.caso.c1s': 'Coordenadores e diretores',
      'ad.caso.c1l1': 'Engajamento e bem-estar em tempo real',
      'ad.caso.c1l2': 'Ver além da nota',
      'ad.caso.c1l3': 'Intervenções mais assertivas',
      'ad.caso.c1l4': 'Dados éticos por turma',
      'ad.caso.c1btn': 'Quero aplicar',
      'ad.caso.c2t': 'Universidades',
      'ad.caso.c2s': 'Reitores e coordenadores',
      'ad.caso.c2l1': 'Dados reais sobre retenção',
      'ad.caso.c2l2': 'Protagonismo e autonomia discente',
      'ad.caso.c2l3': 'Indicadores além do desempenho acadêmico',
      'ad.caso.c2l4': 'Visão comportamental por curso e turma',
      'ad.caso.c2btn': 'Falar com especialista',
      'ad.caso.c3t': 'Programas de formação',
      'ad.caso.c3s': 'Instrutores e mentores',
      'ad.caso.c3l1': 'Quem está evoluindo',
      'ad.caso.c3l2': 'Quem está em risco',
      'ad.caso.c3l3': 'Qual intervenção funciona',
      'ad.caso.c3l4': 'Acompanhamento contínuo',
      'ad.caso.c3btn': 'Falar conosco',
      'blog.more': 'Mais artigos',
      'blog.seeAll': 'Ver todos →',
      'blog.readMin': 'min de leitura',
    },
    en: {
      'ae.dyn.ss.scoreTitle': 'Overall Behavioral Score',
      'ae.dyn.ss.veryGood': 'Very good',
      'ae.dyn.ss.vsMonth': '+11% vs last month',
      'ae.dyn.ss.evoTitle': 'Soft Skills Evolution',
      'ae.dyn.ss.legendLow': 'Low',
      'ae.dyn.ss.legendMid': 'Medium',
      'ae.dyn.ss.legendHigh': 'High',
      'ae.dyn.ss.avgScore': 'Average score',
      'ae.dyn.ss.tableTitle': 'Soft Skills',
      'ae.dyn.ss.thSkill': 'Soft skill',
      'ae.dyn.ss.thScore': 'Score',
      'ae.dyn.ss.thEvo': 'Growth',
      'ae.dyn.ss.s1': 'Agency',
      'ae.dyn.ss.s2': 'Communication',
      'ae.dyn.ss.s3': 'Organization',
      'ae.dyn.ss.s4': 'Leadership',
      'ae.dyn.ss.s5': 'Emotional intelligence',
      'ae.dyn.ss.s6': 'Adaptability',
      'ae.dyn.ss.s7': 'Discipline',
      'ae.dyn.ss.s8': 'Collaboration',
      // Educacional EN — soft skills (prefixo ad)
      'ad.dyn.ss.scoreTitle': 'Overall Student Behavioral Score',
      'ad.dyn.ss.veryGood': 'Very good',
      'ad.dyn.ss.vsMonth': '+11% vs last month',
      'ad.dyn.ss.evoTitle': 'Soft Skills Evolution',
      'ad.dyn.ss.legendLow': 'Low',
      'ad.dyn.ss.legendMid': 'Medium',
      'ad.dyn.ss.legendHigh': 'High',
      'ad.dyn.ss.avgScore': 'Average score',
      'ad.dyn.ss.tableTitle': 'Soft Skills',
      'ad.dyn.ss.thSkill': 'Soft skill',
      'ad.dyn.ss.thScore': 'Score',
      'ad.dyn.ss.thEvo': 'Growth',
      'ad.dyn.ss.s1': 'Agency',
      'ad.dyn.ss.s2': 'Communication',
      'ad.dyn.ss.s3': 'Organization',
      'ad.dyn.ss.s4': 'Leadership',
      'ad.dyn.ss.s5': 'Emotional intelligence',
      'ad.dyn.ss.s6': 'Adaptability',
      'ad.dyn.ss.s7': 'Discipline',
      'ad.dyn.ss.s8': 'Collaboration',
      'ae.dyn.risco.analysis': 'Analysis',
      'ae.dyn.risco.turnover': 'Turnover Risk',
      'ae.dyn.risco.high': 'Employees at high risk',
      'ae.dyn.risco.mid': 'Medium risk',
      'ae.dyn.risco.low': 'Low risk',
      'ae.dyn.risco.map': 'Map',
      'ae.dyn.risco.byTeam': 'Risk by Team',
      'ae.dyn.risco.heatLow': 'Low',
      'ae.dyn.risco.heatHigh': 'High',
      'ae.dyn.risco.factors': 'Main factors that precede disengagement',
      'ae.dyn.risco.f1': 'Engagement drop',
      'ae.dyn.risco.f2': 'Low consistency',
      'ae.dyn.risco.f3': 'Lack of purpose',
      'ae.dyn.risco.f4': 'Reduced participation',
      // Educacional EN — chaves específicas (dropout risk)
      'ad.dyn.risco.analysis': 'Analysis',
      'ad.dyn.risco.turnover': 'Dropout Risk',
      'ad.dyn.risco.high': 'Students at high risk',
      'ad.dyn.risco.mid': 'Medium risk',
      'ad.dyn.risco.low': 'Low risk',
      'ad.dyn.risco.map': 'Map',
      'ad.dyn.risco.byTeam': 'Risk by Class',
      'ad.dyn.risco.heatLow': 'Low',
      'ad.dyn.risco.heatHigh': 'High',
      'ad.dyn.risco.factors': 'Main factors that precede dropout',
      'ad.dyn.risco.f1': 'Engagement drop',
      'ad.dyn.risco.f2': 'Low consistency',
      'ad.dyn.risco.f3': 'Lack of purpose',
      'ad.dyn.risco.f4': 'Reduced participation',
      'ae.dyn.an.active': 'Active',
      'ae.dyn.an.alert': 'Program alert: Participation down over the last two weeks.',
      'ae.dyn.an.pulse': 'Average pulse',
      'ae.dyn.an.pace': 'Average pace',
      'ae.dyn.an.rate': 'Completion rate',
      'ae.dyn.an.stories': 'Stories that need a new chapter',
      'ae.dyn.an.storiesSub': 'Absences and no response.',
      'ae.dyn.an.explore': 'Explore Journey',
      'ae.dyn.an.chartTitle': 'Program pulse',
      'ae.dyn.an.healthTitle': 'Journey Health',
      'ae.dyn.an.healthSub': 'Health Score · Class Average',
      'ae.dyn.an.p1': 'Advanced Programming',
      'ae.dyn.an.p2': 'AI Agents',
      'ae.dyn.an.p3': 'Marketing III',
      'ae.dyn.an.h1': 'Pulse',
      'ae.dyn.an.h1sub': 'Interaction intensity',
      'ae.dyn.an.h2': 'Pace',
      'ae.dyn.an.h2sub': 'Consistency on the path',
      'ae.dyn.an.h3': 'Growth',
      'ae.dyn.an.h3sub': 'Real progress achieved',
      'ae.dyn.an.h4': 'Alignment',
      'ae.dyn.an.h4sub': 'Connection with the mentor',
      'ae.dyn.an.t1': 'ADS 2025.1 · Class A',
      'ae.dyn.an.t2': 'MKT 2025.2 · Class B',
      'ae.dyn.an.t3': 'SI 2025.2 · Class A',
      'ae.dyn.an.months': 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec',
      // Educacional EN — analytics cards (prefixo ad)
      'ad.dyn.an.active': 'Active',
      'ad.dyn.an.alert': 'Program alert: Participation down over the last two weeks.',
      'ad.dyn.an.pulse': 'Average pulse',
      'ad.dyn.an.pace': 'Average pace',
      'ad.dyn.an.rate': 'Completion rate',
      'ad.dyn.an.stories': 'Stories that need a new chapter',
      'ad.dyn.an.storiesSub': 'Absences and no response.',
      'ad.dyn.an.explore': 'Explore Journey',
      'ad.dyn.an.chartTitle': 'Program pulse',
      'ad.dyn.an.healthTitle': 'Journey Health',
      'ad.dyn.an.healthSub': 'Health Score · Class Average',
      'ad.dyn.an.p1': 'Advanced Programming',
      'ad.dyn.an.p2': 'AI Agents',
      'ad.dyn.an.p3': 'Marketing III',
      'ad.dyn.an.h1': 'Pulse',
      'ad.dyn.an.h1sub': 'Interaction intensity',
      'ad.dyn.an.h2': 'Pace',
      'ad.dyn.an.h2sub': 'Consistency on the path',
      'ad.dyn.an.h3': 'Growth',
      'ad.dyn.an.h3sub': 'Real progress achieved',
      'ad.dyn.an.h4': 'Alignment',
      'ad.dyn.an.h4sub': 'Connection with the mentor',
      'ad.dyn.an.t1': 'ADS 2025.1 · Class A',
      'ad.dyn.an.t2': 'MKT 2025.2 · Class B',
      'ad.dyn.an.t3': 'SI 2025.2 · Class A',
      'ad.dyn.an.months': 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec',
      'ae.comp.trad': 'Traditional<br>tools',
      'ae.comp.newCat': 'The new category',
      'ae.comp.f1': 'Measurement frequency',
      'ae.comp.f1bad': 'Quarterly or yearly',
      'ae.comp.f1good': 'Continuous, real time',
      'ae.comp.f2': 'Signal captured',
      'ae.comp.f2bad': 'Survey response',
      'ae.comp.f2good': 'Observable behavior',
      'ae.comp.f3': 'Time to action',
      'ae.comp.f3bad': 'Weeks or months',
      'ae.comp.f3good': 'Days — automatic alert',
      'ae.comp.f4': 'Soft skills',
      'ae.comp.f4bad': 'Subjective self-assessment',
      'ae.comp.f4good': '8 measured axes',
      'ae.comp.f5': 'Team engagement',
      'ae.comp.f5bad': 'Optional response',
      'ae.comp.f5good': 'Gamified and daily',
      'ae.comp.f6': 'Turnover prediction',
      'ae.comp.f6bad': 'Reactive, after request',
      'ae.comp.f6good': 'Predictive by signals',
      'ae.kpi.p1': 'Active Programs',
      'ae.kpi.p2': 'Participants',
      'ae.kpi.p3': 'Pulse',
      'ae.kpi.p4': 'Completion',
      'ae.kpi.p5': 'Stories that need a new chapter',
      'ae.comp.azure': 'Microsoft Azure',
      'ae.comp.azureSub': 'Enterprise infrastructure',
      'ae.comp.lgpd': 'LGPD Compliant',
      'ae.comp.lgpdSub': 'Full compliance',
      'ae.comp.data': 'Aggregated data',
      'ae.comp.dataSub': 'No individual exposure',
      'ae.caso.c1t': 'Startups & Scale-ups',
      'ae.caso.c1s': '30 — 200 people',
      'ae.caso.c1l1': 'Build a strong culture from day one — before growth dilutes what makes you unique',
      'ae.caso.c1l2': 'Gamified onboarding',
      'ae.caso.c1l3': 'Real-time squad health',
      'ae.caso.c1l4': 'HUGO replaces old pulse rituals',
      'ae.caso.c1btn': 'See a demo',
      'ae.caso.c2t': 'Mid-Market',
      'ae.caso.c2s': '200 — 2,000 people',
      'ae.caso.c2l1': 'Keep team energy even as the company grows and distances increase',
      'ae.caso.c2l2': 'Early turnover detection',
      'ae.caso.c2l3': 'Leader development with AI Agents',
      'ae.caso.c2btn': 'Talk to a specialist',
      'ae.caso.c3t': 'Enterprise',
      'ae.caso.c3s': '2,000+ people',
      'ae.caso.c3l1': 'Consistent culture across areas, regions and BUs — full visibility for leadership',
      'ae.caso.c3l2': 'SSO + granular permissions',
      'ae.caso.c3l3': 'Dedicated SLA and CSM',
      'ae.caso.c3l4': 'Custom behavioral tracks',
      'ae.caso.c3btn': 'Talk to sales',
      'ae.footer.totop': 'Back to top',
      'ae.footer.lgpd': 'LGPD',
      'ae.footer.official': 'Official site',
      'ad.dyn.risco.turnover': 'Dropout Risk',
      'ad.dyn.risco.high': 'Students at high risk',
      'ad.dyn.risco.mid': 'Medium risk',
      'ad.dyn.risco.low': 'Low risk',
      'ad.dyn.risco.byTeam': 'Risk by Class',
      'ad.dyn.risco.factors': 'Main factors that precede dropout',
      'ad.dyn.risco.f1': 'Engagement drop',
      'ad.dyn.risco.f2': 'Low consistency',
      'ad.dyn.risco.f3': 'Lack of student agency',
      'ad.dyn.risco.f4': 'Reduced participation',
      'ad.kpi.p1': 'Active Programs',
      'ad.kpi.p2': 'Students tracked',
      'ad.kpi.p3': 'Engagement',
      'ad.kpi.p4': 'Retention',
      'ad.kpi.p5': 'Classes needing intervention',
      'ad.comp.trad': 'Traditional<br>tools',
      'ad.comp.newCat': 'The new category',
      'ad.comp.f1': 'Measurement frequency',
      'ad.comp.f1bad': 'Quarterly or yearly',
      'ad.comp.f1good': 'Continuous, real time',
      'ad.comp.f2': 'Signal captured',
      'ad.comp.f2bad': 'Survey response',
      'ad.comp.f2good': 'Observable behavior',
      'ad.comp.f3': 'Time to action',
      'ad.comp.f3bad': 'Weeks or months',
      'ad.comp.f3good': 'Days — automatic alert',
      'ad.comp.f4': 'Soft skills',
      'ad.comp.f4bad': 'Subjective self-assessment',
      'ad.comp.f4good': '8 measured axes',
      'ad.comp.f5': 'Student engagement',
      'ad.comp.f5bad': 'Optional response',
      'ad.comp.f5good': 'Gamified and daily',
      'ad.comp.f6': 'Dropout prediction',
      'ad.comp.f6bad': 'Reactive, after request',
      'ad.comp.f6good': 'Predictive by signals',
      'ad.caso.c1t': 'Schools',
      'ad.caso.c1s': 'Coordinators and principals',
      'ad.caso.c1l1': 'Real-time engagement and wellbeing',
      'ad.caso.c1l2': 'See beyond grades',
      'ad.caso.c1l3': 'More assertive interventions',
      'ad.caso.c1l4': 'Ethical data per class',
      'ad.caso.c1btn': 'Apply now',
      'ad.caso.c2t': 'Universities',
      'ad.caso.c2s': 'Provosts and coordinators',
      'ad.caso.c2l1': 'Real retention data',
      'ad.caso.c2l2': 'Student agency and autonomy',
      'ad.caso.c2l3': 'Indicators beyond academic performance',
      'ad.caso.c2l4': 'Behavioral view by course and class',
      'ad.caso.c2btn': 'Talk to a specialist',
      'ad.caso.c3t': 'Training programs',
      'ad.caso.c3s': 'Instructors and mentors',
      'ad.caso.c3l1': 'Who is growing',
      'ad.caso.c3l2': 'Who is at risk',
      'ad.caso.c3l3': 'Which intervention works',
      'ad.caso.c3l4': 'Continuous follow-up',
      'ad.caso.c3btn': 'Contact us',
      'blog.more': 'More articles',
      'blog.seeAll': 'View all →',
      'blog.readMin': 'min read',
    },
  });

  /* ── Blog ── */
  merge({
    pt: {
      'meta.title': 'Dicas U.GO — Hábitos, produtividade e desenvolvimento humano',
      'meta.title.blog': 'Dicas U.GO — Hábitos, produtividade e desenvolvimento humano',
      'blog.h1': 'Dicas<br/><em>U.GO</em>',
      'blog.sub': 'Hábitos, produtividade e desenvolvimento humano. Conteúdo prático para evoluir todo dia.',
      'blog.tab.all': 'Tudo',
      'blog.tab.habits': 'Hábitos',
      'blog.tab.prod': 'Produtividade',
      'blog.tab.soft': 'Soft Skills',
      'blog.tab.time': 'Gestão de Tempo',
      'blog.tab.ai': 'IA & Tecnologia',
      'blog.tab.comm': 'Comunidade',
      'blog.nl.h2': 'Conteúdo que <em>vale seu tempo</em><br/>na sua caixa de entrada.',
      'blog.nl.p':
        'Toda semana, um artigo prático sobre hábitos, produtividade e desenvolvimento humano.<br/>Sem spam. Cancele quando quiser.',
      'blog.nl.placeholder': 'seu@email.com',
      'blog.nl.btn': 'Quero receber →',
    },
    en: {
      'meta.title': 'U.GO Tips — Habits, productivity and human development',
      'meta.title.blog': 'U.GO Tips — Habits, productivity and human development',
      'blog.h1': 'Tips<br/><em>U.GO</em>',
      'blog.sub': 'Habits, productivity and human development. Practical content to grow every day.',
      'blog.tab.all': 'All',
      'blog.tab.habits': 'Habits',
      'blog.tab.prod': 'Productivity',
      'blog.tab.soft': 'Soft Skills',
      'blog.tab.time': 'Time Management',
      'blog.tab.ai': 'AI & Technology',
      'blog.tab.comm': 'Community',
      'blog.nl.h2': 'Content worth your time<br/>in your inbox.',
      'blog.nl.p':
        'Every week, a practical article on habits, productivity and human development.<br/>No spam. Unsubscribe anytime.',
      'blog.nl.placeholder': 'you@email.com',
      'blog.nl.btn': 'Subscribe →',
    },
  });

  global.__ugoBlogApplyLang = function (l, t) {
    const CAT = {
      pt: {
        habitos: 'Hábitos',
        produtividade: 'Produtividade',
        'soft-skills': 'Soft Skills',
        gestao: 'Gestão de Tempo',
        ia: 'IA & Tecnologia',
        comunidade: 'Comunidade',
      },
      en: {
        habitos: 'Habits',
        produtividade: 'Productivity',
        'soft-skills': 'Soft Skills',
        gestao: 'Time Management',
        ia: 'AI & Technology',
        comunidade: 'Community',
      },
    };
    const labels = CAT[l] || CAT.pt;
    if (typeof window.CAT_LABELS !== 'undefined') {
      Object.assign(window.CAT_LABELS, labels);
    }
    document.querySelectorAll('.grid-card-cat, .art-cat, .sticky-left-cat').forEach((el) => {
      const slug = el.dataset.cat;
      if (slug && labels[slug]) el.textContent = labels[slug];
    });
  };

  /* ── Legal (nav + títulos) ── */
  merge({
    pt: {
      'legal.terms.title': 'TERMO DE USO – U.GO',
      'legal.privacy.title': 'POLÍTICA DE PRIVACIDADE – U.GO',
      'meta.title.terms': 'Termos de Uso — U.GO',
      'meta.title.privacy': 'Política de Privacidade — U.GO',
      'post.back': '← Todas as dicas',
      'meta.title.post': 'Artigo — U.GO Dicas',
    },
    en: {
      'legal.terms.title': 'TERMS OF USE – U.GO',
      'legal.privacy.title': 'PRIVACY POLICY – U.GO',
      'meta.title.terms': 'Terms of Use — U.GO',
      'meta.title.privacy': 'Privacy Policy — U.GO',
      'post.back': '← All tips',
      'meta.title.post': 'Article — U.GO Tips',
    },
  });

  // fix motion.div typo in source if any slipped
})(typeof window !== 'undefined' ? window : global);
