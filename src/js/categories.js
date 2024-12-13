// Obtener categorías únicas
export function getUniqueCategories(products) {
    return [...new Set(products.map(product => product.category))];
}

// Renderizar categorías
export function renderCategories(categories, container, callback) {
    container.innerHTML = "<h2>Categories</h2>";
    categories.forEach(category => {
        const categoryButton = document.createElement("button");
        categoryButton.textContent = category;
        categoryButton.classList.add("category-button");
        categoryButton.addEventListener("click", () => callback(category));
        container.appendChild(categoryButton);
    });
    container.style.display = "block"; // Asegura que las categorías sean visibles
}

// Mostrar productos filtrados
export function showProductsByCategory(category, container, products) {
    const filteredProducts = products.filter(product => product.category === category);
    renderProducts(filteredProducts, container);
}

// Renderizar productos
function renderProducts(products, container) {
    container.innerHTML = `
        <div id="products-list-title">
            <h2>Products</h2>
        </div>
        <div id="products-list"></div>
    `;
    const productsList = document.getElementById("products-list");
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><strong>$${product.price}</strong></p>
            <button data-id="${product.id}" class="product-details-button">View Details</button>
        `;
        productsList.appendChild(productCard);

        // Navegar a la página de detalles del producto
        productCard.querySelector(".product-details-button").addEventListener("click", () => {
            window.location.href = `product-details.html?id=${product.id}`;
        });
    });
}