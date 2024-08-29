import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '185.139.1.59', // Tu dirección IP específica
    port: 5374,           // El puerto que desees

  },
})
