function getCoresCategoria(categoria: string) {
    const categoriaNormal = categoria.toLowerCase();
    let bgColor = '#F3F4F6'
    let strokeColor = '#9CA3AF'

    if (categoriaNormal.includes('bebida')) {
        bgColor = '#FFF7ED';
        strokeColor = '#F97316';
    } else if (categoriaNormal.includes('padaria')) {
        bgColor = '#FEFCE8';
        strokeColor = '#EAB308';
    } else if (categoriaNormal.includes('laticínio') || categoriaNormal.includes('laticinio')) {
        bgColor = '#F0FDF4';
        strokeColor = '#22C55E';
    } else if (categoriaNormal.includes('mercearia')) {
        bgColor = '#FAF5FF'; 
        strokeColor = '#A855F7';
    }

    return { bgColor, strokeColor };
}

export async function salvarProduto(estadoAnterior: any, formData: FormData) {
    
    const nome = String(formData.get('name') || '').trim();
    const categoriaBruta = String(formData.get('category') || '').trim();
    const validade = String(formData.get('expiry') || '');
    const preco = parseFloat(String(formData.get('price') || '0'));
    const estoque = parseInt(String(formData.get('quantity') || '0'), 10);

    const produto = {
        nome: nome,
        categoria: categoriaBruta,
        dataValidade: validade !== '' ? validade : null, 
        preco: preco,
        quantidadeEstoque: estoque
    };

    try {

        const token = localStorage.getItem('token');

        if (!token) {
            return { mensagem: 'Usuário não autenticado. Faça login novamente.', sucesso: false };
        }

        const response = await fetch('http://localhost:8080/api/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(produto)
        });

        if (!response.ok) {
            const erro = await response.text();
            throw new Error(erro || 'Falha ao salvar produto no servidor.');
        }

        return { mensagem: `O produto "${produto.nome}" foi cadastrado com sucesso!`, sucesso: true };

    } catch (error: any) {
        console.error('Erro ao salvar produto:', error);
        return { mensagem: error.message || 'Erro de conexão com o servidor.', sucesso: false };
    }
} 

export async function buscarProdutos() {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Usuário não autenticado.');
        }

        const response = await fetch('http://localhost:8080/api/produtos', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Falha ao buscar produtos no servidor.');
        }

        const produtosBackend = await response.json();
        
        // mapeia os dados do BD de volta para o padrão que a EstoqueScreen usa
        return produtosBackend.map((prod: any) => {
            const cores = getCoresCategoria(prod.categoria);
            return {
                id: prod.id,
                name: prod.nome, 
                category: prod.categoria,
                expiry: prod.dataValidade || '', 
                price: prod.preco,
                quantity: prod.quantidadeEstoque,
                bgColor: cores.bgColor,
                strokeColor: cores.strokeColor
            };
        });

    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        return []; // retorna lista vazia em caso de erro para a tela não quebrar
    }
}

export async function deletarProduto(id: string) {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Usuário não autenticado.');
        }

        const response = await fetch(`http://localhost:8080/api/produtos/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Falha ao excluir o produto no servidor.');
        }

        return true;
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        return false;
    }
}

export async function atualizarProduto(id: string, dadosAtualizados: { preco: number, quantidadeAdicional: number, dataValidade: string }) {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Usuário não autenticado.');
        }

        const payload = {
            preco: dadosAtualizados.preco,
            quantidadeEstoque: dadosAtualizados.quantidadeAdicional,
            dataValidade: dadosAtualizados.dataValidade !== '' ? dadosAtualizados.dataValidade : null
        };

        const response = await fetch(`http://localhost:8080/api/produtos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error('Falha ao atualizar o produto no servidor.');
        }

        return true;
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        return false;
    }
}

export async function realizarVendaNoBanco(cartItems: { id: string, cartQty: number }[]) {
        try {
            const token = localStorage.getItem('token');

            if(!token) throw new Error('Usuário não autenticado.');

            const response = await fetch('http://localhost:8080/api/produtos/venda', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(cartItems)
            });

            if(!response.ok){
                const erroTxt = await response.text();
                throw new Error(erroTxt || 'Falha ao processar venda no servidor');
            }

            return true

        } catch (error) {
            console.error('Erro ao finalizar venda:', error);
            return false;
        }
    }