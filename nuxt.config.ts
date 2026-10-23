import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  experimental: {
    asyncContext: true,
  },

  srcDir: 'src/',

  imports: {
    dirs: ['app/composables'],
  },

  dir: {
    layouts: 'app/layouts',
    middleware: 'app/middleware',
    pages: 'app/routes',
    plugins: 'app/plugins',
  },

  components: {
    dirs: [],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  css: ['~/app/styles/tailwind.css'],

  runtimeConfig: {
    public: {
      apiBaseUrl: '',
    },
  },

  devServer: {
    https: {
      key: 'certs/private-key.pem',
      cert: 'certs/public.pem',
    },
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@pinia/colada-nuxt',
    '@vee-validate/nuxt',
    '@vueuse/nuxt',
  ],

  fonts: {
    families: [
      {
        name: 'Roboto',
        provider: 'google',
        styles: ['normal', 'italic'],
        weights: ['regular', 'medium', 'bold'],
      },
    ],
  },

  icon: {
    mode: 'svg',
  },

  pinia: {
    storesDirs: [],
  },
})
