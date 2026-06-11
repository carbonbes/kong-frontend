export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  devtools: { enabled: true },

  srcDir: 'src/',

  dir: {
    pages: 'app/routes',
    layouts: 'app/layouts',
  },

  components: {
    dirs: [],
  },

  imports: {
    autoImport: false,
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@pinia/colada-nuxt',
  ],

  fonts: {
    families: [{ name: 'Inter', provider: 'google' }],
  },

  icon: {
    mode: 'svg',
  },

  pinia: {
    storesDirs: [],
  },
})
