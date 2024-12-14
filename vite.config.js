import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src', // Define el directorio raíz para el servidor de desarrollo
  base: '/',    // Esto asegura que las rutas relativas funcionen correctamente en producción

  server: {
    port: 5173, // Cambia el puerto si es necesario
  },

  build: {
    outDir: '../dist', // Carpeta de salida del build
    rollupOptions: {
      input: {
        main: '/index.html', // Archivo principal en el directorio root (src/index.html)
        cart: '/pages/cart.html', // Otro archivo HTML dentro de pages/
        productDetails: '/pages/product-details.html', // Otro archivo dentro de pages/
        search: '/pages/search.html', // Otro archivo dentro de pages/
      },
    },
  },
});
