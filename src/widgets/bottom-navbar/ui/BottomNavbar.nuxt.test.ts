import { describe, expect, test } from 'vitest'
import { BottomNavbar } from '~/widgets/bottom-navbar'
import { mountSuspended } from '@nuxt/test-utils/runtime'

const profileButtonSelector =
  'button[data-testid="bottom-navbar/profile-button"]'

describe('BottomNavbar', () => {
  test('should be open profile popover after click profile button', async () => {
    const wrapper = await mountSuspended(BottomNavbar)

    const profileButton = wrapper.find(profileButtonSelector)
    await profileButton.trigger('click')

    expect(profileButton.element.getAttribute('data-state')).toBe('open')
  })
})
