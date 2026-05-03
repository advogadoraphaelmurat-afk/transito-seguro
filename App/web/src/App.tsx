import { useState, useEffect, useRef } from 'react';
import pedestre from './assets/pedestre.gif';
import {
  Users,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
  Award,
  CheckCircle2,
  TrendingUp,
  Download,
  Search,
  Clock,
  TrafficCone,
  Shield,
  Zap,
  Map,
  Bell
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

/* ─── Mock data ─────────────────────────────────────── */
const engajamentoData = [
  { day: 'Seg', alunos: 45, missoes: 30 },
  { day: 'Ter', alunos: 62, missoes: 48 },
  { day: 'Qua', alunos: 58, missoes: 40 },
  { day: 'Qui', alunos: 80, missoes: 65 },
  { day: 'Sex', alunos: 95, missoes: 82 },
];

const missoesData = [
  { name: 'Ponto Cego', count: 45 },
  { name: 'Investigador', count: 32 },
  { name: 'Protetor', count: 24 },
  { name: 'Ativista', count: 17 },
];

const students = [
  { id: 1, name: 'Ana Silva',    initials: 'AS', color: '#FEF3C7', grade: '4º Ano F1', xp: 1250, mission: 'Ponto Cego',    status: 'Concluído' },
  { id: 2, name: 'Bruno Costa',  initials: 'BC', color: '#DBEAFE', grade: '4º Ano F1', xp: 800,  mission: 'Ponto Cego',    status: 'Em progresso' },
  { id: 3, name: 'Carla Dias',   initials: 'CD', color: '#DCFCE7', grade: '6º Ano F2', xp: 2100, mission: 'Epidemia Moto', status: 'Concluído' },
  { id: 4, name: 'Daniel Alves', initials: 'DA', color: '#EDE9FE', grade: '6º Ano F2', xp: 1500, mission: 'Epidemia Moto', status: 'Concluído' },
  { id: 5, name: 'Eduarda Reis', initials: 'ER', color: '#FEE2E2', grade: '1º Ano EM', xp: 3200, mission: 'Ativista',      status: 'Em progresso' },
];

/* ─── Animated traffic light ───────────────────────── */
// Sequência real de semáforo: Verde → Amarelo → Vermelho → Amarelo → Verde
// Amarelo aparece nas DUAS transições com duração igual e visível
function TrafficLight() {
  const [phase, setPhase] = useState<'red' | 'yellow' | 'green'>('green');

  useEffect(() => {
    const sequence: Array<['red' | 'yellow' | 'green', number]> = [
      ['green',  4000],
      ['yellow', 1500],
      ['red',    4000],
      ['yellow', 1500],
    ];
    
    let timer: ReturnType<typeof setTimeout>;
    let currentIdx = 0;

    const tick = () => {
      const [color, duration] = sequence[currentIdx];
      setPhase(color);
      currentIdx = (currentIdx + 1) % sequence.length;
      timer = setTimeout(tick, duration);
    };

    tick();
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="traffic-light">
      <div className={`tl-bulb red    ${phase === 'red'    ? 'active' : ''}`} />
      <div className={`tl-bulb yellow ${phase === 'yellow' ? 'active' : ''}`} />
      <div className={`tl-bulb green  ${phase === 'green'  ? 'active' : ''}`} />
    </div>
  );
}


/* ─── Custom tooltip para charts ───────────────────── */
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload?.length) {
    return (
      <div style={{
        background: '#0D0D0D',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 8,
        padding: '8px 12px',
        fontSize: '0.8rem',
        color: '#fff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
      }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 4, fontSize: '0.7rem' }}>{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color, fontWeight: 600 }}>
            {p.value} {p.name === 'alunos' ? 'alunos' : 'missões'}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

/* ─── Main App ──────────────────────────────────────── */
export default function App() {
  const [search, setSearch] = useState('');
  const [activeView, setActiveView] = useState('overview');

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.mission.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-root">
      {/* Faixa de trânsito animada no topo absoluto */}
      <div className="traffic-stripe-top" />

      <div className="dashboard-container">
        {/* ══════════════════ SIDEBAR ══════════════════ */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-icon">
              <TrafficCone size={18} color="#0D0D0D" />
            </div>
            <div className="logo-text">
              <div className="brand">Trânsito Seguro</div>
              <div className="sub">Cidade Viva · RJ</div>
            </div>
          </div>

          {/* Semáforo animado */}
          <TrafficLight />

          {/* Navegação principal */}
          <div className="sidebar-section-label">Menu</div>
          <nav className="sidebar-nav">
            <div 
              className={`nav-item ${activeView === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveView('overview')}
            >
              <BarChart3 size={16} />
              <span>Visão Geral</span>
            </div>
            <div 
              className={`nav-item ${activeView === 'classes' ? 'active' : ''}`}
              onClick={() => setActiveView('classes')}
            >
              <Users size={16} />
              <span>Turmas</span>
            </div>
            <div 
              className={`nav-item ${activeView === 'curriculum' ? 'active' : ''}`}
              onClick={() => setActiveView('curriculum')}
            >
              <BookOpen size={16} />
              <span>Currículo</span>
            </div>
            <div className="nav-item">
              <Award size={16} />
              <span>XP & Missões</span>
            </div>
            <div className="nav-item">
              <Map size={16} />
              <span>Mapa de Calor</span>
            </div>
            <div className="nav-item">
              <Shield size={16} />
              <span>Relatórios</span>
            </div>
          </nav>

          <div className="sidebar-section-label" style={{ marginTop: '1rem' }}>Configurar</div>
          <nav className="sidebar-nav">
            <div className="nav-item">
              <Bell size={16} />
              <span>Notificações</span>
            </div>
            <div className="nav-item">
              <Settings size={16} />
              <span>Configurações</span>
            </div>
          </nav>

          {/* Footer */}
          <div className="sidebar-footer">
            <nav className="sidebar-nav">
              <div className="nav-item danger">
                <LogOut size={16} />
                <span>Sair</span>
              </div>
            </nav>
            <div className="sidebar-version">v2.1.0 · 2026 · Estado do RJ</div>
          </div>
        </aside>

        {/* ══════════════════ MAIN CONTENT ══════════════════ */}
        <main className="main-content">
          {/* Topbar */}
          <div className="topbar">
            <div className="topbar-left">
              {/* GIF discreto entre a sidebar e o título */}
              <img
                src={pedestre}
                alt="Pedestre semáforo"
                className="topbar-gif"
              />
              <div>
                <h1>Painel do Professor</h1>
                <p>Escola Municipal · Turno Manhã · Semana 18</p>
              </div>
            </div>
            <div className="topbar-right">
              <button className="btn btn-ghost">
                <Bell size={14} />
                Alertas
              </button>
              <button className="btn btn-primary">
                <Download size={14} />
                Exportar
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="content-area">
            {activeView === 'overview' && (
              <div className="view-fade-in">
                {/* ── Hero Banner ── */}
                <div className="hero-banner">
                  <div className="hero-text">
                    <div className="hero-badge">
                      <span className="dot" />
                      Semana letiva em andamento
                    </div>
                    <h2>
                      Bom trabalho,<br />
                      <span>Prof. Raphael! 🚦</span>
                    </h2>
                    <p>Suas turmas estão com 87% de taxa de conclusão — acima da média estadual.</p>
                  </div>

                  <div className="hero-stats">
                    <div className="hero-stat">
                      <div className="value"><em>124</em></div>
                      <div className="label">Alunos ativos</div>
                    </div>
                    <div className="hero-divider" />
                    <div className="hero-stat">
                      <div className="value"><em>87</em><span style={{ fontSize: '1.2rem', color: '#F5C518' }}>%</span></div>
                      <div className="label">Conclusão</div>
                    </div>
                    <div className="hero-divider" />
                    <div className="hero-stat">
                      <div className="value"><em>1.4K</em></div>
                      <div className="label">XP médio</div>
                    </div>
                  </div>
                </div>

                {/* ── Stat cards ── */}
                <div className="stats-grid">
                  <div className="stat-card accent-amber">
                    <div className="stat-card-top">
                      <div className="stat-icon amber">
                        <Users size={16} />
                      </div>
                      <span className="stat-change up">
                        <TrendingUp size={12} /> +12%
                      </span>
                    </div>
                    <div className="stat-label">Alunos Ativos</div>
                    <div className="stat-value">124</div>
                    <div className="stat-sub">6 novos esta semana</div>
                  </div>

                  <div className="stat-card accent-green">
                    <div className="stat-card-top">
                      <div className="stat-icon green">
                        <Zap size={16} />
                      </div>
                      <span className="stat-change up">
                        <TrendingUp size={12} /> Consistente
                      </span>
                    </div>
                    <div className="stat-label">Média de XP</div>
                    <div className="stat-value">1.450</div>
                    <div className="stat-sub">Meta: 2.000 XP/semestre</div>
                    <div className="mini-progress">
                      <div className="mini-progress-fill" style={{ width: '72%', background: '#22C55E' }} />
                    </div>
                  </div>

                  <div className="stat-card accent-blue">
                    <div className="stat-card-top">
                      <div className="stat-icon blue">
                        <CheckCircle2 size={16} />
                      </div>
                      <span className="stat-change up">
                        <TrendingUp size={12} /> +5%
                      </span>
                    </div>
                    <div className="stat-label">Taxa de Conclusão</div>
                    <div className="stat-value">87<span style={{ fontSize: '1rem', fontWeight: 500, color: '#6B6B6B' }}>%</span></div>
                    <div className="mini-progress">
                      <div className="mini-progress-fill" style={{ width: '87%', background: '#3B82F6' }} />
                    </div>
                  </div>

                  <div className="stat-card accent-purple">
                    <div className="stat-card-top">
                      <div className="stat-icon purple">
                        <Award size={16} />
                      </div>
                      <span className="stat-change flat">
                        <Clock size={12} /> Esta semana
                      </span>
                    </div>
                    <div className="stat-label">Missões Completadas</div>
                    <div className="stat-value">38</div>
                    <div className="stat-sub">de 48 atribuídas</div>
                  </div>
                </div>

                {/* ── Charts ── */}
                <div className="data-grid">
                  {/* Engajamento semanal */}
                  <div className="data-card">
                    <div className="data-card-header">
                      <div className="data-card-title">
                        <div className="icon-wrap">
                          <BarChart3 size={14} color="#6B6B6B" />
                        </div>
                        Engajamento Semanal
                      </div>
                      <span className="chip">↑ 18% vs semana anterior</span>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                      <AreaChart data={engajamentoData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="gradAlunos" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%"  stopColor="#F5C518" stopOpacity={0.25} />
                            <stop offset="95%" stopColor="#F5C518" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="gradMissoes" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%"  stopColor="#22C55E" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0EE" />
                        <XAxis
                          dataKey="day"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#9B9B9B', fontSize: 11 }}
                          dy={8}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#9B9B9B', fontSize: 11 }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="alunos"
                          stroke="#F5C518"
                          strokeWidth={2}
                          fill="url(#gradAlunos)"
                        />
                        <Area
                          type="monotone"
                          dataKey="missoes"
                          stroke="#22C55E"
                          strokeWidth={2}
                          fill="url(#gradMissoes)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: '#6B6B6B' }}>
                        <div style={{ width: 10, height: 10, borderRadius: 2, background: '#F5C518' }} />
                        Alunos
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: '#6B6B6B' }}>
                        <div style={{ width: 10, height: 10, borderRadius: 2, background: '#22C55E' }} />
                        Missões
                      </div>
                    </div>
                  </div>

                  {/* Missões mais populares */}
                  <div className="data-card">
                    <div className="data-card-header">
                      <div className="data-card-title">
                        <div className="icon-wrap">
                          <Award size={14} color="#6B6B6B" />
                        </div>
                        Missões Mais Populares
                      </div>
                      <span className="chip">4 missões ativas</span>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart
                        data={missoesData}
                        layout="vertical"
                        margin={{ top: 4, right: 4, left: 8, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F0F0EE" />
                        <XAxis
                          type="number"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#9B9B9B', fontSize: 11 }}
                        />
                        <YAxis
                          type="category"
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#6B6B6B', fontSize: 11 }}
                          width={80}
                        />
                        <Tooltip
                          cursor={{ fill: '#F8F8F7' }}
                          contentStyle={{
                            background: '#0D0D0D',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 8,
                            fontSize: '0.8rem',
                            color: '#fff',
                          }}
                        />
                        <Bar
                          dataKey="count"
                          fill="#F5C518"
                          radius={[0, 4, 4, 0]}
                          barSize={22}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* ── Divisor de faixa ── */}
                <div className="road-divider" />

                {/* ── Tabela de alunos ── */}
                <div className="table-section">
                  <div className="table-header">
                    <div className="table-header-left">
                      <Users size={16} color="#6B6B6B" />
                      <h3>Registro de Alunos</h3>
                      <span className="table-count">{filtered.length}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <div className="search-wrap">
                        <Search size={14} className="search-icon" />
                        <input
                          type="text"
                          placeholder="Buscar aluno ou missão..."
                          className="search-input"
                          value={search}
                          onChange={e => setSearch(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Aluno</th>
                          <th>Turma</th>
                          <th>Total XP</th>
                          <th>Módulo Atual</th>
                          <th>Situação</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.length > 0 ? filtered.map(s => (
                          <tr key={s.id}>
                            <td>
                              <div className="student-info">
                                <div
                                  className="student-avatar"
                                  style={{ background: s.color }}
                                >
                                  {s.initials}
                                </div>
                                <span className="student-name">{s.name}</span>
                              </div>
                            </td>
                            <td style={{ color: '#6B6B6B', fontSize: '0.825rem' }}>{s.grade}</td>
                            <td>
                              <span className="xp-pill">{s.xp.toLocaleString('pt-BR')}</span>
                            </td>
                            <td style={{ fontSize: '0.825rem' }}>{s.mission}</td>
                            <td>
                              <span className={`badge ${s.status === 'Concluído' ? 'badge-success' : 'badge-warning'}`}>
                                {s.status === 'Concluído'
                                  ? <CheckCircle2 size={12} />
                                  : <Clock size={12} />
                                }
                                {s.status}
                              </span>
                            </td>
                          </tr>
                        )) : (
                          <tr>
                            <td colSpan={5} className="empty-state">
                              Nenhum aluno encontrado para "{search}"
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeView === 'classes' && (
              <div className="view-fade-in">
                <div className="view-header">
                  <h2>Suas Turmas</h2>
                  <p>Gerencie o progresso pedagógico por sala de aula.</p>
                </div>
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-label">4º Ano A</div>
                    <div className="stat-value">32 Alunos</div>
                    <div className="stat-sub">92% Engajamento</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">6º Ano B</div>
                    <div className="stat-value">28 Alunos</div>
                    <div className="stat-sub">78% Engajamento</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">1º Ano Médio</div>
                    <div className="stat-value">40 Alunos</div>
                    <div className="stat-sub">85% Engajamento</div>
                  </div>
                </div>
              </div>
            )}

            {activeView === 'curriculum' && (
              <div className="view-fade-in">
                <div className="view-header">
                  <h2>Currículo Pedagógico</h2>
                  <p>Acesse o material de apoio e volumes por ciclo escolar.</p>
                </div>
                <div className="data-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                  <div className="data-card">
                    <div className="data-card-title">Fundamental 1</div>
                    <p style={{ color: '#6B6B6B', fontSize: '0.85rem', margin: '1rem 0' }}>Foco em percepção de riscos e mobilidade ativa (pedestres e ciclistas).</p>
                    <button className="btn btn-ghost btn-sm" style={{ border: '1px solid #E5E7EB' }}>Ver Volume 1</button>
                  </div>
                  <div className="data-card">
                    <div className="data-card-title">Fundamental 2</div>
                    <p style={{ color: '#6B6B6B', fontSize: '0.85rem', margin: '1rem 0' }}>Consciência coletiva e introdução ao CTB de forma lúdica.</p>
                    <button className="btn btn-ghost btn-sm" style={{ border: '1px solid #E5E7EB' }}>Ver Volume 2</button>
                  </div>
                  <div className="data-card">
                    <div className="data-card-title">Ensino Médio</div>
                    <p style={{ color: '#6B6B6B', fontSize: '0.85rem', margin: '1rem 0' }}>Legislação, prevenção de acidentes com motos e cidadania no trânsito.</p>
                    <button className="btn btn-ghost btn-sm" style={{ border: '1px solid #E5E7EB' }}>Ver Volume 3</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
