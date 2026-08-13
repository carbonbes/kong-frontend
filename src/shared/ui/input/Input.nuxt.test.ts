import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from './Input.vue'

const inputSelector = 'input'

describe('Input', () => {
  describe('autofocus', () => {
    test('should be rendered as false by default', () => {
      const wrapper = mount(Input)

      expect(wrapper.find(inputSelector).element.autofocus).toBe(false)
    })
  })

  describe('disabled', () => {
    test('should be rendered as false by default', () => {
      const wrapper = mount(Input)

      expect(wrapper.find(inputSelector).element.disabled).toBe(false)
    })

    test('should be rendered as false', () => {
      const wrapper = mount(Input, { props: { disabled: false } })

      expect(wrapper.find(inputSelector).element.disabled).toBe(false)
    })

    test('should be rendered as true', () => {
      const wrapper = mount(Input, { props: { disabled: true } })

      expect(wrapper.find(inputSelector).element.disabled).toBe(true)
    })
  })

  describe('error', () => {
    test('should be rendered as false by default', () => {
      const wrapper = mount(Input)

      expect(
        wrapper.find(inputSelector).element.getAttribute('data-error'),
      ).toBe('false')
    })
  })

  describe('placeholder', () => {
    test('should be rendered without placeholder by default', () => {
      const wrapper = mount(Input)

      expect(wrapper.find(inputSelector).element.placeholder).toBe('')
    })

    test('should be rendered with placeholder', () => {
      const wrapper = mount(Input, { props: { placeholder: 'Test' } })

      expect(wrapper.find(inputSelector).element.placeholder).toBe('Test')
    })
  })

  describe('size', () => {
    test('should be rendered as "md" by default', () => {
      const wrapper = mount(Input)

      expect(
        wrapper.find(inputSelector).element.getAttribute('data-size'),
      ).toBe('md')
    })
  })

  describe('type', () => {
    test('should be rendered as "text" by default', () => {
      const wrapper = mount(Input)

      expect(wrapper.find(inputSelector).element.type).toBe('text')
    })
  })

  describe('value', () => {
    test('should be rendered without value by default', () => {
      const wrapper = mount(Input)

      expect(wrapper.find(inputSelector).element.value).toBe('')
    })

    test('should be rendered with value', () => {
      const wrapper = mount(Input, { props: { modelValue: 'Test' } })

      expect(wrapper.find(inputSelector).element.value).toBe('Test')
    })
  })
})
