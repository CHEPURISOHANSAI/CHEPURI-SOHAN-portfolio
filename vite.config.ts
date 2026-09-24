import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// Vite configuration for standalone & production deployments (GitHub Pages, Vercel, Netlify)
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8443,
    host: '0.0.0.0',
  },
  preview: {
    port: 8443,
    host: '0.0.0.0',
  },
})
