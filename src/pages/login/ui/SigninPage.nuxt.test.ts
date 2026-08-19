import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import SigninPage from './SigninPage.vue'
import { flushPromises } from '~/shared/tests'
import { mountSuspended } from '@nuxt/test-utils/runtime'

const emailInputLabelSelector = 'label[for=email]'
const emailInputSelector = 'input[name=email]'
const emailInputErrorMessageSelector = 'p[data-field-name=email]'

describe('SigninPage', () => {
  let wrapper: VueWrapper

  beforeEach(async () => {
    wrapper = await mountSuspended(SigninPage)
    vi.useFakeTimers()
  })

  afterEach(() => {
    wrapper.unmount()
    vi.useRealTimers()
  })

  test('should be show a required error when email field is empty and loses focus', async () => {
    const emailInput = wrapper.find(emailInputSelector)
    await emailInput.trigger('blur')

    await flushPromises()

    const emailInputLabel = wrapper.find(emailInputLabelSelector)
    const emailInputErrorMessage = wrapper.find(emailInputErrorMessageSelector)

    expect(emailInputLabel.attributes('data-error')).toBe('true')
    expect(emailInput.attributes('data-error')).toBe('true')
    expect(emailInputErrorMessage.text()).toBeTruthy()
  })

  test('should be show a invalid email error', async () => {
    const emailInput = wrapper.find(emailInputSelector)
    await emailInput.setValue('')

    await flushPromises()

    const emailInputLabel = wrapper.find(emailInputLabelSelector)
    const emailInputErrorMessage = wrapper.find(emailInputErrorMessageSelector)

    expect(emailInputLabel.attributes('data-error')).toBe('true')
    expect(emailInput.attributes('data-error')).toBe('true')
    expect(emailInputErrorMessage.text()).toBeTruthy()
  })

  test('should be show a max-characters error of email field', async () => {
    const emailInput = wrapper.find(emailInputSelector)
    await emailInput.setValue(
      '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901',
    )

    await flushPromises()

    const emailInputLabel = wrapper.find(emailInputLabelSelector)
    const emailInputErrorMessage = wrapper.find(emailInputErrorMessageSelector)

    expect(emailInputLabel.attributes('data-error')).toBe('true')
    expect(emailInput.attributes('data-error')).toBe('true')
    expect(emailInputErrorMessage.text()).toBeTruthy()
  })

  test('should be show a required error when email field is empty and the form is submitted', async () => {
    const form = wrapper.find('form')
    await form.trigger('submit')

    await flushPromises()

    const emailInputLabel = wrapper.find(emailInputLabelSelector)
    const emailInput = wrapper.find(emailInputSelector)
    const emailInputErrorMessage = wrapper.find(emailInputErrorMessageSelector)

    expect(emailInputLabel.attributes('data-error')).toBe('true')
    expect(emailInput.attributes('data-error')).toBe('true')
    expect(emailInputErrorMessage.text()).toBeTruthy()
  })
})
