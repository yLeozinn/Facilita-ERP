# Facilita

**Facilita** é um aplicativo web (PWA-style) focado em **gestão ágil para Microempreendedores Individuais (MEIs) e vendedores informais**. O projeto adota uma arquitetura *mobile-first*, garantindo que a rotina de vendas, controle de fiados e gestão de estoque possa ser feita inteiramente na palma da mão, com uma interface fluida e amigável.

Este repositório contém o código-fonte do *frontend* do projeto, desenvolvido como **Projeto de Extensão Universitária** do curso de Ciência da Computação.

## Sobre o Projeto

Para muitos vendedores informais e pequenos empreendedores, sistemas tradicionais de ERP são complexos, caros e dependem de computadores de mesa. O **Facilita** nasce com o propósito social e tecnológico de democratizar o controle financeiro e de estoque.

Através de uma interface que imita aplicativos nativos de celular, o usuário pode cadastrar produtos, registrar vendas de balcão, anotar contas a receber (caderneta/fiado) e verificar o lucro do dia em poucos toques.

## Funcionalidades (Roadmap)

* **Meu Estoque:** Cadastro, edição rápida e exclusão de produtos.
* **Nova Venda (PDV):** Registro ágil de saídas e cálculo de carrinho.
* **Caderneta (Fiados):** Controle de clientes que compram para pagar depois.
* **Despesas:** Registro de custos operacionais do dia a dia.
* **Resumo do Dia:** Dashboard simplificado com lucros e movimentações.

## Tecnologias Utilizadas

### Frontend

* **React 19:** Utilizando os padrões mais recentes, incluindo *Form Actions* e componentes funcionais modernos (sem dependência de APIs obsoletas).
* **Vite:** Ferramenta de *build* super rápida para uma experiência de desenvolvimento fluida.
* **TypeScript:** Tipagem estática para maior segurança e redução de bugs no código.
* **Tailwind CSS:** Estilização utilitária para construção de interfaces responsivas e personalizadas (*mobile-first* com limitação de `max-w-[430px]`).

### Armazenamento e Persistência

* **Fase Atual:** Os dados estão sendo persistidos localmente no navegador utilizando `LocalStorage`, permitindo o uso imediato e offline do app.
* **Fase Futura (Backend):** Planejamento de integração com uma API RESTful desenvolvida em **Java com Spring Boot** e banco de dados **PostgreSQL**.

## Créditos e Equipe

Este projeto é desenvolvido no contexto de Extensão Universitária.

* **Desenvolvedor:** Leonardo (Graduando em Ciência da Computação)
* **Orientação Acadêmica:** Profa. Adria Lyra

*Feito com dedicação para facilitar o pequeno comércio brasileiro.*