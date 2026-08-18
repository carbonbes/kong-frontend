import { describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TemporalDisabledButton from './TemporalDisabledButton.vue'

describe('TemporalDisabledButton', () => {
  test('should be rendered as enabled by default if immediate-prop is not provided', async () => {
    const wrapper = mount(TemporalDisabledButton, { props: { duration: 5 } })
    const button = wrapper.getComponent(TemporalDisabledButton)

    expect(button.element.disabled).toBe(false)
  })

  test('should be rendered as enabled if immediate-prop is false', async () => {
    const wrapper = mount(TemporalDisabledButton, { props: { duration: 5, immediate: false } })
    const button = wrapper.getComponent(TemporalDisabledButton)

    expect(button.element.disabled).toBe(false)
  })

  test('should be rendered as disabled if immediate-prop is true', async () => {
    const wrapper = mount(TemporalDisabledButton, { props: { duration: 5, immediate: true } })
    const button = wrapper.getComponent(TemporalDisabledButton)

    await nextTick()

    expect(button.element.disabled).toBe(true)
  })

  test('should be rendered as enabled and then turn disabled when clicked', async () => {
    const wrapper = mount(TemporalDisabledButton, { props: { duration: 5, immediate: false } })
    const button = wrapper.getComponent(TemporalDisabledButton)

    expect(button.element.disabled).toBe(false)
    await button.trigger('click')
    expect(button.element.disabled).toBe(true)
  })

  test('should be rendered as disabled and then turn enabled the timer expires', async () => {
    vi.useFakeTimers()

    const wrapper = mount(TemporalDisabledButton, { props: { duration: 5, immediate: true } })
    const button = wrapper.getComponent(TemporalDisabledButton)

    await nextTick()

    expect(button.element.disabled).toBe(true)

    vi.runAllTimers()
    await nextTick()

    expect(button.element.disabled).toBe(false)

    vi.useRealTimers()
  })
})
