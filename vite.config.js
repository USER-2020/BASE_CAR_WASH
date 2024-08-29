import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {  // Ajusta esto a tu endpoint real
        target: 'https://apiun.controlsoftwarepro.com',  // Cambia esto a la URL de tu backend
        changeOrigin: false,  // Cambia el origen de la solicitud para coincidir con el servidor de destino
        secure: true,  // Configura si el proxy debe aceptar certificados SSL auto-firmados
        rewrite: (path) => path.replace(/^\/api/, ''),  // Reescribe la ruta de la solicitud si es necesario
      },
    },
  },
})
