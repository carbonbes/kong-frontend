import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import BottomNavbarItem from './BottomNavbarItem.vue'

describe('BottomNavbarItem', () => {
  describe('slot', () => {
    test('should be rendered with default slot', () => {
      const wrapper = mount(BottomNavbarItem, { slots: { default: 'Test' } })

      expect(wrapper.getComponent(BottomNavbarItem).text()).toBe('Test')
    })
  })

  describe('as', () => {
    test('should be rendered as "button" by default', () => {
      const wrapper = mount(BottomNavbarItem)

      expect(wrapper.getComponent(BottomNavbarItem).element.tagName).toBe(
        'BUTTON',
      )
    })
  })
})
