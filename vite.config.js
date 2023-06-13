import { defineConfig } from 'vite'
import { createServer } from "vite";
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../app/www',
  },
})
