import { loadHeaderFooter } from '/js/headerFooter.mjs';

// Escucha el evento DOMContentLoaded
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

  // Renderizar los productos en el carrito
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

  // Calcular y mostrar el precio total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalPriceContainer.innerHTML = `<h2>Total: $${total.toFixed(2)}</h2> <a href="/index.html" id="continue-shopping-btn">Continue Shopping</a>`;

  // Event listeners para los botones del carrito
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

  // Configurar el botón de PayPal
  paypal.Buttons({
    createOrder: function (data, actions) {
      // Recalcular el total del carrito al momento de crear la orden
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
      // Capturar el pago
      return actions.order.capture().then(function (details) {
        alert('Transaction completed by ' + details.payer.name.given_name);
        console.log(details);
      });
    },
    onCancel: function (data) {
      // Lógica cuando el usuario cancela el pago
      alert('Payment canceled!');
    },
    onError: function (err) {
      // Manejo de errores
      console.error(err);
      alert('An error occurred during the transaction.');
    }
  }).render('#paypal-button-container'); // Renderizar el botón de PayPal
});

// Función para actualizar la cantidad de un producto
function updateQuantity(id, change) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const product = cart.find(item => item.id === id);
  if (product) {
    product.quantity += change;
    if (product.quantity <= 0) {
      cart = cart.filter(item => item.id !== id);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload(); // Reload para reflejar los cambios
  }
}

// Función para eliminar un producto del carrito
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload(); // Reload para reflejar los cambios
}
