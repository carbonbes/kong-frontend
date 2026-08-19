import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import SignupPage from './SignupPage.vue'
import { flushPromises } from '~/shared/tests'
import { mountSuspended } from '@nuxt/test-utils/runtime'

const emailInputLabelSelector = 'label[for=email]'
const emailInputSelector = 'input[name=email]'
const emailInputErrorMessageSelector = 'p[data-field-name=email]'
const nameInputLabelSelector = 'label[for=name]'
const nameInputSelector = 'input[name=name]'
const nameInputErrorMessageSelector = 'p[data-field-name=name]'
const genderSelectTriggerSelector = 'button[name=gender]'

const fields = [
  { name: 'email', selector: emailInputSelector },
  { name: 'name', selector: nameInputSelector },
  { name: 'gender', selector: genderSelectTriggerSelector },
]

describe('SignupPage', () => {
  let wrapper: VueWrapper

  beforeEach(async () => {
    wrapper = await mountSuspended(SignupPage)
    vi.useFakeTimers()
  })

  afterEach(() => {
    wrapper.unmount()
    vi.useRealTimers()
  })

  test.for(fields)(
    'should be show a required error for $name field if it is empty and loses focus',
    async ({ name, selector }) => {
      const field = wrapper.find(selector)
      await field.trigger('blur')

      await flushPromises()

      const fieldLabel = wrapper.find(`label[for="${name}"]`)
      const fieldErrorMessage = wrapper.find(`p[data-field-name="${name}"]`)

      expect(fieldLabel.attributes('data-error')).toBe('true')
      expect(field.attributes('data-error')).toBe('true')
      expect(fieldErrorMessage.text()).toBeTruthy()
    },
  )

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

  test('should be show a min-characters error of name field', async () => {
    const nameInput = wrapper.find(nameInputSelector)
    await nameInput.setValue('')

    await flushPromises()

    const nameInputLabel = wrapper.find(nameInputLabelSelector)
    const nameInputErrorMessage = wrapper.find(nameInputErrorMessageSelector)

    expect(nameInputLabel.attributes('data-error')).toBe('true')
    expect(nameInput.attributes('data-error')).toBe('true')
    expect(nameInputErrorMessage.text()).toBeTruthy()
  })

  test('should be show a max-characters error of name field', async () => {
    const nameInput = wrapper.find(nameInputSelector)
    await nameInput.setValue(
      '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901',
    )

    await flushPromises()

    const nameInputLabel = wrapper.find(nameInputLabelSelector)
    const nameInputErrorMessage = wrapper.find(nameInputErrorMessageSelector)

    expect(nameInputLabel.attributes('data-error')).toBe('true')
    expect(nameInput.attributes('data-error')).toBe('true')
    expect(nameInputErrorMessage.text()).toBeTruthy()
  })

  test('should be show a required error for all fields are required if they are empty and the form is submitted', async () => {
    const form = wrapper.find('form')
    await form.trigger('submit')

    await flushPromises()

    fields.forEach(({ name, selector }) => {
      const fieldLabel = wrapper.find(`label[for="${name}"]`)
      const field = wrapper.find(selector)
      const fieldErrorMessage = wrapper.find(`p[data-field-name="${name}"]`)

      expect(fieldLabel.attributes('data-error')).toBe('true')
      expect(field.attributes('data-error')).toBe('true')
      expect(fieldErrorMessage.text()).toBeTruthy()
    })
  })
})
