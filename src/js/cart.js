import { loadHeaderFooter } from '/js/headerFooter.mjs';

// Listen to the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', () => {
  // Load the header and footer
  loadHeaderFooter();

  // Load the cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items-container');
  const totalPriceContainer = document.getElementById('cart-total-container');

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
  totalPriceContainer.innerHTML = `<h2>Total: $${total.toFixed(2)}</h2> <a href="/index.html" id="continue-shopping-btn">Continue Shopping</a>`;

// Event listeners for the cart buttons
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

// Configure the PayPal button
  paypal.Buttons({
    createOrder: function (data, actions) {
      // Recalculate the cart total when creating the order
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

      return actions.order.create({
        purchase_units: [{
          amount: {
            value: total.toFixed(2) // Precio total dinámico
          }
        }]
      });
    },
    onApprove: function (data, actions) {
     // Capture payment
      return actions.order.capture().then(function (details) {
        alert('Transaction completed by ' + details.payer.name.given_name);
        console.log(details);
      });
    },
    onCancel: function (data) {
      // Logic when the user cancels the payment
      alert('Payment canceled!');
    },
    onError: function (err) {
      // Error handling
      console.error(err);
      alert('An error occurred during the transaction.');
    },
  }).render('#paypal-button-container'); 

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
    location.reload(); // Reload to reflect changes
  }
}
// Function to remove a product from the cart
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload(); // Reload to reflect changes
}
});
