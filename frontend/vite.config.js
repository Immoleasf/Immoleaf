// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://immoleaf-backend-h6f9g5bzc8aqh8f5.westeurope-01.azurewebsites.net',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
