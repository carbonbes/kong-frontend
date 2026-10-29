import { fileURLToPath } from 'node:url'
import { defineConfig, devices } from '@playwright/test'
import type { ConfigOptions } from '@nuxt/test-utils/playwright'

export default defineConfig<ConfigOptions>({
  projects: [
    // {
    //   name: 'Desktop Chrome',
    //   use: { ...devices['Desktop Chrome'] },
    // },
    // {
    //   name: 'Desktop Safari',
    //   use: { ...devices['Desktop Safari'] },
    // },
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 10'] },
    // },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 17'] },
    },
  ],
  reporter: 'html',
  testMatch: 'e2e/*.test.ts',
  use: {
    launchOptions: {
      args: ['--disable-web-security'],
    },
    nuxt: {
      rootDir: fileURLToPath(new URL('.', import.meta.url)),
    },
    screenshot: 'only-on-failure',
  },
  workers: 1,
})
