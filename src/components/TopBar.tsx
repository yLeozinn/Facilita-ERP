import { useState } from 'react';

interface TopBarProps {
  title: string;
  onNavigate?: (screen: string) => void;
  showExitButton?: boolean;
  onExit?: () => void;
}

export default function TopBar({ title, onNavigate, showExitButton = false, onExit }: TopBarProps) {
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
        {showExitButton ? (
          <button 
            onClick={onExit}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200"
            title="Voltar"
          >
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
        ) : (
          <div className="w-9" />
        )}
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
                  <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.9844 10C21.9473 8.68893 21.8226 7.85305 21.4026 7.13974C20.8052 6.12523 19.7294 5.56066 17.5777 4.43152L15.5777 3.38197C13.8221 2.46066 12.9443 2 12 2C11.0557 2 10.1779 2.46066 8.42229 3.38197L6.42229 4.43152C4.27063 5.56066 3.19479 6.12523 2.5974 7.13974C2 8.15425 2 9.41667 2 11.9415V12.0585C2 14.5833 2 15.8458 2.5974 16.8603C3.19479 17.8748 4.27063 18.4393 6.42229 19.5685L8.42229 20.618C10.1779 21.5393 11.0557 22 12 22C12.9443 22 13.8221 21.5393 15.5777 20.618L17.5777 19.5685C19.7294 18.4393 20.8052 17.8748 21.4026 16.8603C21.8226 16.1469 21.9473 15.3111 21.9844 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M21 7.5L12 12M12 12L3 7.5M12 12V21.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg> Meu Estoque
                </button>
                <button onClick={() => handleNav('vendas')} className="w-full flex items-center gap-3 px-4 py-3 text-left font-semibold text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-700 dark:text-gray-200 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                  <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M13 13V11M13 11V9M13 11H15M13 11H11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg> Nova Venda
                </button>
                <button onClick={() => handleNav('agenda')} className="w-full flex items-center gap-3 px-4 py-3 text-left font-semibold text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-700 dark:text-gray-200 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                  <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.4142 10.4142C18 9.82843 18 8.88562 18 7C18 5.11438 18 4.17157 17.4142 3.58579M17.4142 10.4142C16.8284 11 15.8856 11 14 11H10C8.11438 11 7.17157 11 6.58579 10.4142M17.4142 10.4142C17.4142 10.4142 17.4142 10.4142 17.4142 10.4142ZM17.4142 3.58579C16.8284 3 15.8856 3 14 3L10 3C8.11438 3 7.17157 3 6.58579 3.58579M17.4142 3.58579C17.4142 3.58579 17.4142 3.58579 17.4142 3.58579ZM6.58579 3.58579C6 4.17157 6 5.11438 6 7C6 8.88562 6 9.82843 6.58579 10.4142M6.58579 3.58579C6.58579 3.58579 6.58579 3.58579 6.58579 3.58579ZM6.58579 10.4142C6.58579 10.4142 6.58579 10.4142 6.58579 10.4142Z" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M13 7C13 7.55228 12.5523 8 12 8C11.4477 8 11 7.55228 11 7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7Z" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M18 6C16.3431 6 15 4.65685 15 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M18 8C16.3431 8 15 9.34315 15 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M6 6C7.65685 6 9 4.65685 9 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M6 8C7.65685 8 9 9.34315 9 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M4 21.3884H6.25993C7.27079 21.3884 8.29253 21.4937 9.27633 21.6964C11.0166 22.0549 12.8488 22.0983 14.6069 21.8138M13.6764 18.5172C13.7962 18.5033 13.911 18.4874 14.0206 18.4699C14.932 18.3245 15.697 17.8375 16.3974 17.3084L18.2046 15.9433C18.8417 15.462 19.7873 15.4619 20.4245 15.943C20.9982 16.3762 21.1736 17.0894 20.8109 17.6707C20.388 18.3487 19.7921 19.216 19.2199 19.7459M13.6764 18.5172C13.6403 18.5214 13.6038 18.5254 13.5668 18.5292M13.6764 18.5172C13.8222 18.486 13.9669 18.396 14.1028 18.2775C14.746 17.7161 14.7866 16.77 14.2285 16.1431C14.0991 15.9977 13.9475 15.8764 13.7791 15.7759C10.9817 14.1074 6.62942 15.3782 4 17.2429M13.6764 18.5172C13.6399 18.525 13.6033 18.5292 13.5668 18.5292M13.5668 18.5292C13.0434 18.5829 12.4312 18.5968 11.7518 18.5326" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg> Parcelamentos
                </button>
                <button onClick={() => handleNav('despesas')} className="w-full flex items-center gap-3 px-4 py-3 text-left font-semibold text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-700 dark:text-gray-200 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                  <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M15 9.5C15 8.11929 13.6569 7 12 7C10.3431 7 9 8.11929 9 9.5C9 10.8807 10.3431 12 12 12C13.6569 12 15 13.1193 15 14.5C15 15.8807 13.6569 17 12 17C10.3431 17 9 15.8807 9 14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg> Despesas
                </button>
                <button onClick={() => handleNav('resumo')} className="w-full flex items-center gap-3 px-4 py-3 text-left font-semibold text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-700 dark:text-gray-200 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                  <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 22H2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M21 22V14.5C21 13.6716 20.3284 13 19.5 13H16.5C15.6716 13 15 13.6716 15 14.5V22" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M15 22V9M9 22V5C9 3.58579 9 2.87868 9.43934 2.43934C9.87868 2 10.5858 2 12 2C13.4142 2 14.1213 2 14.5607 2.43934C15 2.87868 15 3.58579 15 5V5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M9 22V9.5C9 8.67157 8.32843 8 7.5 8H4.5C3.67157 8 3 8.67157 3 9.5V16M3 22V19.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg> Resumo do Dia
                </button>
                
                <div className="my-4 border-t border-gray-100 dark:border-gray-700"></div>
                
                <button onClick={() => handleNav('ajustes')} className="w-full flex items-center gap-3 px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M3.66122 10.6392C4.13377 10.9361 4.43782 11.4419 4.43782 11.9999C4.43781 12.558 4.13376 13.0638 3.66122 13.3607C3.33966 13.5627 3.13248 13.7242 2.98508 13.9163C2.66217 14.3372 2.51966 14.869 2.5889 15.3949C2.64082 15.7893 2.87379 16.1928 3.33973 16.9999C3.80568 17.8069 4.03865 18.2104 4.35426 18.4526C4.77508 18.7755 5.30694 18.918 5.83284 18.8488C6.07287 18.8172 6.31628 18.7185 6.65196 18.5411C7.14544 18.2803 7.73558 18.2699 8.21895 18.549C8.70227 18.8281 8.98827 19.3443 9.00912 19.902C9.02332 20.2815 9.05958 20.5417 9.15224 20.7654C9.35523 21.2554 9.74458 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8478 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.9021C15.0117 19.3443 15.2977 18.8281 15.7811 18.549C16.2644 18.27 16.8545 18.2804 17.3479 18.5412C17.6837 18.7186 17.9271 18.8173 18.1671 18.8489C18.693 18.9182 19.2249 18.7756 19.6457 18.4527C19.9613 18.2106 20.1943 17.807 20.6603 17C20.8677 16.6407 21.029 16.3614 21.1486 16.1272M20.3387 13.3608C19.8662 13.0639 19.5622 12.5581 19.5621 12.0001C19.5621 11.442 19.8662 10.9361 20.3387 10.6392C20.6603 10.4372 20.8674 10.2757 21.0148 10.0836C21.3377 9.66278 21.4802 9.13092 21.411 8.60502C21.3591 8.2106 21.1261 7.80708 20.6601 7.00005C20.1942 6.19301 19.9612 5.7895 19.6456 5.54732C19.2248 5.22441 18.6929 5.0819 18.167 5.15113C17.927 5.18274 17.6836 5.2814 17.3479 5.45883C16.8544 5.71964 16.2643 5.73004 15.781 5.45096C15.2977 5.1719 15.0117 4.6557 14.9909 4.09803C14.9767 3.71852 14.9404 3.45835 14.8478 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74458 2.35523 9.35523 2.74458 9.15224 3.23463C9.05958 3.45833 9.02332 3.71848 9.00912 4.09794C8.98826 4.65566 8.70225 5.17191 8.21891 5.45096C7.73557 5.73002 7.14548 5.71959 6.65205 5.4588C6.31633 5.28136 6.0729 5.18269 5.83285 5.15108C5.30695 5.08185 4.77509 5.22436 4.35427 5.54727C4.03866 5.78945 3.80569 6.19297 3.33974 7C3.13231 7.35929 2.97105 7.63859 2.85138 7.87273"
                     stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg> Ajustes do App
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