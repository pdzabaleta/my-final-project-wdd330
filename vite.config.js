import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src', // Directorio raíz (ajusta según tu estructura)
  server: {
    port: 5173, // Puerto del servidor de desarrollo
    open: true, // Abrir el navegador automáticamente
  },
  build: {
    outDir: '../dist', // Carpeta de salida para el build
    rollupOptions: {
      input: {
        main: './pages/index.html', // Archivo de entrada principal
      },
    },
  },
});
