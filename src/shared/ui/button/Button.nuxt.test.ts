import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button', () => {
  describe('slot', () => {
    test('should be rendered with default slot', () => {
      const wrapper = mount(Button, { slots: { default: 'Test' } })

      expect(wrapper.getComponent(Button).text()).toBe('Test')
    })
  })

  describe('as', () => {
    test('should be rendered as "button" by default', () => {
      const wrapper = mount(Button)

      expect(wrapper.getComponent(Button).element.tagName).toBe('BUTTON')
    })
  })

  describe('circle', () => {
    test('should be rendered as false by default', () => {
      const wrapper = mount(Button)

      expect(
        wrapper.getComponent(Button).element.getAttribute('data-circle'),
      ).toBe('false')
    })
  })

  describe('disabled', () => {
    test('should be rendered as false by default', () => {
      const wrapper = mount(Button)
      const button = wrapper.getComponent(Button).element

      expect(button.disabled).toBe(false)
      expect(button.getAttribute('data-disabled')).toBe('false')
    })

    test('should be rendered as false', () => {
      const wrapper = mount(Button, { props: { disabled: false } })
      const button = wrapper.getComponent(Button).element

      expect(button.disabled).toBe(false)
      expect(button.getAttribute('data-disabled')).toBe('false')
    })

    test('should be rendered as true', () => {
      const wrapper = mount(Button, { props: { disabled: true } })
      const button = wrapper.getComponent(Button).element

      expect(button.disabled).toBe(true)
      expect(button.getAttribute('data-disabled')).toBe('true')
    })
  })

  describe('size', () => {
    test('should be rendered as "md" by default', () => {
      const wrapper = mount(Button)

      expect(
        wrapper.getComponent(Button).element.getAttribute('data-size'),
      ).toBe('md')
    })
  })

  describe('type', () => {
    test('should be rendered as "button" by default', () => {
      const wrapper = mount(Button)

      expect(wrapper.getComponent(Button).element.type).toBe('button')
    })
  })

  describe('variant', () => {
    test('should be rendered as "primary" by default', () => {
      const wrapper = mount(Button)

      expect(
        wrapper.getComponent(Button).element.getAttribute('data-variant'),
      ).toBe('primary')
    })
  })
})
