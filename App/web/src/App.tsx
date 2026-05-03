import { 
  Users, 
  BookOpen, 
  BarChart3, 
  Settings, 
  LogOut, 
  TrafficCone,
  Award,
  CheckCircle2,
  TrendingUp,
  Download,
  Search
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';

const mockData = [
  { name: 'Seg', engajamento: 45 },
  { name: 'Ter', engajamento: 52 },
  { name: 'Qua', engajamento: 48 },
  { name: 'Qui', engajamento: 70 },
  { name: 'Sex', engajamento: 85 },
];

const students = [
  { id: 1, name: 'Ana Silva', grade: '4º Ano', xp: 1250, mission: 'Ponto Cego', status: 'Concluído' },
  { id: 2, name: 'Bruno Costa', grade: '4º Ano', xp: 800, mission: 'Ponto Cego', status: 'Em progresso' },
  { id: 3, name: 'Carla Dias', grade: '6º Ano', xp: 2100, mission: 'Epidemia Moto', status: 'Concluído' },
  { id: 4, name: 'Daniel Alves', grade: '6º Ano', xp: 1500, mission: 'Epidemia Moto', status: 'Concluído' },
];

function App() {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <TrafficCone size={28} color="#a5b4fc" />
          <span>Cidade Viva</span>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-item active">
            <BarChart3 size={20} />
            <span>Visão Geral</span>
          </div>
          <div className="nav-item">
            <Users size={20} />
            <span>Minhas Turmas</span>
          </div>
          <div className="nav-item">
            <BookOpen size={20} />
            <span>Conteúdo Curricular</span>
          </div>
          <div className="nav-item">
            <Award size={20} />
            <span>Relatórios de XP</span>
          </div>
        </nav>

        <div style={{ marginTop: 'auto' }} className="sidebar-nav">
          <div className="nav-item">
            <Settings size={20} />
            <span>Configurações</span>
          </div>
          <div className="nav-item" style={{ color: '#ef4444' }}>
            <LogOut size={20} />
            <span>Sair</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="header">
          <div>
            <h1>Painel do Professor</h1>
            <p>Acompanhamento pedagógico em tempo real</p>
          </div>
          <button className="btn-primary">
            <Download size={18} />
            Gerar Relatório PDF
          </button>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Alunos Ativos</span>
            <span className="stat-value">124</span>
            <div className="stat-trend trend-up">
              <TrendingUp size={16} />
              <span>+12% esta semana</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-label">Média de XP</span>
            <span className="stat-value">1.450</span>
            <div className="stat-trend trend-up">
              <TrendingUp size={16} />
              <span>Acima da meta</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-label">Conclusão de Missões</span>
            <span className="stat-value">87%</span>
            <div style={{ width: '100%', height: '8px', background: 'rgba(0,0,0,0.05)', borderRadius: '99px', marginTop: '10px', overflow: 'hidden' }}>
              <div style={{ width: '87%', height: '100%', background: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)', borderRadius: '99px' }}></div>
            </div>
          </div>
        </div>

        <div className="data-grid">
          <div className="data-card">
            <h3><BarChart3 size={20} color="#4f46e5" /> Engajamento Semanal</h3>
            <div style={{ width: '100%', height: 260, marginTop: '1rem' }}>
              <ResponsiveContainer>
                <AreaChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorEng" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="engajamento" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorEng)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="data-card">
            <h3><Award size={20} color="#f59e0b" /> Missões Populares</h3>
            <div style={{ width: '100%', height: 260, marginTop: '1rem' }}>
              <ResponsiveContainer>
                <BarChart data={[
                  { name: 'Ponto Cego', count: 45 },
                  { name: 'Investigador', count: 32 },
                  { name: 'Protetor', count: 24 },
                ]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <Tooltip 
                    cursor={{fill: 'rgba(0,0,0,0.02)'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="count" fill="#10b981" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="data-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h3><Users size={20} color="#4f46e5" /> Progresso dos Alunos</h3>
            <div style={{ position: 'relative' }}>
              <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                placeholder="Buscar aluno..." 
                className="search-input"
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Aluno</th>
                  <th>Série</th>
                  <th>XP Total</th>
                  <th>Última Missão</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map(s => (
                  <tr key={s.id}>
                    <td style={{ fontWeight: 600 }}>{s.name}</td>
                    <td>{s.grade}</td>
                    <td style={{ color: '#4f46e5', fontWeight: 600 }}>{s.xp.toLocaleString('pt-BR')} XP</td>
                    <td>{s.mission}</td>
                    <td>
                      <span className={`badge ${s.status === 'Concluído' ? 'badge-success' : 'badge-warning'}`}>
                        {s.status === 'Concluído' && <CheckCircle2 size={12} />}
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
