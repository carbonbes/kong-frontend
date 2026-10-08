import { describe, expect, test } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import ArticleContent from './ArticleContent.vue'

describe('ArticleContent', () => {
  test('should be rendered with provided content', async () => {
    const content = '<h2 data-testid="test">Test</h2>'

    const wrapper = mount(ArticleContent, {
      props: { content },
    })

    await flushPromises()

    expect(wrapper.find('[data-testid=test]').html()).toBe(content)
  })
})
