import { loadHeaderFooter } from '/js/headerFooter.mjs';
import { fetchProductsData } from './utils.js';
import { getUniqueCategories, renderCategories } from './categories.js';

const categoriesContainer = document.getElementById("categories");
const productsContainer = document.getElementById("products-list");

async function init() {
  try {
    // Cargar el encabezado y pie de página
    loadHeaderFooter();

    // Obtener datos de productos (desde un archivo JSON o una API)
    const products = await fetchProductsData();

    // Obtener categorías únicas
    const categories = getUniqueCategories(products);

    // Renderizar categorías en el contenedor
    renderCategories(categories, categoriesContainer, (selectedCategory) => {
      // Filtrar los productos de la categoría seleccionada
      const filteredProducts = products.filter(product => product.category === selectedCategory);
      
      // Mostrar los productos filtrados
      renderProducts(filteredProducts, productsContainer);
    });
  } catch (error) {
    console.error("Error initializing the app:", error);
  }
}

// Función para renderizar los productos filtrados
function renderProducts(products, container) {
    container.innerHTML = `
      <div id="products-list-title">
        <h2>Products</h2>
      </div>
    `;
  
    const productsList = document.getElementById("products-list");
  
    products.forEach((product, index) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p><strong>$${product.price}</strong></p>
        <button onclick="window.location.href='pages/product-details.html?id=${product.id}'">View Details</button>
      `;
      // Aseguramos que los productos se distribuyan correctamente en las áreas del grid
      productCard.style.gridArea = `product${index + 1}`;
      productsList.appendChild(productCard);
    });
  }
  
  
// Inicializar la aplicación
init();
