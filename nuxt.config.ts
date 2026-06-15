import tailwindcss from '@tailwindcss/vite'

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

  vite: {
    plugins: [tailwindcss()],
  },

  css: ['~/app/styles/tailwind.css'],

  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@pinia/colada-nuxt',
    '@vee-validate/nuxt',
    '@vueuse/nuxt',
    '@sidebase/nuxt-auth',
    '@nuxtjs/storybook',
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

  veeValidate: {
    autoImports: false,
  },

  vueuse: {
    autoImports: false,
  },

  auth: {
    globalAppMiddleware: true,
    provider: {
      type: 'local',
    },
  },
})
