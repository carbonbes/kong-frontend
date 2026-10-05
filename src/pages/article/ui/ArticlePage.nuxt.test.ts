import { describe, expect, test } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import ArticlePage from './ArticlePage.vue'

describe('ArticlePage', () => {
  test('should be rendered with provided content', async () => {
    const wrapper = mount(ArticlePage, {
      props: {
        content: {
          type: 'doc',
          content: [
            {
              type: 'heading',
              attrs: { level: 2 },
              content: [{ type: 'text', text: 'Test' }],
            },
          ],
        },
      },
    })

    await flushPromises()

    expect(wrapper.element.innerHTML).toMatchSnapshot()
  })
})
