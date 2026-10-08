export async function salvarProduto(estadoAnterior: any, formData: FormData) {
    
    const nome = String(formData.get('name') || '').trim();
    const categoriaBruta = String(formData.get('category') || '').trim();
    const validade = String(formData.get('expiry') || '');
    const preco = parseFloat(String(formData.get('price') || '0'));
    const estoque = parseInt(String(formData.get('quantity') || '0'), 10);

    const categoriaNormal = categoriaBruta.toLowerCase();

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

    const produto = {
        id: Date.now(),
        name: nome,
        category: categoriaBruta,
        expiry: validade,
        price: preco,
        quantity: estoque,
        bgColor: bgColor,
        strokeColor: strokeColor
    };

    const produtosSalvos = JSON.parse(localStorage.getItem('facilita_produtos') || '[]');

    produtosSalvos.push(produto);

    localStorage.setItem('facilita_produtos', JSON.stringify(produtosSalvos));

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Produto salvo via arquivo de action:', produto);

    return { mensagem: `O produto "${produto.name}" foi cadastrado com sucesso!`, sucesso: true};
}