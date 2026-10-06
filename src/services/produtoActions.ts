export async function salvarProduto(estadoAnterior: any, formData: FormData) {
    const produto = {
        nome: formData.get('nome'),
        preco: formData.get('preco'),
        estoque: formData.get('estoque'),
    };

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log('Produto salvo via arquivo de action:', produto);

    return { mensagem: `O produto "${produto.nome}" foi cadastrado com sucesso!`, sucesso: true};
}