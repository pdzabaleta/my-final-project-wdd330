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
    <button class="btn" id="add-to-cart">Add to Cart</button>
  `;

  // Agregar evento al botón de agregar al carrito
  document.getElementById('add-to-cart').addEventListener('click', () => addToCart(product));
}

// Función para agregar un producto al carrito
function addToCart(product) {
  // Obtener el carrito actual del localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Buscar si el producto ya está en el carrito
  const existingProduct = cart.find(item => item.id === product.id);
  
  if (existingProduct) {
    // Incrementar la cantidad si ya existe
    existingProduct.quantity++;
  } else {
    // Agregar un nuevo producto con cantidad 1
    cart.push({ ...product, quantity: 1 });
  }
  
  // Guardar el carrito actualizado en el localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  alert('Product added to cart!');
}

// Inicializar la página de detalles
init();
