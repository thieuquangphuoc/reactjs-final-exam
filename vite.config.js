import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { gradingApi } from './server/gradingApi.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), gradingApi()],
  // Pre-bundle the router at startup so the first page load doesn't trigger a dependency reload.
  optimizeDeps: { include: ['react', 'react-dom', 'react-dom/client', 'react-router'] },
  // The bundle is mostly study content (text), so a larger single chunk is fine.
  build: { chunkSizeWarningLimit: 1000 },
})
