import { loadHeaderFooter } from '/js/headerFooter.mjs';
import { fetchProductsData } from './utils.js';

async function init() {
  try {
    // Load the header and footer
    loadHeaderFooter();

    // Get the product id from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));

    // Fetch the product data
    const products = await fetchProductsData();

    // Find the product that matches the id
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

// Function to render product details
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

  // Add event to the add to cart button
  document.getElementById('add-to-cart').addEventListener('click', () => addToCart(product));
}

// Function to add a product to the cart
function addToCart(product) {
  // Get the current cart from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Check if the product already exists in the cart
  const existingProduct = cart.find(item => item.id === product.id);
  
  if (existingProduct) {
    // Increase the quantity if it already exists
    existingProduct.quantity++;
  } else {
    // Add a new product with quantity 1
    cart.push({ ...product, quantity: 1 });
  }
  
  // Save the updated cart in localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  
  alert('Product added to cart!');
}

// Initialize the product details page
init();
