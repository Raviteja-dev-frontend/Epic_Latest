// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // 👈 Important: ensure this is '/' unless deploying to a subpath
  preview: {
    port: process.env.PORT || 4173,
    host: true,
    allowedHosts: ['epic-new-frontend.onrender.com']
  }
})
