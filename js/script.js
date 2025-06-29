document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Drone X1', price: 1500.00, description: 'Um drone de alta performance para todas as suas necessidades.' },
        { id: 2, name: 'Bateria de Longa Duração', price: 250.00, description: 'Aumente o tempo de voo do seu drone.' },
        { id: 3, name: 'Drone Modelo A', price: 1200.00, description: 'Um drone versátil para iniciantes e entusiastas.' },
        { id: 4, name: 'Hélice de Reposição', price: 50.00, description: 'Hélices duráveis para diversos modelos de drones.' },
        { id: 5, name: 'Câmera HD para Drone', price: 400.00, description: 'Capture imagens aéreas incríveis com esta câmera.' },
        { id: 6, name: 'Controle Remoto Avançado', price: 300.00, description: 'Controle preciso e confortável para seu drone.' }
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Função para salvar o carrinho no localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Função para renderizar os itens do carrinho na página do carrinho
    function renderCart() {
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartSummaryTotal = document.querySelector('.cart-summary p');

        if (!cartItemsContainer || !cartSummaryTotal) return;

        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
            cartSummaryTotal.textContent = 'Total: R$ 0,00';
            return;
        }

        cart.forEach(item => {
            const product = products.find(p => p.id === item.productId);
            if (product) {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.innerHTML = `
                    <img src="../images/placeholder.jpg" alt="${product.name}">
                    <div class="item-details">
                        <h3>${product.name}</h3>
                        <p>Quantidade: ${item.quantity}</p>
                        <p>Preço: R$ ${(product.price * item.quantity).toFixed(2)}</p>
                        <button class="remove-from-cart" data-product-id="${product.id}">Remover</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
                total += product.price * item.quantity;
            }
        });

        cartSummaryTotal.textContent = `Total: R$ ${total.toFixed(2)}`;

        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = parseInt(event.target.dataset.productId);
                removeFromCart(productId);
            });
        });
    }

    // Função para adicionar um produto ao carrinho
    function addToCart(productId) {
        const existingItem = cart.find(item => item.productId === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ productId, quantity: 1 });
        }
        saveCart();
        renderCart();
        alert('Item adicionado ao carrinho!');
    }

    // Função para remover um produto do carrinho
    function removeFromCart(productId) {
        cart = cart.filter(item => item.productId !== productId);
        saveCart();
        renderCart();
        alert('Item removido do carrinho!');
    }

    // Função para popular a lista de produtos na página de produtos
    function populateProductList() {
        const productGrid = document.querySelector('.product-listing .product-grid');
        if (!productGrid) return;

        productGrid.innerHTML = ''; // Limpa o conteúdo existente

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="../images/placeholder.jpg" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span>R$ ${product.price.toFixed(2)}</span>
                <button class="add-to-cart" data-product-id="${product.id}">Adicionar ao Carrinho</button>
            `;
            productGrid.appendChild(productCard);
        });

        // Adiciona event listeners aos botões 'Adicionar ao Carrinho' dinamicamente
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = parseInt(event.target.dataset.productId);
                addToCart(productId);
            });
        });
    }

    // Função para popular os detalhes do produto na página de detalhes do produto
    function populateProductDetail() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        const product = products.find(p => p.id === productId);

        if (!product) {
            // Redirecionar para uma página de erro ou produtos se o ID não for encontrado
            console.error('Produto não encontrado!');
            return;
        }

        document.querySelector('.product-detail .product-image img').alt = product.name;
        document.querySelector('.product-detail .product-image img').src = '../images/placeholder.jpg'; // Manter placeholder
        document.querySelector('.product-detail h1').textContent = product.name;
        document.querySelector('.product-detail .price').textContent = `R$ ${product.price.toFixed(2)}`;
        document.querySelector('.product-detail .description').textContent = product.description;

        // Exemplo de como adicionar características específicas do produto (se existirem)
        const featuresList = document.querySelector('.product-detail .features');
        if (featuresList) {
            featuresList.innerHTML = ''; // Limpa as features existentes
            // Adicione features dinamicamente se o objeto product tiver uma propriedade 'features'
            // Ex: if (product.features) { product.features.forEach(feature => { const li = document.createElement('li'); li.textContent = feature; featuresList.appendChild(li); }); }
        }

        document.querySelector('.product-detail button').addEventListener('click', () => {
            addToCart(product.id);
        });
    }

    // Validações de Formulários
    function setupFormValidations() {
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const name = document.getElementById('nome-contato').value;
                const email = document.getElementById('email-contato').value;
                const message = document.getElementById('mensagem').value;

                if (name.trim() === '') {
                    alert('Por favor, insira seu nome.');
                    return;
                }
                if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)) {
                    alert('Por favor, insira um e-mail válido.');
                    return;
                }
                if (message.trim().length < 10) {
                    alert('A mensagem deve ter pelo menos 10 caracteres.');
                    return;
                }
                alert('Mensagem enviada com sucesso!');
                contactForm.reset();
            });
        }

        const checkoutForm = document.querySelector('.checkout-form');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const nome = document.getElementById('nome').value;
                const email = document.getElementById('email').value;
                const endereco = document.getElementById('endereco').value;
                const cidade = document.getElementById('cidade').value;
                const cep = document.getElementById('cep').value;
                const cartao = document.getElementById('cartao').value;
                const validade = document.getElementById('validade').value;
                const cvv = document.getElementById('cvv').value;

                if (nome.trim() === '' || email.trim() === '' || endereco.trim() === '' || cidade.trim() === '' || cep.trim() === '' || cartao.trim() === '' || validade.trim() === '' || cvv.trim() === '') {
                    alert('Por favor, preencha todos os campos.');
                    return;
                }
                // Simple email validation
                if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)) {
                    alert('Por favor, insira um e-mail válido.');
                    return;
                }
                // Simple card number validation (16 digits)
                if (!/^\d{16}$/.test(cartao)) {
                    alert('Número do cartão inválido. Deve conter 16 dígitos.');
                    return;
                }
                // Simple validity date validation (MM/YY)
                if (!/^\d{2}\/\d{2}$/.test(validade)) {
                    alert('Data de validade inválida. Use o formato MM/AA.');
                    return;
                }
                // Simple CVV validation (3 or 4 digits)
                if (!/^\d{3,4}$/.test(cvv)) {
                    alert('CVV inválido. Deve conter 3 ou 4 dígitos.');
                    return;
                }

                alert('Pedido confirmado com sucesso!');
                cart = []; // Clear cart after successful checkout
                saveCart();
                checkoutForm.reset();
            });
        }
    }

    // Inicialização baseada na página atual
    if (window.location.pathname.includes('carrinho.html')) {
        renderCart();
    } else if (window.location.pathname.includes('produtos.html')) {
        populateProductList();
    } else if (window.location.pathname.includes('detalhes_produto.html')) {
        populateProductDetail();
    }

    setupFormValidations();

    // Adiciona event listener para o botão 'Ver Produtos' na página inicial
    const viewProductsButton = document.querySelector('.hero button');
    if (viewProductsButton) {
        viewProductsButton.addEventListener('click', () => {
            window.location.href = 'produtos.html';
        });
    }

    // Adiciona event listeners para os botões 'Adicionar ao Carrinho' na página inicial
    document.querySelectorAll('.featured-products .product-card button').forEach(button => {
        button.addEventListener('click', (event) => {
            // Obtém o ID do produto do elemento pai (product-card)
            const productCard = event.target.closest('.product-card');
            if (productCard) {
                const productName = productCard.querySelector('h3').textContent;
                const product = products.find(p => p.name === productName);
                if (product) {
                    addToCart(product.id);
                }
            }
        });
    });
});


