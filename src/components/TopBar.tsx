export default function TopBar({ title }: { title: string }) {
  return (
    <header
      className="flex items-center justify-between px-4 bg-white border-b border-gray-100 shrink-0"
      style={{ height: 56 }}
    >
      <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-50 transition-colors">
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
  )
}
