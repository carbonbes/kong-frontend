import { describe, expect, test } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import SignupPage from './SignupPage.vue'

const emailInputSelector = 'input[name="email"]'
const emailInputErrorMessageSelector = 'p[data-field-name="email"]'
const nameInputSelector = 'input[name="name"]'
const nameInputErrorMessageSelector = 'p[data-field-name="name"]'
const genderSelectTriggerSelector = 'button[name="gender"]'
const genderSelectTriggerErrorMessageSelector = 'p[data-field-name="gender"]'

describe('SignupPage', () => {
  describe('email input', () => {
    test('should be displayed an required-error if the input is empty, has focus, and loses focus', async () => {
      const wrapper = mount(SignupPage)

      await wrapper.find(emailInputSelector).trigger('focus')
      await wrapper.find(emailInputSelector).trigger('blur')

      await flushPromises()

      expect(
        wrapper.find(emailInputErrorMessageSelector).element.textContent,
      ).toBe('Required')
    })
  })

  describe('name input', () => {
    test('should be displayed an required-error if the input is empty, has focus, and loses focus', async () => {
      const wrapper = mount(SignupPage)

      await wrapper.find(nameInputSelector).trigger('focus')
      await wrapper.find(nameInputSelector).trigger('blur')

      await flushPromises()

      expect(
        wrapper.find(nameInputErrorMessageSelector).element.textContent,
      ).toBe('Required')
    })
  })

  describe('gender input', () => {
    test('should be displayed an required-error if the input is empty, has focus, and loses focus', async () => {
      const wrapper = mount(SignupPage)

      await wrapper.find(genderSelectTriggerSelector).trigger('focus')
      await wrapper.find(genderSelectTriggerSelector).trigger('blur')

      await flushPromises()

      expect(
        wrapper.find(genderSelectTriggerErrorMessageSelector).element
          .textContent,
      ).toBe('Required')
    })
  })
})
