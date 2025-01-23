import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import * as  path from 'path'
// https://vite.dev/config/
const resolve = (dir: string) => path.resolve(__dirname, dir)
export default defineConfig({
  plugins: [react(),legacy({
    targets:['defaults']
  })],
  resolve:{
    alias: {
      '@': resolve('./src')
    }
  },
  css:{
    preprocessorOptions: {
      less:{}
    }
  },
  server:{
    port: 3000
  }
})
