import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src', // Define el directorio raíz del servidor de desarrollo
  base: '/',    // Esto asegura que las rutas relativas funcionen correctamente en producción (como en npm)
  server: {
    port: 5173, // Cambia el puerto si es necesario
  },
  build: {
    outDir: '../dist', // Salida del build dentro del root (fuera de 'src')
    rollupOptions: {
      input: {
        main: '/index.html', // Define el archivo de entrada principal
        productDetails: '/pages/product-details.html', // Otros archivos de entrada si es necesario
        search: '/pages/search.html', // Otros archivos de entrada si es necesario
      },
    },
  },
});
