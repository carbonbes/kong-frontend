import { flushPromises as fp } from '@vue/test-utils'
import { vi } from 'vitest'

export const flushPromises = async () => {
  await fp()
  vi.advanceTimersByTime(5)
  await fp()
}
