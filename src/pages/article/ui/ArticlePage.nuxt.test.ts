import { describe, expect, test, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import ArticlePage from './ArticlePage.vue'
import { createPinia } from 'pinia'
import { PiniaColada } from '@pinia/colada'

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
  }
})

describe('ArticlePage', () => {
  test('should be rendered article', async () => {
    const wrapper = mount(ArticlePage, {
      global: {
        plugins: [createPinia(), PiniaColada],
      },
    })

    await flushPromises()

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
})
