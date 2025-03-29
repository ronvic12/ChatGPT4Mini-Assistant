import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
//import terminal from 'vite-plugin-terminal'
import TerminalPlugin from 'vite-plugin-terminal';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),TerminalPlugin()],
  optimizeDeps: {
    include: ['vite-plugin-terminal'],
  },
  server:{
    open:true,
    port:3001, // running on client
    proxy:{
      '/api':{
        target:'http://localhost:4000', // Backend server
        changeOrigin: true,
      }
    }
  }
})
