import { describe, expect, test } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import EditorContent from './EditorContent.vue'

describe('EditorContent', () => {
  test('should be rendered with empty content by default', async () => {
    const wrapper = mount(EditorContent)

    await flushPromises()

    expect(wrapper.element.innerHTML).toMatchSnapshot()
  })

  test('should be rendered with provided content', async () => {
    const wrapper = mount(EditorContent, {
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
