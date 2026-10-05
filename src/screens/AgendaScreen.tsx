import { useState } from 'react'

type Event = { id: number; title: string; description: string; time: string }

const EVENTS: Record<number, Event[]> = {
  16: [
    { id: 1, title: 'Reunião com Fornecedor', description: 'Discussão de novos contratos de abastecimento', time: '09:00' },
    { id: 2, title: 'Inventário Mensal', description: 'Contagem e atualização de produtos do estoque', time: '14:30' },
    { id: 3, title: 'Treinamento da Equipe', description: 'Capacitação em atendimento ao cliente', time: '17:00' },
  ],
  20: [
    { id: 4, title: 'Pagamento de Fornecedores', description: 'Liquidação das faturas do mês de setembro', time: '10:00' },
  ],
  25: [
    { id: 5, title: 'Balanço Semanal', description: 'Revisão de vendas e estoque da semana', time: '16:00' },
  ],
}

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]

const WEEK_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

const DAY_NAMES = [
  'domingo', 'segunda-feira', 'terça-feira', 'quarta-feira',
  'quinta-feira', 'sexta-feira', 'sábado',
]

const TODAY = { year: 2026, month: 8, day: 16 }

export default function AgendaScreen() {
  const [viewYear, setViewYear] = useState(2026)
  const [viewMonth, setViewMonth] = useState(8)
  const [selectedDay, setSelectedDay] = useState(16)

  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()

  const goPrev = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1) }
    else setViewMonth(viewMonth - 1)
    setSelectedDay(1)
  }

  const goNext = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1) }
    else setViewMonth(viewMonth + 1)
    setSelectedDay(1)
  }

  const isCurrentMonth = viewYear === TODAY.year && viewMonth === TODAY.month

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  const events = isCurrentMonth ? (EVENTS[selectedDay] ?? []) : []

  const selectedDate = new Date(viewYear, viewMonth, selectedDay)
  const dayLabel = `${DAY_NAMES[selectedDate.getDay()]}, ${selectedDay} de ${MONTH_NAMES[viewMonth].toLowerCase()}`

  return (
    <div className="p-4 space-y-4">
      {/* Calendar card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
        {/* Month nav */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goPrev}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-50 transition-colors text-gray-400"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <h2 className="text-sm font-bold text-gray-800">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </h2>
          <button
            onClick={goNext}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-50 transition-colors text-gray-400"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 mb-1">
          {WEEK_SHORT.map((d) => (
            <div key={d} className="text-center text-[10px] font-bold text-gray-400 py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div className="grid grid-cols-7">
          {cells.map((day, idx) =>
            day === null ? (
              <div key={`e-${idx}`} />
            ) : (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className="flex flex-col items-center pt-0.5 pb-1"
              >
                <div
                  className="w-8 h-8 flex items-center justify-center rounded-full text-xs transition-all"
                  style={{
                    backgroundColor:
                      isCurrentMonth && day === selectedDay
                        ? '#2563EB'
                        : isCurrentMonth && day === TODAY.day && day !== selectedDay
                        ? '#EFF6FF'
                        : 'transparent',
                    color:
                      isCurrentMonth && day === selectedDay
                        ? 'white'
                        : isCurrentMonth && day === TODAY.day
                        ? '#2563EB'
                        : '#374151',
                    fontWeight:
                      (isCurrentMonth && day === TODAY.day) || (isCurrentMonth && day === selectedDay)
                        ? '700'
                        : '400',
                  }}
                >
                  {day}
                </div>
                {isCurrentMonth && Boolean(EVENTS[day]) && (
                  <div
                    className="w-1 h-1 rounded-full mt-0.5"
                    style={{
                      backgroundColor:
                        day === selectedDay ? '#93C5FD' : '#2563EB',
                    }}
                  />
                )}
              </button>
            )
          )}
        </div>
      </div>

      {/* Date header + add button */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] text-gray-400 capitalize">{dayLabel}</p>
          <p className="text-sm font-bold text-gray-800 mt-0.5">
            {events.length > 0
              ? `${events.length} evento${events.length > 1 ? 's' : ''}`
              : 'Nenhum evento'}
          </p>
        </div>
        <button className="flex items-center gap-1.5 px-3.5 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Adicionar
        </button>
      </div>

      {/* Events list */}
      {events.length > 0 ? (
        <div className="space-y-2.5">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white border border-gray-100 rounded-2xl p-3.5 shadow-sm flex gap-3"
            >
              <div className="flex flex-col items-center pt-1 gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                <div className="w-0.5 flex-1 bg-blue-100 rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-bold text-gray-800">{event.title}</p>
                  <div className="flex items-center gap-1 shrink-0 text-blue-600">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span className="text-[11px] font-bold">{event.time}</span>
                  </div>
                </div>
                <p className="text-[12px] text-gray-400 leading-relaxed">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 gap-3 text-gray-300">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <p className="text-sm font-medium">Nenhum evento para este dia</p>
          <p className="text-xs text-center">Toque em Adicionar para criar um evento</p>
        </div>
      )}
    </div>
  )
}