# U.GO para Empresas — Landing Page

> Especificação UI/UX completa para a landing page B2B do U.GO voltada a empresas, seguindo a linha visual da página institucional (modelo: U.GO para Instituições de Ensino).

**Stack alvo:** HTML + Tailwind CSS (compatível com /ui-ux-pro-max claude design)
**Estilo:** Minimalismo premium com pontos de calor laranja, cards com sombra suave, dashboards realistas e mascote astronauta U.GO.
**Tom:** Consultivo, dado-driven, executivo. Foco em performance, retenção e ROI comportamental.

---

## 1. Design System

### 1.1 Paleta de cores

| Token | Hex | Uso |
|---|---|---|
| `--bg` | `#FFFFFF` | Fundo principal |
| `--bg-soft` | `#FAFAF7` | Fundo de seções alternadas |
| `--bg-warm` | `#FFF6EE` | Bloco "Comunidade e Gamificação" |
| `--bg-dark` | `#0F1115` | Footer / CTA final |
| `--ink` | `#0E0E10` | Títulos |
| `--ink-2` | `#2B2B2E` | Corpo |
| `--ink-3` | `#6B6B70` | Auxiliar / labels |
| `--brand` | `#FF6A1A` | Laranja U.GO (CTA, destaques) |
| `--brand-soft` | `#FFE3D1` | Tag pill / badges |
| `--success` | `#22C55E` | KPI positivo |
| `--warn` | `#F59E0B` | KPI atenção |
| `--danger` | `#EF4444` | Risco / alertas |
| `--blue` | `#2F6BFF` | Gráficos secundários |
| `--line` | `#ECECEA` | Bordas e separadores |

**Contraste mínimo:** Todos os pares texto/fundo atendem WCAG AA 4.5:1.

### 1.2 Tipografia

- **Display / H1:** Inter / Geist Bold — 56–64px, line-height 1.05, tracking -0.02em
- **H2:** 36–40px, peso 700, line-height 1.15
- **H3 (card title):** 18–20px, peso 600
- **Body:** 16px, peso 400, line-height 1.55, cor `--ink-2`
- **Caption / label:** 12–13px, peso 500, uppercase + tracking 0.08em, cor `--brand` para tags de seção

### 1.3 Sistema de espaçamento

Ritmo 4/8/16/24/32/48/64/96. Seções verticais respiram com **96px (desktop) / 64px (mobile)** entre blocos.

### 1.4 Componentes-chave

- **Card** — `bg-white`, borda `1px solid --line`, radius `20px`, sombra `0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.05)`
- **Pill** — `bg-brand-soft`, texto laranja, radius full, padding `6px 12px`, uppercase
- **CTA primário** — `bg-brand`, texto branco, radius `12px`, padding `14px 22px`, ícone seta à direita, hover: brightness 1.08
- **CTA secundário** — borda `--line`, fundo branco, mesmo padding
- **KPI Tile** — número grande (32–40px peso 700) + label cinza + delta verde/vermelho com seta

---

## 2. Estrutura da Página (seções na ordem)

### Seção 1 — Hero
### Seção 2 — O Problema (Dor)
### Seção 3 — Agentes de IA para o time
### Seção 4 — Soft Skills mensuráveis
### Seção 5 — Comunidade e Gamificação corporativa
### Seção 6 — Analytics para gestores
### Seção 7 — Casos de uso por porte
### Seção 8 — CTA Final (futuro do trabalho)

---

## 3. Seção 1 — HERO

**Pill:** `PARA EMPRESAS`

**Headline (2 linhas):**
> **Transforme comportamento em performance real.**

**Subheadline:**
> A plataforma de inteligência comportamental que ajuda empresas a desenvolver, medir e acompanhar engajamento, soft skills e constância dos times — em tempo real.

**CTAs:**
- Primário: `Agendar demonstração →`
- Secundário: `Ver plataforma →`

**Chips de feature abaixo dos CTAs (4 colunas com ícone outline + label curta):**
1. IA Conversacional (HUGO)
2. Analytics em tempo real
3. Comunidade e Gamificação
4. Foco em Soft Skills

**Lado direito (composição visual):**
- Mockup de **dashboard desktop** flutuando (Visão Geral da Empresa) com 4 KPIs no topo:
  - Engajamento médio `82%` (+12% vs mês anterior)
  - Constância `76%`
  - Colaboradores ativos `1.842`
  - Risco de turnover `8%` (-3%)
- Gráfico de área "Evolução de Engajamento" com pico marcado em 87%
- Donut "Engajamento por Time" (verde/laranja/vermelho — Alto / Médio / Baixo)
- Card "Colaboradores em Risco" com 3 avatares + tag "Engajamento -45%"
- Mockup de **iPhone sobreposto** mostrando chat com HUGO ("Olá, Ana! Pronta pra evoluir hoje?") + cards de constância (4/5, 2h 35m, 12 dias)
- **Mascote astronauta U.GO** sentado ao centro inferior da composição, acenando — mesmo asset da página institucional
- Card flutuante "HUGO IA — Como posso te ajudar hoje?" com avatar circular

> **Diretrizes:** A composição precisa transmitir **"dashboard executivo + app na mão do colaborador"**. Use sombras suaves, leve perspectiva nos mockups (3–5°) e pequenos pontos laranja decorativos.

---

## 4. Seção 2 — O PROBLEMA

**Pill:** `O PROBLEMA`

**H2 (esquerda):**
> **A maioria das empresas ainda não consegue enxergar o que acontece antes do disengagement.**

**Grid 2 colunas (50/50):**

**Coluna esquerda — 7 cards 3×3 (ícones outline minimalistas):**
1. Desengajamento silencioso
2. Baixa constância
3. Procrastinação
4. Falta de protagonismo
5. Baixa participação
6. Risco de turnover
7. Soft skills pouco desenvolvidas

> Cards pequenos quadrados, ícone topo-esquerda, label embaixo, `radius 16px`, hover sutil (eleva 2px).

**Coluna direita — Painel de dados:**

Bloco superior **"Análise de Risco de Turnover"**:
| Faixa | Colaboradores |
|---|---|
| Risco alto | **32** |
| Risco médio | **57** |
| Risco baixo | **128** |

Bloco direito **"Mapa de Risco por Time"** — heatmap 5×6 com células verdes/amarelas/laranjas/vermelhas (times rotulados: COM 1, OPS 1, FIN 1, RH 1, TI 1, JUR 1 etc).

Bloco inferior **"Principais fatores que antecedem o disengagement"** — 4 barras horizontais com porcentagens:
- Queda de engajamento — 72%
- Baixa constância — 65%
- Falta de propósito — 48%
- Participação reduzida — 42%

---

## 5. Seção 3 — AGENTES DE IA

**Pill:** `AGENTES DE IA`

**H2:**
> **Agentes inteligentes que acompanham comportamento diariamente.**

**Subheadline curta** (1 linha):
> Cada agente atua em uma frente — e todos conversam com o HUGO, o copiloto comportamental da sua empresa.

**Grid 4 cards de chat + 1 ilustração à direita:**

Cada card mostra:
- Topo: avatar circular colorido + nome do agente
- Tag "HUGO" pequena
- Bolha de mensagem (texto simulado)
- Botão pequeno laranja com CTA dentro da bolha

| # | Agente | Mensagem-exemplo | CTA |
|---|---|---|---|
| 1 | **Agente de Engajamento** | "Notei que sua participação caiu nas últimas 2 semanas. Vamos retomar juntos?" | `Vamos sim →` |
| 2 | **Agente de Bem-estar** | "Como você tem se sentido nesta sprint?" | `Quero conversar` |
| 3 | **Agente de Constância** | "Que tal manter sua sequência ativa? Você consegue!" | `Bora continuar` |
| 4 | **Agente de Clareza e Futuro** | "Qual seu objetivo para os próximos 3 meses?" | `Definir agora` |

À direita: ilustração isométrica simples de um "cérebro orbital" laranja com pontos conectados (mesmo asset da referência).

> **Subtítulo abaixo dos cards (linha única, cinza claro):** "Identifica sinais de disengagement e ajuda a empresa a agir antes que o problema cresça."

---

## 6. Seção 4 — SOFT SKILLS

**Pill:** `SOFT SKILLS`

**H2:**
> **Soft skills deixaram de ser invisíveis.**

**Subheadline:**
> Acompanhe o desenvolvimento dos comportamentos que fazem sua empresa entregar mais — com dados, não com achismo.

**Layout 3 colunas:**

**Coluna 1 — KPI gauge:**
- Card "Score Comportamental Geral"
- Donut grande com **78** ao centro
- Label "Muito bom"
- Delta "+11% vs mês anterior" em verde

**Coluna 2 — Radar Chart:**
Título "Evolução das Soft Skills"
8 eixos (escala 0–100):
- Protagonismo — 92
- Comunicação — 76
- Organização — 81
- Liderança — 70
- Inteligência emocional — 84
- Adaptabilidade — 75
- Disciplina — 79
- Colaboração — 77

Centro do radar: **78** "Score médio". Cores: verde (baixo), laranja (médio), azul (alto).

**Coluna 3 — Tabela de evolução:**
| Soft Skill | Score | Evolução |
|---|---|---|
| Protagonismo | 82 | +12% |
| Comunicação | 76 | +9% |
| Organização | 81 | +10% |
| Liderança | 70 | +6% |
| Inteligência emocional | 84 | +14% |
| Adaptabilidade | 75 | +7% |
| Disciplina | 79 | +9% |
| Colaboração | 77 | +11% |

Setas verdes em todas as linhas. Tabela com `divide-y` finíssima.

---

## 7. Seção 5 — COMUNIDADE E GAMIFICAÇÃO

**Pill:** `COMUNIDADE E GAMIFICAÇÃO`
**Fundo:** `--bg-warm` (#FFF6EE) — único bloco com fundo quente em toda a página.

**H2:**
> **Times evoluem mais quando pertencem.**

**Subheadline:**
> Desafios, reconhecimento e ritual diário que criam motivação, constância e resultados reais — sem precisar puxar o time.

**Grid 4 colunas (cards + mockup mobile):**

**Card 1 — Ranking da Semana:**
Lista com 4 colaboradores, avatares circulares, XP em laranja:
- 🥇 Ana Clara — 2.350 XP
- 🥈 Lucas M. — 2.100 XP
- 🥉 Mariana S. — 1.950 XP
- 4º João V. — 1.800 XP
Link rodapé: `Ver ranking completo →`

**Card 2 — Desafio Ativo (dark card):**
- Fundo preto `#0F1115`, texto branco
- Título: "Comunicação Assertiva"
- Texto curto: "Conclua atividades e ganhe recompensas no final"
- Tag XP "+150"
- Barra de progresso laranja
- Footer: "Termina em 3 dias"

**Card 3 — Streak / Constância:**
- Ícone fogo laranja
- Número gigante: **12**
- Label: "Dias de sequência"
- Texto: "Continue para preservar seu recorde"
- 7 círculos de dias da semana (5 verdes preenchidos, 2 com check)

**Card 4 — Feed da Comunidade:**
- Header com avatar + nome + tempo
- Post: "Beatriz A. compartilhou: Conclui o desafio de Liderança 🚀"
- Reações com emojis pequenos
- 1 comentário visível

**Mockup mobile à direita ("Meu Perfil"):**
- iPhone com perfil "Ana Clara — Nível 6 — Engajada"
- Stats: 1.250 XP
- Galeria de badges (6 emblemas circulares coloridos)
- Tabs: Estatísticas / 12 desafios / 48 missões

**Linha inferior — 5 mini-features com ícones outline:**
- Desafios semanais
- Missões coletivas
- Reconhecimento
- Recompensas
- XP por atividades

---

## 8. Seção 6 — ANALYTICS PARA GESTORES

**Pill:** `ANALYTICS PARA GESTORES`

**H2:**
> **Dados comportamentais em tempo real.**

**Subheadline:**
> Relatórios inteligentes que ajudam RH, líderes e diretoria a tomarem decisões mais assertivas.

**CTA:** `Ver todos os relatórios →` (link, não botão)

**Linha 1 — 4 KPIs grandes (cards brancos):**
| KPI | Valor | Delta |
|---|---|---|
| Índice de Engajamento | **82%** | +12% vs mês anterior (verde) |
| Índice de Constância | **76%** | +9% (verde) |
| Índice de Protagonismo | **71%** | +9% (verde) |
| Índice de Clareza | **68%** | +7% (verde) |

**Linha 2 — Grid 4 colunas:**

**Card A — "Colaboradores em Risco":**
Lista com 3 pessoas:
- Mariana G. — Queda de engajamento — `-45%` (vermelho)
- João V. — Baixa constância — `-38%` (vermelho)
- Beatriz A. — Baixa participação — `-32%` (vermelho)
Link: `Ver todos →`

**Card B — "Evolução dos Times":**
Gráfico de linhas (3 linhas: Time A laranja, Time B azul, Time C verde) cruzando jan–mai. Legenda inferior.

**Card C — "Alertas preventivos":**
3 mini-cards com ícone à esquerda:
- 🟠 **Atenção:** 8 colaboradores com queda significativa de engajamento
- 🔴 **Time B** com aumento de procrastinação nas últimas semanas
- 🟡 **Sugestão:** atividade de conexão para o Time C
Link: `Ver todos os alertas →`

**Card D — "Relatórios Institucionais":**
3 itens listados:
- Relatório Mensal — Junho/2026
- Relatório de Soft Skills — 2º Trimestre 2026
- Relatório de Turnover — Anual 2026
Link: `Ver todos →`

---

## 9. Seção 7 — CASOS DE USO POR PORTE *(nova, exclusiva da página B2B Empresas)*

**Pill:** `CASOS DE USO`

**H2:**
> **U.GO se adapta ao tamanho da sua operação.**

**Grid 3 cards grandes (radius 24px, padding generoso):**

**Card 1 — Startups & Scale-ups (30–200 pessoas)**
- Ícone foguete outline
- Bullets:
  - Cultura escalável sem perder tração
  - Onboarding gamificado
  - Squad health em tempo real
  - HUGO substitui rituais de pulse antigos
- CTA: `Quero ver demo →`

**Card 2 — Mid-Market (200–2.000 pessoas)**
- Ícone prédio outline
- Bullets:
  - Visão consolidada de múltiplas áreas
  - Detecção precoce de turnover
  - Desenvolvimento de líderes com Agentes de IA
  - Integração com ERP/HRIS existente
- CTA: `Falar com especialista →`

**Card 3 — Enterprise (2.000+ pessoas)**
- Ícone globo outline
- Bullets:
  - SSO + permissões granulares
  - Dashboards por BU, região e gestor
  - SLA dedicado e CSM
  - Trilhas comportamentais customizadas
- CTA: `Conversar com vendas →`

> Cards com hover lift de 4px, sombra que intensifica suavemente.

---

## 10. Seção 8 — CTA FINAL

**Fundo:** `--bg-dark` (#0F1115) — bloco preto full-bleed.

**Composição:**
- Lado esquerdo: H2 branco grande
  > **O futuro do trabalho será construído pelas empresas que desenvolvem comportamento, não apenas competência.**
- CTA primário laranja abaixo: `Agendar demonstração →`
- Lado direito: mascote astronauta U.GO de costas + overlay de dashboards translúcidos com gráficos (radar + KPI 82% + curva)

Altura mínima: 320px. Mesma proporção do bloco da página institucional.

---

## 11. Comportamento e Microinterações

| Elemento | Comportamento |
|---|---|
| Cards | Hover: `translateY(-2px)` + sombra intensifica em 200ms ease-out |
| CTA primário | Hover: `brightness(1.08)` + leve scale 1.02 (180ms) |
| KPIs | Entrada: count-up animado de 0 ao valor quando entra no viewport |
| Radar chart | Animação de "preencher" eixos em sequência (stagger 50ms) |
| Heatmap risco | Hover em célula mostra tooltip com nome do time e métrica |
| Scroll | Smooth scroll entre âncoras; nav fixa no topo após 80px |
| Reduced-motion | Respeitar `prefers-reduced-motion: reduce` (sem count-up, sem stagger) |

---

## 12. Responsividade

**Breakpoints:** `sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1440`

- **Mobile (≤768):** Hero empilha (texto em cima, dashboards em mockup único embaixo); seções viram 1 coluna; tabela de soft skills vira lista de chips; heatmap mantém scroll horizontal.
- **Tablet (768–1024):** Grids 2 colunas em vez de 3–4.
- **Desktop (≥1280):** Container max-width `1240px`, padding lateral `40px`.

Touch targets ≥44×44px em todos os CTAs e cards clicáveis.

---

## 13. Acessibilidade (checklist obrigatório)

- [ ] Contraste texto principal ≥ 4.5:1 (validado para `--ink-2` sobre `--bg` e `--bg-warm`)
- [ ] Headings em hierarquia sequencial h1→h2→h3 (sem pular níveis)
- [ ] Todos os ícones decorativos com `aria-hidden="true"`
- [ ] Botões com label clara (não usar só seta)
- [ ] Gráficos com `aria-label` + tabela alternativa em `<table>` oculta para screen reader
- [ ] Foco visível com outline de 2px laranja em todos elementos interativos
- [ ] Imagens de mockup com `alt` descritivo (ex: "Dashboard U.GO mostrando 82% de engajamento")
- [ ] Suporte completo a navegação por teclado (Tab cobre toda a página em ordem visual)

---

## 14. Copy de SEO (meta + OG)

**Title:** U.GO para Empresas — Inteligência comportamental para times de alta performance

**Meta description:** Plataforma de inteligência comportamental que ajuda empresas a medir engajamento, desenvolver soft skills e reduzir turnover com IA — em tempo real.

**OG Image:** Mesma composição do hero (dashboard + mascote U.GO + mockup mobile)

---

## 15. Próximos passos sugeridos

1. Validar a copy do hero e dos 7 cards de dor com o time comercial do U.GO
2. Definir se a seção "Casos de Uso por Porte" terá página individual por segmento
3. Confirmar quais integrações listar no card Enterprise (SSO, ADP, Senior, TOTVS etc.)
4. Decidir se o formulário de "Agendar demonstração" abre modal ou página dedicada
5. Pedir versão escura (opcional) — toda a paleta já mapeada permite dark mode com troca de `--bg` / `--ink`

---

**Pronto para implementação.** Quando quiser, posso gerar o HTML+Tailwind completo dessa página em um único arquivo (com SVGs inline para gráficos e mockups), seguindo este MD como contrato.
