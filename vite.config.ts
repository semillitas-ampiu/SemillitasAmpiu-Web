import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@context': path.resolve(__dirname, './src/context'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          'react-vendor': ['react', 'react-dom'],
          // React Router
          router: ['react-router-dom'],
          // Gráficos (librería grande)
          charts: ['recharts'],
          // UI libraries
          'ui-vendor': ['sweetalert2', 'lucide-react', 'react-icons'],
          // Carousels
          carousel: ['react-slick', 'slick-carousel'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
