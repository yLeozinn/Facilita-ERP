import { useEffect, useState } from 'react'

export default function AjustesScreen() {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('facilita_theme') === 'dark'
    })
    const [largeText, setLargeText] = useState(false)
    const [highContrast, setHighContrast] = useState(false)
    const [stockAlerts, setStockAlerts] = useState(true)
    const [dailySummary, setDailySummary] = useState(false)
    const [autoSync, setAutoSync] = useState(true)

    useEffect(() => {
        const html = document.documentElement
        if (darkMode) {
            html.classList.add('dark')
            localStorage.setItem('facilita_theme', 'dark')
        } else {
            html.classList.remove('dark')
            localStorage.setItem('facilita_theme', 'light')
        }
    }, [darkMode])

    const Toggle = ({ isOn, onToggle }: {isOn: boolean, onToggle: () => void }) => (
        <button
            onClick={onToggle}
            className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${
                isOn ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
            }`}
        >
            <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    isOn ? 'translate-x-5' : 'translate-x-0'
                }`}
            />
        </button>
    )

    return (
    <div className="p-4 space-y-6 pb-8 bg-gray-50/50 dark:bg-gray-900 min-h-screen transition-colors duration-300 animate-fade-in">
      
      {/* APARÊNCIA & ACESSIBILIDADE */}
      <section>
        <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-1">Aparência & Acessibilidade</h2>
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm transition-colors">
          
          <div className="p-4 flex items-center justify-between border-b border-gray-50 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-800 dark:bg-gray-700 text-white rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Tema Escuro</p>
                <p className="text-[11px] text-gray-400 dark:text-gray-500">Conforto visual e bateria</p>
              </div>
            </div>
            <Toggle isOn={darkMode} onToggle={() => setDarkMode(!darkMode)} />
          </div>

          <div className="p-4 flex items-center justify-between border-b border-gray-50 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex items-center justify-center font-bold font-serif">
                Aa
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Texto Maior</p>
                <p className="text-[11px] text-gray-400 dark:text-gray-500">Aumenta a fonte do app</p>
              </div>
            </div>
            <Toggle isOn={largeText} onToggle={() => setLargeText(!largeText)} />
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a10 10 0 0 0 0 20z" fill="currentColor"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Alto Contraste</p>
                <p className="text-[11px] text-gray-400 dark:text-gray-500">Cores mais fortes</p>
              </div>
            </div>
            <Toggle isOn={highContrast} onToggle={() => setHighContrast(!highContrast)} />
          </div>

        </div>
      </section>

      {/* NOTIFICAÇÕES & ALERTAS */}
      <section>
        <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-1">Alertas do Sistema</h2>
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm transition-colors">
          
          <div className="p-4 flex items-center justify-between border-b border-gray-50 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Estoque Baixo</p>
                <p className="text-[11px] text-gray-400 dark:text-gray-500">Avisar quando produtos estiverem acabando</p>
              </div>
            </div>
            <Toggle isOn={stockAlerts} onToggle={() => setStockAlerts(!stockAlerts)} />
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Fechamento do Dia</p>
                <p className="text-[11px] text-gray-400 dark:text-gray-500">Notificar resumo diário de vendas</p>
              </div>
            </div>
            <Toggle isOn={dailySummary} onToggle={() => setDailySummary(!dailySummary)} />
          </div>

        </div>
      </section>

      {/* DADOS & SUPORTE */}
      <section>
        <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-1">Dados & Suporte</h2>
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm transition-colors">
          
          <div className="p-4 flex items-center justify-between border-b border-gray-50 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 2v6h-6"></path>
                  <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                  <path d="M3 22v-6h6"></path>
                  <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Sincronização Automática</p>
                <p className="text-[11px] text-gray-400 dark:text-gray-500">Manter dados atualizados no servidor</p>
              </div>
            </div>
            <Toggle isOn={autoSync} onToggle={() => setAutoSync(!autoSync)} />
          </div>

          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left border-b border-gray-50 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Exportar Dados</p>
                <p className="text-[11px] text-gray-400 dark:text-gray-500">Baixar relatórios em PDF ou Planilha</p>
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-lg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Central de Ajuda</p>
                <p className="text-[11px] text-gray-400 dark:text-gray-500">Tutoriais e suporte técnico</p>
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

        </div>
      </section>

      <div className="pt-4 pb-10 text-center">
        <p className="text-xs font-bold text-gray-400 dark:text-gray-600">Facilita ERP v1.0.0</p>
        <p className="text-[10px] text-gray-400 dark:text-gray-600 mt-1">Projeto de Extensão Acadêmica</p>
      </div>

    </div>
  )
}