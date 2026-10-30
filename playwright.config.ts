import { config } from 'dotenv'
import { fileURLToPath } from 'node:url'
import { defineConfig, devices } from '@playwright/test'
import type { ConfigOptions } from '@nuxt/test-utils/playwright'

config()

export default defineConfig<ConfigOptions>({
  projects: [
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
    {
      name: 'Desktop Safari',
      use: { browserName: 'webkit', ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 2'], channel: 'chrome' },
    },
    {
      name: 'Mobile Safari',
      use: { browserName: 'webkit', ...devices['iPhone 7'] },
    },
  ],
  reporter: 'html',
  testMatch: 'e2e/*.test.ts',
  webServer: {
    command: 'NODE_TLS_REJECT_UNAUTHORIZED=0 yarn run dev',
    url: 'https://localhost:3001',
    ignoreHTTPSErrors: true,
    reuseExistingServer: true,
  },
  workers: 1,
  use: {
    nuxt: {
      rootDir: fileURLToPath(new URL('.', import.meta.url)),
      host: 'https://localhost:3001',
    },
    screenshot: 'only-on-failure',
  },
})
