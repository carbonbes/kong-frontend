import { expect, test } from '@nuxt/test-utils/playwright'
import type { Locator } from 'playwright-core'
import { clearMailpitMessages, getOtpFromEmail } from '../src/shared/tests'
import { PrismaClient } from '../generated/prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

test.describe('Login page', () => {
  let prisma: PrismaClient

  test.beforeAll(() => {
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
    let successToast: Locator
    let backButton: Locator
    let resendButton: Locator
    let signupLink: Locator

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
      successToast = page.getByTestId('success-toast')
      backButton = page.getByTestId('login-page/signin/second-step/back-button')
      resendButton = page.getByTestId(
        'login-page/signin/second-step/resend-button',
      )
      signupLink = page.getByTestId('login-page/signin/first-step/signup-link')
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

      await expect(successToast).toBeVisible()
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

    test('should be not log in when user does not exist', async () => {
      await emailInput.fill('unknown@email.com')
      await formSubmitButton.click()

      await expect(firstStepView).toBeVisible()
      await expect(secondStepView).not.toBeVisible()
      await expect(dangerToast).toBeVisible()
    })

    test('should be return to the first step when back button is clicked', async () => {
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

      await expect(secondStepView).toBeVisible()

      await backButton.click()

      await expect(firstStepView).toBeVisible()
      await expect(secondStepView).not.toBeVisible()
      await expect(emailInput).toHaveValue('test@email.com')
    })

    test('should be disable the resend button while countdown is active', async () => {
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

      await expect(secondStepView).toBeVisible()

      await expect(resendButton).toBeDisabled()
    })

    test('should be navigate to the signup page when signup link is clicked', async ({
      page,
    }) => {
      await signupLink.click()

      await expect(page).toHaveURL('/login/signup')
    })

    test('should be resend the otp code after countdown and log in with the new code', async ({
      page,
      goto,
    }) => {
      await page.clock.install()
      await prisma.user.create({
        data: {
          email: 'test@email.com',
          name: 'Test',
          gender: 'male',
          isActive: true,
        },
      })

      await goto('/login/signin', { waitUntil: 'hydration' })

      await emailInput.fill('test@email.com')
      await formSubmitButton.click()

      await expect(secondStepView).toBeVisible()

      await page.clock.runFor(60001)

      await expect(resendButton).toBeEnabled()

      await resendButton.click()

      await expect(successToast).toBeVisible()

      const otp = await getOtpFromEmail()

      await otpInput.first().fill(otp)

      await expect(page).toHaveURL('/feed')
    })
  })

  test.describe('Signup', () => {
    let firstStepView: Locator
    let secondStepView: Locator
    let emailInputLabel: Locator
    let emailInput: Locator
    let emailInputErrorMessage: Locator
    let nameInputLabel: Locator
    let nameInput: Locator
    let nameInputErrorMessage: Locator
    let genderSelectLabel: Locator
    let genderSelectTrigger: Locator
    let genderSelectOption: Locator
    let genderSelectErrorMessage: Locator
    let formSubmitButton: Locator
    let signinLink: Locator
    let otpInput: Locator
    let dangerToast: Locator
    let successToast: Locator
    let backButton: Locator
    let resendButton: Locator

    test.beforeEach(async ({ goto, page }) => {
      await prisma.$queryRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`
      await clearMailpitMessages()

      await goto('/login/signup', { waitUntil: 'hydration' })

      firstStepView = page.getByTestId('login-page/signup/first-step')
      secondStepView = page.getByTestId('login-page/signup/second-step')
      emailInputLabel = page.getByTestId(
        'login-page/signup/first-step/email-input/label',
      )
      emailInput = page.getByTestId(
        'login-page/signup/first-step/email-input/input',
      )
      emailInputErrorMessage = page.getByTestId(
        'login-page/signup/first-step/email-input/error-message',
      )
      nameInputLabel = page.getByTestId(
        'login-page/signup/first-step/name-input/label',
      )
      nameInput = page.getByTestId(
        'login-page/signup/first-step/name-input/input',
      )
      nameInputErrorMessage = page.getByTestId(
        'login-page/signup/first-step/name-input/error-message',
      )
      genderSelectLabel = page.getByTestId(
        'login-page/signup/first-step/gender-select/label',
      )
      genderSelectTrigger = page.getByTestId(
        'login-page/signup/first-step/gender-select/trigger',
      )
      genderSelectOption = page.getByTestId(
        'login-page/signup/first-step/gender-select/option/male',
      )
      genderSelectErrorMessage = page.getByTestId(
        'login-page/signup/first-step/gender-select/error-message',
      )
      formSubmitButton = page.getByTestId(
        'login-page/signup/first-step/submit-button',
      )
      signinLink = page.getByTestId('login-page/signup/first-step/signin-link')
      otpInput = page.getByTestId('login-page/signup/second-step/otp-input')
      dangerToast = page.getByTestId('danger-toast')
      successToast = page.getByTestId('success-toast')
      backButton = page.getByTestId('login-page/signup/second-step/back-button')
      resendButton = page.getByTestId(
        'login-page/signup/second-step/resend-button',
      )
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

    test('should be show a required error when name input is empty and loses focus', async () => {
      await nameInput.click()
      await nameInput.blur()

      await expect(nameInputLabel).toHaveAttribute('data-error', 'true')
      await expect(nameInput).toHaveAttribute('data-error', 'true')
      await expect(nameInputErrorMessage).toHaveText('Обязательное поле')
    })

    test('should be show a min-characters error of name input when it contains only spaces', async () => {
      await nameInput.fill(' ')

      await expect(nameInputLabel).toHaveAttribute('data-error', 'true')
      await expect(nameInput).toHaveAttribute('data-error', 'true')
      await expect(nameInputErrorMessage).toHaveText('Минимум 1 символ')
    })

    test('should be show a max-characters error of name input after name input filled', async () => {
      await nameInput.fill(
        '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901',
      )

      await expect(nameInputLabel).toHaveAttribute('data-error', 'true')
      await expect(nameInput).toHaveAttribute('data-error', 'true')
      await expect(nameInputErrorMessage).toHaveText('Максимум 100 символов')
    })

    test('should be show a required error for all fields when the form is submitted empty', async () => {
      await formSubmitButton.click()

      for (const [label, input, errorMessage] of [
        [emailInputLabel, emailInput, emailInputErrorMessage],
        [nameInputLabel, nameInput, nameInputErrorMessage],
        [genderSelectLabel, genderSelectTrigger, genderSelectErrorMessage],
      ] as const) {
        await expect(label).toHaveAttribute('data-error', 'true')
        await expect(input).toHaveAttribute('data-error', 'true')
        await expect(errorMessage).toHaveText('Обязательное поле')
      }
    })

    test('should be select a gender option', async () => {
      await genderSelectTrigger.click()
      await genderSelectOption.click()

      await expect(genderSelectTrigger).toContainText('Мужской')
    })

    test('should be not sign up when user with this email already exists', async () => {
      await prisma.user.create({
        data: {
          email: 'test@email.com',
          name: 'Test',
          gender: 'male',
          isActive: true,
        },
      })

      await emailInput.fill('test@email.com')
      await nameInput.fill('Test')
      await genderSelectTrigger.click()
      await genderSelectOption.click()
      await formSubmitButton.click()

      await expect(firstStepView).toBeVisible()
      await expect(secondStepView).not.toBeVisible()
      await expect(dangerToast).toBeVisible()
    })

    test('should be sign up as a new user and activate them after otp verification', async ({
      page,
    }) => {
      await emailInput.fill('test@email.com')
      await nameInput.fill('Test')
      await genderSelectTrigger.click()
      await genderSelectOption.click()
      await formSubmitButton.click()

      await expect(firstStepView).not.toBeVisible()
      await expect(secondStepView).toBeVisible()

      const otp = await getOtpFromEmail()

      await otpInput.first().fill(otp)

      await expect(successToast).toBeVisible()
      await expect(page).toHaveURL('/feed')
    })

    test('should be not sign up when otp is invalid', async () => {
      await emailInput.fill('test@email.com')
      await nameInput.fill('Test')
      await genderSelectTrigger.click()
      await genderSelectOption.click()
      await formSubmitButton.click()

      await expect(secondStepView).toBeVisible()

      await otpInput.first().fill('******')

      await expect(dangerToast).toBeVisible()
    })

    test('should be return to the first step when back button is clicked', async () => {
      await emailInput.fill('test@email.com')
      await nameInput.fill('Test')
      await genderSelectTrigger.click()
      await genderSelectOption.click()
      await formSubmitButton.click()

      await expect(secondStepView).toBeVisible()

      await backButton.click()

      await expect(firstStepView).toBeVisible()
      await expect(secondStepView).not.toBeVisible()
      await expect(emailInput).toHaveValue('test@email.com')
      await expect(nameInput).toHaveValue('Test')
    })

    test('should be navigate to the signin page when signin link is clicked', async ({
      page,
    }) => {
      await signinLink.click()

      await expect(page).toHaveURL('/login/signin')
    })

    test('should be resend the otp code after countdown and sign up with the new code', async ({
      page,
    }) => {
      await page.clock.install()

      await emailInput.fill('test@email.com')
      await nameInput.fill('Test')
      await genderSelectTrigger.click()
      await genderSelectOption.click()
      await formSubmitButton.click()

      await expect(secondStepView).toBeVisible()

      await expect(resendButton).toBeDisabled()

      await page.clock.runFor(60001)

      await expect(resendButton).toBeEnabled()

      await resendButton.click()

      await expect(successToast).toBeVisible()

      const otp = await getOtpFromEmail()

      await otpInput.first().fill(otp)

      await expect(page).toHaveURL('/feed')
    })
  })
})
