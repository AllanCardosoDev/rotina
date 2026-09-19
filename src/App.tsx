import { useState } from 'react'
import { CalendarDays, Check, ChevronDown, CirclePlus, LayoutDashboard, ListTodo, Menu, Target, TrendingUp } from 'lucide-react'

const initialTasks = [
  { id: 1, title: 'Planejar prioridades do dia', time: '08:30', category: 'Planejamento', done: true },
  { id: 2, title: 'Revisar relatório semanal', time: '10:00', category: 'Trabalho', done: false },
  { id: 3, title: 'Treino e caminhada', time: '18:30', category: 'Saúde', done: false },
  { id: 4, title: 'Ler 20 páginas', time: '21:00', category: 'Pessoal', done: false },
]

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [active, setActive] = useState('Visão geral')
  const completed = tasks.filter(task => task.done).length

  const toggleTask = (id: number) => setTasks(current => current.map(task => task.id === id ? { ...task, done: !task.done } : task))

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">r</span><span>rotina</span></div>
        <nav>
          <p className="nav-label">MENU PRINCIPAL</p>
          {[
            ['Visão geral', LayoutDashboard], ['Minhas tarefas', ListTodo], ['Calendário', CalendarDays], ['Hábitos', Target], ['Progresso', TrendingUp],
          ].map(([label, Icon]) => <button className={`nav-item ${active === label ? 'active' : ''}`} onClick={() => setActive(label as string)} key={label as string}><Icon size={18} /><span>{label as string}</span></button>)}
        </nav>
        <div className="sidebar-bottom"><div className="help-card"><strong>Crie consistência.</strong><span>Pequenos passos todos os dias.</span><div className="progress"><i /></div></div><div className="profile"><div className="avatar">AC</div><div><strong>Allan Cardoso</strong><span>Plano Pro</span></div><ChevronDown size={16} /></div></div>
      </aside>
      <main className="main-content">
        <header className="topbar"><button className="mobile-menu"><Menu size={20} /></button><div className="date">TERÇA-FEIRA, 12 DE MARÇO DE 2024</div><button className="add-button"><CirclePlus size={18} /> Nova tarefa</button></header>
        <section className="content">
          <div className="welcome"><div><p className="eyebrow">BOM DIA, ALLAN <span>✦</span></p><h1>Vamos tornar hoje<br /><em>extraordinário.</em></h1><p className="subtitle">Você está no caminho certo. Aqui está o seu resumo.</p></div><div className="streak"><span className="flame">♨</span><div><strong>7 dias</strong><small>de sequência</small></div></div></div>
          <div className="stats"><div className="stat-card"><span className="stat-icon purple"><Check size={18} /></span><div><small>Tarefas concluídas</small><strong>{completed}<b>/{tasks.length}</b></strong></div><span className="trend">+12%</span></div><div className="stat-card"><span className="stat-icon orange"><Target size={18} /></span><div><small>Hábitos hoje</small><strong>3<b>/5</b></strong></div><span className="trend">+8%</span></div><div className="stat-card"><span className="stat-icon green"><TrendingUp size={18} /></span><div><small>Foco da semana</small><strong>84<b>%</b></strong></div><span className="trend">+16%</span></div></div>
          <div className="section-heading"><div><h2>Agenda de hoje</h2><p>Você tem {tasks.length - completed} tarefas pendentes</p></div><button className="link-button">Ver todas <span>→</span></button></div>
          <div className="task-list">{tasks.map(task => <button className={`task ${task.done ? 'done' : ''}`} key={task.id} onClick={() => toggleTask(task.id)}><span className="check-circle">{task.done && <Check size={14} />}</span><span className="task-info"><strong>{task.title}</strong><small>{task.category}</small></span><time>{task.time}</time></button>)}</div>
        </section>
      </main>
    </div>
  )
}

export default App
