import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src/pages', // Define el directorio raíz del servidor de desarrollo
  server: {
    port: 5173, // Cambia el puerto si es necesario
  },
  build: {
    outDir: '../dist', // Salida del build en relación al root
    rollupOptions: {
      input: 'index.html', // Define el archivo de entrada principal
    },
  },
});
