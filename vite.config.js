import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": "/src"
    }
  },
  base: './',
  server: {
    port: 3000,
    open:true,
    cors:true,
    https:false,
    proxy:{
      '/api': {
        // target:'https://api.shop.eduwork.cn',
        target:'http://localhost:3003',
        changeOrigin:true,
        rewrite:path=> path.replace( /^\/api/ , '')
      }
    }
  }
})
