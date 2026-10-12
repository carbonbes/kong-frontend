import { describe, expect, test } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import EditorContent from './EditorContent.vue'

describe('EditorContent', () => {
  test('should be rendered with provided content and editable', async () => {
    const content = '<h2 data-testid="test">Test</h2>'

    const wrapper = mount(EditorContent, {
      props: { content },
    })

    await flushPromises()

    const editor = wrapper.find('[data-testid="editor-content"]')

    expect(wrapper.find('[data-testid=test]').html()).toBe(content)
    expect(editor.attributes('contenteditable')).toBe('true')
  })

  test('should be rendered with provided content and not editable', async () => {
    const content = '<h2 data-testid="test">Test</h2>'

    const wrapper = mount(EditorContent, {
      props: { content, readonly: true },
    })

    await flushPromises()

    const editor = wrapper.find('[data-testid="editor-content"]')

    expect(wrapper.find('[data-testid=test]').html()).toBe(content)
    expect(editor.attributes('contenteditable')).toBe('false')
  })
})
