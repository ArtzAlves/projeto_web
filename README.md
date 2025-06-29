# Site Vendrâmico

Este projeto consiste em um site de e-commerce para a venda de drones e peças, desenvolvido como parte de um trabalho prático de Desenvolvimento Web.

## Funcionalidades

- **Estrutura HTML e CSS**: Páginas estáticas com design responsivo e semântico.
- **Funcionalidades JavaScript**: 
    - Adicionar/Remover/Atualizar itens no carrinho de compras.
    - Validação de formulários de contato e checkout.
    - Persistência de dados do carrinho usando `localStorage`.
    - População dinâmica de produtos nas páginas de listagem e detalhes.
- **Otimização de Código**: Código JavaScript refatorado para melhor desempenho e manutenibilidade.
- **Integração de Conteúdo**: Produtos populados dinamicamente com informações reais (placeholders para imagens).

## Como Configurar e Executar

1.  **Download**: Baixe o arquivo `vendramico.zip` fornecido.
2.  **Descompactar**: Extraia o conteúdo do arquivo `vendramico.zip` para uma pasta de sua preferência.
3.  **Abrir no Navegador**: Navegue até a pasta descompactada e abra os arquivos HTML (ex: `index.html`, `produtos.html`, `carrinho.html`) diretamente no seu navegador web. Não é necessário um servidor web para visualização.

## Tecnologias Utilizadas

-   **HTML5**: Para a estrutura semântica das páginas.
-   **CSS3**: Para estilização e responsividade (Flexbox e Grid).
-   **JavaScript (ES6+)**: Para interatividade, validações de formulário e gerenciamento de estado do carrinho.
-   **localStorage**: Para persistência de dados do carrinho entre sessões.

## Estrutura de Pastas

```
vendramico/
├── html/
│   ├── index.html
│   ├── produtos.html
│   ├── detalhes_produto.html
│   ├── carrinho.html
│   ├── checkout.html
│   ├── contato.html
│   └── sobre.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── images/
    └── placeholder.jpg
```

## Testes Realizados

-   **Responsividade**: Testado em diferentes tamanhos de tela (desktop e mobile).
-   **Funcionalidades do Carrinho**: Adição, remoção e atualização de itens no carrinho, com persistência via `localStorage`.
-   **Validação de Formulários**: Testes de validação para os formulários de contato e checkout, incluindo mensagens de erro e sucesso.
-   **Navegação**: Verificação da navegação entre todas as páginas do site.
-   **População Dinâmica**: Confirmação de que os dados dos produtos são carregados e exibidos corretamente nas páginas de listagem e detalhes.


