import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      plugins: ["@svgr/plugin-svgo"],
      include: "**/*.svg"
    })
  ],
  esbuild: {
    jsx: 'react-jsx'
  },
  server: {
    open: true,
  },
  build: {
    sourcemap: true
  }
});