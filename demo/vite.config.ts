import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { writeFileSync } from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'create-nojekyll',
      closeBundle() {
        writeFileSync('../docs/.nojekyll', '');
      },
    },
  ],
  base: '/react-accessibility-widget/',
  build: {
    outDir: '../docs',
    emptyOutDir: true,
  },
});
