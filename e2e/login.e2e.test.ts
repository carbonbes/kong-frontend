import { expect, test } from '@nuxt/test-utils/playwright'
import type { Locator } from 'playwright-core'
import { getOtpFromEmail } from '../src/shared/tests'
import { PrismaClient } from '../generated/prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { execSync } from 'node:child_process'

test.describe('Login page', () => {
  let prisma: PrismaClient

  test.beforeAll(async () => {
    test.setTimeout(60000 * 5)

    execSync('yarn prisma db push --accept-data-loss')

    const pool = new Pool({ connectionString: process.env.DATABASE_URL })
    const adapter = new PrismaPg(pool)

    prisma = new PrismaClient({ adapter })
  })

  test.describe('Signin', () => {
    let firstStepView: Locator
    let secondStepView: Locator
    let emailInputLabel: Locator
    let emailInput: Locator
    let emailInputErrorMessage: Locator
    let formSubmitButton: Locator
    let otpInput: Locator
    let dangerToast: Locator

    test.beforeEach(async ({ goto, page }) => {
      await prisma.$queryRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`

      await goto('/login/signin', { waitUntil: 'hydration' })

      firstStepView = page.getByTestId('login-page/signin/first-step')
      secondStepView = page.getByTestId('login-page/signin/second-step')
      emailInputLabel = page.getByTestId(
        'login-page/signin/first-step/email-input/label',
      )
      emailInput = page.getByTestId(
        'login-page/signin/first-step/email-input/input',
      )
      emailInputErrorMessage = page.getByTestId(
        'login-page/signin/first-step/email-input/error-message',
      )
      formSubmitButton = page.getByTestId(
        'login-page/signin/first-step/submit-button',
      )
      otpInput = page.getByTestId('login-page/signin/second-step/otp-input')
      dangerToast = page.getByTestId('danger-toast')
    })

    test('should be show a required error when email input is empty and loses focus', async ({
      page,
    }) => {
      await emailInput.click()
      await emailInput.blur()

      await page.waitForTimeout(10)

      await expect(emailInputLabel).toHaveAttribute('data-error', 'true')
      await expect(emailInput).toHaveAttribute('data-error', 'true')
      expect(await emailInputErrorMessage.textContent()).toBe(
        'Обязательное поле',
      )
    })

    test('should be show a invalid email error after email input filled', async ({
      page,
    }) => {
      await emailInput.click()
      await emailInput.fill('invalid')

      await page.waitForTimeout(10)

      await expect(emailInputLabel).toHaveAttribute('data-error', 'true')
      await expect(emailInput).toHaveAttribute('data-error', 'true')
      expect(await emailInputErrorMessage.textContent()).toBe('Неверная почта')
    })

    test('should be show a max-characters error of email input after email input filled', async ({
      page,
    }) => {
      await emailInput.click()
      await emailInput.fill(
        'emailemailemailemailemailemailemailemailemailemailemailemailemailemailemailemailemailemaile@email.com',
      )

      await page.waitForTimeout(10)

      await expect(emailInputLabel).toHaveAttribute('data-error', 'true')
      await expect(emailInput).toHaveAttribute('data-error', 'true')
      expect(await emailInputErrorMessage.textContent()).toBe(
        'Максимум 100 символов',
      )
    })

    test('should be show a required error when email input is empty and the form is submitted', async ({
      page,
    }) => {
      await formSubmitButton.click()

      await page.waitForTimeout(10)

      await expect(emailInputLabel).toHaveAttribute('data-error', 'true')
      await expect(emailInput).toHaveAttribute('data-error', 'true')
      expect(await emailInputErrorMessage.textContent()).toBe(
        'Обязательное поле',
      )
    })

    test('should be not log in when user exists but is not active', async ({
      page,
    }) => {
      await prisma.user.create({
        data: {
          email: 'test@email.com',
          name: 'Test',
          gender: 'male',
        },
      })

      await emailInput.click()
      await emailInput.fill('test@email.com')
      await formSubmitButton.click()

      await page.waitForTimeout(100)

      expect(await firstStepView.isVisible()).toBe(true)
      expect(await secondStepView.isVisible()).toBe(false)
      expect(await dangerToast.isVisible()).toBe(true)
    })

    test('should be log in as an exists and activated user', async ({
      page,
    }) => {
      await prisma.user.create({
        data: {
          email: 'test@email.com',
          name: 'Test',
          gender: 'male',
          isActive: true,
        },
      })

      await emailInput.click()
      await emailInput.fill('test@email.com')
      await formSubmitButton.click()

      await page.waitForTimeout(1000)

      expect(await firstStepView.isVisible()).toBe(false)
      expect(await secondStepView.isVisible()).toBe(true)

      const otp = await getOtpFromEmail()

      await otpInput.first().click()
      await otpInput.first().fill(otp)

      await page.waitForTimeout(100)

      await expect(page).toHaveURL('/feed')
    })

    test('should be not log in when otp is invalid', async ({ page }) => {
      await prisma.user.create({
        data: {
          email: 'test@email.com',
          name: 'Test',
          gender: 'male',
          isActive: true,
        },
      })

      await emailInput.click()
      await emailInput.fill('test@email.com')
      await formSubmitButton.click()

      await page.waitForTimeout(1000)

      expect(await firstStepView.isVisible()).toBe(false)
      expect(await secondStepView.isVisible()).toBe(true)

      await otpInput.first().click()
      await otpInput.first().fill('invalid')

      await page.waitForTimeout(100)

      expect(await dangerToast.isVisible()).toBe(true)
    })
  })
})
