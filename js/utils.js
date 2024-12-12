import { loadHeaderFooter } from './headerFooter.mjs';
import { searchProducts } from './search.mjs';
import { addEventListeners } from './events.mjs';

loadHeaderFooter().then(() => {
  addEventListeners();

  const searchInput = document.getElementById('search');
  if (searchInput) {
    searchInput.addEventListener('keydown', async function (event) {
      if (event.key === 'Enter') {
        const query = event.target.value;

        try {
          const results = await searchProducts(query);

          if (results) {
            const queryString = encodeURIComponent(JSON.stringify(results));
            window.location.href = `search.html?results=${queryString}`;
          } else {
            window.location.href = `search.html?results=not_found`;
          }
        } catch (error) {
          alert('There was a problem with the search. Please try again.');
        }
      }
    });
  } else {
    console.error('Search input element not found');
  }
});

// Función para cargar una plantilla desde un archivo
export async function loadTemplate(path) {
  const response = await fetch(path);
  const data = await response.text();
  return data;
}

// Función para renderizar contenido con una plantilla
export function renderWithTemplate(templateFn, parentElement, data, callback) {
  if (parentElement) {
    parentElement.insertAdjacentHTML("afterbegin", templateFn(data));
    if (callback) {
      callback(data);
    }
  } else {
    console.error(`Element not found for selector: ${parentElement}`);
  }
}
