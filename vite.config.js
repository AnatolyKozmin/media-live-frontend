import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/styles/variables.scss"; @import "./src/assets/styles/mixins.scss";`
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
});