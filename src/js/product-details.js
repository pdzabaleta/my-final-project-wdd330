import { loadHeaderFooter } from '/js/headerFooter.mjs';
import { fetchProductsData } from './utils.js';

async function init() {
  try {
    // Cargar el encabezado y pie de página
    loadHeaderFooter();

    // Obtener el id del producto desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    // Obtener los datos de los productos
    const products = await fetchProductsData();

    // Buscar el producto que coincide con el id
    const product = products.find(p => p.id === productId);
    if (product) {
      renderProductDetails(product);
    } else {
      document.getElementById("product-details").innerHTML = "<p>Product not found!</p>";
    }
  } catch (error) {
    console.error("Error loading product details:", error);
  }
}

// Función para renderizar los detalles del producto
function renderProductDetails(product) {
  const container = document.getElementById("product-details");
  container.innerHTML = `
    <h1>${product.name}</h1>
    <img src="${product.image}" alt="${product.name}">
    <p>${product.details}</p>
    <p class="price">$${product.price}</p>
    <h3>Reviews:</h3>
    <div class="reviews">
      <ul>
        ${product.reviews.map(review => `
          <li>
            <strong>${review.customerName}</strong>
            <p>${review.comment}</p>
            <span>Rating: ${review.rating}/5</span>
          </li>
        `).join('')}
      </ul>
    </div>
    <a href="/pages/cart.html" class="btn">Go to Cart</a>
  `;
}

// Inicializar la página de detalles
init();
