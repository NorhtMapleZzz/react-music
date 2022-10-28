import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import Unocss from "unocss/vite";
import transformerVariantGroup from '@unocss/transformer-variant-group'
// https://vitejs.dev/configs
export default defineConfig({
  plugins: [
    react(), 
    Unocss()
  ],
  resolve: {
    alias: {
      '@': path.resolve('./src')
    }
  },
})
