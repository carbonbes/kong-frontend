import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

const buttonSelector = 'button'

describe('Button', () => {
  describe('slot', () => {
    test('should be rendered with default slot', () => {
      const wrapper = mount(Button, { slots: { default: 'Test' } })

      expect(wrapper.find(buttonSelector).text()).toBe('Test')
    })
  })

  describe('disabled', () => {
    test('should be rendered as enabled by default', () => {
      const wrapper = mount(Button)

      expect(wrapper.find(buttonSelector).element.disabled).toBe(false)
    })

    test('should be rendered as enabled', () => {
      const wrapper = mount(Button, { props: { disabled: false } })

      expect(wrapper.find(buttonSelector).element.disabled).toBe(false)
    })

    test('should be rendered as disabled', () => {
      const wrapper = mount(Button, { props: { disabled: true } })

      expect(wrapper.find(buttonSelector).element.disabled).toBe(true)
    })
  })
})
