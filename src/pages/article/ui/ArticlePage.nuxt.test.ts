import { describe, expect, test, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import ArticlePage from './ArticlePage.vue'
import { createPinia } from 'pinia'
import { PiniaColada } from '@pinia/colada'

const mutate = vi.fn()

vi.mock('~/entities/article', async (importOriginal) => {
  const original = await importOriginal<typeof import('~/entities/article')>()
  return {
    ...original,
    findUnique: vi.fn().mockResolvedValue({
      id: 1,
      authorId: 1,
      subsiteId: null,
      status: 'draft',
      rating: 0,
      content: {
        type: 'doc',
        content: [
          {
            type: 'heading',
            attrs: { level: 2, testid: 'test' },
            content: [{ type: 'text', text: 'Test' }],
          },
        ],
      },
      createdAt: new Date('1970-01-01T00:00:00'),
      updatedAt: new Date('1970-01-01T00:00:00'),
    }),
    useRemoveArticleMutation: vi.fn(() => ({ mutate })),
  }
})

describe('ArticlePage', () => {
  test('should be rendered article', async () => {
    const wrapper = await mountSuspended(ArticlePage, {
      global: {
        plugins: [createPinia(), PiniaColada],
      },
    })

    const articleCreatedAt = wrapper.find(
      '[data-testid="article-header/created-at"]',
    )
    const articleDropdownMenuTrigger = wrapper.find(
      '[data-testid="article-header/dropdown-menu/trigger"]',
    )

    expect(articleCreatedAt.text()).toBe('01.01.70 в 00:00')
    expect(articleDropdownMenuTrigger.exists()).toBe(true)
    expect(wrapper.find('[data-testid=test]').html()).toBe(
      '<h2 data-testid="test">Test</h2>',
    )
  })

  test('should remove article on remove event', async () => {
    const wrapper = await mountSuspended(ArticlePage, {
      global: {
        plugins: [createPinia(), PiniaColada],
      },
    })

    const dropdownMenuTrigger = wrapper.getComponent(
      '[data-testid="article-header/dropdown-menu/trigger"]',
    )
    await dropdownMenuTrigger.trigger('click')

    const removeButton = wrapper.getComponent(
      '[data-testid="article-header/dropdown-menu/content/remove-button"]',
    )
    await removeButton.trigger('click')

    expect(mutate).toHaveBeenCalledWith(1)
  })
})
