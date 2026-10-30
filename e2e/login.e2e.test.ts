import { expect, test } from '@nuxt/test-utils/playwright'
import type { Locator } from 'playwright-core'
import { clearMailpitMessages, getOtpFromEmail } from '../src/shared/tests'
import { PrismaClient } from '../generated/prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

test.describe('Login page', () => {
  let prisma: PrismaClient

  test.beforeAll(() => {
    test.setTimeout(60000 * 5)

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
      await clearMailpitMessages()

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

    test('should be show a required error when email input is empty and loses focus', async () => {
      await emailInput.click()
      await emailInput.blur()

      await expect(emailInputLabel).toHaveAttribute('data-error', 'true')
      await expect(emailInput).toHaveAttribute('data-error', 'true')
      await expect(emailInputErrorMessage).toHaveText('Обязательное поле')
    })

    test('should be show a invalid email error after email input filled', async () => {
      await emailInput.fill('invalid')

      await expect(emailInputLabel).toHaveAttribute('data-error', 'true')
      await expect(emailInput).toHaveAttribute('data-error', 'true')
      await expect(emailInputErrorMessage).toHaveText('Неверная почта')
    })

    test('should be show a max-characters error of email input after email input filled', async () => {
      await emailInput.fill(
        'emailemailemailemailemailemailemailemailemailemailemailemailemailemailemailemailemailemaile@email.com',
      )

      await expect(emailInputLabel).toHaveAttribute('data-error', 'true')
      await expect(emailInput).toHaveAttribute('data-error', 'true')
      await expect(emailInputErrorMessage).toHaveText('Максимум 100 символов')
    })

    test('should be show a required error when email input is empty and the form is submitted', async () => {
      await formSubmitButton.click()

      await expect(emailInputLabel).toHaveAttribute('data-error', 'true')
      await expect(emailInput).toHaveAttribute('data-error', 'true')
      await expect(emailInputErrorMessage).toHaveText('Обязательное поле')
    })

    test('should be not log in when user exists but is not active', async () => {
      await prisma.user.create({
        data: {
          email: 'test@email.com',
          name: 'Test',
          gender: 'male',
        },
      })

      await emailInput.fill('test@email.com')
      await formSubmitButton.click()

      await expect(firstStepView).toBeVisible()
      await expect(secondStepView).not.toBeVisible()
      await expect(dangerToast).toBeVisible()
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

      await emailInput.fill('test@email.com')
      await formSubmitButton.click()

      await expect(firstStepView).not.toBeVisible()
      await expect(secondStepView).toBeVisible()

      const otp = await getOtpFromEmail()

      await otpInput.first().fill(otp)

      await expect(page).toHaveURL('/feed')
    })

    test('should be not log in when otp is invalid', async () => {
      await prisma.user.create({
        data: {
          email: 'test@email.com',
          name: 'Test',
          gender: 'male',
          isActive: true,
        },
      })

      await emailInput.fill('test@email.com')
      await formSubmitButton.click()

      await expect(firstStepView).not.toBeVisible()
      await expect(secondStepView).toBeVisible()

      await otpInput.first().fill('123456')

      await expect(dangerToast).toBeVisible()
    })
  })
})
