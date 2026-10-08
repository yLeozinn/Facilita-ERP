import { useState } from 'react'

type Product = {
  id: number
  name: string
  category: string
  quantity: number
  expiry: string
  price: number
  bgColor: string
  strokeColor: string
}

// amostra de itens na tela de estoque, posteriormente será removido.
const PRODUCTS: Product[] = [
  { id: 1, name: 'Suco de Laranja Natural', category: 'Bebidas', quantity: 48, expiry: '22/12/2026', price: 8.9, bgColor: '#FFF7ED', strokeColor: '#F97316' },
  { id: 2, name: 'Água Mineral 500ml', category: 'Bebidas', quantity: 120, expiry: '15/06/2027', price: 2.5, bgColor: '#EFF6FF', strokeColor: '#3B82F6' },
  { id: 3, name: 'Pão de Forma Integral', category: 'Padaria', quantity: 15, expiry: '20/09/2026', price: 7.9, bgColor: '#FEFCE8', strokeColor: '#EAB308' },
  { id: 4, name: 'Queijo Mussarela', category: 'Laticínios', quantity: 8, expiry: '28/09/2026', price: 45.0, bgColor: '#F0FDF4', strokeColor: '#22C55E' },
  { id: 5, name: 'Café Solúvel Premium', category: 'Mercearia', quantity: 32, expiry: '10/03/2027', price: 18.5, bgColor: '#FAF5FF', strokeColor: '#A855F7' },
]

function fmt(n: number) {
  return `R$ ${n.toFixed(2).replace('.', ',')}`
}

export default function EstoqueScreen({ onNavigate }: { onNavigate: () => void }) {
  const [search, setSearch] = useState('')
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const abrirEditor = (product: Product) => {
    setEditingProduct(product);
  };

  const salvarEdicao = (formData: FormData) => {
    if (!editingProduct) return;

    const novoPreco = Number(formData.get('price'));
    const qtdAdicional = Number(formData.get('addQty') || 0);
    const novaValidade = String(formData.get('expiry'));

    setProducts((prev) => prev.map((p) => {
      if (p.id === editingProduct.id) {
        return {
          ...p,
          price: novoPreco,
          quantity: p.quantity + qtdAdicional,
          expiry: novaValidade
        };
      }
      return p;
    }));

    const salvos = JSON.parse(localStorage.getItem('facilita_produtos') || '[]');
    const index = salvos.findIndex((p: Product) => p.id === editingProduct.id);
    if (index >= 0) {
      salvos[index].price = novoPreco;
      salvos[index].quantity += qtdAdicional;
      salvos[index].expiry = novaValidade;
      localStorage.setItem('facilita_produtos', JSON.stringify(salvos));
    }

    setEditingProduct(null);
  };

  const validadeFixed = editingProduct
    ? (editingProduct.expiry.includes('/') ? editingProduct.expiry.split('/').reverse().join('-') : editingProduct.expiry)
    : '';

  const [products, setProducts] = useState(() => {
    const salvos = localStorage.getItem('facilita_produtos');
    if (salvos) {
      const produtosDoNavegador = JSON.parse(salvos);
      return [...PRODUCTS, ...produtosDoNavegador];
    }
    return PRODUCTS;
  });

  // função que formata "aaaa-mm-dd" em "dd/mm/aaaa"
  const formatarData = (data: string) => {
    if(!data.includes('-')) return data;
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`; // CORRIGIDO: dia, mes, ano!
  }

  const handleDelete = (idParaExcluir: number) => {
    const temCerteza = window.confirm('Tem certeza de que quer excluir esse produto? Essa ação não pode ser desfeita.');
    if (temCerteza) {
      setProducts((prev) => prev.filter((p) => p.id !== idParaExcluir));

      const salvos = JSON.parse(localStorage.getItem('facilita_produtos') || '[]');
      const novaLista = salvos.filter((p: Product) => p.id !== idParaExcluir);
      localStorage.setItem('facilita_produtos', JSON.stringify(novaLista));
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4 space-y-3">
      {/* Search bar */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Buscar produto ou categoria..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        />
      </div>

      {/* Action row */}
      <div className="flex gap-2">
        <button className="flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          Filtros
        </button>
        <button 
         onClick={onNavigate}
         className="flex items-center gap-1.5 flex-1 justify-center py-2.5 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Novo Produto
        </button>
      </div>

      {/* Product list */}
      <div className="space-y-2.5">
        {filtered.map((product) => (
          <div key={product.id} className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm">
            <div className="flex gap-3 items-start">
              {/* Image placeholder */}
              <div
                className="w-[52px] h-[52px] rounded-xl shrink-0 flex items-center justify-center"
                style={{ backgroundColor: product.bgColor }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={product.strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <p className="text-sm font-bold text-gray-800 leading-tight">{product.name}</p>
                  <div className="flex gap-1 shrink-0">
                    <button
                    onClick={() => abrirEditor(product)} 
                    className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                    {product.category}
                  </span>
                  <span className="text-sm font-bold text-blue-600">{fmt(product.price)}</span>
                </div>

                <div className="flex gap-2 mt-1.5 text-[11px] text-gray-400">
                  <span>
                    Qtd:{' '}
                    <strong className="text-gray-600 font-semibold">{product.quantity}</strong>
                  </span>
                  <span className="text-gray-200">·</span>
                  <span>
                    Val:{' '}
                    <strong className="text-gray-600 font-semibold">{formatarData(product.expiry)}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 gap-3 text-gray-300">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <p className="text-sm font-medium">Nenhum produto encontrado</p>
          </div>
        )}

        {editingProduct && (
          <div className="fixed inset-0 z-50 flex justify-center">
            <div
              className="absolute inset-0 w-full bg-black/40 max-w-[430px] mx-auto"
              onClick={() => setEditingProduct(null)}
            ></div>

            <div className="absolute bottom-0 w-full max-w-[430px] bg-white rounded-t-3xl p-5 pb-10 shadow-2xl animate-slide-up">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">Atualiza Produto</h3>
                  <p className="text-sm font-medium text-blue-600">{editingProduct.name}</p>
                </div>
                <button onClick={() => setEditingProduct(null)} className="p-2 bg-gray-100 text-gray-500 rounded-full">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <form action={salvarEdicao} className="flex flex-col gap-4">
              
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Novo Preço Unitário (R$)</label>
                  <input 
                    type="number" step="0.01" min="0.01" name="price"
                    defaultValue={editingProduct.price}
                    className="w-full h-12 px-4 border border-gray-200 rounded-xl text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-sm font-bold text-gray-700 mb-1">Estoque Atual</label>
                    <div className="w-full h-12 px-4 bg-gray-100 border border-gray-200 rounded-xl text-base flex items-center text-gray-500 font-semibold cursor-not-allowed">
                      {editingProduct.quantity} un.
                    </div>
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-bold text-blue-600 mb-1">+ Adicionar</label>
                    <input 
                      type="number" min="0" placeholder="0" name="addQty"
                      className="w-full h-12 px-4 border-2 border-blue-100 bg-blue-50 rounded-xl text-base font-bold text-blue-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Nova Validade</label>
                  <input 
                    type="date" name="expiry"
                    defaultValue={validadeFixed}
                    className="w-full h-12 px-4 border border-gray-200 rounded-xl text-base focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>

                <button type="submit" className="w-full h-12 mt-2 font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-colors">
                  Salvar Alterações
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}