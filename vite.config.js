import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src', // Ajusta esto según la estructura de tu proyecto
  server: {
    port: 5173
  },
  build: {
    outDir: '../dist', // Ajusta esto según la estructura de tu proyecto
    rollupOptions: {
      input: {
        main: 'src/index.html'
      }
    }
  }
});
