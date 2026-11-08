import { useState, useEffect } from 'react';

interface UsuarioData {
  nome: string;
  email: string;
  nomeEmpresa?: String;
  cpf: string;
  cnpj?: string;
  celular: string;
  cep: string;
  uf: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
}

export default function DetalhesContaScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [usuario, setUsuario] = useState<UsuarioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const carregarPerfil = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        onNavigate('login');
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/api/usuarios/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUsuario(data);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    carregarPerfil();
  }, [onNavigate]);

  const inicialNome = usuario?.nome ? usuario.nome.charAt(0).toUpperCase() : '-';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900 flex flex-col items-center justify-center text-gray-400">
        <svg className="animate-spin h-8 w-8 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Carregando dados da conta...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900 transition-colors duration-300 animate-fade-in flex flex-col">
      <div className="p-5 space-y-6 max-w-[430px] mx-auto w-full pb-10">
        {/* Cabeçalho */}
        <div className="flex flex-col items-center justify-center pt-4">
          <div className="w-24 h-24 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center text-4xl font-bold mb-4 shadow-md border-4 border-white dark:border-gray-800">
            {inicialNome}
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{usuario?.nome}</h2>
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full mt-2">
            Lojista Administrador
          </span>
        </div>

        <div className="h-px bg-gray-200 dark:bg-gray-800" />

        {/* Informações Cadastradas */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-3">Informações da Conta</h3>
          
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-gray-700 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Endereço de E-mail</p>
              <p className="text-sm font-bold text-gray-800 dark:text-gray-100 truncate">{usuario?.email}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-gray-700 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Nome da Empresa</p>
              <p className="text-sm font-bold text-gray-800 dark:text-gray-100 truncate">{usuario?.nomeEmpresa || 'Não informado'}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-gray-700 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="2" ry="2"/>
                <circle cx="9" cy="10" r="2"/>
                <line x1="15" y1="10" x2="17" y2="10"/>
                <line x1="15" y1="14" x2="17" y2="14"/>
                <line x1="7" y1="14" x2="11" y2="14"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">CPF</p>
              <p className="text-sm font-bold text-gray-800 dark:text-gray-100 truncate">{usuario?.cpf}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-gray-700 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/>
                <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"/>
                <path d="M12 3v6"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">CNPJ</p>
              <p className="text-sm font-bold text-gray-800 dark:text-gray-100 truncate">{usuario?.cnpj || 'Não informado'}</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-gray-700 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Número de Telefone</p>
              <p className="text-sm font-bold text-gray-800 dark:text-gray-100 truncate">{usuario?.celular}</p>
            </div>
          </div>

          {/* Endereço Completo */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-gray-700 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400 mt-0.5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Endereço Completo</p>
              {usuario?.rua ? (
                <div className="text-sm font-bold text-gray-800 dark:text-gray-100 leading-snug">
                  <p>{usuario.rua}, {usuario.numero}</p>
                  <p className="text-gray-600 dark:text-gray-300 font-medium">{usuario.bairro}</p>
                  <p className="text-gray-600 dark:text-gray-300 font-medium">{usuario.cidade} - {usuario.uf}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 font-semibold">CEP: {usuario.cep}</p>
                </div>
              ) : (
                <p className="text-sm font-bold text-gray-800 dark:text-gray-100">Endereço não cadastrado</p>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}