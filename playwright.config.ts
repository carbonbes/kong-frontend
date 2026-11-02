import { config } from 'dotenv'
import { fileURLToPath } from 'node:url'
import { defineConfig, devices } from '@playwright/test'
import type { ConfigOptions } from '@nuxt/test-utils/playwright'

config()

export default defineConfig<ConfigOptions>({
  projects: [
    { name: 'Setup', testMatch: 'e2e/setup.ts' },
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
      dependencies: ['Setup'],
      grep: /@desktop/,
    },
    {
      name: 'Desktop Safari',
      use: { browserName: 'webkit', ...devices['Desktop Safari'] },
      dependencies: ['Setup'],
      grep: /@desktop/,
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 2'], channel: 'chrome' },
      dependencies: ['Setup'],
      grep: /@mobile/,
    },
    {
      name: 'Mobile Safari',
      use: { browserName: 'webkit', ...devices['iPhone 7'] },
      dependencies: ['Setup'],
      grep: /@mobile/,
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
    ignoreHTTPSErrors: true,
    nuxt: {
      rootDir: fileURLToPath(new URL('.', import.meta.url)),
      host: 'https://localhost:3001',
    },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
})
