import { beforeEach, describe, expect, test } from 'vitest'
import BottomNavbar from './BottomNavbar.vue'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import type { VueWrapper } from '@vue/test-utils'

const feedButtonSelector = '[data-testid="bottom-navbar/feed-button"]'
const editorButtonSelector = '[data-testid="bottom-navbar/editor-button"]'
const profileButtonSelector = '[data-testid="bottom-navbar/profile-button"]'
const profileDropdownMenuContentSelector =
  '[data-testid="bottom-navbar/profile-dropdown-menu/content"]'

describe('BottomNavbar', () => {
  let wrapper: VueWrapper

  beforeEach(async () => {
    wrapper = await mountSuspended(BottomNavbar)
  })

  test('should be contain a feed-page button', () => {
    const feedButton = wrapper.find(feedButtonSelector)

    expect(feedButton.exists()).toBe(true)
  })

  test('should be contain a editor-page button', () => {
    const editorButton = wrapper.find(editorButtonSelector)

    expect(editorButton.exists()).toBe(true)
  })

  test('should be contain a profile-page button', async () => {
    const profileButton = wrapper.find(profileButtonSelector)

    expect(profileButton.exists()).toBe(true)
  })

  test('should be open a profile-dropdown after click profile button', async () => {
    const profileButton = wrapper.getComponent(profileButtonSelector)
    await profileButton.trigger('click')

    const profileDropdownMenuContent = wrapper.getComponent(
      profileDropdownMenuContentSelector,
    )

    expect(profileButton.attributes('data-state')).toBe('open')
    expect(profileDropdownMenuContent.attributes('data-state')).toBe('open')
  })
})
