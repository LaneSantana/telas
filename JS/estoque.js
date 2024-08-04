document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    const productListContainer = document.querySelector('.product-list');
    let products = [];

    productForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const productName = event.target['product-name'].value;
        const productPrice = parseFloat(event.target['product-price'].value.replace(',', '.'));
        const productQuantity = parseInt(event.target['product-quantity'].value);

        const existingProduct = products.find(product => product.name === productName);

        if (existingProduct) {
            existingProduct.price = productPrice;
            existingProduct.quantity += productQuantity;
        } else {
            const newProduct = {
                name: productName,
                price: productPrice,
                quantity: productQuantity
            };
            products.push(newProduct);
        }

        updateProductList();
        productForm.reset();
    });

    function updateProductList() {
        productListContainer.innerHTML = '';
        products.forEach((product, index) => {
            const productItemElement = document.createElement('div');
            productItemElement.classList.add('product-item');
            productItemElement.innerHTML = `
                <span>${product.name} - R$ ${product.price.toFixed(2).replace('.', ',')} - Quantidade: ${product.quantity}</span>
                <div class="product-actions">
                    <button onclick="removeProduct(${index})">Remover</button>
                </div>
            `;
            productListContainer.appendChild(productItemElement);
        });
    }

    window.removeProduct = (index) => {
        products.splice(index, 1);
        updateProductList();
    }
});
