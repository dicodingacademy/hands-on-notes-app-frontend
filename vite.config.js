import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Konfigurasi standar preset Vite — tanpa pengaturan build kustom
// agar Netlify bisa mendeteksinya secara otomatis (zero-configuration).
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/__tests__/setup.js',
  },
});
