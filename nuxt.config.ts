// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  css: ['primevue/resources/themes/aura-light-green/theme.css', '~/assets/css/main.css'],
  modules: ['@nuxtjs/i18n', 'nuxt-primevue'],
  runtimeConfig: {
    public: {
      serverHost: '127.0.0.1',
      serverPort: 8081,
    },
  },
  primevue: {},
  vite: {
    esbuild: {
      drop: ['console', 'debugger'],
    },
    build: {
      minify: 'esbuild',
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/respond.scss" as *;',
        },
      },
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  i18n: {
    lazy: true,
    langDir: 'locales',
    strategy: 'no_prefix',
    locales: [
      // { code: 'en', file: 'en.json' },
      { code: 'zh', file: 'zh.json' },
    ],
    defaultLocale: 'zh',
  },
})
