// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0',
  },
  ssr: false,
  css: ['primevue/resources/themes/aura-light-green/theme.css', 'primeicons/primeicons.css', '~/assets/css/main.css'],
  modules: ['@nuxtjs/i18n', 'nuxt-primevue'],
  runtimeConfig: {
    public: {
      serverHost: process.env.NUXT_APP_SERVER_HOST,
      serverPort: process.env.NUXT_APP_SERVER_PORT,
    },
  },
  plugins: ['~/plugins/primevue-custom'],
  primevue: {
    components: {
      exclude: '*',
    },
    options: {
      ripple: true,
    },
  },
  vite: {
    esbuild: {
      drop: ['console', 'debugger'],
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
