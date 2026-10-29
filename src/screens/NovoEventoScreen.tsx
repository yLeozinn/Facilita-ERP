import { useState } from 'react'

interface NovoEventoProps {
  dataSelecionadaLabel: string;
  onCancelar: () => void;
  onSalvar: (evento: { title: string; time: string; description: string }) => void;
}

export default function NovoEvento({ dataSelecionadaLabel, onCancelar, onSalvar }: NovoEventoProps) {
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('12:00')
  const [description, setDescription] = useState('')

  const handleSalvar = () => {
    if (!title.trim()) return
    onSalvar({ title, time, description })
  }

  return (
    
    <div className="p-4 flex flex-col min-h-full bg-gray-50 dark:bg-gray-900 animate-fade-in">
      
      {/* Cabeçalho */}
      <div className="flex items-center gap-3 mb-6 mt-2">
        <button 
          onClick={onCancelar}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">Novo Evento</h2>
      </div>

      {/* Formulário */}
      <div className="space-y-5 flex-1">
        
        {/* Etiqueta do dia selecionado */}
        <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 p-3.5 rounded-xl text-sm font-bold flex items-center gap-2.5 border border-blue-100 dark:border-blue-900/50">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Para: {dataSelecionadaLabel}
        </div>

        <div>
          <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Título do Evento</label>
          <input 
            type="text" 
            placeholder="Ex: Reunião com Fornecedor"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3.5 text-sm font-semibold text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
          />
        </div>

        <div>
          <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Horário</label>
          <input 
            type="time" 
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3.5 text-sm font-semibold text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
          />
        </div>

        <div>
          <label className="block text-[13px] font-bold text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Descrição (opcional)</label>
          <textarea 
            rows={4}
            placeholder="Detalhes sobre o evento..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3.5 text-sm font-medium text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm resize-none transition-all"
          />
        </div>
      </div>

      {/* Botão Salvar */}
      <div className="pt-6 pb-4">
        <button 
          onClick={handleSalvar}
          disabled={!title.trim()}
          className="w-full bg-blue-600 disabled:bg-blue-300 dark:disabled:bg-blue-900 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Salvar Evento
        </button>
      </div>
      
    </div>
  )
}