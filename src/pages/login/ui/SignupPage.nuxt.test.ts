import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import SignupPage from './SignupPage.vue'
import { flushPromises, useTeleportsElement } from '~/shared/tests'
import { mountSuspended } from '@nuxt/test-utils/runtime'

const emailInputLabelSelector = 'label[for=email]'
const emailInputSelector = 'input[name=email]'
const emailInputErrorMessageSelector = 'p[data-field-name=email]'
const nameInputLabelSelector = 'label[for=name]'
const nameInputSelector = 'input[name=name]'
const nameInputErrorMessageSelector = 'p[data-field-name=name]'
const genderSelectTriggerLabelSelector = 'label[for=gender]'
const genderSelectTriggerSelector = 'button[name=gender]'
const genderSelectTriggerErrorMessageSelector = 'p[data-field-name=gender]'

const fields = [
  { name: 'email', selector: emailInputSelector },
  { name: 'name', selector: nameInputSelector },
  { name: 'gender', selector: genderSelectTriggerSelector },
]

const { create, destroy } = useTeleportsElement()

describe('SignupPage', () => {
  let wrapper: VueWrapper

  const mount = async () => {
    create()
    wrapper = await mountSuspended(SignupPage)
    vi.useFakeTimers()
  }

  const unmount = () => {
    wrapper.unmount()
    destroy()
    vi.useRealTimers()
  }

  describe('should show a required error', () => {
    beforeEach(mount)
    afterEach(unmount)

    test.for(fields)(
      'for $name field if it is empty and loses focus',
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

    test('for all fields are required if they are empty and the form is submitted', async () => {
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

  test('should show a invalid email error', async () => {
    await mount()

    const emailInput = wrapper.find(emailInputSelector)
    await emailInput.setValue('email')

    await flushPromises()

    const emailInputLabel = wrapper.find(emailInputLabelSelector)
    const emailInputErrorMessage = wrapper.find(emailInputErrorMessageSelector)

    expect(emailInputLabel.attributes('data-error')).toBe('true')
    expect(emailInput.attributes('data-error')).toBe('true')
    expect(emailInputErrorMessage.text()).toBeTruthy()

    unmount()
  })
})
