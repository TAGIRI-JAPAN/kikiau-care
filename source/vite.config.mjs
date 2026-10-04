import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
export default defineConfig({
  root: here,
  // Relative URLs work on both username.github.io/repository/ and custom domains.
  base: './',
  publicDir: false,
  plugins: [react()],
  resolve: { alias: { '@': here } },
  build: {
    outDir: '.build',
    emptyOutDir: true,
    sourcemap: false,
    // The multilingual learning content is intentionally available in one download.
    chunkSizeWarningLimit: 4000,
  },
});
