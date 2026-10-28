import { useState, useEffect } from 'react'
import type { Screen } from './types'
import TopBar from './components/TopBar'
import BottomNav from './components/BottomNav'
import EstoqueScreen from './screens/EstoqueScreen'
import PontoDeVendaScreen from './screens/PontoDeVendaScreen'
import AgendaScreen from './screens/AgendaScreen'
import NovoProdutoScreen from './screens/NovoProdutoScreen'
import AjustesScreen from './screens/AjustesScreen'

const TITLES: Record<Screen, string> = {
  estoque: 'Estoque',
  vendas: 'Ponto de Venda',
  agenda: 'Agenda',
  tarefas: 'Tarefas',
  relatorios: 'Relatórios',
  novo_produto: 'Novo Produto',
  ajustes: 'Ajustes do App'
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('estoque')

  useEffect(() => {
    const theme = localStorage.getItem('facilita_theme')
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const telasSecundarias: Screen[] = ['novo_produto', 'ajustes']
  const isSecondaryScreen = telasSecundarias.includes(screen)

  return (
    <div className="fixed inset-0 bg-slate-100 dark:bg-gray-950 flex justify-center overflow-hidden">
      <div className="w-full max-w-[430px] h-full flex flex-col bg-white dark:bg-gray-900 overflow-hidden shadow-2xl">
        <TopBar title={TITLES[screen]}
         onNavigate={(s) => setScreen(s as Screen)}
         showExitButton={isSecondaryScreen}
         onExit={() => setScreen('estoque')}
        />

        <main className="flex-1 overflow-y-auto no-scrollbar bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          {screen === 'estoque' && <EstoqueScreen onNavigate={() => setScreen('novo_produto')} />}
          {screen === 'vendas' && <PontoDeVendaScreen />}
          {screen === 'agenda' && <AgendaScreen />}
          {screen === 'novo_produto' && <NovoProdutoScreen />}
          {screen === 'ajustes' && <AjustesScreen />}
          {screen === 'tarefas' && (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-300 dark:text-gray-600">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <p className="text-sm font-medium">Tarefas em breve</p>
            </div>
          )}
          {screen === 'relatorios' && (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-300 dark:text-gray-600">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              <p className="text-sm font-medium">Relatórios em breve</p>
            </div>
          )}
        </main>
        
        {screen !== 'ajustes' && (
          <BottomNav active={screen} onChange={setScreen} />
        )}
      </div>
    </div>
  )
}
