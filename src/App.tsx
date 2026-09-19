import { useMemo, useState } from 'react'
import { CalendarDays, Check, ChevronDown, CirclePlus, LayoutDashboard, ListTodo, Menu, Search, Target, TrendingUp, X } from 'lucide-react'

type Task = { id: number; title: string; time: string; category: string; done: boolean }

const initialTasks: Task[] = [
  { id: 1, title: 'Planejar prioridades do dia', time: '08:30', category: 'Planejamento', done: true },
  { id: 2, title: 'Revisar relatório semanal', time: '10:00', category: 'Trabalho', done: false },
  { id: 3, title: 'Treino e caminhada', time: '18:30', category: 'Saúde', done: false },
  { id: 4, title: 'Ler 20 páginas', time: '21:00', category: 'Pessoal', done: false },
]

const navigation = [
  ['Visão geral', LayoutDashboard], ['Minhas tarefas', ListTodo], ['Calendário', CalendarDays], ['Hábitos', Target], ['Progresso', TrendingUp],
] as const

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [active, setActive] = useState('Visão geral')
  const [modalOpen, setModalOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newTime, setNewTime] = useState('09:00')
  const completed = tasks.filter(task => task.done).length
  const pending = tasks.length - completed
  const completion = Math.round((completed / Math.max(tasks.length, 1)) * 100)
  const progress = useMemo(() => Math.min(100, 72 + completed * 5), [completed])

  const toggleTask = (id: number) => setTasks(current => current.map(task => task.id === id ? { ...task, done: !task.done } : task))
  const addTask = () => {
    if (!newTitle.trim()) return
    setTasks(current => [...current, { id: Date.now(), title: newTitle.trim(), time: newTime, category: 'Pessoal', done: false }])
    setNewTitle(''); setModalOpen(false)
  }

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark">r</span><span>rotina</span></div>
      <nav><p className="nav-label">MENU PRINCIPAL</p>{navigation.map(([label, Icon]) => <button className={`nav-item ${active === label ? 'active' : ''}`} onClick={() => setActive(label)} key={label}><Icon size={18} /><span>{label}</span>{label === 'Minhas tarefas' && <b>{pending}</b>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="help-card"><div className="help-title"><strong>Meta semanal</strong><span>{progress}%</span></div><span>Crie consistência, um dia de cada vez.</span><div className="progress"><i style={{ width: `${progress}%` }} /></div></div><div className="profile"><div className="avatar">AC</div><div><strong>Allan Cardoso</strong><span>Plano Pro</span></div><ChevronDown size={16} /></div></div>
    </aside>
    <main className="main-content">
      <header className="topbar"><button className="mobile-menu"><Menu size={20} /></button><div className="date">TERÇA-FEIRA, 12 DE MARÇO DE 2024</div><div className="top-actions"><button className="search-button" aria-label="Buscar"><Search size={17} /></button><button className="add-button" onClick={() => setModalOpen(true)}><CirclePlus size={18} /> Nova tarefa</button></div></header>
      <section className="content">
        <div className="welcome"><div><p className="eyebrow">BOM DIA, ALLAN <span>✦</span></p><h1>Vamos tornar hoje<br /><em>extraordinário.</em></h1><p className="subtitle">Você está no caminho certo. Aqui está o seu resumo.</p></div><div className="streak"><span className="flame">♨</span><div><strong>7 dias</strong><small>de sequência</small></div></div></div>
        <div className="stats"><div className="stat-card"><span className="stat-icon purple"><Check size={18} /></span><div><small>Tarefas concluídas</small><strong>{completed}<b>/{tasks.length}</b></strong></div><span className="trend">+12%</span></div><div className="stat-card"><span className="stat-icon orange"><Target size={18} /></span><div><small>Hábitos hoje</small><strong>3<b>/5</b></strong></div><span className="trend">+8%</span></div><div className="stat-card"><span className="stat-icon green"><TrendingUp size={18} /></span><div><small>Foco da semana</small><strong>84<b>%</b></strong></div><span className="trend">+16%</span></div></div>
        <div className="section-heading"><div><div className="heading-row"><h2>Agenda de hoje</h2><span className="completion-pill">{completion}% concluído</span></div><p>Você tem {pending} {pending === 1 ? 'tarefa pendente' : 'tarefas pendentes'}</p></div><button className="link-button" onClick={() => setActive('Minhas tarefas')}>Ver todas <span>→</span></button></div>
        <div className="task-list">{tasks.map(task => <button className={`task ${task.done ? 'done' : ''}`} key={task.id} onClick={() => toggleTask(task.id)}><span className="check-circle">{task.done && <Check size={14} />}</span><span className="task-info"><strong>{task.title}</strong><small>{task.category}</small></span><time>{task.time}</time></button>)}</div>
      </section>
    </main>
    {modalOpen && <div className="modal-backdrop" onClick={() => setModalOpen(false)}><div className="modal" onClick={event => event.stopPropagation()}><div className="modal-header"><div><p className="eyebrow">NOVA ATIVIDADE</p><h2>Adicionar tarefa</h2></div><button className="close-button" onClick={() => setModalOpen(false)}><X size={18} /></button></div><label>Título da tarefa<input autoFocus value={newTitle} onChange={event => setNewTitle(event.target.value)} onKeyDown={event => event.key === 'Enter' && addTask()} placeholder="Ex.: Meditar por 10 minutos" /></label><label>Horário<input type="time" value={newTime} onChange={event => setNewTime(event.target.value)} /></label><button className="save-button" onClick={addTask}>Adicionar à agenda</button></div></div>}
  </div>
}

export default App
