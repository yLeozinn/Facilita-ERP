import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authActions';

export default function LoginScreen() {
  const navigate = useNavigate();
  const [erro, setErro] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleLogin = async (formData: FormData) => {
    setIsPending(true);
    setErro(null);

    const email = formData.get('email') as string;
    const senha = formData.get('senha') as string;

    try {
      const data = await loginUser(email, senha);
      localStorage.setItem('token', data.token);
      navigate('/pdv'); 
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-100 dark:bg-gray-950 flex justify-center overflow-hidden">
      <div className="w-full max-w-[430px] h-full flex flex-col justify-center bg-white dark:bg-gray-900 p-6 shadow-2xl transition-colors duration-300 relative">
        
        <div className="w-full max-w-sm mx-auto animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 text-center">
            Facilita
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-8 text-sm">
            Faça login para gerenciar seu comércio
          </p>

          {erro && (
            <div className="mb-5 p-3.5 rounded-xl text-sm font-medium bg-red-50 text-red-700 border border-red-200">
              {erro}
            </div>
          )}
          
          <form action={handleLogin} className="flex flex-col gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 pl-1">E-mail</label>
              <input 
                type="email" 
                name="email"
                className="w-full h-12 px-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-base text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors disabled:bg-gray-50 dark:disabled:bg-gray-800/50"
                placeholder="Ex: seu@email.com"
                disabled={isPending}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5 pl-1">Senha</label>
              <div className="relative">
                <input 
                  type={mostrarSenha ? "text" : "password"} 
                  name="senha"
                  className="w-full h-12 pl-4 pr-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-base text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors disabled:bg-gray-50 dark:disabled:bg-gray-800/50"
                  placeholder="Sua senha"
                  disabled={isPending}
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
                >
                  {mostrarSenha ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isPending}
              className="w-full h-12 mt-2 flex items-center justify-center text-sm font-bold text-white bg-blue-600 dark:bg-blue-500 rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 active:bg-blue-800 transition-colors disabled:bg-blue-400 dark:disabled:bg-blue-900/50 disabled:cursor-not-allowed shadow-sm"
            >
              {isPending ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Não tem uma conta? </span>
            <button 
              onClick={() => navigate('/cadastro')}
              className="text-sm font-bold text-blue-600 dark:text-blue-500 hover:underline"
            >
              Crie aqui
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}