import { loadHeaderFooter } from '/js/headerFooter.mjs';

document.addEventListener('DOMContentLoaded', () => {
  // Load the header and footer
  loadHeaderFooter();

  // Load the cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items-container'); // New ID
  const totalPriceContainer = document.getElementById('cart-total-container'); // New ID

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  // Render the products in the cart
  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h2>${item.name}</h2>
        <p>Price: $${item.price}</p>
        <p>Quantity: 
          <button class="cart-btn-decrease" data-id="${item.id}">-</button>
          ${item.quantity}
          <button class="cart-btn-increase" data-id="${item.id}">+</button>
        </p>
        <button class="cart-btn-remove" data-id="${item.id}">Remove</button>
      </div>
    </div>
  `).join('');

  // Calculate and display the total price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalPriceContainer.innerHTML = `<h2>Total: $${total.toFixed(2)}</h2>`;

  // Event listeners for the buttons
  cartItemsContainer.addEventListener('click', (e) => {
    const id = parseInt(e.target.dataset.id);
    if (e.target.classList.contains('cart-btn-increase')) {
      updateQuantity(id, 1);
    } else if (e.target.classList.contains('cart-btn-decrease')) {
      updateQuantity(id, -1);
    } else if (e.target.classList.contains('cart-btn-remove')) {
      removeFromCart(id);
    }
  });
});

// Function to update the quantity of a product
function updateQuantity(id, change) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const product = cart.find(item => item.id === id);
  if (product) {
    product.quantity += change;
    if (product.quantity <= 0) {
      cart = cart.filter(item => item.id !== id);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload(); // Reload to reflect the changes
  }
}

// Function to remove a product from the cart
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload(); // Reload to reflect the changes
}
