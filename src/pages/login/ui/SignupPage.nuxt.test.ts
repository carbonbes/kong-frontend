import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SignupPage from './SignupPage.vue'
import { flushPromises } from '~/shared/tests'

const fields = [
  { name: 'email', selector: 'input[name="email"]' },
  { name: 'name', selector: 'input[name="name"]' },
  { name: 'gender', selector: 'button[name="gender"]' },
]

describe('SignupPage', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test.each(fields)(
    'should show a required-error when $name is empty and loses focus',
    async ({ name, selector }) => {
      const wrapper = mount(SignupPage)
      const field = wrapper.get(selector)

      await field.trigger('blur')
      await flushPromises()

      expect(wrapper.get(`label[for="${name}"]`).attributes('data-error')).toBe(
        'true',
      )
      expect(field.attributes('data-error')).toBe('true')
      expect(wrapper.get(`p[data-field-name="${name}"]`).text()).toBeTruthy()
    },
  )
})
