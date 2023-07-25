import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dotenv from 'dotenv'

dotenv.config() // load env vars from .env


// https://vitejs.dev/config/
export default defineConfig({
  define: {
    _APPID: `"${process.env.APPID}"`,
    _APIKEY: `"${process.env.APIKEY}"`
  },
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),

    }
  },

})
