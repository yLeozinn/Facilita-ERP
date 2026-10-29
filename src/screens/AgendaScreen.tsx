import { useState, useEffect } from 'react'
import NovoEventoScreen from './NovoEventoScreen'

type Event = { id: string; title: string; description: string; time: string }

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]

const WEEK_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

const DAY_NAMES = [
  'domingo', 'segunda-feira', 'terça-feira', 'quarta-feira',
  'quinta-feira', 'sexta-feira', 'sábado',
]

export default function AgendaScreen() {
  const systemToday = new Date()
  const [viewYear, setViewYear] = useState(systemToday.getFullYear())
  const [viewMonth, setViewMonth] = useState(systemToday.getMonth())
  const [selectedDay, setSelectedDay] = useState<number | null>(systemToday.getDate())

  const [eventsMap, setEventsMap] = useState<Record<string, Event[]>>(() => {
    const savedEvents = localStorage.getItem('@facilita:events')
    if (savedEvents) {
      try {
        return JSON.parse(savedEvents)
      } catch (error) {
        return {}
      }
    }
    return {}
  })

  useEffect(() => {
    localStorage.setItem('@facilita:events', JSON.stringify(eventsMap))
  }, [eventsMap])

  const [isAddingEvent, setIsAddingEvent] = useState(false)

  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()

  const goPrev = () => {
    const nextM = viewMonth === 0 ? 11 : viewMonth - 1
    const nextY = viewMonth === 0 ? viewYear - 1 : viewYear
    
    setViewMonth(nextM)
    setViewYear(nextY)

    if (nextM === systemToday.getMonth() && nextY === systemToday.getFullYear()) {
      setSelectedDay(systemToday.getDate())
    } else {
      setSelectedDay(null)
    }
  }

  const goNext = () => {
    const nextM = viewMonth === 11 ? 0 : viewMonth + 1
    const nextY = viewMonth === 11 ? viewYear + 1 : viewYear
    
    setViewMonth(nextM)
    setViewYear(nextY)

    if (nextM === systemToday.getMonth() && nextY === systemToday.getFullYear()) {
      setSelectedDay(systemToday.getDate())
    } else {
      setSelectedDay(null)
    }
  }

  const isCurrentMonth = viewYear === systemToday.getFullYear() && viewMonth === systemToday.getMonth()

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDayOfWeek; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  const selectedDateKey = `${viewYear}-${viewMonth}-${selectedDay}`
  const events = selectedDay && eventsMap[selectedDateKey] 
    ? [...eventsMap[selectedDateKey]].sort((a, b) => a.time.localeCompare(b.time)) 
    : []

  const dayLabel = selectedDay 
  ? `${DAY_NAMES[new Date(viewYear, viewMonth, selectedDay).getDay()]}, ${selectedDay} de ${MONTH_NAMES[viewMonth].toLowerCase()}`
  : 'Nenhum dia selecionado'

  if (isAddingEvent) {
    return (
      <NovoEventoScreen 
        dataSelecionadaLabel={dayLabel}
        onCancelar={() => setIsAddingEvent(false)}
        onSalvar={(novoEvento) => {
          // cada evento tem um unico ID
          const eventoCompleto = { ...novoEvento, id: Date.now().toString() }
          
          setEventsMap(prev => ({
            ...prev,
            [selectedDateKey]: [...(prev[selectedDateKey] || []), eventoCompleto]
          }))
          
          setIsAddingEvent(false)
        }}
      />
    )
  }

  const handleDeleteEvent = (eventId: string) => {
    if (!selectedDay) return

    setEventsMap(prev => {
      const currentEvents = prev[selectedDateKey] || []
      const updatedEvents = currentEvents.filter(ev => ev.id !== eventId)

      // se o dia ficar sem eventos, removeme a key do objeto para a bolinha sumir do calendário
      if (updatedEvents.length === 0) {
        const copy = { ...prev }
        delete copy[selectedDateKey]
        return copy
      }

      return {
        ...prev,
        [selectedDateKey]: updatedEvents
      }
    })
  }

  return (
    <div className="p-4 space-y-4 animate-fade-in">
      {/* Calendar card */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-600 rounded-2xl p-4 shadow-sm">
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
          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200">
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
            <div key={d} className="text-center text-[10px] font-bold text-gray-400 dark:text-gray-200 py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div className="grid grid-cols-7">
          {cells.map((day, idx) => {
            const loopDateKey = `${viewYear}-${viewMonth}-${day}`
            const hasEvents = day !== null && eventsMap[loopDateKey] && eventsMap[loopDateKey].length > 0

            return day === null ? (
              <div key={`e-${idx}`} />
            ) : (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className="flex flex-col items-center pt-0.5 pb-1"
              >
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-xs transition-all ${
                     day === selectedDay 
                      ? 'bg-blue-600 text-white font-bold shadow-sm'
                      : isCurrentMonth && day === systemToday.getDate()
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold'
                      : 'bg-transparent text-gray-700 dark:text-gray-300 font-normal hover:bg-gray-100 dark:hover:bg-gray700'
                  }`}
                >
                  {day}
                </div>
                {hasEvents && (
                  <div
                    className={`w-1 h-1 rounded-full mt-0.5 ${
                      day === selectedDay ? 'bg-blue-300' : 'bg-blue-600'
                    }`}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Date header + add button */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] text-gray-400 dark:text-gray-200 capitalize">{dayLabel}</p>
          <p className="text-sm font-bold text-gray-800 dark:text-gray-400 mt-0.5">
            {events.length > 0
              ? `${events.length} evento${events.length > 1 ? 's' : ''}`
              : 'Nenhum evento'}
          </p>
        </div>
        <button
          onClick={() => setIsAddingEvent(true)}
          disabled={!selectedDay} 
          className="flex items-center gap-1.5 px-3.5 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors"
        >
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
              className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-600 rounded-2xl p-3.5 shadow-sm flex gap-3"
            >
              <div className="flex flex-col items-center pt-1 gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                <div className="w-0.5 flex-1 bg-blue-100 dark:bg-blue-300 rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{event.title}</p>
                  
                  {/* [MUDANÇA: Horário e botão de exclusão com ícone de lixeira] */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
                      <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1"
                      title="Excluir evento"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span className="text-[11px] font-bold">{event.time}</span>
                    </div>
                  </div>
                </div>
                {event.description && (
                  <p className="text-[12px] text-gray-400 leading-relaxed">{event.description}</p>
                )}
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