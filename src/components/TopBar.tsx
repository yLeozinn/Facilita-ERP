import { useState } from 'react';

export default function TopBar({ title }: { title: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header
        className="flex items-center justify-between px-4 bg-white border-b border-gray-100 shrink-0"
        style={{ height: 56 }}
      >
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-50 transition-colors"
        >
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            <line x1="0" y1="1" x2="20" y2="1" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
            <line x1="0" y1="7" x2="20" y2="7" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
            <line x1="0" y1="13" x2="20" y2="13" stroke="#374151" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <span className="text-[15px] font-bold text-gray-800 tracking-tight">{title}</span>

        <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-50 transition-colors">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#374151"
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
        <div className="fixed inset-0 z-50 flex">
          <div 
            className="absolute inset-0 bg-black/40 animate-fade-in max-w-[430px] mx-auto"
            onClick={() => setIsMenuOpen(false)}
          ></div>

          <div className="absolute left-0 top-0 h-full w-[280px] bg-white shadow-2xl animate-slide-right flex flex-col">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-3 shadow-sm border-2 border-white">
                L
              </div>
              <h2 className="text-lg font-bold text-gray-800 leading-tight">Leonardo</h2>
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 mt-1">
                Ver detalhes da conta
              </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-left font-bold text-gray-700 bg-blue-50/50 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-colors">
                <span className="text-xl">X</span> Meu Estoque
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-left font-semibold text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-colors">
                <span className="text-xl">X</span> Nova Venda (PDV)
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-left font-semibold text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-colors">
                <span className="text-xl">X</span> Caderneta (Fiados)
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-left font-semibold text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-colors">
                <span className="text-xl">X</span> Despesas
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-left font-semibold text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-colors">
                <span className="text-xl">X</span> Resumo do Dia
              </button>
              
              <div className="my-4 border-t border-gray-100"></div>
              
              <button className="w-full flex items-center gap-3 px-4 py-3 text-left font-semibold text-gray-600 rounded-xl hover:bg-gray-100 transition-colors">
                <span className="text-xl">⚙️</span> Ajustes do App
              </button>
            </nav>

            <div className="p-4 border-t border-gray-100">
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 font-bold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
              >
                Sair do aplicativo
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}