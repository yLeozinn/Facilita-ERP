export const loginUser = async (email: string, senha: string) => {
    const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
        throw new Error('E-mail ou senha incorretos.');
    }

    return await response.json();
}

export const cadastrarUser = async (dadosUsuario: Record<string, any>) => {
  const response = await fetch('http://localhost:8080/api/auth/cadastrar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dadosUsuario),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Erro ao realizar o cadastro. Verifique os dados e tente novamente.');
  }

  return response.ok; 
};