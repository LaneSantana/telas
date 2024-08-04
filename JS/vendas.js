// sales.js
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');
    const clearCartButton = document.querySelector('.clear-cart');
    let cart = [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productItem = button.parentElement;
            const productName = productItem.querySelector('.product-name').textContent;
            const productPrice = parseFloat(productItem.querySelector('.product-price').textContent.replace('R$', '').replace(',', '.'));
            const quantity = parseInt(productItem.querySelector('.quantity').value);

            const cartItem = {
                name: productName,
                price: productPrice,
                quantity: quantity
            };

            cart.push(cartItem);
            updateCart();
        });
    });

    clearCartButton.addEventListener('click', () => {
        cart = [];
        updateCart();
    });
    
    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.textContent = `${item.name} - R$ ${item.price.toFixed(2)} x ${item.quantity}`;
            cartItemsContainer.appendChild(cartItemElement);

            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

   
});
