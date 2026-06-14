import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:28019',
        changeOrigin: true
      },
      '/manage-api': {
        target: 'http://localhost:28019',
        changeOrigin: true
      }
    }
  },
  plugins: [
    vue(),
    Components({ resolvers: [VantResolver()] })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vant: ['vant'],
          vue: ['vue', 'vue-router', 'pinia']
        }
      }
    }
  }
})
