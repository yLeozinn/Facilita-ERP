import { useState } from 'react'

type Product = {
   id: number;
   name: string; 
   price: number; 
   category: string;
   quantity: number;
   expiry: string;
   bgColor: string;
   strokeColor: string;
}
type CartItem = Product & { cartQty: number }
type PayMethod = 'credito' | 'debito' | 'dinheiro'

const PAYMENT_METHODS: { id: PayMethod; label: string }[] = [
  { id: 'credito', label: 'Crédito' },
  { id: 'debito', label: 'Débito' },
  { id: 'dinheiro', label: 'Dinheiro' },
]

function fmt(n: number) {
  return `R$ ${n.toFixed(2).replace('.', ',')}`
}

export default function PontoDeVendaScreen() {
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState<CartItem[]>([])
  const [payMethod, setPayMethod] = useState<PayMethod>('debito')
  const [discount, setDiscount] = useState('')
  const [done, setDone] = useState(false)

  const [availableProducts, setAvailableProducts] = useState<Product[]>(() => {
    const salvos = localStorage.getItem('facilita_produtos');
    return salvos ? JSON.parse(salvos) : [];
  })

  const visible = availableProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const addItem = (product: Product) => {
    setCart((prev) => {
      const found = prev.find((x) => x.id === product.id)
      if (found){
        if (found.cartQty >= product.quantity){
          alert(`Atenção: Você só tem ${product.quantity} unidades de "${product.name}" no estoque.`);
          return prev;
        } 
        return prev.map((x) => (x.id === product.id ? { ...x, cartQty: x.cartQty + 1 } : x))
      }
      return [...prev, { ...product, cartQty: 1 }]
    })
  }

  const changeQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((x) => {
          if (x.id === id) {
            const newQty = x.cartQty + delta;
            if (newQty > x.quantity) {
              alert(`Estoque insuficiente! Máximo de ${x.quantity} unidades disponíveis.`);
              return x;
            }
            return { ...x, cartQty: newQty};
          }
          return x;
        })
        .filter((x) => x.cartQty > 0)
    )
  }

const finalizarVenda = () => {
  if (cart.length === 0) return;

  const salvos = JSON.parse(localStorage.getItem('facilita_produtos') || '[]');

  const estoqueAtualizado = salvos.map((p: Product) => {
    const itemNoCarrinho = cart.find(c => c.id === p.id);
    if (itemNoCarrinho) {
      return { ...p, quantity: p.quantity - itemNoCarrinho.cartQty };
    }
    return p;
  });

  localStorage.setItem('facilita_produtos', JSON.stringify(estoqueAtualizado));
  setAvailableProducts(estoqueAtualizado);
  setDone(true);
}

  const subtotal = cart.reduce((s, x) => s + x.price * x.cartQty, 0)
  const discPerc = parseFloat(discount.replace(',', '.')) || 0
  const discValue = subtotal * (discPerc / 100)
  const total = Math.max(0, subtotal - discValue)
  const totalItems = cart.reduce((s, x) => s + x.cartQty, 0)

  if (done) {
    const methodLabel = payMethod === 'credito' ? 'Crédito' : payMethod === 'debito' ? 'Débito' : 'Dinheiro'
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] gap-4 p-8 bg-gray-50/50 dark:bg-gray-900 transition-colors duration-300">
        <div className="w-20 h-20 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div className="text-center">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">Venda Finalizada!</h2>
          <p className="text-sm text-gray-400 dark:text-gray-400 mt-1">
            {fmt(total)} recebido via {methodLabel}
          </p>
        </div>
        <button
          onClick={() => { setCart([]); setDiscount(''); setDone(false) }}
          className="mt-2 px-6 py-3 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors"
        >
          Nova Venda
        </button>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4 pb-6 min-h-screen bg-gray-50/50 dark:bg-gray-900 transition-colors duration-300">
      {/* Produtos Disponíveis */}
      <section>
        <h2 className="text-sm font-bold text-gray-800 dark:text-gray-100 mb-2.5">Produtos Disponíveis</h2>

        <div className="relative mb-3">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-400 dark:text-gray-500" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Buscar produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-3 snap-x">
          {visible.length === 0 ? (
            <div className="w-full py-4 text-center text-xs text-gray-400 dark:text-gray-500">
              Nenhum produto em estoque.
            </div>
          ) : (
            visible.map((p) => (
              <button
                key={p.id}
                onClick={() => addItem(p)}
                className="shrink-0 w-[96px] p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-sm transition-all text-left flex flex-col snap-start"
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-2 opacity-90 dark:opacity-80"
                  style={{ backgroundColor: p.bgColor || '#EFF6FF' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={p.strokeColor || '#3B82F6'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </div>
                <p className="text-[11px] font-semibold text-gray-700 dark:text-gray-200 leading-tight mb-0.5 line-clamp-2">{p.name}</p>
                <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mt-auto">{fmt(p.price)}</p>
                <p className="text-[9px] font-medium text-gray-400 dark:text-gray-500 mt-0.5">{p.quantity} no estq.</p>
                
                <div className="mt-2 flex items-center justify-center gap-0.5 bg-blue-600 dark:bg-blue-500 rounded-lg py-1.5 w-full">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  <span className="text-[10px] font-bold text-white">Add</span>
                </div>
              </button>
            ))
          )}
        </div>
      </section>

      <div className="h-px bg-gray-100 dark:bg-gray-800" />

      {/* Carrinho */}
      <section>
        <div className="flex items-center gap-2 mb-2.5">
          <h2 className="text-sm font-bold text-gray-800 dark:text-gray-100">Carrinho</h2>
          {totalItems > 0 && (
            <span className="text-[10px] font-bold text-white bg-blue-600 dark:bg-blue-500 px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
              {totalItems}
            </span>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="flex items-center justify-center py-5 text-sm text-gray-300 dark:text-gray-600">
            Carrinho vazio
          </div>
        ) : (
          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-3 shadow-sm">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{item.name}</p>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">{fmt(item.price)} por unidade</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => changeQty(item.id, -1)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                  <span className="text-sm font-bold text-gray-800 dark:text-gray-100 w-5 text-center">{item.cartQty}</span>
                  <button
                    onClick={() => changeQty(item.id, 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </button>
                </div>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400 min-w-[56px] text-right">
                  {fmt(item.price * item.cartQty)}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="h-px bg-gray-100 dark:bg-gray-800" />

      {/* Pagamento */}
      <section>
        <h2 className="text-sm font-bold text-gray-800 mb-3">Pagamento</h2>

        <div className="mb-3">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Desconto (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="0"
            className="w-full px-3 py-2.5 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Forma de Pagamento</label>
          <div className="flex gap-2">
            {PAYMENT_METHODS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setPayMethod(id)}
                className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                  payMethod === id
                    ? 'bg-blue-600 dark:bg-blue-500 text-white border-blue-600 dark:border-blue-500'
                    : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-3.5 mb-4 space-y-2.5 transition-colors">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
            <span className="font-semibold text-gray-700 dark:text-gray-200">{fmt(subtotal)}</span>
          </div>
          {discPerc > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Desconto ({discPerc}%)</span>
              <span className="font-semibold text-red-500 dark:text-red-400">- {fmt(discValue)}</span>
            </div>
          )}
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-gray-800 dark:text-gray-100">Total</span>
            <span className="text-base font-bold text-blue-600">{fmt(total)}</span>
          </div>
        </div>

        <button
          onClick={finalizarVenda}
          disabled={cart.length === 0}
          className="w-full py-4 text-sm font-bold text-white bg-blue-600 dark:bg-blue-500 rounded-2xl hover:bg-blue-700 dark:hover:bg-blue-600 active:bg-blue-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Finalizar
        </button>
      </section>
    </div>
  )
}