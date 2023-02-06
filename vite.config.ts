import { fileURLToPath, URL } from 'node:url';
import vuetify from 'vite-plugin-vuetify';
import VitePluginHtmlEnv from 'vite-plugin-html-env';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/style.scss";`
      }
    }
  },
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
    }),
    VitePluginHtmlEnv(),
    svgLoader()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
});
