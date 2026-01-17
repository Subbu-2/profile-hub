import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //add proxy to access downstream
  server:{
    proxy:{
      "/api":{
        target:"http://localhost:8083",
        changeOrigin:true,
      }
    }
  }
})
