let productsList = []; // This will hold the fetched products

document.addEventListener('DOMContentLoaded', () => {
    const loadProductsBtn = document.getElementById('loadProductsBtn');
    const sortPriceBtn = document.getElementById('sortPriceBtn');
    const productsDisplay = document.getElementById('productsDisplay');
    
    const displayProducts = (products) => {
        productsDisplay.innerHTML = ''; // Clear display before showing products
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.innerHTML = `
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p>Price: $${product.price}</p>
            `;
            productsDisplay.appendChild(productElement);
        });
    };

    loadProductsBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/v1/products');
            productsList = await response.json(); // Update the global products list
            displayProducts(productsList);
        } catch (error) {
            console.error('Failed to load products:', error);
        }
    });

    sortMinPriceBtn.addEventListener('click', () => {
        const sortedProducts = [...productsList].sort((a, b) => a.price - b.price);
        displayProducts(sortedProducts);
    });
    sortMaxPriceBtn.addEventListener('click', () => {
        const sortedProducts = [...productsList].sort((a, b) => b.price - a.price);
        displayProducts(sortedProducts);
    });
});
