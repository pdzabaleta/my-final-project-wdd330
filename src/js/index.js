import { loadHeaderFooter } from '/js/headerFooter.mjs';
import { fetchProductsData } from './utils.js';
import { getUniqueCategories, renderCategories } from './categories.js';

// Always load the header and footer
loadHeaderFooter();

// Get references to the containers
const categoriesContainer = document.getElementById("categories");
const productsContainer = document.getElementById("products-list");

// Initialize the logic only if the containers exist
if (categoriesContainer && productsContainer) {
  async function init() {
    try {
      // Fetch product data (from a JSON file or an API)
      const products = await fetchProductsData();

      // Get unique categories
      const categories = getUniqueCategories(products);

      // Render categories in the container
      renderCategories(categories, categoriesContainer, (selectedCategory) => {
        // Filter the products based on the selected category
        const filteredProducts = products.filter(product => product.category === selectedCategory);

        // Show the filtered products
        renderProducts(filteredProducts, productsContainer);
      });
    } catch (error) {
      console.error("Error initializing the app:", error);
    }
  }

  // Initialize the main page logic
  init();
} else {
  console.warn("The 'categories' or 'products-list' containers were not found on this page.");
}

// Function to render the filtered products
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
      <img src="${product.image}" alt="${product.name}" loading="lazy">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p><strong>$${product.price}</strong></p>
      <button onclick="window.location.href='pages/product-details.html?id=${product.id}'">View Details</button>
    `;
    productsList.appendChild(productCard);
  });
}
