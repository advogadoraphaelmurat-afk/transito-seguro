import { 
  Users, 
  BookOpen, 
  BarChart3, 
  Settings, 
  LogOut, 
  TrafficCone,
  Award,
  CheckCircle2
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
  Line
} from 'recharts';

const mockData = [
  { name: 'Seg', engajamento: 45 },
  { name: 'Ter', engajamento: 52 },
  { name: 'Qua', engajamento: 48 },
  { name: 'Qui', engajamento: 70 },
  { name: 'Sex', engajamento: 61 },
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
          <TrafficCone size={32} />
          <span>Cidade Viva</span>
        </div>
        
        <nav className="sidebar-nav">
          <div className="nav-item active">
            <BarChart3 size={20} />
            Visão Geral
          </div>
          <div className="nav-item">
            <Users size={20} />
            Minhas Turmas
          </div>
          <div className="nav-item">
            <BookOpen size={20} />
            Conteúdo Curricular
          </div>
          <div className="nav-item">
            <Award size={20} />
            Relatórios de XP
          </div>
        </nav>

        <div style={{ marginTop: 'auto' }} className="sidebar-nav">
          <div className="nav-item">
            <Settings size={20} />
            Configurações
          </div>
          <div className="nav-item">
            <LogOut size={20} />
            Sair
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="header">
          <div>
            <h1>Dashboard do Professor</h1>
            <p style={{ color: '#718096' }}>Acompanhamento pedagógico em tempo real</p>
          </div>
          <button style={{ 
            padding: '0.75rem 1.5rem', 
            background: '#2196F3', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            fontWeight: 600,
            cursor: 'pointer'
          }}>
            Gerar Relatório PDF
          </button>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Alunos Ativos</span>
            <span className="stat-value">124</span>
            <span style={{ color: '#48BB78', fontSize: '0.875rem' }}>+12% esta semana</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Média de XP</span>
            <span className="stat-value">1.450</span>
            <span style={{ color: '#48BB78', fontSize: '0.875rem' }}>Acima da meta</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Conclusão de Missões</span>
            <span className="stat-value">87%</span>
            <div style={{ width: '100%', height: '8px', background: '#EDF2F7', borderRadius: '4px', marginTop: '10px' }}>
              <div style={{ width: '87%', height: '100%', background: '#4CAF50', borderRadius: '4px' }}></div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div className="data-card">
            <h3>Engajamento Semanal</h3>
            <div style={{ width: '100%', height: 250, marginTop: '1rem' }}>
              <ResponsiveContainer>
                <LineChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="engajamento" stroke="#2196F3" strokeWidth={3} dot={{ fill: '#2196F3', r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="data-card">
            <h3>Distribuição de Medalhas</h3>
            <div style={{ width: '100%', height: 250, marginTop: '1rem' }}>
              <ResponsiveContainer>
                <BarChart data={[
                  { name: 'Ponto Cego', count: 45 },
                  { name: 'Rafael Investigador', count: 32 },
                  { name: 'Protetor', count: 18 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4CAF50" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="data-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Progresso dos Alunos</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text" 
                placeholder="Buscar aluno..." 
                style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}
              />
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>ALUNO</th>
                <th>SÉRIE</th>
                <th>XP TOTAL</th>
                <th>ÚLTIMA MISSÃO</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 600 }}>{s.name}</td>
                  <td>{s.grade}</td>
                  <td>{s.xp}</td>
                  <td>{s.mission}</td>
                  <td>
                    <span className={`badge ${s.status === 'Concluído' ? 'badge-success' : 'badge-warning'}`}>
                      {s.status === 'Concluído' ? <CheckCircle2 size={12} style={{ marginRight: 4 }} /> : null}
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default App;
