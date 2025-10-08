import { defineConfig } from 'vite';

export default defineConfig({
  // Base URL for the application
  base: './',
  
  // Development server configuration
  server: {
    port: 3000,
    open: true,
    host: true
  },
  
  // Build configuration
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'aframe': ['aframe']
        }
      }
    }
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['aframe']
  },
  
  // CSS configuration
  css: {
    devSourcemap: true
  }
});
