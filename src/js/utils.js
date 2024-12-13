// Lógica específica de product-details.js aquí

  // Función para cargar una plantilla desde un archivo
  export async function loadTemplate(path) {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Failed to load template from ${path}`);
      }
      return await response.text();
    } catch (error) {
      console.error("Error loading template:", error);
    }
  }

  // Función para obtener datos del archivo JSON
  export async function fetchProductsData() {
    try {
      const response = await fetch('../data/products.json');
      if (!response.ok) {
        throw new Error("Failed to fetch products data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching products data:", error);
    }
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
