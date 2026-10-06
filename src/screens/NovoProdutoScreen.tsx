import { useActionState } from 'react';
import { salvarProduto } from '../services/produtoActions';

export default function NovoProdutoScreen() {
    const [estado, actionFormulario, isPending] = useActionState(salvarProduto, {
         mensagem: '',
         sucesso: false 
    });

    return (
    <div className="flex flex-col h-full bg-white p-4">
      
      {estado.mensagem && (
        <div className={`mb-5 p-3.5 rounded-xl text-sm font-medium ${estado.sucesso ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {estado.mensagem}
        </div>
      )}
      
      <form action={actionFormulario} className="flex flex-col gap-5 pb-24">
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1.5 pl-1">Nome do Produto</label>
          <input 
            type="text" 
            name="nome"
            
            className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl text-base text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors disabled:bg-gray-50"
            placeholder="Ex: Piraquê Chocowafer 100,8 g"
            disabled={isPending}
            required
          />
        </div>
        
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-bold text-gray-700 mb-1.5 pl-1">Preço (R$)</label>
            <input 
              type="number" 
              step="0.01"
              min="0.00"
              name="preco"
              className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl text-base text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors disabled:bg-gray-50"
              placeholder="0.00"
              disabled={isPending}
              required
            />
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-bold text-gray-700 mb-1.5 pl-1">Estoque Inicial</label>
            <input 
              type="number" 
              min="0.00"
              name="estoque"
              className="w-full h-12 px-4 bg-white border border-gray-200 rounded-xl text-base text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors disabled:bg-gray-50"
              placeholder="0"
              disabled={isPending}
              required
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isPending}
          className="w-full h-12 mt-2 flex items-center justify-center text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Salvando...
            </span>
          ) : (
            'Salvar Produto'
          )}
        </button>
      </form>
    </div>
  );

/*
    return (
        <div className="p-8 max-w-2xl mx-auto bg-white rounded-lg shadow-md mt-10">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Cadastrar Novo Produto</h1>
      
      {estado.mensagem && (
        <div className={`mb-4 p-3 rounded ${estado.sucesso ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {estado.mensagem}
        </div>
      )}
      
      <form action={actionFormulario} className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label>
          <input 
            type="text" 
            name="nome"
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
            disabled={isPending}
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={isPending}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 mt-4 disabled:bg-blue-400 disabled:cursor-not-allowed flex justify-center"
        >
          {isPending ? 'Salvando no banco...' : 'Salvar Produto'}
        </button>
      </form>
    </div>
    );
*/       
}