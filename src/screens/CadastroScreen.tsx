import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cadastrarUser } from '../services/authActions'; 

export default function CadastroScreen() {
  const navigate = useNavigate();
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  // Estados para as senhas e controle do "olhinho"
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);

  const [endereco, setEndereco] = useState({
    rua: '', bairro: '', cidade: '', uf: ''
  });

  // Validação em tempo real: só avisa se o usuário já começou a digitar a confirmação
  const senhasNaoConferem = confirmarSenha.length > 0 && senha !== confirmarSenha;

  const buscarCep = async (cepBuscado: string) => {
    const cepLimpo = cepBuscado.replace(/\D/g, '');
    if (cepLimpo.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setEndereco({ rua: data.logradouro, bairro: data.bairro, cidade: data.localidade, uf: data.uf });
        }
      } catch (err) {
        console.log("Erro ao buscar CEP", err);
      }
    }
  };

  const handleCadastro = async (formData: FormData) => {
    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem. Verifique antes de continuar.');
      return;
    }

    setIsPending(true);
    setErro(null);
    setSucesso(null);

    const payload = Object.fromEntries(formData.entries());
    delete payload.confirmarSenha; // Remove o campo duplicado antes de enviar ao Spring Boot

    try {
      await cadastrarUser(payload);
      setSucesso('Conta criada com sucesso! Redirecionando...');
      setTimeout(() => navigate('/login'), 2500);
    } catch (err: any) {
      setErro(err.message || 'Erro ao criar conta.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-100 dark:bg-gray-950 flex justify-center overflow-hidden">
      <div className="w-full max-w-[430px] h-full flex flex-col bg-white dark:bg-gray-900 shadow-2xl transition-colors duration-300 relative">
        
        <div className="h-[60px] bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center px-4 flex-shrink-0">
          <button 
            onClick={() => navigate('/login')}
            className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
          <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100 ml-2">Criar Conta</h1>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar p-5 animate-fade-in pb-10">
          {erro && <div className="mb-5 p-3.5 rounded-xl text-sm font-medium bg-red-50 text-red-700 border border-red-200">{erro}</div>}
          {sucesso && <div className="mb-5 p-3.5 rounded-xl text-sm font-medium bg-green-50 text-green-700 border border-green-200">{sucesso}</div>}

          <form action={handleCadastro} className="flex flex-col gap-4">
            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2 mt-2">Dados Pessoais</h3>
            <div className="flex gap-3">
              <div className="flex-1"><label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 pl-1">Nome</label><input type="text" name="nome" required className="w-full h-11 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100" /></div>
              <div className="flex-1"><label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 pl-1">Sobrenome</label><input type="text" name="sobrenome" required className="w-full h-11 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100" /></div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1"><label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 pl-1">CPF</label><input type="text" name="cpf" required className="w-full h-11 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100" placeholder="000.000.000-00"/></div>
              <div className="flex-1"><label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 pl-1">Celular</label><input type="text" name="celular" required className="w-full h-11 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100" placeholder="(21) 99999-9999"/></div>
            </div>

            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2 mt-4">Acesso</h3>
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 pl-1">E-mail</label>
              <input type="email" name="email" required className="w-full h-11 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100" />
            </div>
            
            {/* Campo de Senha com Ícone */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 pl-1">Senha</label>
              <div className="relative">
                <input 
                  type={mostrarSenha ? "text" : "password"} 
                  name="senha" 
                  required 
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full h-11 pl-3 pr-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                />
                <button 
                  type="button" 
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                >
                  {mostrarSenha ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Campo de Confirmar Senha com Ícone e Validação */}
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 pl-1">Repita sua senha</label>
              <div className="relative">
                <input 
                  type={mostrarConfirmar ? "text" : "password"} 
                  name="confirmarSenha" 
                  required 
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  className={`w-full h-11 pl-3 pr-12 bg-white dark:bg-gray-800 border rounded-xl text-sm text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-1 transition-colors ${
                    senhasNaoConferem 
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500'
                  }`} 
                />
                <button 
                  type="button" 
                  onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                >
                  {mostrarConfirmar ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
              {senhasNaoConferem && (
                <span className="text-xs text-red-500 font-bold mt-1.5 ml-1 block animate-fade-in">
                  As senhas não conferem. Escreva as duas igualmente.
                </span>
              )}
            </div>

            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2 mt-4">Dados do Comércio</h3>
            <div><label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 pl-1">Nome do Comércio</label><input type="text" name="nomeComercio" required className="w-full h-11 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100" /></div>
            
            <div className="flex gap-3">
              <div className="w-1/3"><label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 pl-1">CEP</label><input type="text" name="cep" required onBlur={(e) => buscarCep(e.target.value)} className="w-full h-11 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100" /></div>
              <div className="w-2/3"><label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 pl-1">Rua / Logradouro</label><input type="text" name="rua" required value={endereco.rua} onChange={e => setEndereco({...endereco, rua: e.target.value})} className="w-full h-11 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100" /></div>
            </div>
            <div className="flex gap-3">
              <div className="w-1/3"><label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 pl-1">Número</label><input type="text" name="numero" required className="w-full h-11 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100" /></div>
              <div className="w-2/3"><label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 pl-1">Complemento</label><input type="text" name="complemento" className="w-full h-11 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100" /></div>
            </div>
            <div className="flex gap-3">
              <div className="w-full"><label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 pl-1">Bairro</label><input type="text" name="bairro" required value={endereco.bairro} onChange={e => setEndereco({...endereco, bairro: e.target.value})} className="w-full h-11 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100" /></div>
            </div>
            <div className="flex gap-3">
              <div className="w-2/3"><label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 pl-1">Cidade</label><input type="text" name="cidade" required value={endereco.cidade} onChange={e => setEndereco({...endereco, cidade: e.target.value})} className="w-full h-11 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100" /></div>
              <div className="w-1/3"><label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 pl-1">UF</label><input type="text" name="uf" required value={endereco.uf} onChange={e => setEndereco({...endereco, uf: e.target.value})} className="w-full h-11 px-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-100" /></div>
            </div>

            <button 
              type="submit" 
              disabled={isPending || senhasNaoConferem}
              className="w-full h-12 mt-6 flex items-center justify-center text-sm font-bold text-white bg-blue-600 dark:bg-blue-500 rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:bg-blue-400 dark:disabled:bg-blue-900/50 disabled:cursor-not-allowed shadow-sm"
            >
              {isPending ? 'Cadastrando...' : 'Finalizar Cadastro'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}