import { beforeEach, describe, expect, test } from 'vitest'
import type { VueWrapper } from '@vue/test-utils'
import { ArticleHeader } from '~/entities/article'
import { mountSuspended } from '@nuxt/test-utils/runtime'

describe('ArticleHeader', () => {
  test('should be rendered created at', async () => {
    const wrapper = await mountSuspended(ArticleHeader, {
      props: {
        article: {
          id: 1,
          authorId: 1,
          subsiteId: null,
          status: 'draft',
          rating: 0,
          content: {
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Test' }],
              },
            ],
          },
          createdAt: new Date('1970-01-01T00:00:00'),
          updatedAt: new Date('1970-01-01T00:00:00'),
        },
      },
    })

    expect(
      wrapper.find('[data-testid="article-header/created-at"]').text(),
    ).toBe('01.01.70 в 00:00')
  })

  describe('dropdown-menu', () => {
    const dropdownMenuTriggerSelector =
      '[data-testid="article-header/dropdown-menu/trigger"]'
    const dropdownMenuContentSelector =
      '[data-testid="article-header/dropdown-menu/content"]'
    const dropdownMenuEditButtonSelector =
      '[data-testid="article-header/dropdown-menu/content/edit-button"]'
    const dropdownMenuRemoveButtonSelector =
      '[data-testid="article-header/dropdown-menu/content/remove-button"]'

    let wrapper: VueWrapper

    beforeEach(async () => {
      wrapper = await mountSuspended(ArticleHeader, {
        props: {
          article: {
            id: 1,
            authorId: 1,
            subsiteId: null,
            status: 'draft',
            rating: 0,
            content: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [{ type: 'text', text: 'Test' }],
                },
              ],
            },
            createdAt: new Date('1970-01-01T00:00:00'),
            updatedAt: new Date('1970-01-01T00:00:00'),
          },
        },
      })
    })

    test('should be rendered trigger', () => {
      expect(wrapper.findComponent(dropdownMenuTriggerSelector).exists()).toBe(
        true,
      )
    })

    test('should be open after trigger is clicking', async () => {
      const trigger = wrapper.getComponent(dropdownMenuTriggerSelector)
      await trigger.trigger('click')

      const content = wrapper.getComponent(dropdownMenuContentSelector)

      expect(trigger.attributes('data-state')).toBe('open')
      expect(content.attributes('data-state')).toBe('open')
    })

    test('should be contain edit button', async () => {
      const trigger = wrapper.getComponent(dropdownMenuTriggerSelector)
      await trigger.trigger('click')

      expect(
        wrapper.findComponent(dropdownMenuEditButtonSelector).exists(),
      ).toBe(true)
    })

    test('should be contain remove button', async () => {
      const trigger = wrapper.getComponent(dropdownMenuTriggerSelector)
      await trigger.trigger('click')

      expect(
        wrapper.findComponent(dropdownMenuRemoveButtonSelector).exists(),
      ).toBe(true)
    })
  })
})
