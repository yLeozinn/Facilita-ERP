import { useState } from 'react';

interface TopBarProps {
  title: string;
  onNavigate?: (screen: string) => void;
}

export default function TopBar({ title, onNavigate }: { title: string, onNavigate?: (screen: string) => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNav = (screen: string) => {
    setIsMenuOpen(false);
    if (onNavigate) {
      onNavigate(screen)
    }
  };

  return (
    <>
      <header
        className="flex items-center justify-between px-4 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 shrink-0 transition-colors duration-300"
        style={{ height: 56 }}
      >
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
        >
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            <line x1="0" y1="1" x2="20" y2="1" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
            <line x1="0" y1="7" x2="20" y2="7" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
            <line x1="0" y1="13" x2="20" y2="13" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <span className="text-[15px] font-bold text-gray-800 dark:text-gray-100 tracking-tight">{title}</span>

        <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </button>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-center">
          <div className="relative w-full max-w-[430px] h-full overflow-hidden">
            <div 
            className="absolute inset-0 bg-black/40 dark:bg-black/60 animate-fade-in"
            onClick={() => setIsMenuOpen(false)}
            ></div>

            <div className="absolute left-0 top-0 h-full w-[280px] bg-white dark:bg-gray-800 shadow-2xl animate-slide-right flex flex-col transition-colors duration-300">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-3 shadow-sm border-2 border-white dark:border-gray-700">
                  L
                </div>
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 leading-tight">Leonardo</h2>
                <button className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mt-1">
                  Ver detalhes da conta
                </button>
              </div>

              <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                <button onClick={() => handleNav('estoque')} className="w-full flex items-center gap-3 px-4 py-3 text-left font-semibold text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-700 dark:text-gray-200 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                  <span className="text-xl">X</span> Meu Estoque
                </button>
                <button onClick={() => handleNav('vendas')} className="w-full flex items-center gap-3 px-4 py-3 text-left font-semibold text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-700 dark:text-gray-200 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                  <span className="text-xl">X</span> Nova Venda
                </button>
                <button onClick={() => handleNav('agenda')} className="w-full flex items-center gap-3 px-4 py-3 text-left font-semibold text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-700 dark:text-gray-200 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                  <span className="text-xl">X</span> Parcelamentos
                </button>
                <button onClick={() => handleNav('despesas')} className="w-full flex items-center gap-3 px-4 py-3 text-left font-semibold text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-700 dark:text-gray-200 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                  <span className="text-xl">X</span> Despesas
                </button>
                <button onClick={() => handleNav('resumo')} className="w-full flex items-center gap-3 px-4 py-3 text-left font-semibold text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-700 dark:text-gray-200 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                  <span className="text-xl">X</span> Resumo do Dia
                </button>
                
                <div className="my-4 border-t border-gray-100 dark:border-gray-700"></div>
                
                <button onClick={() => handleNav('ajustes')} className="w-full flex items-center gap-3 px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <span className="text-xl">⚙️</span> Ajustes do App
                </button>
              </nav>

              <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                >
                  Sair do aplicativo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}