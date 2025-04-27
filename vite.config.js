import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/variables.scss";`, // Глобальные переменные
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src', // Удобный alias для импорта
    },
  },
};