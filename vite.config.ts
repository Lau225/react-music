import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vite.dev/config/
const resolve = (dir: string) => path.resolve(__dirname, dir)
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias: {
      '@': resolve('./src')
    }
  },
  server:{
    port: 3000
  }
})
