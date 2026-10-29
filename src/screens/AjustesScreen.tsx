import { useEffect, useState } from 'react'

export default function AjustesScreen() {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('facilita_theme') === 'dark'
    })
    const [largeText, setLargeText] = useState(false)
    const [highContrast, setHighContrast] = useState(false)

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
      
      {/* SEÇÃO: MEU NEGÓCIO */}
      <section>
        <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-1">Meu Negócio</h2>
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm transition-colors">
          <div className="p-4 flex items-center justify-between border-b border-gray-50 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center">
                <span className="text-lg">🏪</span>
              </div>
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">Nome do Comércio</span>
            </div>
            <span className="text-sm text-gray-400 dark:text-gray-500">Loja do Léo</span>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex items-center justify-center">
                <span className="text-lg">💲</span>
              </div>
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">Moeda Padrão</span>
            </div>
            <span className="text-sm text-gray-400 dark:text-gray-500">BRL (R$)</span>
          </div>
        </div>
      </section>

      {/* SEÇÃO: APARÊNCIA & ACESSIBILIDADE */}
      <section>
        <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 px-1">Aparência & Acessibilidade</h2>
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm transition-colors">
          
          {/* Tema Escuro */}
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

          {/* Fonte Grande */}
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

          {/* Alto Contraste */}
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

      <div className="pt-4 pb-10 text-center">
        <p className="text-xs font-bold text-gray-400 dark:text-gray-600">Facilita ERP v1.0.0</p>
        <p className="text-[10px] text-gray-400 dark:text-gray-600 mt-1">Projeto de Extensão Acadêmica</p>
      </div>

    </div>
  )
}
