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
  Search,
  Clock
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
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
          <div style={{ background: '#4F46E5', padding: '6px', borderRadius: '8px', display: 'flex' }}>
            <TrafficCone size={20} color="#FFFFFF" />
          </div>
          <span>Cidade Viva</span>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-item active">
            <BarChart3 size={18} />
            <span>Visão Geral</span>
          </div>
          <div className="nav-item">
            <Users size={18} />
            <span>Turmas</span>
          </div>
          <div className="nav-item">
            <BookOpen size={18} />
            <span>Currículo</span>
          </div>
          <div className="nav-item">
            <Award size={18} />
            <span>XP & Missões</span>
          </div>
        </nav>

        <div style={{ marginTop: 'auto' }} className="sidebar-nav">
          <div className="nav-item">
            <Settings size={18} />
            <span>Configurações</span>
          </div>
          <div className="nav-item danger">
            <LogOut size={18} />
            <span>Sair</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="header">
          <div>
            <h1>Visão Geral da Escola</h1>
            <p>Acompanhamento pedagógico das atividades de trânsito.</p>
          </div>
          <button className="btn-primary">
            <Download size={16} />
            Exportar Relatório
          </button>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Alunos Ativos</span>
            <span className="stat-value">124</span>
            <div className="stat-trend up">
              <TrendingUp size={14} />
              <span>+12% vs mês anterior</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-label">Média de Pontuação XP</span>
            <span className="stat-value">1.450</span>
            <div className="stat-trend up">
              <TrendingUp size={14} />
              <span>Consistente</span>
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-label">Taxa de Conclusão</span>
            <span className="stat-value">87%</span>
            <div style={{ width: '100%', height: '6px', background: '#F3F4F6', borderRadius: '4px', marginTop: '8px', overflow: 'hidden' }}>
              <div style={{ width: '87%', height: '100%', background: '#10B981', borderRadius: '4px' }}></div>
            </div>
          </div>
        </div>

        <div className="data-grid">
          <div className="data-card">
            <h3><BarChart3 size={18} color="#6B7280" /> Engajamento Semanal</h3>
            <div style={{ width: '100%', height: 260, marginTop: '1rem' }}>
              <ResponsiveContainer>
                <AreaChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorEng" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Area type="monotone" dataKey="engajamento" stroke="#4F46E5" strokeWidth={2} fillOpacity={1} fill="url(#colorEng)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="data-card">
            <h3><Award size={18} color="#6B7280" /> Missões Mais Populares</h3>
            <div style={{ width: '100%', height: 260, marginTop: '1rem' }}>
              <ResponsiveContainer>
                <BarChart data={[
                  { name: 'Ponto Cego', count: 45 },
                  { name: 'Investigador', count: 32 },
                  { name: 'Protetor', count: 24 },
                ]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                  <Tooltip 
                    cursor={{fill: '#F3F4F6'}}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="data-card" style={{ marginBottom: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h3><Users size={18} color="#6B7280" /> Registro de Alunos</h3>
            <div style={{ position: 'relative' }}>
              <Search size={16} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                placeholder="Buscar por nome..." 
                className="search-input"
              />
            </div>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nome do Aluno</th>
                  <th>Turma</th>
                  <th>Total de XP</th>
                  <th>Módulo Atual</th>
                  <th>Situação</th>
                </tr>
              </thead>
              <tbody>
                {students.map(s => (
                  <tr key={s.id}>
                    <td style={{ fontWeight: 500 }}>{s.name}</td>
                    <td><span style={{ color: '#6B7280' }}>{s.grade}</span></td>
                    <td style={{ fontWeight: 600, color: '#4F46E5' }}>{s.xp.toLocaleString('pt-BR')}</td>
                    <td>{s.mission}</td>
                    <td>
                      <span className={`badge ${s.status === 'Concluído' ? 'badge-success' : 'badge-warning'}`}>
                        {s.status === 'Concluído' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
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
