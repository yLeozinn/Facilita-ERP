import type { Screen } from '../types'

interface BottomNavProps {
  active: Screen
  onChange: (screen: Screen) => void
}

export default function BottomNav({ active, onChange }: BottomNavProps) {
  const cls = (id: Screen) =>
    `flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 transition-colors ${
      active === id ? 'text-blue-600' : 'text-gray-400'
    }`

  return (
    <nav className="flex bg-white border-t border-gray-100 shrink-0">
      <button className={cls('estoque')} onClick={() => onChange('estoque')}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
        <span className="text-[10px] font-bold">Estoque</span>
      </button>

      <button className={cls('vendas')} onClick={() => onChange('vendas')}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        <span className="text-[10px] font-bold">Vendas</span>
      </button>

      <button className={cls('agenda')} onClick={() => onChange('agenda')}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span className="text-[10px] font-bold">Agenda</span>
      </button>

      <button className={cls('tarefas')} onClick={() => onChange('tarefas')}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
          <rect x="9" y="3" width="6" height="4" rx="1" />
          <path d="m9 12 2 2 4-4" />
        </svg>
        <span className="text-[10px] font-bold">Tarefas</span>
      </button>

      <button className={cls('relatorios')} onClick={() => onChange('relatorios')}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
        <span className="text-[10px] font-bold">Relatórios</span>
      </button>
    </nav>
  )
}
