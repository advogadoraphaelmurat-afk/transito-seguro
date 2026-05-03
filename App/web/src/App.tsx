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
  PersonStanding
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
          <TrafficCone size={32} color="#111111" />
          <span>Cidade Viva</span>
        </div>
        
        <div className="traffic-light-decor">
          <div className="light-circle red on"></div>
          <div className="light-circle yellow"></div>
          <div className="light-circle green"></div>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-item active">
            <BarChart3 size={24} />
            <span>Visão Geral</span>
          </div>
          <div className="nav-item">
            <Users size={24} />
            <span>Turmas</span>
          </div>
          <div className="nav-item">
            <BookOpen size={24} />
            <span>Currículo</span>
          </div>
          <div className="nav-item">
            <Award size={24} />
            <span>XP & Missões</span>
          </div>
        </nav>

        <div style={{ marginTop: 'auto' }} className="sidebar-nav">
          <div className="nav-item" style={{ background: '#FDFDFD' }}>
            <Settings size={24} />
            <span>Ajustes</span>
          </div>
          <div className="nav-item" style={{ background: '#111111', color: '#FDFDFD' }}>
            <LogOut size={24} />
            <span>Sair</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="header">
          <div>
            <h1>Painel Professor</h1>
            <p>Controle Pedagógico de Trânsito</p>
          </div>
          <button className="btn-primary">
            <Download size={20} />
            Exportar Dados
          </button>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">🚦 Alunos Ativos</span>
            <div className="led-display green">
              <PersonStanding size={48} />
              124
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-label">⭐ Média de XP</span>
            <div className="led-display red">
               1450
            </div>
          </div>
          <div className="stat-card">
            <span className="stat-label">🛑 Missões Concluídas</span>
            <div className="led-display green" style={{ color: '#FFD300', textShadow: '0 0 10px #FFD300, 0 0 20px #FFD300' }}>
               87%
            </div>
          </div>
        </div>

        <div className="crosswalk-divider"></div>

        <div className="data-grid">
          <div className="data-card">
            <h3><TrendingUp size={24} color="#FDFDFD" /> Engajamento</h3>
            <div style={{ width: '100%', height: 260, marginTop: '1rem' }}>
              <ResponsiveContainer>
                <AreaChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="0" vertical={true} stroke="#111111" strokeWidth={2} />
                  <XAxis dataKey="name" axisLine={{ stroke: '#111111', strokeWidth: 4 }} tickLine={false} tick={{fill: '#111111', fontWeight: 700}} dy={10} />
                  <YAxis axisLine={{ stroke: '#111111', strokeWidth: 4 }} tickLine={false} tick={{fill: '#111111', fontWeight: 700}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '0', border: '6px solid #111111', boxShadow: '8px 8px 0px 0px #111111', fontWeight: 700 }}
                  />
                  <Area type="step" dataKey="engajamento" stroke="#111111" strokeWidth={6} fillOpacity={1} fill="#E32636" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="data-card">
            <h3><Award size={24} color="#FDFDFD" /> Conquistas</h3>
            <div style={{ width: '100%', height: 260, marginTop: '1rem' }}>
              <ResponsiveContainer>
                <BarChart data={[
                  { name: 'Cego', count: 45 },
                  { name: 'Invest', count: 32 },
                  { name: 'Protet', count: 24 },
                ]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="0" vertical={false} stroke="#111111" strokeWidth={2} />
                  <XAxis dataKey="name" axisLine={{ stroke: '#111111', strokeWidth: 4 }} tickLine={false} tick={{fill: '#111111', fontWeight: 700}} dy={10} />
                  <YAxis axisLine={{ stroke: '#111111', strokeWidth: 4 }} tickLine={false} tick={{fill: '#111111', fontWeight: 700}} />
                  <Tooltip 
                    cursor={{fill: '#FFD300'}}
                    contentStyle={{ borderRadius: '0', border: '6px solid #111111', boxShadow: '8px 8px 0px 0px #111111', fontWeight: 700 }}
                  />
                  <Bar dataKey="count" fill="#005A9C" stroke="#111111" strokeWidth={4} barSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="data-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h3><Users size={24} color="#FDFDFD" /> Registro Diário</h3>
            <div style={{ position: 'relative' }}>
              <Search size={24} color="#111111" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text" 
                placeholder="BUSCAR..." 
                className="search-input"
                style={{ paddingLeft: '3.5rem' }}
              />
            </div>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Identificação</th>
                  <th>Turma</th>
                  <th>Pontuação XP</th>
                  <th>Missão Atual</th>
                  <th>Situação</th>
                </tr>
              </thead>
              <tbody>
                {students.map(s => (
                  <tr key={s.id}>
                    <td style={{ color: '#005A9C', fontSize: '1.2rem' }}>{s.name}</td>
                    <td>{s.grade}</td>
                    <td style={{ color: '#E32636' }}>{s.xp.toLocaleString('pt-BR')}</td>
                    <td>{s.mission}</td>
                    <td>
                      <span className={`badge ${s.status === 'Concluído' ? 'badge-success' : 'badge-warning'}`}>
                        {s.status === 'Concluído' ? <CheckCircle2 size={16} /> : <TrafficCone size={16} />}
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
