import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import SignupPage from './SignupPage.vue'
import { flushPromises } from '~/shared/tests'
import { mountSuspended } from '@nuxt/test-utils/runtime'

const fields = [
  { name: 'email', selector: 'input[name="email"]' },
  { name: 'name', selector: 'input[name="name"]' },
  { name: 'gender', selector: 'button[name="gender"]' },
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
    'should show a required-error when $name is empty and loses focus',
    async ({ name, selector }) => {
      const field = wrapper.get(selector)
      await field.trigger('blur')

      await flushPromises()

      const fieldLabel = wrapper.get(`label[for="${name}"]`)
      const fieldErrorMessage = wrapper.get(`p[data-field-name="${name}"]`)

      expect(fieldLabel.attributes('data-error')).toBe('true')
      expect(field.attributes('data-error')).toBe('true')
      expect(fieldErrorMessage.text()).toBeTruthy()
    },
  )
})
