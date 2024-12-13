import { loadTemplate, renderWithTemplate } from '../js/utils.js';
import { searchProducts } from '../js/search.mjs';

// Función para configurar el header con eventos y funcionalidades adicionales
async function setupHeader() {
  const logo = document.querySelector('.logo');
  const searchInput = document.querySelector('#search');
  const searchIcon = document.querySelector('.absolute-search');
  const accountIcon = document.querySelector('.user');
  const cartIcon = document.querySelector('.cart i');


  if (logo) {
    logo.addEventListener('click', () => {
      window.location.href = './index.html';
  });
  }
  if (searchInput) {
    // Evento para búsqueda al presionar Enter
    searchInput.addEventListener('keydown', async function (event) {
      if (event.key === 'Enter') {
        const query = event.target.value;

        try {
          const results = await searchProducts(query);

          if (results) {
            localStorage.setItem('searchResults', JSON.stringify(results));
            window.location.href = `/src/pages/search.html`;
          } else {
            window.location.href = `/src/pages/search.html?results=not_found`;
          }
        } catch (error) {
          alert('There was a problem with the search. Please try again.');
        }
      }
    });
  } else {
    console.error('Search input element not found');
  }

  // Evento para búsqueda al hacer clic en el ícono
  if (searchIcon) {
    searchIcon.addEventListener('click', () => {
      if (searchInput.value.trim() !== '') {
        searchInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      }
    });
  }

  // Eventos para navegación (íconos de cuenta y carrito)
  if (accountIcon) {
    accountIcon.addEventListener('click', () => {
      window.location.href = '/src/pages/product-details.html';
      // window.location.href = 'account.html';
    });
  }

  if (cartIcon) {
    cartIcon.addEventListener('click', () => {
      window.location.href = '#';
    });
  }
}

// Función principal para cargar header y footer
export async function loadHeaderFooter() {
  const headerPath = await loadTemplate('./components/header.html');
  const footerPath = await loadTemplate('./components/footer.html');
  const header = document.getElementById('main-header');
  const footer = document.getElementById('main-footer');

  if (header) {
    renderWithTemplate(() => headerPath, header);
  } else {
    console.error('Header element not found');
  }

  if (footer) {
    renderWithTemplate(() => footerPath, footer);
  } else {
    console.error('Footer element not found');
  }

  // Configura eventos después de cargar el header
  await setupHeader();
}
