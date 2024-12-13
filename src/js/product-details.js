import { fetchProductsData } from './utils.js';
import { loadHeaderFooter } from './headerFooter.mjs';

loadHeaderFooter().then(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'), 10);

  fetchProductsData().then(products => {
    const product = products.find(p => p.id === productId);

    if (!product) {
      // Solo actualizar el contenedor dentro de main sin afectar el header ni el footer
      document.getElementById("main").innerHTML = "<p>Product not found.</p>";
      return;
    }

    // Renderiza los datos del producto
    document.getElementById("main-image").src = product.image;
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-category").textContent = `Category: ${product.category}`;
    document.getElementById("product-price").textContent = `$${product.price}`;
    document.getElementById("product-description").textContent = product.description;
    document.getElementById("product-details").textContent = product.details;

    // Manejo de thumbnails
    const thumbnailContainer = document.getElementById("thumbnail-container");
    if (product.thumbnails) {
      product.thumbnails.forEach(thumbnail => {
        const img = document.createElement("img");
        img.src = thumbnail;
        img.alt = "Product thumbnail";
        img.style.width = "50px";
        img.style.cursor = "pointer";
        img.addEventListener("click", () => {
          document.getElementById("main-image").src = thumbnail;
        });
        thumbnailContainer.appendChild(img);
      });
    }

    // Manejo de reseñas
    const reviewsList = document.getElementById("reviews-list");
    product.reviews.forEach(review => {
      const li = document.createElement("li");
      li.textContent = review;
      reviewsList.appendChild(li);
    });

    // Agregar al carrito
    document.getElementById("add-to-cart").addEventListener("click", () => {
      alert(`${product.name} added to the cart!`);
    });
  });
});
