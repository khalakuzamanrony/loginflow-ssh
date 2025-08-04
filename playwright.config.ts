import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry settings - more retries on CI */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,
  /* Enhanced reporters for CI and local */
  reporter: [
    ['list'],
    ['html', { open: process.env.CI ? 'never' : 'on-failure' }],
    ['github']
  ],
  
  /* Shared settings for all projects */
  use: {
    trace: process.env.CI ? 'on-first-retry' : 'on',
    screenshot: 'only-on-failure',
    video: process.env.CI ? 'retain-on-failure' : 'off',
    /* Uncomment if you have a base URL */
    // baseURL: process.env.BASE_URL || 'http://localhost:3000',
  },

  /* Configure projects for major browsers */
  projects: [
    /* Chromium - main browser for CI */
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      grepInvert: process.env.CI ? /@visual|@slow/ : undefined,
    },

    /* Firefox - only run non-visual tests on CI */
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      grepInvert: process.env.CI ? /@visual/ : undefined,
    },

    /* WebKit - only run non-visual tests on CI */
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      grepInvert: process.env.CI ? /@visual/ : undefined,
    },

    /* Mobile testing - uncomment if needed */
     {
       name: 'Mobile Chrome',
       use: { ...devices['Pixel 5'] },
       grepInvert: /@desktop/,
     },
     {
       name: 'Mobile Safari',
       use: { ...devices['iPhone 13'] },
       grepInvert: /@desktop/,
     }
  ],

  /* Timeout settings */
  timeout: 30 * 1000,
  expect: {
    timeout: 10 * 1000
  },

  /* Uncomment if you need local server */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  //   timeout: 120 * 1000,
  // },
});